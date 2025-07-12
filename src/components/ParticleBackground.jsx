import { useEffect, useRef, useState, useCallback } from 'react';

function ParticleBackground() {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Check initial theme
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Throttled resize handler for better performance
  const throttledResize = useCallback(() => {
    let ticking = false;
    
    const updateDimensions = () => {
      if (canvasRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
      ticking = false;
    };

    return () => {
      if (!ticking) {
        requestAnimationFrame(updateDimensions);
        ticking = true;
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = throttledResize();
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, [throttledResize]);

  // Pause animation when tab is not visible for performance
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || !isVisible) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Optimize particle count based on screen size and device capability
    const baseParticleCount = Math.min(Math.floor(dimensions.width / 20), 50);
    const particleCount = window.devicePixelRatio > 1 ? Math.floor(baseParticleCount * 0.7) : baseParticleCount;
    
    const particleColor = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(37, 99, 235, 0.15)';
    const lineColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(37, 99, 235, 0.08)';
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Optimized connection drawing with distance caching
    const connectParticles = () => {
      const maxDistance = 80; // Reduced from 100 for better performance
      const maxDistanceSquared = maxDistance * maxDistance;
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < maxDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = lineColor.replace('0.1', `${opacity * 0.1}`).replace('0.08', `${opacity * 0.08}`);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Optimized animation loop with frame rate control
    let lastTime = 0;
    const targetFPS = 30; // Reduced from 60fps for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime) => {
      if (currentTime - lastTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTime = currentTime;
      
      // Clear canvas with optimized method
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, isDarkMode, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    />
  );
}

export default ParticleBackground; 