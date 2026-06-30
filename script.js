/* ============================================
   LAYALI - Premium Fashion Brand
   Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    // ============================================
    // CART FUNCTIONALITY
    // ============================================
    let cartCount = 0;
    const cartCountEl = document.querySelector('.cart-count');

    function updateCartCount() {
        cartCountEl.textContent = cartCount;
        cartCountEl.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCountEl.style.transform = 'scale(1)';
        }, 200);
     }

    // ============================================
    // QUICK VIEW MODAL
    // ============================================
    const modal = document.getElementById('quickViewModal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalPrice = document.getElementById('modalPrice');
    const modalProductName = document.getElementById('modalProductName');
    const modalAddToCart = document.getElementById('modalAddToCart');

    const productData = {
        'midnight Elegance Abaya': {
            name: 'Midnight Elegance Abaya',
            category: 'Evening Wear',
            price: 'Ksh 2,890',
            image: './firstpic.jpg'
        },
        'Dubai Tailored Abaya': {
            name: 'Dubai Tailored Abaya',
            category: 'Outerwear',
            price: 'Ksh 3,450',
            image: './secondpic.jpg'
        },
        'Jordan Silk Abaya': {
            name: 'Jordan Silk Abaya',
            category: 'Beauty',
            price: 'Ksh 1,980',
            image: './third.jpg'
        },
        'Best Design Abaya': {
            name: 'Best Design Abaya',
            category: 'Elegant',
            price: 'Ksh 2,250',
            image: './forthpic.jpg'
        }
    };

    const modalImage = document.getElementById('modalImage');

    document.querySelectorAll('.btn-quickview').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const productId = card.dataset.product;
            const data = productData[productId];

            if (data) {
                modalTitle.textContent = data.name;
                modalCategory.textContent = data.category;
                modalPrice.textContent = data.price;
                if (modalImage) {
                    modalImage.src = data.image;
                    modalImage.alt = data.name;
                }
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ============================================
    // ADD TO CART FROM MODAL
    // ============================================
    if (modalAddToCart) {
        modalAddToCart.addEventListener('click', function() {
            cartCount++;
            updateCartCount();
            showToast('Item added to cart');
            closeModal();
        });
    }

    // ============================================
    // WISHLIST TOGGLE
    // ============================================
    document.querySelectorAll('.btn-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const isActive = this.classList.contains('active');

            if (isActive) {
                this.style.background = 'rgba(212, 175, 55, 0.2)';
                this.style.borderColor = '#D4AF37';
                showToast('Added to wishlist');
            } else {
                this.style.background = '';
                this.style.borderColor = '';
                showToast('Removed from wishlist');
            }
        });
    });

    // ============================================
    // TOAST NOTIFICATION
    // ============================================
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    let toastTimeout;

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ============================================
    // NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                showToast('Thank you for subscribing!');
                this.reset();
            }
        });
    }

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Message sent successfully!');
            this.reset();
        });
    }

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .stat, .about-content, .contact-info, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // COLOR DOT SELECTION
    // ============================================
    document.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const siblings = this.parentElement.querySelectorAll('.color-dot');
            siblings.forEach(s => s.style.transform = '');
            siblings.forEach(s => s.style.boxShadow = '');

            this.style.transform = 'scale(1.3)';
            this.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.5)';
        });
    });

    // ============================================
    // PARALLAX EFFECT ON HERO
    // ============================================
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // ============================================
    // SEARCH BUTTON (placeholder functionality)
    // ============================================
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            showToast('Search feature coming soon');
        });
    }

    // ============================================
    // CURSOR GLOW EFFECT
    // ============================================
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursorGlow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Hide glow on touch devices
    if ('ontouchstart' in window) {
        cursorGlow.style.display = 'none';
    }

    console.log('Layali website initialized successfully');
});