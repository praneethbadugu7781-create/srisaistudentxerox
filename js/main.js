// Sri Sai Student Xerox - Premium JS
const CONFIG = {
    whatsappNumber: '919000948781'
};

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Scroll Animations with stagger
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.animate, .stagger');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => observer.observe(el));
});

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
});

// Order Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    if (!orderForm) return;
    
    // Service card selection
    const serviceCards = document.querySelectorAll('.select-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                serviceCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
            }
        });
    });
    
    // Option card selection
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                const name = radio.getAttribute('name');
                document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                    r.closest('.option-card').classList.remove('selected');
                });
                radio.checked = true;
                this.classList.add('selected');
            }
        });
    });
    
    // Copies input
    const copiesInput = document.getElementById('copies');
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    
    if (minusBtn && plusBtn && copiesInput) {
        minusBtn.addEventListener('click', function() {
            const val = parseInt(copiesInput.value) || 1;
            if (val > 1) copiesInput.value = val - 1;
        });
        
        plusBtn.addEventListener('click', function() {
            const val = parseInt(copiesInput.value) || 1;
            if (val < 999) copiesInput.value = val + 1;
        });
    }
    
    // Form submission
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const service = orderForm.querySelector('input[name="service"]:checked');
        const printType = orderForm.querySelector('input[name="printType"]:checked');
        const sides = orderForm.querySelector('input[name="sides"]:checked');
        const paper = orderForm.querySelector('input[name="paper"]:checked');
        const copies = document.getElementById('copies');
        const name = document.getElementById('name');
        const instructions = document.getElementById('instructions');
        
        let message = `📄 *Order from Sri Sai Xerox Website*\n\n`;
        
        if (service) message += `*Service:* ${service.value}\n`;
        if (printType) message += `*Type:* ${printType.value}\n`;
        if (sides) message += `*Sides:* ${sides.value}\n`;
        if (paper) message += `*Paper:* ${paper.value}\n`;
        if (copies && copies.value) message += `*Copies:* ${copies.value}\n`;
        if (name && name.value) message += `*Name:* ${name.value}\n`;
        if (instructions && instructions.value) message += `*Instructions:* ${instructions.value}\n`;
        
        message += `\n📎 I will send my files next.`;
        
        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    });
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked if wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});
