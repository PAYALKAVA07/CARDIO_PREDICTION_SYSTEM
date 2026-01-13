import { motion } from "framer-motion";
import { chartColors } from "../../utils/chartColors";

const containerVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      staggerChildren: 0.02,
    },
  },
};

const cellVariants = {
  hidden: { opacity: 0, scale: 0.85 },
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

export default function CorrelationMatrix({ matrix, features }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold text-slate-800 mb-1">
        Feature Correlation Map
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Red = positive correlation · Blue = negative correlation
      </p>

      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-1 text-sm">
          <thead>
            <tr>
              <th></th>
              {features.map(f => (
                <th
                  key={f}
                  className="px-3 py-2 text-slate-600 font-medium tracking-wide"
                >
                  {f}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                <td className="pr-3 font-medium text-slate-600 whitespace-nowrap">
                  {features[i]}
                </td>

                {row.map((val, j) => {
                  let bg = chartColors.neutral;

                  if (val > 0) {
                    bg =
                      Math.abs(val) > 0.4
                        ? chartColors.positiveStrong
                        : chartColors.positiveWeak;
                  } else if (val < 0) {
                    bg =
                      Math.abs(val) > 0.4
                        ? chartColors.negativeStrong
                        : chartColors.negativeWeak;
                  }

                  return (
                    <motion.td
                      key={j}
                      variants={cellVariants}
                      whileHover={{
                        scale: 1.08,
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                      }}
                      className="text-center rounded-lg font-medium cursor-default select-none"
                      style={{
                        backgroundColor: bg,
                        color:
                          Math.abs(val) > 0.4
                            ? "white"
                            : "#0f172a",

                        // ✅ Responsive compact sizing
                        width: "clamp(38px, 4vw, 56px)",
                        height: "clamp(30px, 3.5vw, 42px)",

                        transition: "background-color 0.3s ease",
                      }}
                      title={`Correlation: ${val.toFixed(3)}`}
                    >
                      {val.toFixed(2)}
                    </motion.td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 mt-6 text-xs text-slate-500">
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-red-600 shadow-sm"></span>
          Strong Positive
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-blue-700 shadow-sm"></span>
          Strong Negative
        </span>
      </div>
    </motion.div>
  );
}
