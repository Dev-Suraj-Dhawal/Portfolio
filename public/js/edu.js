// --- SMART ICON HELPER FOR CERTS (100% Reliable Official Logos + FontAwesome Fallbacks) ---
    const getCertIconHTML = (issuer, title) => {
        const safeIssuer = issuer || '';
        const safeTitle = title || '';
        const text = (safeIssuer + ' ' + safeTitle).toLowerCase();
        
        // Adjusted class: 'h-12 w-auto max-w-[140px]' handles both square (Google) and wide (TCS) logos perfectly!
        const imgClass = "h-12 w-auto max-w-[140px] mb-3 drop-shadow-md group-hover:scale-110 transition-transform duration-300 object-contain";
        // Matching size wrapper for FontAwesome concepts so they align identically
        const faClass = "flex items-center justify-center h-12 w-auto mb-3 drop-shadow-md group-hover:scale-110 transition-transform duration-300 text-4xl";

        // 1. OFFICIAL BRAND LOGOS (Using highly reliable Wikimedia & Devicon SVGs)
        if (text.includes('tata') || text.includes('tcs') || text.includes('forage')) {
            // Official TCS logo from Wikimedia Commons
            return `<img src="./assets/Company/tcs.webp" class="${imgClass}" alt="TCS" />`;
        }
        if (text.includes('google')) {
            return `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" class="${imgClass}" alt="Google" />`;
        }
        if (text.includes('microsoft')) {
            // Wikipedia Commons for Microsoft is extremely stable and high-res
            return `<img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" class="${imgClass}" alt="Microsoft" />`;
        }
        if (text.includes('linkedin')) {
            return `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" class="${imgClass}" alt="LinkedIn" />`;
        }
        if (text.includes('java')) {
            return `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" class="${imgClass}" alt="Java" />`;
        }

        // 2. TECH CONCEPTS (Using FontAwesome so they NEVER break)
        if (text.includes('cybersecurity') || text.includes('threat')) {
            return `<div class="${faClass}"><i class="fa-solid fa-shield-halved text-cyan-400"></i></div>`;
        }
        if (text.includes('ai') || text.includes('data')) {
            return `<div class="${faClass}"><i class="fa-solid fa-robot text-purple-400"></i></div>`;
        }
        
        // Default Fallback
        return `<div class="${faClass}"><i class="fa-solid fa-certificate text-yellow-400"></i></div>`;
    };
    // --- RENDER CERTS (Now injecting official HTML images) ---
    const renderCerts = () => {
        const certSlides = document.getElementById('certSlides');
        if (!certSlides) return;
        
        certSlides.innerHTML = DATA.certs.map(c => {
            const iconHTML = getCertIconHTML(c.issuer, c.title);
            return `
                <div class="swiper-slide h-auto">
                    <div class="h-full glass p-5 rounded-lg border border-white/5 hover:border-white/20 transition-colors flex flex-col justify-center items-center text-center group cursor-grab active:cursor-grabbing">
                        ${iconHTML}
                        <div class="font-semibold text-wrap text-sm sm:text-base text-slate-200">${c.title}</div>
                        <div class="text-xs sm:text-sm text-slate-400 mt-2">${c.issuer} &bull; ${c.date}</div>
                    </div>
                </div>
            `;
        }).join('');

    try {
            new Swiper('.myCertsSwiper', {
                slidesPerView: 1,
                spaceBetween: 16,
                loop: true,                 // Creates an infinite, seamless loop
                speed: 800,                 // 800ms transition for a buttery-smooth glide
                grabCursor: true,           // Shows the "grab" hand icon for UX
                autoplay: {
                    delay: 3000,            // Waits 3 seconds on each card
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true // Stops sliding when they hover to read
                },
                breakpoints: { 
                    640: { slidesPerView: 2 } 
                }
            });
        } catch (e) { 
            console.warn('Swiper init failed', e); 
        }
    };