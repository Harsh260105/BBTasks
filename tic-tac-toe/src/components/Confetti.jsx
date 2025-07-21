import React, { useEffect, useRef } from 'react';

const Confetti = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#4ade80', '#facc15', '#f97316', '#3b82f6', '#ec4899'];
    const totalParticles = 150;

    // Create particles only once
    if (particlesRef.current.length === 0) {
        for (let i = 0; i < totalParticles; i++) {
            particlesRef.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height, // Start off-screen
                radius: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * Math.PI * 2,
            });
        }
    }

    const draw = () => {
        if (!canvasRef.current) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesRef.current.forEach((p, index) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = p.color;
            ctx.fill();

            // Update particle position
            p.y += p.speed; // Gravity
            p.x += Math.sin(p.y / 100); // Gentle sway

            // Reset particle if it goes off screen
            if (p.y > canvas.height) {
                particlesRef.current[index] = {
                    ...p,
                    x: Math.random() * canvas.width,
                    y: -p.radius, // Reset to top
                };
            }
        });

        animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup function to stop the animation
    return () => {
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, pointerEvents: 'none' }} />;
};

export default Confetti;