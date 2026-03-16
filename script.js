/**
 * GuardRail - Flat Design Animation System
 * GSAP + ScrollTrigger for smooth, scale-based animations
 * No shadows, no depth - pure motion and color
 */

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animation configuration - Snappy, Direct
const ANIMATION_CONFIG = {
    duration: {
        fast: 0.2,
        normal: 0.3,
        slow: 0.6,
        hero: 0.8
    },
    ease: {
        out: 'power2.out',
        inOut: 'power2.inOut',
        bounce: 'back.out(1.4)'
    },
    stagger: {
        fast: 0.1,
        normal: 0.15,
        slow: 0.2
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (prefersReducedMotion) {
        initWithoutAnimations();
        return;
    }
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all animation systems
    initHeader();
    initHeroAnimations();
    initFeatureSections();
    initStepCards();
    initGetStartedSection();
    initFAQSection();
    initFAQAccordion();
    initCTASection();
    initMagneticButtons();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavHighlight();
    initScreenshotTilt();
    
    console.log('✨ GuardRail flat design animations initialized');
});

/**
 * Fallback for users who prefer reduced motion
 */
function initWithoutAnimations() {
    // Make all elements visible immediately
    gsap.set('.hero-line, .hero-description, .hero-cta', { opacity: 1, y: 0 });
    gsap.set('.feature-image, .feature-text', { opacity: 1, x: 0 });
    gsap.set('.feature-benefits li', { opacity: 1, x: 0 });
    gsap.set('.step-card', { opacity: 1, y: 0 });
    gsap.set('.segment-card', { opacity: 1, y: 0 });
    gsap.set('.faq-category', { opacity: 1, y: 0 });
    gsap.set('.cta-card', { opacity: 1, scale: 1 });
    gsap.set('.section-title', { opacity: 1, y: 0 });
    gsap.set('.section-intro', { opacity: 1, y: 0 });
    gsap.set('.note-item', { opacity: 1, y: 0 });
    
    // Still initialize functional features
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    
    console.log('🎯 GuardRail loaded (reduced motion mode)');
}

/**
 * Header scroll effects - Simple border on scroll
 */
function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

/**
 * Hero section animations - Staggered text reveal
 */
function initHeroAnimations() {
    const heroTimeline = gsap.timeline({
        defaults: {
            ease: ANIMATION_CONFIG.ease.out,
            duration: ANIMATION_CONFIG.duration.hero
        }
    });
    
    // Staggered text reveal - clean slide up
    heroTimeline
        .to('.hero-line', {
            opacity: 1,
            y: 0,
            stagger: ANIMATION_CONFIG.stagger.slow,
            duration: ANIMATION_CONFIG.duration.slow
        })
        .to('.hero-description', {
            opacity: 1,
            y: 0,
            duration: ANIMATION_CONFIG.duration.normal
        }, '-=0.3')
        .to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: ANIMATION_CONFIG.duration.normal
        }, '-=0.2');
}

/**
 * Feature section animations
 */
function initFeatureSections() {
    const sections = gsap.utils.toArray('.feature-section');
    
    sections.forEach(section => {
        const image = section.querySelector('.feature-image');
        const text = section.querySelector('.feature-text');
        const benefits = section.querySelectorAll('.feature-benefits li');
        
        // Create timeline for each section
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Animate image
        if (image) {
            tl.to(image, {
                opacity: 1,
                x: 0,
                duration: ANIMATION_CONFIG.duration.slow,
                ease: ANIMATION_CONFIG.ease.out
            });
        }
        
        // Animate text
        if (text) {
            tl.to(text, {
                opacity: 1,
                x: 0,
                duration: ANIMATION_CONFIG.duration.slow,
                ease: ANIMATION_CONFIG.ease.out
            }, '-=0.4');
        }
        
        // Stagger benefits
        if (benefits.length) {
            tl.to(benefits, {
                opacity: 1,
                x: 0,
                stagger: ANIMATION_CONFIG.stagger.fast,
                duration: ANIMATION_CONFIG.duration.fast,
                ease: ANIMATION_CONFIG.ease.out
            }, '-=0.2');
        }
    });
    
    // Screenshot hover interactions - Scale only (flat design)
    const screenshots = document.querySelectorAll('.screenshot-wrapper');
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', () => {
            gsap.to(screenshot, {
                scale: 1.02,
                duration: ANIMATION_CONFIG.duration.fast,
                ease: ANIMATION_CONFIG.ease.out
            });
        });
        
        screenshot.addEventListener('mouseleave', () => {
            gsap.to(screenshot, {
                scale: 1,
                duration: ANIMATION_CONFIG.duration.fast,
                ease: ANIMATION_CONFIG.ease.out
            });
        });
    });
}

