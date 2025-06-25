// Angel Connect Presentation JavaScript
// Interactive presentation functionality

class AngelConnectPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 9;
        this.slides = document.querySelectorAll('.slide');
        this.isAutoPlaying = false;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateNavigation();
        this.preloadImages();
        this.startAnimations();
    }
    
    setupEventListeners() {
        // Navigation button listeners
        document.getElementById('prev-btn').addEventListener('click', () => this.previousSlide());
        document.getElementById('next-btn').addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
                case 'f':
                case 'F':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.toggleFullscreen();
                    }
                    break;
                case 'p':
                case 'P':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.toggleAutoPlay();
                    }
                    break;
            }
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
            
            startX = 0;
            startY = 0;
        });
        
        // Click on slide content to advance (except on interactive elements)
        document.addEventListener('click', (e) => {
            const isNavigation = e.target.closest('.presentation-nav');
            const isInteractive = e.target.closest('button, a, input, .interactive');
            
            if (!isNavigation && !isInteractive) {
                this.nextSlide();
            }
        });
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;
        
        // Remove active class from current slide
        const currentSlideEl = document.querySelector('.slide.active');
        if (currentSlideEl) {
            currentSlideEl.classList.remove('active');
            currentSlideEl.classList.add('prev');
            
            // Remove prev class after animation
            setTimeout(() => {
                currentSlideEl.classList.remove('prev');
            }, 400);
        }
        
        // Add active class to new slide
        const newSlideEl = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (newSlideEl) {
            newSlideEl.classList.add('active');
            this.animateSlideContent(newSlideEl);
        }
        
        this.currentSlide = slideNumber;
        this.updateNavigation();
        this.trackAnalytics();
        
        // Dispatch slide change event for charts
        document.dispatchEvent(new CustomEvent('slideChanged', {
            detail: { slideNumber: slideNumber }
        }));
    }
    
    updateNavigation() {
        // Update slide counter
        document.querySelector('.current-slide').textContent = this.currentSlide;
        
        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        const progressPercent = (this.currentSlide / this.totalSlides) * 100;
        progressFill.style.width = `${progressPercent}%`;
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        prevBtn.disabled = this.currentSlide === 1;
        nextBtn.disabled = this.currentSlide === this.totalSlides;
    }
    
    animateSlideContent(slideEl) {
        // Simplified animations for better performance
        requestAnimationFrame(() => {
            const title = slideEl.querySelector('.slide-title, .main-title');
            if (title) {
                title.style.opacity = '0';
                title.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    title.style.transition = 'all 0.4s ease';
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    }
    
    startAnimations() {
        // Animate current slide content on load
        const currentSlideEl = document.querySelector('.slide.active');
        if (currentSlideEl) {
            this.animateSlideContent(currentSlideEl);
        }
    }
    
    preloadImages() {
        // Optimized preloading - only critical images
        const criticalImages = document.querySelectorAll('.nav-logo, .main-logo, .team-photo');
        criticalImages.forEach(img => {
            if (img.src && !img.complete) {
                const preloadImg = new Image();
                preloadImg.src = img.src;
            }
        });
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    toggleAutoPlay() {
        if (this.isAutoPlaying) {
            this.stopAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }
    
    startAutoPlay() {
        this.isAutoPlaying = true;
        this.autoPlayInterval = setInterval(() => {
            if (this.currentSlide < this.totalSlides) {
                this.nextSlide();
            } else {
                this.stopAutoPlay();
            }
        }, 8000); // 8 seconds per slide
        
        this.showNotification('Auto-play started (8s per slide)');
    }
    
    stopAutoPlay() {
        this.isAutoPlaying = false;
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        
        this.showNotification('Auto-play stopped');
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'presentation-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 24px;
            background: rgba(0, 102, 255, 0.95);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    trackAnalytics() {
        // Simple analytics tracking
        if (window.gtag) {
            gtag('event', 'slide_view', {
                slide_number: this.currentSlide,
                slide_title: document.querySelector('.slide.active .slide-title')?.textContent || 'Title Slide'
            });
        }
        
        // Track slide progress
        const progress = (this.currentSlide / this.totalSlides) * 100;
        if (progress >= 25 && !this.tracked25) {
            this.tracked25 = true;
            this.trackMilestone('25_percent_viewed');
        }
        if (progress >= 50 && !this.tracked50) {
            this.tracked50 = true;
            this.trackMilestone('50_percent_viewed');
        }
        if (progress >= 75 && !this.tracked75) {
            this.tracked75 = true;
            this.trackMilestone('75_percent_viewed');
        }
        if (progress >= 100 && !this.tracked100) {
            this.tracked100 = true;
            this.trackMilestone('presentation_completed');
        }
    }
    
    trackMilestone(milestone) {
        if (window.gtag) {
            gtag('event', 'presentation_milestone', {
                milestone: milestone,
                timestamp: new Date().toISOString()
            });
        }
        
        console.log(`Presentation milestone: ${milestone}`);
    }
    
    // Public methods for external control
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    getProgress() {
        return (this.currentSlide / this.totalSlides) * 100;
    }
}

// Utility functions for slide-specific interactions
const PresentationUtils = {
    // Format numbers with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Animate counting numbers
    animateCounter(element, start, end, duration = 2000) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = this.formatNumber(Math.floor(current));
        }, 16);
    },
    
    // Highlight text with typing effect
    typeWriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    },
    
    // Copy presentation link to clipboard
    copyPresentationLink() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            presentation.showNotification('Presentation link copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy link:', err);
        });
    }
};

