import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ModelComparisonTable({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-borderSubtle rounded-2xl p-8 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-textPrimary mb-6">
        Algorithm Comparison
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-textSecondary border-b border-borderSubtle">
              <th className="py-3 text-left">Model</th>
              <th className="py-3 text-right">Accuracy</th>
              <th className="py-3 text-right">ROC-AUC</th>
              <th className="py-3 text-center">Selected</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={row.model}
                className={`border-b border-borderSubtle ${
                  row.selected ? "bg-primary/5" : ""
                }`}
              >
                <td className="py-4 font-medium text-textPrimary">
                  {row.model}
                </td>
                <td className="py-4 text-right">
                  {(row.accuracy * 100).toFixed(2)}%
                </td>
                <td className="py-4 text-right">
                  {row.roc_auc.toFixed(3)}
                </td>
                <td className="py-4 text-center">
                  {row.selected && (
                    <CheckCircle className="inline text-primary" size={18} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