/**
 * Step cards animation with stagger
 */
function initStepCards() {
    const sectionTitle = document.querySelector('.how-it-works .section-title');
    const cards = gsap.utils.toArray('.step-card');
    
    // Animate section title
    if (sectionTitle) {
        gsap.to(sectionTitle, {
            scrollTrigger: {
                trigger: sectionTitle,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: ANIMATION_CONFIG.duration.normal,
            ease: ANIMATION_CONFIG.ease.out
        });
    }
    
    // Stagger card animations
    cards.forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: ANIMATION_CONFIG.duration.normal,
            delay: index * ANIMATION_CONFIG.stagger.normal,
            ease: ANIMATION_CONFIG.ease.out
        });
        
        // Hover effects - Scale only (flat design)
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                scale: 1.02,
                duration: ANIMATION_CONFIG.duration.fast,
                ease: ANIMATION_CONFIG.ease.out
            });
            
            const icon = card.querySelector('.step-icon');
            if (icon) {
                gsap.to(icon, {
                    scale: 1.1,
                    duration: ANIMATION_CONFIG.duration.fast,
                    ease: ANIMATION_CONFIG.ease.out
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: ANIMATION_CONFIG.duration.fast,
                ease: ANIMATION_CONFIG.ease.out
            });
            
            const icon = card.querySelector('.step-icon');
            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    duration: ANIMATION_CONFIG.duration.fast,
                    ease: ANIMATION_CONFIG.ease.out
                });
            }
        });
    });
}

/**
 * Get Started section animation
 */
function initGetStartedSection() {
    const section = document.querySelector('.get-started-section');
    if (!section) return;
    const title = section.querySelector('.section-title');
    const intro = section.querySelector('.section-intro');
    const cards = gsap.utils.toArray('.get-started-section .segment-card');
    if (title) {
        gsap.to(title, {
            scrollTrigger: { trigger: title, start: 'top 80%', toggleActions: 'play none none reverse' },
            opacity: 1, y: 0, duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.out
        });
    }
    if (intro) {
        gsap.to(intro, {
            scrollTrigger: { trigger: intro, start: 'top 85%', toggleActions: 'play none none reverse' },
            opacity: 1, y: 0, duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.out
        });
    }
    cards.forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
            opacity: 1, y: 0, duration: ANIMATION_CONFIG.duration.normal, delay: index * ANIMATION_CONFIG.stagger.normal, ease: ANIMATION_CONFIG.ease.out
        });
    });
}

/**
 * FAQ section animation
 */
function initFAQSection() {
    const section = document.querySelector('.faq-section');
    if (!section) return;
    const title = section.querySelector('.section-title');
    const intro = section.querySelector('.section-intro');
    const categories = gsap.utils.toArray('.faq-category');
    if (title) {
        gsap.to(title, {
            scrollTrigger: { trigger: title, start: 'top 80%', toggleActions: 'play none none reverse' },
            opacity: 1, y: 0, duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.out
        });
    }
    if (intro) {
        gsap.to(intro, {
            scrollTrigger: { trigger: intro, start: 'top 85%', toggleActions: 'play none none reverse' },
            opacity: 1, y: 0, duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.out
        });
    }
    categories.forEach((cat, index) => {
        gsap.to(cat, {
            scrollTrigger: { trigger: cat, start: 'top 88%', toggleActions: 'play none none reverse' },
            opacity: 1, y: 0, duration: ANIMATION_CONFIG.duration.normal, delay: index * ANIMATION_CONFIG.stagger.normal, ease: ANIMATION_CONFIG.ease.out
        });
    });
}

/**
 * FAQ accordion toggles
 */
function initFAQAccordion() {
    const toggles = document.querySelectorAll('.faq-toggle');
    toggles.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.faq-item');
            const answer = document.getElementById(button.getAttribute('aria-controls'));
            const isOpen = item.classList.contains('is-open');
            if (isOpen) {
                item.classList.remove('is-open');
                button.setAttribute('aria-expanded', 'false');
                if (answer) answer.setAttribute('hidden', '');
            } else {
                item.classList.add('is-open');
                button.setAttribute('aria-expanded', 'true');
                if (answer) answer.removeAttribute('hidden');
            }
        });
    });
    document.querySelectorAll('.faq-answer').forEach(el => el.setAttribute('hidden', ''));
}

/**
 * CTA section animation
 */
