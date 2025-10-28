// document.addEventListener('DOMContentLoaded', function() {
//     const DATA = {
//         name: "Suraj Dhawal",
//         titles: ["Aspiring Software Developer", "Frontend Web Developer", "AI Enthusiast", "Passionate Learner"],
//         email: "surajdhawal115@gmail.com",
//         skills: {
//             languages: [{ name: 'C', level: 80 }, { name: 'C++', level: 75 }, { name: 'Java', level: 70 }, { name: 'HTML/CSS', level: 85 }, { name: 'JavaScript', level: 78 }],
//             tools: [{ name: 'Git & GitHub', level: 75 }, { name: 'Linux', level: 75 }, { name: 'Tailwind CSS', level: 70 }, { name: 'GSAP', level: 60 }],
//             other: [{ name: 'Cybersecurity', level: 65 }, { name: 'AI & ML', level: 60 }, { name: 'Networking', level: 70 }]
//         },
//         projects: [
//             // Your original projects
//             { id: 1, title: 'Image Background Remover', tags: ['Web', 'AI'], desc: 'A front-end tool to remove image backgrounds with drag & drop, live preview, and download options.', thumb: 'https://placehold.co/600x400/071026/06b6d4?text=BG+Remover', link: '#', tech: ['HTML', 'JS', 'Canvas'] },
//             { id: 2, title: 'Loan EMI Calculator', tags: ['Web', 'Tool'], desc: 'Responsive EMI calculator with visualization and mobile-first UI.', thumb: 'https://placehold.co/600x400/071026/a78bfa?text=EMI+Calc', link: '#', tech: ['HTML', 'JS', 'Chart.js'] },
//             { id: 3, title: 'Phone Storage Controller', tags: ['Tool', 'Systems'], desc: 'Prototype web app to access phone storage from PC with file operations.', thumb: 'https://placehold.co/600x400/071026/FFFFFF?text=Phone+Sync', link: '#', tech: ['Node.js', 'Express'] },
//             // Projects from your GitHub screenshot
//             { id: 4, title: 'IELTS Class Website', tags: ['Web', 'HTML'], desc: 'A dedicated website for IELTS classes and resources.', thumb: 'https://placehold.co/600x400/223344/e2e8f0?text=IELTS', link: 'https://github.com/Dev-Suraj-Dhawal/IELTS_Class_Website', tech: ['HTML', 'CSS'] },
//             { id: 5, title: 'Coder-Hub', tags: ['Web', 'HTML'], desc: 'A personal coding hub website currently in development.', thumb: 'https://placehold.co/600x400/334455/e2e8f0?text=Coder-Hub', link: 'https://github.com/Dev-Suraj-Dhawal/Coder-Hub', tech: ['HTML', 'CSS'] },
//             { id: 6, title: 'AI Mood Quote Generator', tags: ['Web', 'AI', 'JavaScript'], desc: 'An interactive, AI-powered motivational quote generator that provides personalized quotes based on your mood.', thumb: 'https://placehold.co/600x400/445566/e2e8f0?text=AI+Quote+Generator', link: 'https://github.com/Dev-Suraj-Dhawal/AI-Mood-Quote-Generator', tech: ['JavaScript', 'HTML', 'CSS', 'AI'] },
//             { id: 7, title: 'Audio Visualizer', tags: ['Web', 'JavaScript'], desc: 'A glowing, animated real-time audio visualizer that reacts to the rhythm with stunning visuals.', thumb: 'https://placehold.co/600x400/556677/e2e8f0?text=Audio+Visualizer', link: 'https://github.com/Dev-Suraj-Dhawal/audio-visualizer', tech: ['JavaScript', 'HTML', 'CSS'] },
//             { id: 8, title: 'EMI WEB APP', tags: ['Web', 'Tool', 'JavaScript'], desc: 'A simple and clean web application for calculating EMI.', thumb: 'https://placehold.co/600x400/667788/e2e8f0?text=EMI+Web+App', link: 'https://github.com/Dev-Suraj-Dhawal/EMI_WEB_APP', tech: ['JavaScript', 'HTML', 'CSS'] },
//         ],
//         experience: [{ title: 'Intern', company: 'Nepal Telecom', from: 'Jan 2024', to: 'Apr 2024', location: 'Lumbini, Nepal', bullets: ['Customer Relationship Management (CRM)', 'Computer Networking', 'On-site internship tasks and teamwork'] }],
//         education: [{ school: 'Rupandehi Lilaram Neupane Secondary School', degree: 'Diploma in Computer Engineering (DCOM)', from: 'Feb 2020', to: 'Jan 2024', grade: '73.48%' }, { school: 'Little Paradise English Medium School', degree: 'SEE', grade: 'A' }],
//         certs: [{ title: 'Google Cloud Skills Boost', issuer: 'Google', date: 'Jun 2024' }, { title: 'NET Aspire Introduction', issuer: 'STYAVA.DEV', date: 'Aug 2024' }, { title: 'Generative AI', issuer: 'Various', date: '2024' }]
//     };

