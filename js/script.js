function runTypingEffect() {
    const text = 'I am Patrik Martinec.';
    const typingElement = document.getElementById('typing-text');
    const typingDelay = 100;

    typeText(text, typingElement, typingDelay);
}

let isAnimating = false;
let hasScrolledDown = false;

function typeText(text, typingElement, delay) {
    if (isAnimating) return;

    isAnimating = true;

    typingElement.textContent = '';
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            typingElement.textContent += text.charAt(i);

            if (i === text.length - 1) {
                setTimeout(() => {
                    isAnimating = false;
                }, delay);
            }
        }, delay * i);
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function handleMediaVisibility() {
    const mediaDiv = document.getElementById('media');
    if (window.innerHeight < 520) {
        mediaDiv.classList.add('d-none');
    } else {
        mediaDiv.classList.remove('d-none');
    }
}

// Scroll Animation Observer
function createScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(
        '.tech-card, .project-card, .about-content, .section-header'
    );
    elementsToAnimate.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Enhanced smooth scrolling for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });
}

// Add hover effects to tech items
function setupTechHoverEffects() {
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item) => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(8px)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Copy email to clipboard functionality
function setupEmailCopy() {
    const emailLink = document.querySelector(
        '.contact-item a[href^="mailto:patrik.martinec1@gmail.com"]'
    );
    if (emailLink) {
        emailLink.addEventListener('click', function (e) {
            e.preventDefault();
            const email = 'patrik.martinec1@gmail.com';

            // Modern clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard
                    .writeText(email)
                    .then(function () {
                        showCopyNotification('Email copied to clipboard!');
                    })
                    .catch(function (err) {
                        console.error('Failed to copy email: ', err);
                        fallbackCopyTextToClipboard(email);
                    });
            } else {
                // Fallback for older browsers
                fallbackCopyTextToClipboard(email);
            }
        });
    }
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyNotification('Email copied to clipboard!');
        } else {
            showCopyNotification('Failed to copy email');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showCopyNotification('Failed to copy email');
    }

    document.body.removeChild(textArea);
}

// Show copy notification
function showCopyNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #007BFF, #0056b3);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-weight: 600;
        font-size: 0.9rem;
        box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    runTypingEffect();
    handleMediaVisibility();
    createScrollObserver();
    setupSmoothScroll();
    setupTechHoverEffects();
    setupEmailCopy(); // Add email copy functionality

    const progressBarInner = document.querySelector('#progress-bar');
    const typingElement = document.getElementById('typing-text');
    const viewportHeight = window.innerHeight;

    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const toTopBtn = document.querySelector('#to-top');

        let st = h.scrollTop || document.body.scrollTop;
        let sh = h.scrollHeight || document.body.scrollHeight;

        let percent = (st / (sh - h.clientHeight)) * 100;

        progressBarInner.style.width = percent + '%';

        // Show/hide scroll to top button
        if (window.scrollY > 300) {
            toTopBtn.classList.add('show');
        } else {
            toTopBtn.classList.remove('show');
        }

        if (window.scrollY > viewportHeight) {
            hasScrolledDown = true;
        }

        if (hasScrolledDown && window.scrollY < 50) {
            typeText('I am Patrik Martinec.', typingElement, 100);
            hasScrolledDown = false;
        }
    });

    // Handle media visibility on window resize
    window.addEventListener('resize', handleMediaVisibility);
    document.querySelector('#to-top').addEventListener('click', scrollToTop);
});
