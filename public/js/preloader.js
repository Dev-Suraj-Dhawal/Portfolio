document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("cyber-preloader");
    const matrixCanvas = document.getElementById("matrix-canvas");
    const mCtx = matrixCanvas.getContext("2d");
    const scrambleText = document.getElementById("scramble-text");
    const terminalOutput = document.getElementById("terminal-output");
    const progressBar = document.getElementById("cyber-progress");

    // =========================================
    // 1. MATRIX RAIN ENGINE
    // =========================================
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    // Authentic 1999 Half-width Katakana + Latin + Numerals
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'.split('');
    const fontSize = 14;
    let columns = Math.floor(matrixCanvas.width / fontSize);
    let drops = new Array(columns).fill(1);

    function drawMatrix() {
        mCtx.fillStyle = 'rgba(3, 7, 18, 0.15)'; // Matches the #030712 bg
        mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        mCtx.fillStyle = '#06b6d4';
        mCtx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            mCtx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        requestAnimationFrame(drawMatrix);
    }
    drawMatrix();

    // =========================================
    // 2. SCRAMBLE TEXT EFFECT
    // =========================================
    const characters = '!<>-_\\/[]{}—=+*^?#________';
    
    function scrambleNumber(targetNum) {
        let iterations = 0;
        const interval = setInterval(() => {
            scrambleText.innerText = targetNum.toString().split('').map((char, index) => {
                if (index < iterations) return char;
                return characters[Math.floor(Math.random() * characters.length)];
            }).join('') + "%";
            
            if (iterations >= targetNum.toString().length) clearInterval(interval);
            iterations += 1 / 3; 
        }, 30);
    }

 
