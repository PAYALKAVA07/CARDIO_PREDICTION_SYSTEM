import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.35,
      ease: "easeOut",
    },
  }),
};

export default function ModelComparisonTable({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-borderSubtle rounded-2xl p-8 shadow-lg"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-textPrimary">
          Algorithm Comparison
        </h2>
        <p className="text-sm text-textSecondary mt-1 max-w-3xl">
          Multiple machine learning algorithms were evaluated under identical
          validation conditions. The final model was selected based on
          discrimination ability (ROC-AUC) and overall accuracy.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-borderSubtle">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-bgMain">
            <tr className="text-textSecondary">
              <th className="px-6 py-4 text-left font-medium">Model</th>
              <th className="px-6 py-4 text-right font-medium">Accuracy</th>
              <th className="px-6 py-4 text-right font-medium">ROC-AUC</th>
              <th className="px-6 py-4 text-center font-medium">Selected</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <motion.tr
                key={row.model}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`
                  border-t border-borderSubtle
                  transition
                  ${
                    row.selected
                      ? "bg-primary/5"
                      : "bg-card hover:bg-primary/10"
                  }
                `}
              >
                <td className="px-6 py-4 font-medium text-textPrimary">
                  {row.model}
                </td>

                <td className="px-6 py-4 text-right text-textPrimary">
                  {(row.accuracy * 100).toFixed(2)}%
                </td>

                <td className="px-6 py-4 text-right text-textPrimary">
                  {row.roc_auc.toFixed(3)}
                </td>

                <td className="px-6 py-4 text-center">
                  {row.selected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="inline-flex"
                    >
                      <CheckCircle
                        size={18}
                        className="text-primary"
                      />
                    </motion.span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <p className="text-xs text-muted mt-5 max-w-3xl">
        The selected model demonstrates the best balance between predictive
        performance and interpretability, making it suitable for real-world
        cardiovascular risk assessment.
      </p>
    </motion.div>
  );
}