//     // --- RENDER FUNCTIONS ---
//     const renderList = (arr, containerId) => {
//         const container = document.getElementById(containerId);
//         if (!container) return;
//         container.innerHTML = arr.map(it => `
//             <div>
//                 <div class="flex justify-between text-sm">
//                     <div>${it.name}</div>
//                     <div>${it.level}%</div>
//                 </div>
//                 <div class="skill-bar mt-2">
//                     <div class="skill-fill h-full rounded-full" data-level="${it.level}" style="width:0%;background:linear-gradient(90deg,var(--accent),var(--accent2));"></div>
//                 </div>
//             </div>
//         `).join('');
//     };

//     const renderProjects = (tag = 'all') => {
//         const grid = document.getElementById('projectsGrid');
//         if (!grid) return;
//         const filtered = (tag === 'all') ? DATA.projects : DATA.projects.filter(p => p.tags.includes(tag));
//         grid.innerHTML = filtered.map(p => `
//             <div class="glass p-4 rounded-lg hover:scale-105 transition-transform duration-300">
//                 <img src="${p.thumb}" alt="${p.title}" class="w-full h-40 object-cover rounded-md"/>
//                 <h4 class="mt-3 font-semibold">${p.title}</h4>
//                 <p class="text-sm text-slate-300 mt-2 h-10">${p.desc}</p>
//                 <div class="mt-3 flex gap-2">
//                     <button data-id="${p.id}" class="openProj px-3 py-1 rounded-md border border-white/10 text-sm hover:bg-white/5 transition-colors">Details</button>
//                     ${p.link ? `<a href="${p.link}" target="_blank" class="px-3 py-1 rounded-md border border-white/10 text-sm hover:bg-white/5 transition-colors">GitHub</a>` : ''}
//                 </div>
//             </div>
//         `).join('');
//     };

//     const renderExperience = () => {
//         const timelineEl = document.getElementById('timelineList');
//         if (!timelineEl) return;
//         timelineEl.innerHTML = DATA.experience.map(ex => `
//             <div class="relative pl-6">
//                 <div class="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#a78bfa]"></div>
//                 <div class="font-semibold">${ex.title} — ${ex.company}</div>
//                 <div class="text-sm text-slate-400">${ex.from} — ${ex.to} • ${ex.location}</div>
//                 <ul class="mt-2 text-sm text-slate-300 list-disc list-inside">${ex.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
//             </div>
//         `).join('');
//     };

//     const renderEducation = () => {
//         const edEl = document.getElementById('educationList');
//         if (!edEl) return;
//         edEl.innerHTML = DATA.education.map(ed => `
//             <div class="mb-4">
//                 <div class="font-semibold">${ed.degree}</div>
//                 <div class="text-sm text-slate-400">${ed.school}${ed.from ? ` • ${ed.from} — ${ed.to}` : ''}${ed.grade ? `<br/>Grade: ${ed.grade}` : ''}</div>
//             </div>
//         `).join('');
//     };

//     const renderCerts = () => {
//         const certSlides = document.getElementById('certSlides');
//         if (!certSlides) return;
//         certSlides.innerHTML = DATA.certs.map(c => `
//             <div class="swiper-slide glass p-4 rounded-lg">
//                 <div class="font-semibold">${c.title}</div>
//                 <div class="text-sm text-slate-400">${c.issuer} • ${c.date}</div>
//             </div>
//         `).join('');
//         try {
//             new Swiper('.myCertsSwiper', { slidesPerView: 1, spaceBetween: 12, breakpoints: { 640: { slidesPerView: 2 } } });
//         } catch (e) { console.warn('Swiper init failed', e); }
//     };

