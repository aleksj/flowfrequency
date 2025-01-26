import { useEffect, useRef } from "react";

interface BpmVisualizerProps {
  bpm: number;
}

export const BpmVisualizer = ({ bpm }: BpmVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate wave properties based on BPM
      const frequency = bpm / 60;
      const amplitude = 30;
      const wavelength = canvas.width / 4;

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x++) {
        const y = amplitude * Math.sin((x / wavelength) * Math.PI * 2 + angle) + canvas.height / 2;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "#6D28D9";
      ctx.lineWidth = 3;
      ctx.stroke();

      angle += frequency * 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [bpm]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={100}
      className="w-full max-w-md mx-auto"
    />
  );
};