function initCTASection() {
    const ctaCard = document.querySelector('.cta-card');
    const noteItems = gsap.utils.toArray('.note-item');
    
    if (ctaCard) {
        gsap.to(ctaCard, {
            scrollTrigger: {
                trigger: ctaCard,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            scale: 1,
            duration: ANIMATION_CONFIG.duration.slow,
            ease: ANIMATION_CONFIG.ease.bounce
        });
    }
    
    if (noteItems.length) {
        gsap.to(noteItems, {
            scrollTrigger: {
                trigger: noteItems[0],
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            stagger: ANIMATION_CONFIG.stagger.fast,
            duration: ANIMATION_CONFIG.duration.fast,
            delay: 0.2,
            ease: ANIMATION_CONFIG.ease.out
        });
    }
}

/**
 * Magnetic button effect - Subtle for flat design
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Reduced effect for flat design
            gsap.to(button, {
                x: x * 0.15,
                y: y * 0.15,
                duration: ANIMATION_CONFIG.duration.fast,
                ease: ANIMATION_CONFIG.ease.out
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: ANIMATION_CONFIG.duration.normal,
                ease: ANIMATION_CONFIG.ease.bounce
            });
        });
    });
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!toggle || !navLinks) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Smooth scroll for anchor links (nav and in-page # links)
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            e.preventDefault();
            
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Active section highlighting in navigation with gradual fill
 */
function initActiveNavHighlight() {
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 80;
    
    // Get all feature sections for combined "features" calculation
    const allFeatureSections = document.querySelectorAll('.feature-section');
    const howItWorksSection = document.querySelector('#how-it-works');
    
    function getSectionBounds(targetId) {
        if (targetId === 'features' && allFeatureSections.length > 0 && howItWorksSection) {
            // For features, fill should complete exactly when How it Works begins
            const firstSection = allFeatureSections[0];
            const sectionTop = firstSection.offsetTop - headerHeight - 100;
            // End at the start of How it Works section
            const sectionBottom = howItWorksSection.offsetTop - headerHeight;
            const sectionHeight = sectionBottom - sectionTop;
            return { top: sectionTop, height: sectionHeight, bottom: sectionBottom };
        } else if (targetId === 'how-it-works' && howItWorksSection) {
            const section = howItWorksSection;
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.clientHeight;
            return { top: sectionTop, height: sectionHeight, bottom: sectionTop + sectionHeight };
        } else {
            const section = document.querySelector(`#${targetId}`);
            if (!section) return null;
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.clientHeight;
            return { top: sectionTop, height: sectionHeight, bottom: sectionTop + sectionHeight };
        }
    }
    
    function updateNavFill() {
        const scrollY = window.pageYOffset;
        
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').replace('#', '');
            const bounds = getSectionBounds(targetId);
            
            if (!bounds) return;
            
            // Calculate progress through section (0 to 1)
            let progress = 0;
            
            if (scrollY >= bounds.top && scrollY <= bounds.bottom) {
                progress = Math.min(1, Math.max(0, (scrollY - bounds.top) / bounds.height));
            } else if (scrollY > bounds.bottom) {
                progress = 1;
            }
            
            // Apply left-to-right fill - blue over gray base
            const fillPercent = progress * 100;
            link.style.background = `linear-gradient(to right, #3B82F6 ${fillPercent}%, #4B5563 ${fillPercent}%)`;
            link.style.color = 'white';
        });
    }
    
    window.addEventListener('scroll', updateNavFill, { passive: true });
    updateNavFill(); // Initial call
}

/**
 * Screenshot tilt effect on hover
 */
function initScreenshotTilt() {
    const screenshots = document.querySelectorAll('.screenshot-wrapper');
    
    screenshots.forEach(wrapper => {
        const img = wrapper.querySelector('.feature-screenshot');
        if (!img) return;
        
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;
            
            gsap.to(img, {
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.02,
                duration: ANIMATION_CONFIG.duration.fast,
                ease: ANIMATION_CONFIG.ease.out,
                transformPerspective: 1000
            });
        });
        
        wrapper.addEventListener('mouseleave', () => {
            gsap.to(img, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: ANIMATION_CONFIG.duration.normal,
                ease: ANIMATION_CONFIG.ease.bounce
            });
        });
    });
}

/**
 * Performance optimization: Pause animations when tab is hidden
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});

/**
 * Refresh ScrollTrigger on window resize
 */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

/**
 * Button hover effects - Scale only (flat design)
 */
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: ANIMATION_CONFIG.duration.fast,
            ease: ANIMATION_CONFIG.ease.out
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: ANIMATION_CONFIG.duration.fast,
            ease: ANIMATION_CONFIG.ease.out
        });
    });
});
