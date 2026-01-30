// ==================== LOGGING SYSTEM ====================
class Logger {
    constructor(options = {}) {
        this.enabled = options.enabled !== false;
        this.level = options.level || 'info'; // 'debug', 'info', 'warn', 'error'
        this.prefix = options.prefix || '[BDWS]';
        this.logToConsole = options.console !== false;
        this.logToStorage = options.storage === true;
        this.maxLogs = options.maxLogs || 100;
        this.logs = [];
        
        // Performance tracking
        this.performanceMarks = {};
    }

    // Core logging method
    _log(level, message, data = null) {
        if (!this.enabled) return;
        
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: level,
            message: message,
            data: data,
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // Add to logs array
        this.logs.push(logEntry);
        
        // Maintain max logs limit
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // Save to localStorage if enabled
        if (this.logToStorage) {
            try {
                localStorage.setItem('bdws_logs', JSON.stringify(this.logs));
            } catch (e) {
                console.warn('Failed to save logs to storage:', e);
            }
        }

        // Console output
        if (this.logToConsole) {
            const style = this._getLogStyle(level);
            console.log(
                `%c${this.prefix} [${level.toUpperCase()}]`,
                style,
                message,
                data || ''
            );
        }
    }

    _getLogStyle(level) {
        const styles = {
            debug: 'background: #9E9E9E; color: white; padding: 2px 5px; border-radius: 3px;',
            info: 'background: #2196F3; color: white; padding: 2px 5px; border-radius: 3px;',
            warn: 'background: #FF9800; color: white; padding: 2px 5px; border-radius: 3px;',
            error: 'background: #F44336; color: white; padding: 2px 5px; border-radius: 3px;',
            success: 'background: #4CAF50; color: white; padding: 2px 5px; border-radius: 3px;'
        };
        return styles[level] || styles.info;
    }

    // Public logging methods
    debug(message, data) {
        this._log('debug', message, data);
    }

    info(message, data) {
        this._log('info', message, data);
    }

    warn(message, data) {
        this._log('warn', message, data);
    }

    error(message, data) {
        this._log('error', message, data);
    }

    success(message, data) {
        this._log('success', message, data);
    }

    // Performance tracking
    startPerformance(label) {
        this.performanceMarks[label] = performance.now();
        this.debug(`Performance tracking started: ${label}`);
    }

    endPerformance(label) {
        if (this.performanceMarks[label]) {
            const duration = performance.now() - this.performanceMarks[label];
            this.info(`Performance: ${label} completed in ${duration.toFixed(2)}ms`);
            delete this.performanceMarks[label];
            return duration;
        }
    }

    // Get all logs
    getLogs() {
        return this.logs;
    }

    // Clear logs
    clearLogs() {
        this.logs = [];
        if (this.logToStorage) {
            localStorage.removeItem('bdws_logs');
        }
        this.info('Logs cleared');
    }