//     // --- INITIALIZE APP CONTENT ---
//     const initApp = () => {
//         document.getElementById('emailText').textContent = DATA.email;

//         // Title rotator
//         let titleIndex = 0;
//         const titleEl = document.getElementById('rotTitle');
//         setInterval(() => {
//             titleIndex = (titleIndex + 1) % DATA.titles.length;
//             if (titleEl) titleEl.textContent = DATA.titles[titleIndex];
//         }, 3000);

//         // Skills
//         renderList(DATA.skills.languages, 'langList');
//         renderList(DATA.skills.tools, 'toolsList');
//         renderList(DATA.skills.other, 'otherList');

//         // Projects
//         const filtersEl = document.getElementById('projectFilters');
//         const allTags = ['All', ...new Set(DATA.projects.flatMap(p => p.tags))];
//         if (filtersEl) {
//             filtersEl.innerHTML = allTags.map(tag => `<button data-tag="${tag.toLowerCase()}" class="px-3 py-1 rounded-md glass text-sm">${tag}</button>`).join('');
//         }
//         renderProjects('all');

//         // Experience Timeline
//         renderExperience();

//         // Education
//         renderEducation();

//         // Certs Swiper
//         renderCerts();
//     };

//     // --- INITIALIZE ANIMATIONS ---
//     const initAnimations = () => {
//         // Hero Canvas Particles
//         const canvas = document.getElementById('heroCanvas');
//         const ctx = canvas ? canvas.getContext('2d') : null;
//         if (!ctx) return;

//         let mouse = { x: null, y: null, radius: 100 };
//         window.addEventListener('mousemove', e => {
//             mouse.x = e.clientX;
//             mouse.y = e.clientY;
//         });
//         window.addEventListener('mouseout', () => {
//             mouse.x = null;
//             mouse.y = null;
//         });

//         let particles = [];
//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = document.getElementById('hero').offsetHeight;
//             particles = [];
//             for (let i = 0; i < 60; i++) {
//                 particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, r: Math.random() * 2 + 0.8 });
//             }
//         };
//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas);

//         const drawParticles = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             particles.forEach(p => {
//                 let dxMouse = mouse.x - p.x;
//                 let dyMouse = mouse.y - p.y;
//                 let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
//                 if (distanceMouse < mouse.radius) {
//                     p.x -= dxMouse / 20;
//                     p.y -= dyMouse / 20;
//                 }

//                 p.x += p.vx;
//                 p.y += p.vy;
//                 if (p.x < 0) p.x = canvas.width;
//                 if (p.x > canvas.width) p.x = 0;
//                 if (p.y < 0) p.y = canvas.height;
//                 if (p.y > canvas.height) p.y = 0;

//                 ctx.beginPath();
//                 ctx.fillStyle = 'rgba(120,90,255,0.9)';
//                 ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//                 ctx.fill();
//             });

//             for (let i = 0; i < particles.length; i++) {
//                 for (let j = i + 1; j < particles.length; j++) {
//                     const a = particles[i], b = particles[j];
//                     const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
//                     if (d < 110) {
//                         ctx.beginPath();
//                         ctx.strokeStyle = `rgba(6,182,212,${0.12 - d / 900})`;
//                         ctx.lineWidth = 1;
//                         ctx.moveTo(a.x, a.y);
//                         ctx.lineTo(b.x, b.y);
//                         ctx.stroke();
//                     }
//                 }
//             }
//             requestAnimationFrame(drawParticles);
//         };
//         drawParticles();

//         // GSAP Animations
//         gsap.registerPlugin(ScrollTrigger);
//         document.querySelectorAll('.skill-bar').forEach(bar => {
//             ScrollTrigger.create({
//                 trigger: bar,
//                 start: 'top 85%',
//                 onEnter: () => {
//                     const fill = bar.querySelector('.skill-fill');
//                     if (fill) {
//                         gsap.to(fill, { width: `${fill.dataset.level}%`, duration: 1.4, ease: 'power2.out' });
//                     }
//                 }
//             });
//         });
//         gsap.from('main section', { opacity: 0, y: 30, stagger: 0.15, duration: 0.9, scrollTrigger: { trigger: 'main', start: 'top 80%' } });
//     };

