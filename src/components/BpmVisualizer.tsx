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

    // Set canvas size to match container width
    canvas.width = canvas.offsetWidth;
    canvas.height = 100;

    let animationFrameId: number;
    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate wave properties based on BPM
      const frequency = bpm / 60;
      const amplitude = 30;
      const wavelength = canvas.width / 8; // Adjusted for more waves

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#6D28D9");    // primary
      gradient.addColorStop(0.5, "#14B8A6");  // secondary
      gradient.addColorStop(1, "#EC4899");    // accent

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x++) {
        const y = amplitude * Math.sin((x / wavelength) * Math.PI * 2 + angle) + canvas.height / 2;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = gradient;
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
      height={100}
      className="w-full bg-black/20 rounded-lg"
    />
  );
};