    // Export logs as JSON
    exportLogs() {
        const dataStr = JSON.stringify(this.logs, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bdws-logs-${new Date().toISOString()}.json`;
        link.click();
        this.success('Logs exported successfully');
    }
}

// Initialize logger
const logger = new Logger({
    enabled: true,
    level: 'debug',
    console: true,
    storage: true
});

logger.info('BDWS Website initialized');

// ==================== PARALLAX EFFECT ====================
class ParallaxEffect {
    constructor() {
        this.elements = {
            stars: document.getElementById('stars'),
            moon: document.getElementById('moon'),
            mountains3: document.getElementById('mountains3'),
            mountains4: document.getElementById('mountains4'),
            river: document.getElementById('river'),
            boat: document.getElementById('boat'),
            mainTitle: document.getElementById('mainTitle')
        };
        
        this.scrollPosition = 0;
        this.ticking = false;
        
        this.init();
    }

    init() {
        logger.debug('Initializing parallax effect');
        window.addEventListener('scroll', () => this.requestTick());
    }

    requestTick() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => this.update());
            this.ticking = true;
        }
    }

    update() {
        this.scrollPosition = window.scrollY;
        
        // Apply parallax transformations
        if (this.elements.stars) {
            this.elements.stars.style.left = this.scrollPosition + 'px';
        }
        
        if (this.elements.moon) {
            this.elements.moon.style.top = this.scrollPosition * 3 + 'px';
        }
        
        if (this.elements.mountains3) {
            this.elements.mountains3.style.top = this.scrollPosition * 1.5 + 'px';
        }
        
        if (this.elements.mountains4) {
            this.elements.mountains4.style.top = this.scrollPosition * 1.2 + 'px';
        }
        
        if (this.elements.river) {
            this.elements.river.style.top = this.scrollPosition + 'px';
        }
        
        if (this.elements.boat) {
            this.elements.boat.style.top = this.scrollPosition + 'px';
            this.elements.boat.style.left = this.scrollPosition * 4 + 'px';
        }
        
        // Animate title font size
        if (this.elements.mainTitle) {
            const fontSize = Math.min(this.scrollPosition + 30, 60);
            this.elements.mainTitle.style.fontSize = fontSize + 'px';
        }
        
        this.ticking = false;
    }
}

// ==================== PORTFOLIO GALLERY ====================
class PortfolioGallery {
    constructor() {
        this.images = [
            { src: 'a.jpg', category: 'design' },
            { src: 'b.jpg', category: 'web' },
            { src: 'c.jpg', category: 'branding' },
            { src: 'd.jpg', category: 'design' },
            { src: 'h.jpg', category: 'web' },
            { src: 'i.jpg', category: 'branding' },
            { src: 'j.jpg', category: 'design' },
            { src: 'k.jpg', category: 'web' },
            { src: 'l.jpg', category: 'design' },
            { src: 'n.jpg', category: 'branding' },
            { src: 'o.jpg', category: 'web' },
            { src: 'p.jpg', category: 'design' },
            { src: 'q.jpg', category: 'branding' },
            { src: 'r.jpg', category: 'web' },
            { src: 's.jpg', category: 'design' },
            { src: 't (2).jpg', category: 'branding' },
            { src: 't.jpg', category: 'web' },
            { src: 'u.jpg', category: 'design' },
            { src: 'v.jpg', category: 'branding' },
            { src: 'w.jpg', category: 'web' },
            { src: 'x.jpg', category: 'design' },
            { src: 'aa.jpg', category: 'branding' },
            { src: 'z.jpg', category: 'web' }
        ];
        
        this.currentFilter = 'all';
        this.gallery = document.getElementById('portfolioGallery');
        
        this.init();
    }

    init() {
        logger.startPerformance('gallery-init');
        this.renderGallery();
        this.setupFilters();
        logger.endPerformance('gallery-init');
    }

    renderGallery(filter = 'all') {
        if (!this.gallery) return;
        
        this.gallery.innerHTML = '';
        
        const filteredImages = filter === 'all' 
            ? this.images 
            : this.images.filter(img => img.category === filter);

        logger.info(`Rendering gallery with filter: ${filter}`, { count: filteredImages.length });

        filteredImages.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = `gallery-item ${img.category}`;
            item.innerHTML = `
                <img src="${img.src}" alt="Portfolio Image ${index + 1}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus overlay-icon"></i>
                </div>
            `;
            
            item.addEventListener('click', () => this.openLightbox(img.src));
            this.gallery.appendChild(item);
        });
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter gallery
                this.renderGallery(filter);
                logger.info(`Filter applied: ${filter}`);
            });
        });
    }

    openLightbox(imageSrc) {
        logger.debug('Opening lightbox', { image: imageSrc });
        // You can implement a modal lightbox here
        window.open(imageSrc, '_blank');
    }
}

// ==================== NAVIGATION ====================
class Navigation {
    constructor() {
        this.navbar = document.getElementById('mainNav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        logger.debug('Initializing navigation');
        window.addEventListener('scroll', () => this.handleScroll());
        this.setupSmoothScroll();
        this.updateActiveLink();
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        logger.debug('Smooth scroll to:', href);
                    }
                }
            });
        });
    }

    updateActiveLink() {
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + 150;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
}

// ==================== BACK TO TOP BUTTON ====================
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }

    init() {
        if (!this.button) return;
        
        logger.debug('Initializing back to top button');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            logger.debug('Back to top clicked');
        });
    }
}

// ==================== LOADING SCREEN ====================
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.init();
    }

    init() {
        logger.startPerformance('page-load');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loadingScreen?.classList.add('hidden');
                logger.endPerformance('page-load');
                logger.success('Page loaded successfully');
            }, 500);
        });
    }
}

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (event) => {
    logger.error('JavaScript error occurred', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled promise rejection', {
        reason: event.reason
    });
});

// ==================== ANALYTICS ====================
class Analytics {
    constructor() {
        this.trackPageView();
        this.trackClicks();
        this.trackScrollDepth();
    }

    trackPageView() {
        logger.info('Page view tracked', {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer
        });
    }

    trackClicks() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button');
            if (target) {
                logger.debug('Click tracked', {
                    element: target.tagName,
                    text: target.textContent.trim(),
                    href: target.href || null
                });
            }
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
            
            if (scrollPercentage > maxScroll) {
                maxScroll = Math.floor(scrollPercentage);
                
                if (maxScroll % 25 === 0 && maxScroll > 0) {
                    logger.info(`Scroll depth: ${maxScroll}%`);
                }
            }
        });
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    logger.info('DOM Content Loaded - Initializing components');
    
    try {
        new LoadingScreen();
        new ParallaxEffect();
        new PortfolioGallery();
        new Navigation();
        new BackToTop();
        new Analytics();
        
        logger.success('All components initialized successfully');
    } catch (error) {
        logger.error('Error during initialization', error);
    }
});

// ==================== DEVELOPER TOOLS ====================
// Expose logger to window for debugging
window.bdwsLogger = logger;

// Log shortcut
console.log('%c🎨 BDWS Website', 'font-size: 20px; font-weight: bold; color: #f5deb3;');
console.log('%cDeveloper tools available:', 'font-size: 14px; color: #ffd700;');
console.log('%c- window.bdwsLogger.getLogs() - View all logs', 'font-size: 12px;');
console.log('%c- window.bdwsLogger.exportLogs() - Export logs as JSON', 'font-size: 12px;');
console.log('%c- window.bdwsLogger.clearLogs() - Clear all logs', 'font-size: 12px;');