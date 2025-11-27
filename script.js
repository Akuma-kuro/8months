class VintageLetter {
    constructor() {
        this.currentStage = 1;
        this.audio = document.getElementById('love-song');
        this.init();
    }

    init() {
        // Stage 1: Click to open envelope
        const envelope = document.getElementById('envelope');
        if (envelope) {
            envelope.addEventListener('click', () => this.openEnvelope());
        }

        // Stage 2: Open flaps and unfold paper
        const flapTop = document.getElementById('flap-top');
        const flapLeft = document.getElementById('flap-left');
        const flapRight = document.getElementById('flap-right');
        const paperPreview = document.querySelector('.paper-preview');

        if (flapTop) flapTop.addEventListener('click', () => this.flipFlap('top'));
        if (flapLeft) flapLeft.addEventListener('click', () => this.flipFlap('left'));
        if (flapRight) flapRight.addEventListener('click', () => this.flipFlap('right'));
        if (paperPreview) paperPreview.addEventListener('click', () => this.goToStage3());

        // Stage 3: Click to unfold paper
        const unfoldedPaper = document.getElementById('unfolded-paper');
        if (unfoldedPaper) unfoldedPaper.addEventListener('click', () => this.unfoldPaper());
    }

    openEnvelope() {
        const envelope = document.getElementById('envelope');
        envelope.style.transform = 'rotateY(180deg)';
        
        // Play audio
        this.audio.play().catch(e => console.log('Audio play failed:', e));
        
        setTimeout(() => {
            document.getElementById('stage1').classList.remove('active');
            document.getElementById('stage2').classList.add('active');
            this.currentStage = 2;
        }, 1500);
    }

    flipFlap(flapType) {
        const flap = document.getElementById(`flap-${flapType}`);
        if (!flap.classList.contains('flipped')) {
            flap.classList.add('flipped');
            
            // Check if all flaps are flipped
            const allFlaps = [document.getElementById('flap-top'), 
                             document.getElementById('flap-left'), 
                             document.getElementById('flap-right')];
            
            const allFlipped = allFlaps.every(flap => flap.classList.contains('flipped'));
            
            if (allFlipped) {
                setTimeout(() => {
                    this.goToStage3();
                }, 1000);
            }
        }
    }

    goToStage3() {
        document.getElementById('stage2').classList.remove('active');
        document.getElementById('stage3').classList.add('active');
        this.currentStage = 3;
    }

    unfoldPaper() {
        const paper = document.getElementById('unfolded-paper');
        if (!paper.classList.contains('unfolded')) {
            paper.classList.add('unfolded');
            
            // Add paper crinkle sound effect
            this.playPaperSound();
        }
    }

    playPaperSound() {
        // Create a simple paper crinkle sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    // Add floating particles effect
    createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '♡';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-50px';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.color = '#e74c3c';
            heart.style.opacity = '0.7';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '100';
            heart.style.animation = `fall ${Math.random() * 3 + 3}s linear forwards`;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    10% { opacity: 0.7; }
                    90% { opacity: 0.7; }
                    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, 2000);
    }
}

// Initialize the vintage letter experience
document.addEventListener('DOMContentLoaded', () => {
    const letter = new VintageLetter();
    letter.createFloatingHearts();
});

// Add mouse move parallax effect
document.addEventListener('mousemove', (e) => {
    const scenes = document.querySelectorAll('.scene.active');
    scenes.forEach(scene => {
        const x = (window.innerWidth / 2 - e.clientX) / 25;
        const y = (window.innerHeight / 2 - e.clientY) / 25;
        scene.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) scale(1)`;
    });
});
