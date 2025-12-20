// Page Transitions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    initPage();
});

// Initialize page
function initPage() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Typing Effect for Terminal (Home page only)
    const typingText = document.getElementById('typingText');
    if (typingText) {
        const typingCursor = document.getElementById('typingCursor');
        const terminalLines = [
            "> welcome.toPortfolio()",
            "> Initializing systems...",
            "> Loading skills: Java, SQL, Web Tech",
            "> Projects: Restaurant Management, Driftora Quest",
            "> Experience: Front-End Development Intern",
            "> Ready to code!"
        ];
        
        let lineIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeText() {
            if (lineIndex < terminalLines.length) {
                const currentLine = terminalLines[lineIndex];
                
                if (!isDeleting && charIndex <= currentLine.length) {
                    typingText.textContent += currentLine.charAt(charIndex);
                    charIndex++;
                    
                    if (charIndex > currentLine.length) {
                        isDeleting = true;
                        setTimeout(typeText, 1500);
                        return;
                    }
                } else if (isDeleting && charIndex >= 0) {
                    typingText.textContent = currentLine.substring(0, charIndex);
                    charIndex--;
                    
                    if (charIndex < 0) {
                        isDeleting = false;
                        lineIndex++;
                        if (lineIndex === terminalLines.length) {
                            lineIndex = 0;
                        }
                    }
                }
                
                const typingSpeed = isDeleting ? 50 : 100;
                setTimeout(typeText, typingSpeed);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeText, 1000);
    }

    // Animate elements on scroll
    animateOnScroll();

    // Form Submission (for contact page)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formStatus = document.getElementById('formStatus');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const subject = document.getElementById('subject')?.value;
            const message = document.getElementById('message')?.value;
            
            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all fields.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            showFormStatus('Sending message...', '');
            
            setTimeout(() => {
                showFormStatus('Thank you for your message! I will get back to you soon.', 'success');
                contactForm.reset();
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                    }
                }
            }
        });
    });

    // Page transition for internal links
    document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.getAttribute('href').startsWith('#') && 
                !this.getAttribute('href').includes('mailto:') && 
                !this.getAttribute('href').includes('tel:') && 
                !this.getAttribute('target')) {
                
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Create page transition
                const transition = document.createElement('div');
                transition.className = 'page-transition active';
                document.body.appendChild(transition);
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });

    // Initialize animations
    setTimeout(() => {
        animateElements();
    }, 300);
}

// Animate elements on scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements with animation classes
    document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item, .form-group, .social-link-rect, .resume-viewer, .resume-details, .detail-section').forEach(el => {
        observer.observe(el);
    });

    // Animate skill bars
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillProgressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// Animate elements on load
function animateElements() {
    // Add animation delays to social links
    const socialLinks = document.querySelectorAll('.social-link-rect');
    socialLinks.forEach((link, index) => {
        link.style.setProperty('--delay', `${index * 0.1}s`);
    });

    // Add animation delays to detail sections
    const detailSections = document.querySelectorAll('.detail-section');
    detailSections.forEach((section, index) => {
        section.style.setProperty('--index', index);
    });
}

// Show form status message
function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = 'form-status';
        if (type) {
            formStatus.classList.add(type);
        }
        formStatus.classList.add('animate');
        formStatus.style.display = 'block';
    }
}