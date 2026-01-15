import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const cellVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18,
    },
  },
};

export default function ConfusionMatrix({ tp, tn, fp, fn }) {
  const matrix = [
    [tn, fp], // Actual Healthy
    [fn, tp], // Actual Disease
  ];

  const maxValue = Math.max(tn, fp, fn, tp);

  const getCellColor = (value) => {
    const intensity = value / maxValue;

    // Blue heatmap similar to your example
    return `rgba(30, 64, 175, ${0.15 + intensity * 0.85})`;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold text-slate-800 mb-1">
        Confusion Matrix
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Evaluating model performance on a subset of data
      </p>

      {/* Heatmap Matrix */}
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
        {/* Y Axis Label */}
        <div className="text-xs font-medium text-slate-600 rotate-[-90deg] whitespace-nowrap">
          Actual
        </div>

        <div>
          {/* X Axis Label */}
          <div className="text-xs font-medium text-slate-600 text-center mb-3">
            Predicted
          </div>

          {/* Column Labels */}
          <div className="grid grid-cols-2 mb-2 text-xs text-slate-600 text-center">
            <span>Healthy</span>
            <span>Disease</span>
          </div>

          {/* Rows */}
          <div className="grid grid-rows-2 gap-2">
            {matrix.map((row, i) => (
              <div key={i} className="grid grid-cols-[auto_1fr] gap-2">
                {/* Row Label */}
                <div className="text-xs text-slate-600 flex items-center pr-2 whitespace-nowrap">
                  {i === 0 ? "Healthy" : "Disease"}
                </div>

                {/* Cells */}
                <div className="grid grid-cols-2 gap-2">
                  {row.map((value, j) => (
                    <motion.div
                      key={j}
                      variants={cellVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
                      }}
                      className="h-24 rounded-xl flex items-center justify-center font-semibold text-lg select-none"
                      style={{
                        backgroundColor: getCellColor(value),
                        color: value / maxValue > 0.55 ? "white" : "#0f172a",
                      }}
                    >
                      {value}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Color Scale Hint */}
      <div className="flex items-center gap-3 mt-6 text-xs text-slate-500">
        <span>Low</span>
        <div className="h-2 w-32 rounded bg-gradient-to-r from-blue-100 to-blue-800"></div>
        <span>High</span>
      </div>
    </motion.div>
  );
}
