document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Live Age Counter ---------- */
    const birthDate = new Date('2004-11-14T00:00:00');
    const countdownElement = document.getElementById('countdown');

    function updateAge() {
        if (!countdownElement) return;
        const now = new Date();

        let years   = now.getFullYear() - birthDate.getFullYear();
        let months  = now.getMonth()    - birthDate.getMonth();
        let days    = now.getDate()     - birthDate.getDate();
        let hours   = now.getHours()    - birthDate.getHours();
        let minutes = now.getMinutes()  - birthDate.getMinutes();
        let seconds = now.getSeconds()  - birthDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours   < 0) { hours   += 24; days--; }
        if (days    < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        countdownElement.innerHTML = `${years}y ${months}m ${days}d <br> ${hours}h ${minutes}m ${seconds}s`;
    }
    setInterval(updateAge, 1000);
    updateAge();

    /* ---------- AOS ---------- */
    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true,
        });
    }

    /* ---------- LightGallery ---------- */
    const lgEl = document.getElementById('lightgallery');
    if (lgEl && window.lightGallery) {
        lightGallery(lgEl, {
            speed: 500,
            download: false
        });
    }

    /* ---------- Hall of Fame Scroller ---------- */
    const scroller = document.getElementById('hall-of-fame-scroller');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');
    if (scroller && scrollLeftBtn && scrollRightBtn) {
        const card = scroller.querySelector('.snap-center');
        if (card) {
            const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card.parentElement).gap || 0);
            scrollRightBtn.addEventListener('click', () => {
                scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
            });
            scrollLeftBtn.addEventListener('click', () => {
                scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            });
        }
    }

    /* ---------- Video Uploader (tumari original, unused) ---------- */
    const videoUploadInput  = document.getElementById('video-upload');
    const videoPlayer       = document.getElementById('video-player');
    const videoUploadLabel  = document.getElementById('video-upload-label');

    if (videoUploadInput && videoPlayer && videoUploadLabel) {
        videoUploadLabel.addEventListener('click', () => {
            videoUploadInput.click();
        });
        videoUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const videoURL = URL.createObjectURL(file);
                videoPlayer.src = videoURL;
                videoPlayer.classList.remove('hidden');
                videoUploadLabel.classList.add('hidden');
                videoPlayer.play();
            }
        });
    }

    /* ---------- Sakura Petal Animation ---------- */
    const canvas = document.getElementById('sakura-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let petals = [];
        const numPetals = 50;

        function resizeCanvas() {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function Petal() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.w = 25 + Math.random() * 15;
            this.h = 20 + Math.random() * 10;
            this.opacity = this.w / 40;
            this.flip = Math.random();
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flipSpeed = Math.random() * 0.03;
        }

        Petal.prototype.draw = function () {
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
                this.xSpeed = 1.5 + Math.random() * 2;
                this.ySpeed = 1 + Math.random() * 1;
                this.flip = Math.random();
            }
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
            ctx.bezierCurveTo(this.x, this.y + this.h, this.x - this.w / 2, this.y, this.x, this.y);
            ctx.closePath();
            ctx.fillStyle = '#FFB7C5';
            ctx.fill();
        };

        Petal.prototype.update = function () {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += this.flipSpeed;
            this.draw();
        };

        function createPetals() {
            petals = [];
            for (let i = 0; i < numPetals; i++) {
                petals.push(new Petal());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => petal.update());
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();
    }

    /* ---------- Background Music ---------- */
    const bgMusic   = document.getElementById('bgMusic');
    const musicBtn  = document.getElementById('musicBtn');
    const musicIcon = document.getElementById('musicIcon');

    if (bgMusic && musicBtn && musicIcon) {
        musicBtn.addEventListener('click', async () => {
            try {
                if (bgMusic.paused) {
                    await bgMusic.play();
                } else {
                    bgMusic.pause();
                }
            } catch (error) {
                console.error('Music could not play:', error);
            }
        });

        bgMusic.addEventListener('play', () => {
            musicIcon.textContent = '⏸️';
            musicBtn.classList.add('animate-pulse');
        });

        bgMusic.addEventListener('pause', () => {
            musicIcon.textContent = '🎵';
            musicBtn.classList.remove('animate-pulse');
        });
    }

    /* ============================================================
       🛡️ ছবি সুরক্ষা (Image Protection JS)
       ============================================================ */
    
    // ১. ছবির ওপর রাইট-ক্লিক এবং ড্র্যাগ বন্ধ করা
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', (e) => e.preventDefault());
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // ২. কীবোর্ড শর্টকাট ব্লক করা (Save, DevTools, PrintScreen ইত্যাদি)
    document.addEventListener('keydown', function(e) {
        // Ctrl+S / Cmd+S (Save page)
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
        }
        // F12 (Developer Tools)
        if (e.key === 'F12') {
            e.preventDefault();
        }
        // Ctrl+Shift+I / J / C (Developer Tools)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
            e.preventDefault();
        }
        // PrintScreen
        if (e.key === 'PrintScreen' || e.keyCode === 44) {
            e.preventDefault();
        }
    });

    // ৩. স্ক্রিনশট ডিটারেন্ট: অন্য ট্যাবে গেলে বা উইন্ডো মিনিমাইজ করলে স্ক্রিন ব্লার হয়ে যাবে
    window.addEventListener('blur', function() {
        document.body.style.filter = 'blur(15px)';
    });
    window.addEventListener('focus', function() {
        document.body.style.filter = 'none';
    });
    
    /* ============================================================ */

});
