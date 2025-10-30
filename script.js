// Smooth scrolling and interactive elements
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(10, 22, 40, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(10, 22, 40, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Add smooth scroll behavior to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature sections for animation
    const featureSections = document.querySelectorAll('.feature-section');
    featureSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Add enhanced hover effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 12px 40px rgba(0, 217, 255, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Add click tracking for download buttons (analytics placeholder)
    const downloadButtons = document.querySelectorAll('.cta-button, .download-badge');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track download button clicks
            console.log('Download button clicked:', this.textContent);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add loading animation for mockup SVGs
    const mockupSvgs = document.querySelectorAll('.mockup-svg');
    mockupSvgs.forEach(svg => {
        svg.style.opacity = '0';
        svg.style.transform = 'scale(0.8)';
        
        const svgObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }, 200);
                }
            });
        }, { threshold: 0.3 });
        
        svgObserver.observe(svg);
    });

    // Add enhanced animations for logo items
    const logoItems = document.querySelectorAll('.logo-item');
    logoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
            this.style.filter = 'grayscale(0%) opacity(1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.filter = 'grayscale(100%) opacity(0.6)';
        });
    });

    // Add staggered animation for logo grid
    const logosGrid = document.querySelector('.logos-grid');
    if (logosGrid) {
        const logoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const logos = entry.target.querySelectorAll('.logo-item');
                    logos.forEach((logo, index) => {
                        setTimeout(() => {
                            logo.style.opacity = '1';
                            logo.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        logosGrid.style.opacity = '0';
        logosGrid.style.transform = 'translateY(20px)';
        logosGrid.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        logosGrid.querySelectorAll('.logo-item').forEach(logo => {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(20px)';
            logo.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });
        
        logoObserver.observe(logosGrid);
    }

    // 3D hover tilt for all screenshots and footer card
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    const prefersNoMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (supportsHover && !prefersNoMotion) {
        const tiltContainers = document.querySelectorAll('.screenshot-wrapper, .screenshot-container, .cta-card, .step-card');
        tiltContainers.forEach(container => {
            const maxRotate = container.classList.contains('cta-card') || container.classList.contains('step-card') ? 5 : 10; // degrees
            const onMove = (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateY = ((x - centerX) / centerX) * maxRotate;
                const rotateX = -((y - centerY) / centerY) * maxRotate;
                
                if (container.classList.contains('cta-card')) {
                    container.style.transform = `translateY(-8px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
                } else if (container.classList.contains('step-card')) {
                    container.style.transform = `translateY(-8px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
                } else {
                    const image = container.querySelector('.feature-screenshot');
                    if (image) {
                        image.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.03)`;
                    }
                }
            };
            const onLeave = () => {
                if (container.classList.contains('cta-card')) {
                    container.style.transform = 'translateY(-8px) rotateX(2deg) rotateY(1deg)';
                } else if (container.classList.contains('step-card')) {
                    container.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
                } else {
                    const image = container.querySelector('.feature-screenshot');
                    if (image) {
                        image.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
                    }
                }
            };
            container.addEventListener('mousemove', onMove);
            container.addEventListener('mouseleave', onLeave);
        });
    }

    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number, .trust-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const isPercentage = target.includes('%');
            const isRating = target.includes('★');
            const isPlus = target.includes('+');
            
            let numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
            if (isNaN(numericValue)) return;
            
            let current = 0;
            const increment = numericValue / 50;
            const suffix = isPercentage ? '%' : isRating ? '★' : isPlus ? '+' : '';
            
            const updateCounter = () => {
                if (current < numericValue) {
                    current += increment;
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    const trustStats = document.querySelector('.trust-stats');
    
    if (heroStats) statsObserver.observe(heroStats);
    if (trustStats) statsObserver.observe(trustStats);

    // Add mobile menu functionality (if needed in future)
    const createMobileMenu = () => {
        // This can be expanded if navigation is added
        console.log('Mobile menu functionality ready');
    };

    // Initialize mobile menu
    createMobileMenu();

    // Add form validation (if contact forms are added later)
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#10b981';
            }
        });
        
        return isValid;
    };

    // Performance optimization: Lazy load images (if added later)
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    // Initialize lazy loading
    lazyLoadImages();

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #00D9FF';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    console.log('GuardRail website loaded successfully!');
});

