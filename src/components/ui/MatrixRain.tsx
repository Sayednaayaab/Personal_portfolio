import { useEffect, useRef, useCallback } from 'react';

interface MatrixRainProps {
  progress: number;
}

const chars = 'ReactTSNodeAIPythonCSSHTMLdivletconstfunctionAIclassGPUWebGLThreeFramer'.split('');

export function MatrixRain({ progress }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '12px monospace';
    ctx.shadowBlur = 10 * progress;
    ctx.shadowColor = 'hsl(220, 90%, 60%)';

    const columns = Math.floor(canvas.width / 15) * progress;
    for (let i = 0; i < columns; i++) {
      const x = i * 15;
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = `hsla(220, 90%, 60%, ${Math.random() * 0.5 * progress + 0.1})`;
      ctx.fillText(char, x, (Math.random() * canvas.height + canvas.height) * progress);
    }

    requestAnimationFrame(draw);
  }, [progress]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-20 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
