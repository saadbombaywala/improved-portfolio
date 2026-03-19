import { useEffect, useRef } from 'react';

export default function Wallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const characters = '01'.split('');
    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100;
    }

    let frame = 0;
    const draw = () => {
      frame++;
      if (frame % 2 !== 0) {
        requestAnimationFrame(draw);
        return;
      }
      
      ctx.fillStyle = 'rgba(2, 4, 8, 0.08)'; // Pure dark fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0a1a30'; // Very faint color for binary
      ctx.font = `${fontSize}px "JetBrains Mono"`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none"
      />
      
      {/* Central Watermark */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="font-display font-black text-[10vw] text-white opacity-5 tracking-tighter whitespace-nowrap">
          B.E.A.T OS v1.0
        </h1>
      </div>

      {/* Central Cyan Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-os-accent rounded-full blur-[150px] opacity-[0.03] pointer-events-none z-0 mix-blend-screen animate-pulse" />

      {/* Global scanline and noise */}
      <div className="scanlines" />
      <div className="noise-overlay" />
    </>
  );
}