// Initialize presentation when DOM is loaded
let presentation;

document.addEventListener('DOMContentLoaded', () => {
    presentation = new AngelConnectPresentation();
    
    // Add keyboard shortcuts help
    document.addEventListener('keydown', (e) => {
        if (e.key === '?' || (e.shiftKey && e.key === '/')) {
            e.preventDefault();
            showKeyboardHelp();
        }
    });
});

function showKeyboardHelp() {
    const helpModal = document.createElement('div');
    helpModal.className = 'keyboard-help-modal';
    helpModal.innerHTML = `
        <div class="help-overlay" onclick="this.parentElement.remove()"></div>
        <div class="help-content">
            <h3>Keyboard Shortcuts</h3>
            <div class="shortcuts-grid">
                <div class="shortcut">
                    <span class="key">← →</span>
                    <span class="desc">Navigate slides</span>
                </div>
                <div class="shortcut">
                    <span class="key">Space</span>
                    <span class="desc">Next slide</span>
                </div>
                <div class="shortcut">
                    <span class="key">Home/End</span>
                    <span class="desc">First/Last slide</span>
                </div>
                <div class="shortcut">
                    <span class="key">F</span>
                    <span class="desc">Fullscreen</span>
                </div>
                <div class="shortcut">
                    <span class="key">Ctrl+P</span>
                    <span class="desc">Auto-play</span>
                </div>
                <div class="shortcut">
                    <span class="key">?</span>
                    <span class="desc">Show this help</span>
                </div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: #0066FF; color: white; border: none; padding: 8px 16px; border-radius: 4px; margin-top: 16px; cursor: pointer;">
                Close
            </button>
        </div>
    `;
    
    helpModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .help-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
        }
        .help-content {
            background: white;
            padding: 32px;
            border-radius: 16px;
            max-width: 400px;
            position: relative;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .help-content h3 {
            margin-bottom: 24px;
            text-align: center;
            color: #1A1A1A;
        }
        .shortcuts-grid {
            display: grid;
            gap: 12px;
        }
        .shortcut {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .key {
            background: #F3F4F6;
            padding: 4px 8px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            font-weight: bold;
        }
        .desc {
            color: #6B7280;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(helpModal);
}

// Export for external use
window.AngelConnectPresentation = AngelConnectPresentation;
window.PresentationUtils = PresentationUtils;