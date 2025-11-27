// Create floating particles background
function createParticles() {
    const particlesContainer = document.getElementById('particles-js');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(255, ${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, 0.6)`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s infinite linear`;
        particle.style.zIndex = '2';
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        particlesContainer.appendChild(particle);
    }
}

// Handle envelope click to open letter
document.getElementById('envelope').addEventListener('click', function() {
    const flap = document.getElementById('flap');
    flap.style.transform = 'translateX(-50%) rotateX(180deg)';
    flap.style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('envelope-scene').classList.add('hidden');
        document.getElementById('content-scene').classList.remove('hidden');
        
        // Add typing effect to letter content
        typeWriterEffect();
    }, 1000);
});

// Typewriter effect for letter content
function typeWriterEffect() {
    const paragraphs = document.querySelectorAll('.letter-content p');
    paragraphs.forEach((p, index) => {
        const text = p.textContent;
        p.textContent = '';
        let i = 0;
        
        setTimeout(() => {
            const timer = setInterval(() => {
                if (i < text.length) {
                    p.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 30);
        }, index * 1000);
    });
}

// Add interactive heart animations
function addInteractiveHearts() {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.7) { // Only create hearts occasionally
            const heart = document.createElement('div');
            heart.innerHTML = '♡';
            heart.style.position = 'fixed';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.color = '#e74c3c';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '100';
            heart.style.animation = 'heartFloat 1.5s ease-out forwards';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes heartFloat {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(-50px) rotate(180deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1500);
        }
    });
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    createParticles();
    addInteractiveHearts();
    
    // Auto-open after 5 seconds if user doesn't click
    setTimeout(() => {
        if (!document.getElementById('content-scene').classList.contains('hidden')) {
            document.getElementById('envelope').click();
        }
    }, 5000);
});
