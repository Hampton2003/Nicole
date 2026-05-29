// ===== FLOATING HEARTS =====
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-float');
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    setInterval(createHeart, 800);
}

// ===== NAVBAR SCROLL =====
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== ACTIVE NAV LINK =====
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 200) {
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
}

// ===== MOBILE MENU =====
function handleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.about-card, .gallery-item, .reason-card, .section-header');

    reveals.forEach(el => {
        el.classList.add('reveal');
    });

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;

            if (revealTop < triggerBottom) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal();
}

// ===== ENVELOPE INTERACTION =====
function initEnvelope() {
    const envelope = document.getElementById('envelope');
    const letterPaper = document.getElementById('letterPaper');

    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!envelope.contains(e.target) && envelope.classList.contains('open')) {
            envelope.classList.remove('open');
        }
    });
}

// ===== MUSIC TOGGLE =====
function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    // Create audio element (placeholder - user can add their own romantic song)
    const audio = new Audio();
    audio.loop = true;

    musicToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        musicToggle.classList.toggle('playing', isPlaying);

        if (isPlaying) {
            // Note: Add your own romantic song URL here
            // audio.src = 'path-to-your-song.mp3';
            // audio.play().catch(e => console.log('Audio play failed:', e));
            musicToggle.querySelector('i').classList.remove('fa-music');
            musicToggle.querySelector('i').classList.add('fa-pause');
        } else {
            audio.pause();
            musicToggle.querySelector('i').classList.remove('fa-pause');
            musicToggle.querySelector('i').classList.add('fa-music');
        }
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    const heroImage = document.querySelector('.hero-image');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ===== TYPING EFFECT FOR HERO =====
function initTypingEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    const words = title.querySelectorAll('.title-word');
    words.forEach((word, index) => {
        word.style.opacity = '0';
        word.style.transform = 'translateY(30px)';

        setTimeout(() => {
            word.style.transition = 'all 0.8s ease';
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, (index + 1) * 300);
    });
}

// ===== GALLERY LIGHTBOX =====
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item:not(.quote-card)');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close"><i class="fas fa-times"></i></button>
                </div>
            `;

            // Add lightbox styles
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s;
            `;

            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90vh;
                border-radius: 10px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            `;

            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s;
            `;

            document.body.appendChild(lightbox);

            // Trigger animation
            requestAnimationFrame(() => {
                lightbox.style.opacity = '1';
            });

            // Close handlers
            const closeLightbox = () => {
                lightbox.style.opacity = '0';
                setTimeout(() => lightbox.remove(), 300);
            };

            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeLightbox();
            });
        });
    });
}

// ===== REASON CARDS INTERACTION =====
function initReasonCards() {
    const cards = document.querySelectorAll('.reason-card');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// ===== MOUSE MOVE EFFECT =====
function initMouseMoveEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;

        const heroImage = document.querySelector('.image-frame');
        if (heroImage) {
            heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    handleNavbarScroll();
    setActiveNavLink();
    handleMobileMenu();
    initScrollReveal();
    initEnvelope();
    initMusicToggle();
    initSmoothScroll();
    initParallax();
    initTypingEffect();
    initGalleryLightbox();
    initReasonCards();
    initMouseMoveEffect();
});

// Add lightbox styles to head
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox-close:hover {
        background: rgba(255,255,255,0.1);
    }
`;
document.head.appendChild(lightboxStyles);
