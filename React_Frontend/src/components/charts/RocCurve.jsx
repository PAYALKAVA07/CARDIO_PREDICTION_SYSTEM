import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function RocCurve({ auc }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;
    const size = 360;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.clearRect(0, 0, size, size);

    const padding = 40;
    const chartSize = size - padding * 2;

    // Axes
    ctx.strokeStyle = "#CBD5E1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, size - padding);
    ctx.lineTo(size - padding, size - padding);
    ctx.stroke();

    // Diagonal baseline
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = "#94A3B8";
    ctx.beginPath();
    ctx.moveTo(padding, size - padding);
    ctx.lineTo(size - padding, padding);
    ctx.stroke();
    ctx.setLineDash([]);

    // ROC curve (smooth quadratic)
    ctx.strokeStyle = "#4F46E5"; // primary
    ctx.lineWidth = 3;
    ctx.beginPath();

    ctx.moveTo(padding, size - padding);
    ctx.quadraticCurveTo(
      size / 2,
      size / 2 - auc * 120,
      size - padding,
      padding + (1 - auc) * 40
    );

    ctx.stroke();
  }, [auc]);

  return (
    <div className="bg-card border border-borderSubtle rounded-2xl p-8 shadow-sm">
      <h3 className="text-lg font-semibold mb-1">
        ROC Curve
      </h3>

      <p className="text-sm text-textSecondary mb-6">
        Receiver Operating Characteristic showing model discrimination ability.
      </p>

      <div className="flex justify-center">
        <motion.canvas
          ref={canvasRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      <p className="text-center mt-6 text-sm">
        ROC-AUC Score:{" "}
        <span className="font-semibold text-primary">
          {auc.toFixed(3)}
        </span>
      </p>

      <p className="text-xs text-muted text-center mt-2">
        Diagonal line represents random classifier
      </p>
    </div>
  );
}
