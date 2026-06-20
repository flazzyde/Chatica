import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function ParticlesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 70; // Optimized amount for crisp performance and elegance

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const density = particleCount;
      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    // Listen to resize and user pointer
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Initial setup
    resizeCanvas();

    const render = () => {
      // Check active theme
      const isDark = document.documentElement.classList.contains("dark");
      
      // Clear background cleanly based on mode
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Colors configuration
      const particleColor = isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.35)";
      const lineColor = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)";
      const mouseLineColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)";

      // Draw lines & connections first (z-under)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw connections with other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - dist / 120;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Mouse connection mapping
        const mdx = p1.x - mouseRef.current.x;
        const mdy = p1.y - mouseRef.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouseRef.current.radius) {
          ctx.beginPath();
          ctx.strokeStyle = mouseLineColor;
          ctx.lineWidth = (1 - mdist / mouseRef.current.radius) * 1.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();

          // Gentle magnetic pull towards mouse
          const force = (mouseRef.current.radius - mdist) / mouseRef.current.radius;
          p1.vx += (mdx / mdist) * force * 0.03;
          p1.vy += (mdy / mdist) * force * 0.03;
        }
      }

      // Render actual circular nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Physics bounds & movement
        p.x += p.vx;
        p.y += p.vy;

        // Friction / damp velocity back to normal
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Bounce/Teleport bounds check
        if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none transition-colors duration-500"
    />
  );
}
