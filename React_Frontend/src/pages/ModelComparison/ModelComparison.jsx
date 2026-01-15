import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchMetrics } from "../../services/metricsService";

import ModelComparisonTable from "../../components/charts/ModelComparisonTable";
import CorrelationMatrix from "../../components/charts/CorrelationMatrix";
import ConfusionMatrix from "../../components/charts/ConfusionMatrix";
import FeatureImportance from "../../components/charts/FeatureImportance";
import PerformanceBars from "../../components/charts/PerformanceBarChart.jsx";
import RocCurve from "../../components/charts/RocCurve.jsx";
import {
  Grid3X3,
  BarChart3,
  Star,
  GitBranch,
  Activity,
  CheckCircle,
} from "lucide-react";

/* ---------------- TABS ---------------- */

const tabs = [
  { key: "correlation", label: "Correlation", icon: Grid3X3 },
  { key: "confusion", label: "Confusion Matrix", icon: BarChart3 },
  { key: "importance", label: "Feature Importance", icon: Star },
];

export default function ModelComparison() {
  const [metrics, setMetrics] = useState(null);
  const [activeTab, setActiveTab] = useState("correlation");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMetrics()
      .then(setMetrics)
      .catch(() => setError("Failed to load model insights"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Center text="Analyzing model evaluation…" />;
  if (error) return <Center text={error} error />;

  const p = metrics.performance;

  return (
    <div className="min-h-screen bg-bgMain px-4 py-16">
      <div className="max-w-5xl mx-auto">
        {" "}
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl font-semibold text-textPrimary mb-3">
            Model Evaluation & Validation
          </h1>
          <p className="text-textSecondary max-w-3xl">
            This section explains how the final machine learning model was
            validated, evaluated, and interpreted using standard industry
            metrics.
          </p>
        </motion.div>
        {/* ================= VALIDATION STRATEGY ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <StrategyCard
            icon={GitBranch}
            title="Train–Test Split"
            value="80% / 20%"
            desc="Model trained on 80% of the dataset and evaluated on unseen data."
          />
          <StrategyCard
            icon={Activity}
            title="Cross Validation"
            value="Stratified K-Fold"
            desc="Ensures stable performance across different data partitions."
          />
          <StrategyCard
            icon={CheckCircle}
            title="Model Selection"
            value="ROC-AUC + Accuracy"
            desc="Best model selected based on discrimination and correctness."
          />
        </div>
        {/* ================= ALGORITHM COMPARISON ================= */}
        <div className="mb-24">
          <ModelComparisonTable data={metrics.model_comparison} />
        </div>
        {/* ================= PERFORMANCE + ROC ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24 items-stretch">
          {/* Performance Metrics */}
          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <PerformanceBars
              accuracy={p.accuracy}
              recall={p.recall}
              precision={p.precision}
              f1={p.f1_score}
            />
          </motion.div>
          {/* ROC Curve */}
          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <RocCurve auc={p.roc_auc} />
          </motion.div>
        </div>
        {/* ================= VISUAL DIAGNOSTICS ================= */}
        <h2 className="text-2xl font-semibold text-textPrimary mb-8 mt-24">
          Visual Model Diagnostics
        </h2>
        {/* Tabs */}
        <div className="relative flex flex-wrap gap-8 border-b border-borderSubtle mb-10">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative flex items-center gap-2 pb-3 text-sm font-medium
              ${activeTab === key ? "text-primary" : "text-textSecondary"}
            `}
            >
              <Icon size={16} />
              {label}

              {activeTab === key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary rounded"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {activeTab === "correlation" && (
            <CorrelationMatrix
              matrix={metrics.correlation_matrix}
              features={metrics.features}
            />
          )}

          {activeTab === "confusion" && (
            <ConfusionMatrix {...metrics.confusion_matrix} />
          )}

          {activeTab === "importance" && (
            <FeatureImportance data={metrics.feature_importance} />
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ================= REUSABLE ================= */

function StrategyCard({ icon: Icon, title, value, desc }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-card rounded-2xl shadow-lg border border-borderSubtle p-7"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className="text-primary" />
        <p className="text-sm text-textSecondary">{title}</p>
      </div>
      <p className="text-xl font-semibold text-textPrimary mb-1">{value}</p>
      <p className="text-sm text-textSecondary">{desc}</p>
    </motion.div>
  );
}

function Center({ text, error }) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        error ? "text-red-500" : "text-textSecondary"
      }`}
    >
      {text}
    </div>
  );
}
