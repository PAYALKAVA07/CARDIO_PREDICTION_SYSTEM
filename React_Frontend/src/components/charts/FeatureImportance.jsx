import { motion } from "framer-motion";
import { chartColors } from "../../utils/chartColors";

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
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

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function FeatureImportance({ data = {} }) {
  const entries = Object.entries(data)
    .filter(([, v]) => typeof v === "number" && v > 0)
    .sort((a, b) => b[1] - a[1]);

  const maxValue = entries[0]?.[1] || 1;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold text-slate-800 mb-2 sm:mb-1">
        Feature Influence on Prediction
      </h2>
      <p className="text-sm text-slate-500 mb-4 sm:mb-3">
        Higher bars indicate stronger contribution to risk prediction.
      </p>

      <div className="space-y-4 sm:space-y-3 max-w-full">
        {entries.map(([name, value], i) => {
          const scaledWidth = (value / maxValue) * 100;

          return (
            <motion.div
              key={name}
              variants={rowVariants}
            >
              {/* Labels */}
              <div className="flex justify-between text-xs sm:text-[10px] font-medium text-slate-600 mb-1">
                <span className="truncate max-w-[40%] sm:max-w-[35%]">{name}</span>
                <span>{(value * 100).toFixed(1)}%</span>
              </div>

              {/* Bar */}
              <div className="relative h-5 sm:h-4 rounded-full bg-slate-200 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scaledWidth}%` }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.06,
                    ease: "easeOut",
                  }}
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ backgroundColor: chartColors.bar }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
