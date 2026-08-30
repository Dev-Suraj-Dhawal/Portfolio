
const lazyBg = document.querySelectorAll(".lazy-bg");

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.backgroundImage = `url(${entry.target.dataset.bg})`;
            entry.target.classList.add("fade-in");
            obs.unobserve(entry.target);
        }
    });
});

lazyBg.forEach(bg => observer.observe(bg));



let DATA = null;

async function loadData() {
    try {
        const response = await fetch('./portfolio-data.json');
        if (!response.ok) throw new Error('Failed to load data');
        DATA = await response.json();
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback inline data
        DATA = {
            name: "Suraj Dhawal",
            titles: ["Aspiring Software Developer", "Frontend Web Developer", "AI Enthusiast", "Passionate Learner"],
            email: "surajdhawal115@gmail.com",
            skills: {
                languages: [{ name: 'C', level: 80 }, { name: 'C++', level: 75 }, { name: 'Java', level: 70 }, { name: 'HTML/CSS', level: 85 }, { name: 'JavaScript', level: 78 }],
                tools: [{ name: 'Git & GitHub', level: 75 }, { name: 'Linux', level: 75 }, { name: 'Tailwind CSS', level: 70 }, { name: 'GSAP', level: 60 }],
                other: [{ name: 'Cybersecurity', level: 65 }, { name: 'AI & ML', level: 60 }, { name: 'Networking', level: 70 }]
            },
            projects: [
                {
                    id: 1,
                    title: 'IELTS Class Website',
                    icon: 'fa-solid fa-book-open',
                    tags: ['Web', 'HTML'],
                    desc: 'A dedicated website for IELTS classes and resources.',
                    thumb: 'https://placehold.co/600x400/223344/e2e8f0?text=IELTS',
                    link: 'https://github.com/Dev-Suraj-Dhawal/IELTS_Class_Website',
                    website: 'https://dev-suraj-dhawal.github.io/IELTS_Class_Website/',
                    tech: ['HTML', 'CSS']
                },
                {
                    id: 2,
                    title: 'AI Mood Quote Generator',
                    icon: 'fa-solid fa-robot',
                    tags: ['Web', 'AI', 'JavaScript'],
                    desc: 'An interactive, AI-powered motivational quote generator.',
                    thumb: 'https://placehold.co/600x400/445566/e2e8f0?text=AI+Quote+Generator',
                    link: 'https://github.com/Dev-Suraj-Dhawal/AI-Mood-Quote-Generator',
                    website: 'https://ai-mood-quote-generator.vercel.app/',
                    tech: ['JavaScript', 'HTML', 'CSS', 'AI']
                },
                {
                    id: 3,
                    title: 'Audio Visualizer',
                    icon: 'fa-solid fa-music',
                    tags: ['Web', 'JavaScript'],
                    desc: 'A glowing, animated real-time audio visualizer.',
                    thumb: 'https://placehold.co/600x400/556677/e2e8f0?text=Audio+Visualizer',
                    link: 'https://github.com/Dev-Suraj-Dhawal/audio-visualizer',
                    website: 'https://audio-visualizer-ruby.vercel.app/',
                    tech: ['JavaScript', 'HTML', 'CSS']
                },
                {
                    id: 4,
                    title: 'EMI WEB APP',
                    icon: 'fa-solid fa-calculator',
                    tags: ['Web', 'Tool', 'JavaScript'],
                    desc: 'A simple and clean EMI calculator web app.',
                    thumb: 'https://placehold.co/600x400/667788/e2e8f0?text=EMI+Web+App',
                    link: 'https://github.com/Dev-Suraj-Dhawal/EMI_WEB_APP',
                    website: 'https://emi-web-app-pied.vercel.app/',
                    tech: ['JavaScript', 'HTML', 'CSS']
                }
            ],
            experience: [
                {
                    title: 'Intern',
                    company: 'Nepal Telecom',
                    from: 'Jan 2024',
                    to: 'Apr 2024',
                    location: 'Lumbini, Nepal',
                    bullets: [
                        'Customer Relationship Management (CRM)',
                        'Computer Networking',
                        'On-site internship tasks and teamwork'
                    ]
                },
                {
                    title: 'Java Programming Intern',
                    company: 'Z1 Technology & Trade Pvt. Ltd.',
                    from: 'Sep 2024',
                    to: 'Mar 2025',
                    location: 'Bhairahawa, Nepal',
                    bullets: [
                        'Worked on software development projects focusing on Java programming and related technologies',
                        'Gained hands-on experience in real-world application development under the supervision of the technical team',
                        'Collaborated with professionals to strengthen backend logic, debugging, and code optimization skills'
                    ]
                }
            ],

            education: [{ school: 'Rupandehi Lilaram Neupane Secondary School', degree: 'Diploma in Computer Engineering (DCOM)', from: 'Feb 2020', to: 'Jan 2024', grade: '73.48%' }, { school: 'Little Paradise English Medium School', degree: 'SEE', grade: 'A' }],
            certs: [{ title: 'Google Cloud Skills Boost', issuer: 'Google', date: 'Jun 2024' }, { title: 'NET Aspire Introduction', issuer: 'STYAVA.DEV', date: 'Aug 2024' }, { title: 'Generative AI', issuer: 'Various', date: '2024' }]
        };
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await loadData();
    // new circular skill cirular one updated on 28/10/2025.
    // --- CIRCULAR SKILL RENDER FUNCTION (Final Pro Version) ---
    // --- CIRCULAR SKILL RENDER FUNCTION (Always Active + Floating Version) ---
    const renderList = (arr, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
    <div class="flex flex-wrap justify-center gap-6">
      ${arr
                .map(
                    (it) => `
          <div class="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center 
                      transition-all duration-300 transform scale-110 group">

              <!-- Circular Progress -->
              <svg class="absolute inset-0" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" stroke-width="8" fill="none"></circle>
                  <circle cx="50" cy="50" r="45"
                      stroke="url(#grad-${(it.name || 'skill').replace(/\s+/g, '')})"
                      stroke-width="8" fill="none"
                      stroke-dasharray="283"
                      stroke-dashoffset="283"
                      stroke-linecap="round"
                      class="skill-ring"
                      data-level="${it.level}">
                  </circle>
                  <defs>
                      <linearGradient id="grad-${(it.name || 'skill').replace(/\s+/g, '')}" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stop-color="#8b5cf6" />
                          <stop offset="100%" stop-color="#c084fc" />
                      </linearGradient>
                  </defs>
              </svg>

              <!-- Center Logo & Text -->
              <div class="z-10 flex flex-col items-center text-center drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]">
                  <img src="${it.icon}" 
                      alt="${it.name}" 
                      loading="eager"
                      class="w-8 h-8 sm:w-10 sm:h-10 object-contain transform scale-110 animate-float">
                  <span class="text-xs sm:text-sm mt-1 text-violet-300">${it.name}</span>
              </div>
          </div>
      `
                )
                .join("")}
    </div>
  `;
    };

    const renderProjects = (tag = 'all') => {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        const filtered = (tag === 'all')
            ? DATA.projects
            : DATA.projects.filter(p => p.tags.some(t => t.toLowerCase() === tag)); // Case-insensitive check
        grid.innerHTML = filtered.map(p => `
        <div class="glass p-4 rounded-lg hover:scale-105 transition-transform duration-300 relative">
            
            <!-- ICON on top -->
            <div class="absolute -top-4 left-4 bg-slate-800 p-2 rounded-full shadow-lg">
                <i class="${p.icon} text-xl text-cyan-400"></i>
            </div>

            <!-- Thumbnail -->
            <!-- <img src="${p.thumb}" alt="${p.title}" class="w-full h-40 object-cover rounded-md"/> -->
            <img src="${p.thumb}" alt="${p.title}" class="project-thumb w-full rounded-md"/>


            <!-- Description -->
            <!-- <p class="text-sm text-slate-300 mt-3 h-10 text-wrap">${p.desc}</p> -->
            <p class="project-desc text-sm text-slate-300 mt-3 text-wrap">${p.desc}</p>


            <!-- Buttons -->
            <div class="mt-3 flex gap-2 flex-wrap">
                <button data-id="${p.id}" 
                    class="openProj px-3 py-1 rounded-md border border-white/10 text-sm hover:bg-white/5 transition-colors">
                    Details
                </button>

                ${p.link
                ? `<a href="${p.link}" target="_blank" 
                          class="px-3 py-1 rounded-md border border-white/10 text-sm hover:bg-white/5 transition-colors">
                          GitHub</a>`
                : ''}

                ${p.website
                ? `<a href="${p.website}" target="_blank" 
                          class="px-3 py-1 rounded-md border border-white/10 text-sm hover:bg-white/5 transition-colors">
                          Live Demo</a>`
                : ''}
            </div>
        </div>
    `).join('');
    };

    function resizeProjectThumbs() {
        const thumbs = document.querySelectorAll(".project-thumb");

        thumbs.forEach(img => {
            const cardWidth = img.parentElement.offsetWidth;

            // Dynamic height ratio (adjustable)
            const aspectRatio = 9 / 16; // landscape ratio

            const newHeight = cardWidth * aspectRatio;

            img.style.height = newHeight + "px";
            img.style.objectFit = "contain";  // no stretch
            img.style.backgroundColor = "#0f172a"; // optional: better look
        });
    }

    // Call it after rendering
    setTimeout(resizeProjectThumbs, 50);

    // Re-run on window resize
    window.addEventListener("resize", resizeProjectThumbs);

    const renderExperience = () => {
        const timelineEl = document.getElementById('timelineList');
        if (!timelineEl) return;
        timelineEl.innerHTML = DATA.experience.map(ex => `
                    <div class="relative pl-6">
                        <div class="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#a78bfa]"></div>
                        <div class="font-semibold text-wrap">${ex.title} — ${ex.company}</div>
                        <div class="text-sm text-slate-400 text-wrap">${ex.from} — ${ex.to} • ${ex.location}</div>
                        <ul class="mt-2 text-sm text-slate-300 list-disc list-inside">${ex.bullets.map(b => `<li class="text-wrap">${b}</li>`).join('')}</ul>
                    </div>
                `).join('');
    };

    const renderEducation = () => {
        const edEl = document.getElementById('educationList');
        if (!edEl) return;
        edEl.innerHTML = DATA.education.map(ed => `
                    <div class="mb-4">
                        <div class="font-semibold text-wrap">${ed.degree}</div>
                        <div class="text-sm text-slate-400 text-wrap">${ed.school}${ed.from ? ` • ${ed.from} — ${ed.to}` : ''}${ed.grade ? `<br/>Grade: ${ed.grade}` : ''}</div>
                    </div>
                `).join('');
    };


    // Education and Certification 
    // const renderCerts = () => {
    //     const certSlides = document.getElementById('certSlides');
    //     if (!certSlides) return;
    //     certSlides.innerHTML = DATA.certs.map(c => `
    //                 <div class="swiper-slide glass p-4 rounded-lg">
    //                     <div class="font-semibold text-wrap">${c.title}</div>
    //                     <div class="text-sm text-slate-400 text-wrap">${c.issuer} • ${c.date}</div>
    //                 </div>
    //             `).join('');
    //     try {
    //         new Swiper('.myCertsSwiper', {
    //             slidesPerView: 1,
    //             spaceBetween: 12,
    //             autoplay: {
    //                 delay: 5000,
    //                 disableOnInteraction: false
    //             },
    //             breakpoints: { 640: { slidesPerView: 2 } }
    //         });
    //     } catch (e) { console.warn('Swiper init failed', e); }
    // };

    // --- INITIALIZE APP CONTENT ---
    const initApp = () => {
        document.getElementById('emailText').textContent = DATA.email;

        // Title rotator
        let titleIndex = 0;
        const titleEl = document.getElementById('rotTitle');
        setInterval(() => {
            titleIndex = (titleIndex + 1) % DATA.titles.length;
            if (titleEl) titleEl.textContent = DATA.titles[titleIndex];
        }, 3000);

        // Skills
        renderList(DATA.skills.languages, 'langList');
        renderList(DATA.skills.tools, 'toolsList');
        renderList(DATA.skills.other, 'otherList');

        // Projects
        const filtersEl = document.getElementById('projectFilters');
        const allTags = ['All', ...new Set(DATA.projects.flatMap(p => p.tags))];
        if (filtersEl) {
            filtersEl.innerHTML = allTags.map(tag => `<button data-tag="${tag.toLowerCase()}" class="px-3 py-1 rounded-md glass text-sm">${tag}</button>`).join('');
        }
        renderProjects('all');

        // Experience Timeline
        renderExperience();

        // Education
        renderEducation();

        // Certs Swiper
        renderCerts();
    };

    // --- INITIALIZE ANIMATIONS ---
    const initAnimations = () => {
        // Hero Canvas Particles
        const canvas = document.getElementById('heroCanvas');
        const ctx = canvas ? canvas.getContext('2d') : null;
        if (!ctx) return;

        let mouse = { x: null, y: null, radius: 100 };
        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        let particles = [];
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.getElementById('hero').offsetHeight;
            particles = [];
            for (let i = 0; i < 60; i++) {
                particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, r: Math.random() * 2 + 0.8 });
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                let dxMouse = mouse.x - p.x;
                let dyMouse = mouse.y - p.y;
                let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                if (distanceMouse < mouse.radius) {
                    p.x -= dxMouse / 20;
                    p.y -= dyMouse / 20;
                }

                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.fillStyle = 'rgba(120,90,255,0.9)';
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
                    if (d < 110) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(6,182,212,${0.12 - d / 900})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawParticles);
        };
        drawParticles();

        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Animate circular skill rings dynamically
            const animateSkills = () => {
                document.querySelectorAll('.skill-ring').forEach(ring => {
                    const level = ring.dataset.level;
                    const circumference = 283;
                    const offset = circumference - (circumference * level) / 100;

                    gsap.fromTo(
                        ring,
                        { strokeDashoffset: circumference },
                        {
                            strokeDashoffset: offset,
                            duration: 1.5,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: ring,
                                start: 'top 85%',
                                toggleActions: 'play none none reverse', // ensures scroll triggers animation
                                // markers: true // optional: to debug
                            }
                        }
                    );
                });

                // Refresh ScrollTrigger to detect new elements
                ScrollTrigger.refresh();
            };

            // Call this after your renderList has completed
            animateSkills();

            // Smooth fade-in for sections
            gsap.from('main section', {
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 0.9,
                scrollTrigger: { trigger: 'main', start: 'top 80%' }
            });
        }
    };

    //  Footer Styles 

    // Particle/Nebula JS 

    const canvas = document.getElementById('footerCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function initCanvas() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
        particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.3,
                dy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random() * 0.5 + 0.2,
                color: `hsla(${Math.random() * 360}, 70%, 60%, 0.6)`
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > w) p.dx *= -1;
            if (p.y < 0 || p.y > h) p.dy *= -1;
        }
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', initCanvas);
    initCanvas();
    draw();


    // ... (All code above initEventListeners remains the same) ...



    // --- EVENT LISTENERS ---

    const initEventListeners = () => {

        // Single-page navigation: Show only clicked section, hide others

        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {

            link.addEventListener('click', (e) => {



                // ⭐ FIX APPLIED HERE: Do not prevent default for the project modal link.

                if (link.id === 'modalLink' && link.getAttribute('href') !== '#') {

                    return; // Let the browser handle the navigation to the GitHub/Website URL

                }



                e.preventDefault();

                const targetId = link.getAttribute('href').substring(1);

                const targetSection = document.getElementById(targetId);

                if (targetSection) {

                    // Hide all sections

                    document.querySelectorAll('main section').forEach(section => {

                        section.classList.remove('active');

                    });

                    // Show target section

                    targetSection.classList.add('active');

                    // Smooth scroll to section

                    targetSection.scrollIntoView({ behavior: 'smooth' });

                }

            });

        });



        // Mobile Menu

        const mobileMenu = document.getElementById('mobileMenu');

        document.getElementById('mobileMenuBtn').addEventListener('click', () => mobileMenu.classList.remove('hidden'));

        document.getElementById('closeMobileMenuBtn').addEventListener('click', () => mobileMenu.classList.add('hidden'));



        // Project Filtering

        document.getElementById('projectFilters').addEventListener('click', e => {

            if (e.target.matches('button')) renderProjects(e.target.dataset.tag);

        });



        // Project Modal

        const modal = document.getElementById('projModal');

        document.getElementById('projectsGrid').addEventListener('click', e => {

            const btn = e.target.closest('.openProj');

            if (btn) {

                const p = DATA.projects.find(x => String(x.id) === btn.dataset.id);

                if (p) {

                    document.getElementById('modalTitle').textContent = p.title;

                    document.getElementById('modalDesc').textContent = p.desc;

                    document.getElementById('modalTech').innerHTML = (p.tech || []).map(t => `<span class="px-2 py-1 rounded-md border border-white/10 text-sm">${t}</span>`).join('');

                    // Inside your if (p) block

                    // ... other code ...



                    const linkElement = document.getElementById('modalLink');

                    const url = p.website ? p.website : (p.link || '#'); // Priority: Website, then Link/GitHub



                    linkElement.href = url;



                    // Set the target attribute to ensure it opens in a new tab

                    linkElement.setAttribute('target', '_blank');

                    modal.classList.remove('hidden');

                    modal.style.display = 'flex';

                }

            }

        });

        const closeModal = () => {

            modal.classList.add('hidden');

            modal.style.display = 'none';

        };

        document.getElementById('closeModal').addEventListener('click', closeModal);

        modal.addEventListener('click', e => {

            if (e.target === modal) closeModal();

        });

        document.addEventListener('keydown', e => {

            if (e.key === 'Escape') closeModal();

        });



        // Contact Form & Copy Email

        document.getElementById('copyEmail').addEventListener('click', e => {

            navigator.clipboard.writeText(DATA.email).then(() => {

                e.target.textContent = 'Copied!';

                setTimeout(() => {

                    e.target.textContent = 'Copy Email';

                }, 2000);

            });

        });



        // FIXED: Contact Form submission to your local server

        // document.getElementById('contactForm').addEventListener('submit', async e => {

        //Contact Form - Works in development and production added a form validation 

        const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            const inputs = {
                name: document.getElementById('inputName'),
                email: document.getElementById('inputEmail'),
                message: document.getElementById('inputMessage')
            };
            const errors = {
                name: document.getElementById('errName'),
                email: document.getElementById('errEmail'),
                message: document.getElementById('errMessage')
            };

            const msgEl = document.getElementById('formMsg');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.textContent : 'Send';

            // --- HELPER FUNCTIONS FOR DYNAMIC UI ---
            const showError = (field, msg) => {
                errors[field].textContent = msg;
                errors[field].classList.remove('hidden');
                // Changes border and focus ring to red
                inputs[field].classList.remove('border-white/10', 'focus:ring-cyan-400');
                inputs[field].classList.add('border-red-400', 'focus:ring-red-400');
            };

            const clearError = (field) => {
                errors[field].textContent = '';
                errors[field].classList.add('hidden');
                // Reverts back to standard styling
                inputs[field].classList.remove('border-red-400', 'focus:ring-red-400');
                inputs[field].classList.add('border-white/10', 'focus:ring-cyan-400');
            };

            // --- REAL-TIME VALIDATORS ---
            const validateName = () => {
                const val = inputs.name.value;
                // Check for numbers dynamically while typing
                if (/\d/.test(val)) {
                    showError('name', 'Numbers not allowed. E.g., Suraj Dhawal');
                    return false;
                } else if (val.length > 0 && !/^[a-zA-Z\s-]+$/.test(val)) {
                    showError('name', 'Special characters not allowed. E.g., Suraj Dhawal');
                    return false;
                }
                clearError('name');
                return true;
            };

            const validateEmail = () => {
                const val = inputs.email.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                // Only show invalid format error if they have typed something
                if (val.length > 0 && !emailRegex.test(val)) {
                    showError('email', 'Please enter a valid format. E.g., hello@example.com');
                    return false;
                }
                clearError('email');
                return true;
            };

            const validateMessage = () => {
                const val = inputs.message.value.trim();
                if (val.length > 0 && val.length < 10) {
                    showError('message', `Too short! Keep typing... (${val.length}/10 chars)`);
                    return false;
                }
                clearError('message');
                return true;
            };

            // --- ATTACH "MOUSE ACTIVE" / TYPING EVENTS ---
            // 'input' fires every time a keystroke happens
            inputs.name.addEventListener('input', validateName);
            inputs.email.addEventListener('input', validateEmail);
            inputs.message.addEventListener('input', validateMessage);

            // 'blur' fires when the user clicks away from the input
            inputs.name.addEventListener('blur', () => {
                if (!inputs.name.value.trim()) showError('name', 'Name is required.');
            });
            inputs.email.addEventListener('blur', () => {
                if (!inputs.email.value.trim()) showError('email', 'Email is required.');
            });
            inputs.message.addEventListener('blur', () => {
                if (!inputs.message.value.trim()) showError('message', 'Message is required.');
            });

            // --- FINAL SUBMIT CHECK ---
            contactForm.addEventListener('submit', async e => {
                e.preventDefault();

                // Run all checks one last time
                const isNameValid = validateName() && inputs.name.value.trim() !== '';
                const isEmailValid = validateEmail() && inputs.email.value.trim() !== '';
                const isMessageValid = validateMessage() && inputs.message.value.trim() !== '';

                // Catch empty fields on submit
                if (!isNameValid) showError('name', 'Please provide a valid name. E.g., Suraj Dhawal');
                if (!isEmailValid) showError('email', 'Please provide a valid email. E.g., hello@example.com');
                if (!isMessageValid) showError('message', 'Message must be at least 10 characters.');

                if (!isNameValid || !isEmailValid || !isMessageValid) {
                    msgEl.textContent = 'Please fill all the required field.';
                    msgEl.className = 'text-sm text-red-400 mt-2';
                    return;
                }

                // --- PREPARE FOR SUBMISSION ---
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';
                }
                msgEl.textContent = 'Sending...';
                msgEl.className = 'text-sm text-slate-300 mt-2';

                try {
                    const sanitizedPayload = {
                        name: inputs.name.value.trim(),
                        email: inputs.email.value.trim(),
                        message: inputs.message.value.trim()
                    };

                    const response = await fetch('/save', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify(sanitizedPayload),
                    });

                    const result = await response.json();

                    if (response.ok) {
                        msgEl.textContent = `✅ Thanks, ${sanitizedPayload.name}! ${result.message || 'Your message has been sent.'}`;
                        msgEl.className = 'text-sm text-green-400 mt-2';
                        contactForm.reset();
                    } else {
                        throw new Error(result.message || 'Server error');
                    }
                } catch (error) {
                    console.error('Form error:', error);
                    msgEl.textContent = '❌ Failed to send. Please try again or email directly.';
                    msgEl.className = 'text-sm text-red-400 mt-2';
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                    }
                    setTimeout(() => {
                        msgEl.textContent = '';
                        msgEl.className = 'text-sm min-h-[20px]';
                    }, 6000);
                }
            });
        }
    };

    // --- RUN EVERYTHING ---

    initApp();

    initAnimations();

    initEventListeners();

});