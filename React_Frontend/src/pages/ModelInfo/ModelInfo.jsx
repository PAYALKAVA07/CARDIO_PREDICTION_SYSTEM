import { motion } from "framer-motion";
import {
  Database,
  SlidersHorizontal,
  Layers,
  Brain,
  HeartPulse
} from "lucide-react";

export default function ModelInfo() {
  return (
    <div className="min-h-screen bg-bgMain px-4 py-16">
      <div className="max-w-5xl mx-auto">

        {/* ================= HERO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl font-semibold text-textPrimary mb-4">
            Inside the AI Engine
          </h1>
          <p className="text-textSecondary text-lg max-w-3xl mx-auto">
            A transparent look at how clinical data is transformed into an
            interpretable cardiovascular risk prediction.
          </p>
        </motion.div>

        {/* ================= FLOW ================= */}

        <FlowSection
          icon={Database}
          title="Raw Clinical Inputs"
        >
          The system begins with structured clinical and lifestyle information
          such as age, blood pressure, BMI, and daily habits. All inputs are
          validated to ensure consistency before entering the AI pipeline.
        </FlowSection>

        <FlowSection
          icon={SlidersHorizontal}
          title="Feature Engineering"
          stats={[
            { label: "Total Features", value: "13" },
            { label: "Categories", value: "Demographics · Vitals · Lifestyle" }
          ]}
        >
          Raw inputs are transformed into meaningful features that capture
          physiological patterns relevant to cardiovascular disease risk.
        </FlowSection>

        <FlowSection
          icon={Layers}
          title="Normalization Layer"
          stats={[
            { label: "Normalized Vectors", value: "12" },
            { label: "Purpose", value: "Balanced model input" }
          ]}
          expandable
        >
          Feature values are normalized to ensure fair contribution across all
          inputs. This prevents dominance by any single measurement and improves
          learning stability.
        </FlowSection>

        {/* ================= SIDE BY SIDE ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

          <FlowSection
            icon={Brain}
            title="Decision Engine"
            noMargin
          >
            A Random Forest Classifier evaluates multiple decision paths in
            parallel. This ensemble approach improves robustness and reduces the
            likelihood of overfitting on medical data.
          </FlowSection>

          <FlowSection
            icon={HeartPulse}
            title="Risk Interpretation"
            noMargin
          >
            The model produces a probability-based risk score, which is
            translated into an interpretable risk category to support informed
            health decisions.
          </FlowSection>

        </div>

        {/* ================= FOOTER ================= */}
        <p className="text-xs text-muted text-center mt-20 max-w-3xl mx-auto">
          Detailed validation strategy, cross-validation results, and performance
          metrics are presented separately in the Model Comparison section for
          technical evaluation.
        </p>
      </div>
    </div>
  );
}

/* ======================================================
   FLOW SECTION COMPONENT
   ====================================================== */

function FlowSection({
  icon: Icon,
  title,
  children,
  stats,
  expandable,
  noMargin
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={noMargin ? "" : "mb-16"}
    >
      <div className="bg-card rounded-2xl shadow-lg border border-borderSubtle p-7">

        {/* Accent */}
        <div className="h-1 w-12 bg-primary rounded-full mb-4" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-primaryLight">
            <Icon size={20} className="text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-textPrimary">
            {title}
          </h2>
        </div>

        {/* Content */}
        <p className="text-textSecondary leading-relaxed">
          {children}
        </p>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="border border-borderSubtle rounded-xl p-4"
              >
                <p className="text-sm text-textSecondary">{s.label}</p>
                <p className="text-xl font-semibold text-textPrimary mt-1">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Expandable */}
        {expandable && (
          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-medium text-primary">
              View normalized feature mapping
            </summary>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-textSecondary">
              <li>Age → age_scaled</li>
              <li>BMI → bmi_scaled</li>
              <li>Systolic BP → ap_hi_scaled</li>
              <li>Diastolic BP → ap_lo_scaled</li>
              <li>Cholesterol → encoded</li>
              <li>Glucose → encoded</li>
              <li>Smoking → binary</li>
              <li>Alcohol → binary</li>
              <li>Physical Activity → binary</li>
              <li>Gender → encoded</li>
              <li>Derived index</li>
              <li>Bias term</li>
            </ul>
          </details>
        )}
      </div>
    </motion.div>
  );
}