//     // --- EVENT LISTENERS ---
//     const initEventListeners = () => {
//         // Mobile Menu
//         const mobileMenu = document.getElementById('mobileMenu');
//         document.getElementById('mobileMenuBtn').addEventListener('click', () => mobileMenu.classList.remove('hidden'));
//         document.getElementById('closeMobileMenuBtn').addEventListener('click', () => mobileMenu.classList.add('hidden'));
//         document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));

//         // Project Filtering
//         document.getElementById('projectFilters').addEventListener('click', e => {
//             if (e.target.matches('button')) renderProjects(e.target.dataset.tag);
//         });

//         // Project Modal
//         const modal = document.getElementById('projModal');
//         document.getElementById('projectsGrid').addEventListener('click', e => {
//             const btn = e.target.closest('.openProj');
//             if (btn) {
//                 const p = DATA.projects.find(x => String(x.id) === btn.dataset.id);
//                 if (p) {
//                     document.getElementById('modalTitle').textContent = p.title;
//                     document.getElementById('modalDesc').textContent = p.desc;
//                     document.getElementById('modalTech').innerHTML = (p.tech || []).map(t => `<span class="px-2 py-1 rounded-md border border-white/10 text-sm">${t}</span>`).join('');
//                     document.getElementById('modalLink').href = p.link || '#';
//                     modal.classList.remove('hidden');
//                     modal.style.display = 'flex';
//                 }
//             }
//         });
//         const closeModal = () => {
//             modal.classList.add('hidden');
//             modal.style.display = 'none';
//         };
//         document.getElementById('closeModal').addEventListener('click', closeModal);
//         modal.addEventListener('click', e => {
//             if (e.target === modal) closeModal();
//         });
//         document.addEventListener('keydown', e => {
//             if (e.key === 'Escape') closeModal();
//         });

//         // Contact Form & Copy Email
//         document.getElementById('copyEmail').addEventListener('click', e => {
//             navigator.clipboard.writeText(DATA.email).then(() => {
//                 e.target.textContent = 'Copied!';
//                 setTimeout(() => {
//                     e.target.textContent = 'Copy Email';
//                 }, 2000);
//             });
//         });

//         document.getElementById('contactForm').addEventListener('submit', async e => {
//             e.preventDefault();
//             const form = e.target;
//             const formData = new FormData(form);
//             const data = Object.fromEntries(formData.entries());
//             const msgEl = document.getElementById('formMsg');
//             msgEl.textContent = 'Sending...';

//             try {
//                 // IMPORTANT: Replace this with your actual form submission endpoint (e.g., Formspree, a serverless function)
//                 const response = await fetch('https://formspree.io/f/your-form-id', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(data),
//                 });
//                 if (response.ok) {
//                     msgEl.textContent = `Thanks, ${data.name}! Your message has been saved.`;
//                     form.reset();
//                 } else {
//                     throw new Error('Server responded with an error.');
//                 }
//             } catch (error) {
//                 console.error('Form submission error:', error);
//                 msgEl.textContent = 'Failed to send. Please try emailing directly.';
//             }
//             setTimeout(() => {
//                 msgEl.textContent = '';
//             }, 5000);
//         });
//     };