// =========================================
    // 3. REAL-WORLD PENTEST BOOT SEQUENCE
    // =========================================
    const bootLogs = [
        { type: "BASH", msg: "root@kali:~$ nmap -sC -sV -O target_tilottama_node", color: "text-slate-400" },
        { type: "NMAP", msg: "Discovered open port 22/tcp (SSH), 443/tcp (HTTPS)", color: "text-slate-500" },
        { type: "BASH", msg: "root@kali:~$ msfconsole -q -x 'use exploit/multi/handler'", color: "text-slate-400" },
        { type: "MSF", msg: "[*] Started reverse TCP handler on 192.168.1.45:4444", color: "text-blue-400" },
        { type: "MSF", msg: "[*] Sending stage (175174 bytes) to Nepal_Telecom_Relay...", color: "text-blue-400" },
        { type: "MSF", msg: "[+] Meterpreter session 1 opened (192.168.1.45:4444 -> 10.0.2.15:52331)", color: "text-green-400" },
        { type: "METERPRETER", msg: "meterpreter > getsystem", color: "text-slate-400" },
        { type: "METERPRETER", msg: "...got system via technique 1 (Named Pipe Impersonation).", color: "text-yellow-400" },
        { type: "BASH", msg: "root@target:~# ./decrypt_jwt.py --token $AETHER_AUTH", color: "text-slate-400" },
        { type: "PYTHON", msg: "Success! Decoded JWT payload: { user: 'SURAJ_DHAWAL', role: 'ROOT' }", color: "text-purple-400" },
        { type: "BASH", msg: "root@target:~# systemctl start logicbench_core && pm2 start aether_ai", color: "text-slate-400" },
        { type: "SYS", msg: "[OK] React/Node.js Daemons active. Allocating memory...", color: "text-cyan-400" },
        { type: "BASH", msg: "root@target:~# rm -rf /var/log/auth.log ; history -c ; clear", color: "text-slate-400" },
        { type: "SEC", msg: "Tracks erased. Secure persistence established.", color: "text-green-500" }
    ];

    let currentLog = 0;
    function typeLog() {
        if (currentLog < bootLogs.length) {
            const log = bootLogs[currentLog];
            const div = document.createElement("div");
            div.innerHTML = `<span class="font-bold ${log.color}">[${log.type}]</span> <span class="text-slate-300">${log.msg}</span>`;
            terminalOutput.appendChild(div);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            currentLog++;
            setTimeout(typeLog, Math.random() * 150 + 50); // High-speed typing
        }
    }
    setTimeout(typeLog, 400);

    // =========================================
    // 4. LIVE HUD TELEMETRY ENGINE
    // =========================================
    let hudInterval;
    function startHUDTelemetry() {
        const nodeBar = document.getElementById("node-bar");
        const memText = document.getElementById("mem-text");
        const memBar = document.getElementById("mem-bar");
        const latencyText = document.getElementById("latency-text");
        const threatText = document.getElementById("threat-text");
        const geoText = document.getElementById("geo-text");
        const mongoBar = document.getElementById("mongo-bar");

        hudInterval = setInterval(() => {
            // Memory Fluctuations
            if (memText && memBar) {
                const mem = (Math.random() * (28.5 - 12.0) + 12.0).toFixed(1);
                memText.innerText = `${mem}TB / 32TB`;
                memBar.style.width = `${(mem / 32) * 100}%`;
            }

            // CPU & DB Loads
            if (nodeBar) nodeBar.style.width = `${Math.floor(Math.random() * 23 + 75)}%`;
            if (mongoBar) mongoBar.style.width = `${Math.floor(Math.random() * 15 + 85)}%`;

            // Network Latency Spikes
            if (latencyText) {
                const ping = Math.floor(Math.random() * 20 + 4);
                latencyText.innerText = `${ping}ms`;
                latencyText.className = ping > 15 ? "text-yellow-400" : "text-green-400";
            }

            // Threat Level Glitch
            if (threatText) {
                const isGlitch = Math.random() > 0.85;
                threatText.innerText = isGlitch ? `0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}` : "ZERO";
                threatText.className = isGlitch ? "text-red-400 font-bold" : "text-blue-400";
            }

            // Routing Proxies
            if (geoText && Math.random() > 0.8) {
                const nodes = ["TILOTTAMA_NODE", "BHAIRAHAWA_RELAY", "AWS_AP_SOUTH", "CLOUDFLARE_EDGE"];
                geoText.innerText = nodes[Math.floor(Math.random() * nodes.length)];
            }
        }, 350);
    }
    startHUDTelemetry();

    // =========================================
    // 5. PROGRESS COUNTER & FINAL REVEAL
    // =========================================
    let progress = 0;
    function updateProgress() {
        if (progress < 100) {
            const chunk = Math.random() > 0.8 ? Math.random() * 12 : Math.random() * 2.5;
            progress += chunk;
            if (progress > 100) progress = 100;
            
            const currentInt = Math.floor(progress);
            
            if (currentInt % 5 === 0 || currentInt === 100) {
                scrambleNumber(currentInt);
            } else {
                scrambleText.innerText = currentInt + "%";
            }
            
            progressBar.style.width = currentInt + "%";
            setTimeout(updateProgress, Math.random() * 80 + 40);
        } else {
            finalizeBoot();
        }
    }
    updateProgress();

    // =========================================
    // 6. SHUTDOWN & PORTFOLIO INITIATION
    // =========================================
    function finalizeBoot() {
        clearInterval(hudInterval); // Kill live telemetry
        
        scrambleText.classList.remove("glitch-text", "active");
        scrambleText.classList.add("text-white", "drop-shadow-[0_0_20px_#fff]");
        scrambleText.innerText = "UNLOCKED";
        
        const div = document.createElement("div");
        div.innerHTML = `<br><span class="font-bold text-white bg-green-600 px-2 py-1">ACCESS GRANTED: SURAJ DHAWAL</span>`;
        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        setTimeout(() => {
            preloader.classList.add("crt-power-off");
            
            setTimeout(() => {
                preloader.style.display = "none";
                document.body.classList.remove("overflow-hidden");
            }, 600);
        }, 1000);
    }

    // Keep Canvas sized correctly on resize
    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        columns = Math.floor(matrixCanvas.width / fontSize);
        drops = new Array(columns).fill(1);
    });
});