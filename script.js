// ===== Preloader =====
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 800); // Reduced from 1500ms to 800ms
});

// Fallback: Hide preloader after 3 seconds no matter what
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.display !== 'none') {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}, 3000);

// ===== Particle Canvas Animation =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(${255}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 55}, ${Math.random() * 0.3 + 0.1})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(255, 215, 0, ${0.1 - distance / 1000})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();

// ===== Smooth Scroll Animation =====
document.addEventListener('DOMContentLoaded', function () {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.message-section, .quote-section, .divine-image-section, .timeline-section, .counter-section, .blessing-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // ===== Counter Animation =====
    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                };

                updateCounter();
            }
        });
    }, { threshold: 0.5 });

    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ===== Blessing Items Interactive Effect =====
    const blessingItems = document.querySelectorAll('.blessing-item');

    blessingItems.forEach(item => {
        item.addEventListener('click', function () {
            // Create sparkle effect
            createSparkles(this);

            // Add a pulse animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'blessingPulse 0.6s ease';
            }, 10);
        });
    });

    // ===== Create Sparkle Effect =====
    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #ffd700, #ff6b35);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX}px;
                top: ${centerY}px;
            `;

            document.body.appendChild(sparkle);

            const angle = (Math.PI * 2 * i) / 12;
            const velocity = 100 + Math.random() * 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            sparkle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${tx}px, ${ty}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => sparkle.remove();
        }
    }

    // ===== Parallax Effect for Background Elements =====
    let ticking = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                const scrolled = window.pageYOffset;
                const floatingElements = document.querySelectorAll('.floating-om, .floating-trishul, .floating-flower');

                floatingElements.forEach((element, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    // ===== Add Cursor Trail Effect =====
    const cursorTrail = [];
    const trailLength = 10;

    document.addEventListener('mousemove', function (e) {
        if (window.innerWidth > 768) { // Only on desktop
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.8), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                transform: translate(-50%, -50%);
            `;

            document.body.appendChild(trail);
            cursorTrail.push(trail);

            if (cursorTrail.length > trailLength) {
                const oldTrail = cursorTrail.shift();
                oldTrail.remove();
            }

            trail.animate([
                { opacity: 0.8, transform: 'translate(-50%, -50%) scale(1)' },
                { opacity: 0, transform: 'translate(-50%, -50%) scale(0)' }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => {
                const index = cursorTrail.indexOf(trail);
                if (index > -1) {
                    cursorTrail.splice(index, 1);
                }
                trail.remove();
            };
        }
    });

    // ===== Typing Effect for Messages (Optional Enhancement) =====
    const messages = document.querySelectorAll('.hindi-text');
    messages.forEach((msg, index) => {
        msg.style.opacity = '0';
        setTimeout(() => {
            msg.style.transition = 'opacity 1s ease';
            msg.style.opacity = '1';
        }, 500 + (index * 300));
    });

    // ===== Add Glow Effect on Hover for Cards =====
    const cards = document.querySelectorAll('.message-card, .quote-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
                glow.style.opacity = '0.15';
            }
        });

        card.addEventListener('mouseleave', function () {
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0.05';
                glow.style.left = '50%';
                glow.style.top = '-50%';
            }
        });
    });

    // ===== Auto-Play Music =====
    const audio = new Audio('mp 3.mp3');
    audio.loop = true;
    audio.volume = 0.5; // 50% volume

    // Start music 1 second after page loads
    setTimeout(() => {
        audio.play().catch(error => {
            console.log('Auto-play prevented by browser. User interaction required.');
            // If auto-play is blocked, try again on first user interaction
            document.addEventListener('click', function playOnClick() {
                audio.play();
                document.removeEventListener('click', playOnClick);
            }, { once: true });
        });
    }, 1000);

    // ===== Timeline Animation =====
    const timelineObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
});

// ===== Add CSS Animation for Blessing Pulse =====
const style = document.createElement('style');
style.textContent = `
    @keyframes blessingPulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ===== Console Message =====
console.log('%c❤️ Shivratri Special ❤️', 'color: #ffd700; font-size: 20px; font-weight: bold;');
console.log('%cHar Har Mahadev 🙏', 'color: #ff6b35; font-size: 16px;');