//     // --- RUN EVERYTHING ---
//     initApp();
//     initAnimations();
//     initEventListeners();
// });

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
            experience: [{ title: 'Intern', company: 'Nepal Telecom', from: 'Jan 2024', to: 'Apr 2024', location: 'Lumbini, Nepal', bullets: ['Customer Relationship Management (CRM)', 'Computer Networking', 'On-site internship tasks and teamwork'] }],
            education: [{ school: 'Rupandehi Lilaram Neupane Secondary School', degree: 'Diploma in Computer Engineering (DCOM)', from: 'Feb 2020', to: 'Jan 2024', grade: '73.48%' }, { school: 'Little Paradise English Medium School', degree: 'SEE', grade: 'A' }],
            certs: [{ title: 'Google Cloud Skills Boost', issuer: 'Google', date: 'Jun 2024' }, { title: 'NET Aspire Introduction', issuer: 'STYAVA.DEV', date: 'Aug 2024' }, { title: 'Generative AI', issuer: 'Various', date: '2024' }]
        };
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await loadData();
    // new circular skill cirular one updated on 28/10/2025.
    // --- CIRCULAR SKILL RENDER FUNCTION (Final Pro Version) ---
    const renderList = (arr, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
    <div class="flex flex-wrap justify-center gap-6">
      ${arr
                .map(
                    (it) => `
          <div class="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center 
                      transition-all duration-300 transform hover:scale-110 group">
              
              <!-- Circular Progress -->
              <svg class="absolute inset-0" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" stroke-width="8" fill="none"></circle>
                  <circle cx="50" cy="50" r="45"
                      stroke="url(#grad-${it.name.replace(/\s+/g, '')})"
                      stroke-width="8" fill="none"
                      stroke-dasharray="283"
                      stroke-dashoffset="283"
                      stroke-linecap="round"
                      class="skill-ring"
                      data-level="${it.level}">
                  </circle>
                  <defs>
                      <linearGradient id="grad-${it.name.replace(/\s+/g, '')}" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stop-color="#8b5cf6" />
                          <stop offset="100%" stop-color="#c084fc" />
                      </linearGradient>
                  </defs>
              </svg>

              <!-- Center Logo & Text -->
              <div class="z-10 flex flex-col items-center text-center group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]">
                  <img src="${it.icon}" 
                      alt="${it.name}" 
                      loading="lazy"
                      class="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110">
                  <span class="text-xs sm:text-sm mt-1 text-gray-200 group-hover:text-violet-300">${it.name}</span>
              </div>
          </div>
      `
                )
                .join("")}
    </div>
  `;
    };

    // end of new circular skill section.

    // --- CIRCULAR SKILL RENDER FUNCTION ---
    // const renderList = (arr, containerId) => {
    //     const container = document.getElementById(containerId);
    //     if (!container) return;

    //     container.innerHTML = `
    //     <div class="flex flex-wrap justify-center gap-6">
    //         ${arr.map(it => `
    //             <div class="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
    //                 <svg class="absolute inset-0" viewBox="0 0 100 100">
    //                     <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" stroke-width="8" fill="none"></circle>
    //                     <circle cx="50" cy="50" r="45" 
    //                         stroke="url(#grad-${it.name.replace(/\s+/g, '')})"
    //                         stroke-width="8" fill="none"
    //                         stroke-dasharray="283"
    //                         stroke-dashoffset="283"
    //                         stroke-linecap="round"
    //                         class="skill-ring"
    //                         data-level="${it.level}">
    //                     </circle>
    //                     <defs>
    //                         <linearGradient id="grad-${it.name.replace(/\s+/g, '')}" x1="0" y1="0" x2="1" y2="1">
    //                             <stop offset="0%" stop-color="var(--accent)" />
    //                             <stop offset="100%" stop-color="var(--accent2)" />
    //                         </linearGradient>
    //                     </defs>
    //                 </svg>
    //                 <div class="z-10 flex flex-col items-center text-center">
    //                     <img src="./assets/icons/${it.name.toLowerCase().replace(/[+]/g, 'p')}.png" 
    //                          alt="${it.name}" 
    //                          class="w-8 h-8 sm:w-10 sm:h-10 object-contain">
    //                     <span class="text-xs sm:text-sm mt-1">${it.name}</span>
    //                 </div>
    //             </div>
    //         `).join('')}
    //     </div>
    // `;
    // };


    // pervious horizantal skill section replacing with cirular one.
    // // --- RENDER FUNCTIONS ---
    // const renderList = (arr, containerId) => {
    //     const container = document.getElementById(containerId);
    //     if (!container) return;
    //     container.innerHTML = arr.map(it => `
    //                 <div>
    //                     <div class="flex justify-between text-sm">
    //                         <div class="text-wrap">${it.name}</div>
    //                         <div>${it.level}%</div>
    //                     </div>
    //                     <div class="skill-bar mt-2">
    //                         <div class="skill-fill h-full rounded-full" data-level="${it.level}" style="width:0%;background:linear-gradient(90deg,var(--accent),var(--accent2));"></div>
    //                     </div>
    //                 </div>
    //             `).join('');
    // };

    const renderProjects = (tag = 'all') => {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        const filtered = (tag === 'all')
            ? DATA.projects
            : DATA.projects.filter(p => p.tags.includes(tag));

        grid.innerHTML = filtered.map(p => `
        <div class="glass p-4 rounded-lg hover:scale-105 transition-transform duration-300 relative">
            
            <!-- ICON on top -->
            <div class="absolute -top-4 left-4 bg-slate-800 p-2 rounded-full shadow-lg">
                <i class="${p.icon} text-xl text-cyan-400"></i>
            </div>

            <!-- Thumbnail -->
            <img src="${p.thumb}" alt="${p.title}" class="w-full h-40 object-cover rounded-md"/>

            <!-- Description -->
            <p class="text-sm text-slate-300 mt-3 h-10 text-wrap">${p.desc}</p>

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

    const renderCerts = () => {
        const certSlides = document.getElementById('certSlides');
        if (!certSlides) return;
        certSlides.innerHTML = DATA.certs.map(c => `
                    <div class="swiper-slide glass p-4 rounded-lg">
                        <div class="font-semibold text-wrap">${c.title}</div>
                        <div class="text-sm text-slate-400 text-wrap">${c.issuer} • ${c.date}</div>
                    </div>
                `).join('');
        try {
            new Swiper('.myCertsSwiper', { slidesPerView: 1, spaceBetween: 12, breakpoints: { 640: { slidesPerView: 2 } } });
        } catch (e) { console.warn('Swiper init failed', e); }
    };

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

        // // Animate circular skill rings
        // document.querySelectorAll('.skill-ring').forEach(ring => {
        //     ScrollTrigger.create({
        //         trigger: ring,
        //         start: 'top 85%',
        //         onEnter: () => {
        //             const level = ring.dataset.level;
        //             const circumference = 283;
        //             const offset = circumference - (circumference * level) / 100;
        //             gsap.to(ring, { strokeDashoffset: offset, duration: 1.6, ease: 'power2.out' });
        //         }
        //     });
        // });


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


        // GSAP Animations
        // if (typeof gsap !== 'undefined') {
        //     gsap.registerPlugin(ScrollTrigger);
        //     document.querySelectorAll('.skill-bar').forEach(bar => {
        //         ScrollTrigger.create({
        //             trigger: bar,
        //             start: 'top 85%',
        //             onEnter: () => {
        //                 const fill = bar.querySelector('.skill-fill');
        //                 if (fill) {
        //                     gsap.to(fill, { width: `${fill.dataset.level}%`, duration: 1.4, ease: 'power2.out' });
        //                 }
        //             }
        //         });
        //     });
        //     gsap.from('main section', { opacity: 0, y: 30, stagger: 0.15, duration: 0.9, scrollTrigger: { trigger: 'main', start: 'top 80%' } });
        // }
    };

    // --- EVENT LISTENERS ---
    const initEventListeners = () => {
        // Mobile Menu
        const mobileMenu = document.getElementById('mobileMenu');
        document.getElementById('mobileMenuBtn').addEventListener('click', () => mobileMenu.classList.remove('hidden'));
        document.getElementById('closeMobileMenuBtn').addEventListener('click', () => mobileMenu.classList.add('hidden'));
        document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));

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
                    document.getElementById('modalLink').href = p.link || '#';
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
        document.getElementById('contactForm').addEventListener('submit', async e => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const msgEl = document.getElementById('formMsg');
            msgEl.textContent = 'Sending...';

            try {
                // Submit to your local server endpoint
                const response = await fetch('http://localhost:3000/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const result = await response.json();
                    msgEl.textContent = `Thanks, ${data.name}! Your message has been send✅.`;
                    form.reset();

                } else {
                    const errorResult = await response.json();
                    throw new Error(errorResult.message || 'Server responded with an error❌.');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                msgEl.textContent = 'Failed to send. Please ensure the server is running or try emailing directly.';
            }
            setTimeout(() => {
                msgEl.textContent = '';
            }, 5000);
        });
    };

    // --- RUN EVERYTHING ---
    initApp();
    initAnimations();
    initEventListeners();
});