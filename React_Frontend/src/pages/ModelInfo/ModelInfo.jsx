// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Brain,
//   ShieldCheck,
//   Layers,
//   ListChecks,SlidersHorizontal
// } from "lucide-react";

// import { useState } from "react";

// export default function ModelInfo() {
//   return (
//     <div className="min-h-screen bg-bgMain px-4 py-10">
//       <div className="max-w-5xl mx-auto">

//         {/* ---------- HERO SECTION ---------- */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-3xl font-semibold text-textPrimary mb-3">
//             AI Model Transparency
//           </h1>
//           <p className="text-textSecondary max-w-2xl mx-auto">
//             Learn how our machine learning system evaluates cardiovascular risk
//             and why the selected model is reliable for prediction.
//           </p>
//         </motion.div>

//         {/* ---------- GRID ---------- */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//           {/* Selected Model */}
//           <AnimatedCard
//             icon={Brain}
//             title="Selected AI Model"
//             delay={0.1}
//           >
//             <p className="text-sm text-textSecondary leading-relaxed">
//               This system uses a{" "}
//               <span className="font-medium text-textPrimary">
//                 Random Forest Classifier
//               </span>{" "}
//               to predict cardiovascular disease risk. The model learns complex
//               relationships between health indicators and outcomes.
//             </p>
//           </AnimatedCard>

//           {/* Why this model */}
//           <AnimatedCard
//             icon={ShieldCheck}
//             title="Why Random Forest?"
//             delay={0.2}
//           >
//             <ul className="text-sm text-textSecondary space-y-2 list-disc list-inside">
//               <li>Captures non-linear medical patterns</li>
//               <li>Robust against noisy real-world health data</li>
//               <li>Reduces overfitting using ensemble learning</li>
//               <li>Widely adopted in healthcare ML systems</li>
//             </ul>
//           </AnimatedCard>

//           {/* Model behavior */}
//           <AnimatedCard
//             icon={Layers}
//             title="How the Model Thinks"
//             delay={0.3}
//           >
//             <p className="text-sm text-textSecondary leading-relaxed">
//               The model combines predictions from multiple decision trees.
//               Each tree analyzes different feature combinations, and the final
//               risk score is obtained by aggregating these decisions.
//             </p>
//           </AnimatedCard>

//           {/* Features */}
//           <AnimatedCard
//             icon={ListChecks}
//             title="Input Features Used"
//             delay={0.4}
//           >
//             <ol className="text-sm text-textSecondary space-y-1 list-decimal list-inside">
//               <li>Age</li>
//               <li>Systolic Blood Pressure</li>
//               <li>Diastolic Blood Pressure</li>
//               <li>Body Mass Index (BMI)</li>
//               <li>Cholesterol Level</li>
//               <li>Glucose Level</li>
//               <li>Smoking Status</li>
//               <li>Alcohol Intake</li>
//               <li>Physical Activity</li>
//               <li>Gender</li>
//             </ol>
//           </AnimatedCard>
//         </div>

//         <FeatureTransformation />


//         {/* ---------- FOOTER NOTE ---------- */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="text-xs text-muted text-center mt-12 max-w-3xl mx-auto"
//         >
//           This transparency page is intended to build trust and understanding.
//           Detailed performance metrics and validation results are available in the
//           Model Comparison section.
//         </motion.p>
//       </div>
//     </div>
//   );
// }

// /* ---------- Animated Card Component ---------- */

// function AnimatedCard({ icon: Icon, title, children, delay = 0 }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay }}
//       whileHover={{ y: -4 }}
//       className="bg-card rounded-2xl shadow-lg p-6 border border-borderSubtle"
//     >
//       <div className="flex items-center gap-3 mb-4">
//         <div className="p-2 rounded-lg bg-primaryLight">
//           <Icon size={20} className="text-primary" />
//         </div>
//         <h2 className="text-lg font-semibold text-textPrimary">
//           {title}
//         </h2>
//       </div>

//       {children}
//     </motion.div>
//   );
// }

// // FeatureTransformation Component

// function FeatureTransformation() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="mt-14">

//       {/* Section Title */}
//       <h2 className="text-xl font-semibold text-textPrimary mb-2">
//         Feature Transformation Pipeline
//       </h2>
//       <p className="text-textSecondary text-sm mb-6 max-w-2xl">
//         Raw clinical inputs are processed, engineered, and normalized before
//         being passed to the machine learning model.
//       </p>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

//         {/* Raw Features */}
//         <motion.div
//           whileHover={{ y: -4 }}
//           className="bg-card rounded-2xl p-6 shadow-lg border border-borderSubtle"
//         >
//           <p className="text-xs text-muted mb-1">
//             FEATURE ENGINEERING
//           </p>
//           <h3 className="text-3xl font-semibold text-textPrimary">
//             13 Features
//           </h3>
//           <p className="text-sm text-textSecondary mt-1">
//             Demographics · Vitals · Lifestyle
//           </p>
//         </motion.div>

//         {/* Normalized */}
//         <motion.div
//           whileHover={{ y: -4 }}
//           className="bg-card rounded-2xl p-6 shadow-lg border border-borderSubtle"
//         >
//           <p className="text-xs text-muted mb-1">
//             NORMALIZED STATE
//           </p>
//           <h3 className="text-3xl font-semibold text-textPrimary">
//             12 Vectors
//           </h3>
//           <p className="text-sm text-textSecondary mt-1">
//             Optimized for ML algorithms
//           </p>
//         </motion.div>
//       </div>

//       {/* Toggle Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
//       >
//         <SlidersHorizontal size={16} />
//         {open ? "Hide normalized features" : "View normalized features"}
//       </button>

//       {/* Expandable Normalized List */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.4 }}
//             className="mt-5 bg-bgMain rounded-xl p-5 border border-borderSubtle"
//           >
//             <div className="flex items-center gap-2 mb-3">
//               <Layers size={16} className="text-primary" />
//               <p className="text-sm font-semibold text-textPrimary">
//                 Normalized Feature Mapping
//               </p>
//             </div>

//             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-textSecondary">
//               <li>Age → age_scaled</li>
//               <li>Gender → gender_encoded</li>
//               <li>BMI → bmi_scaled</li>
//               <li>Systolic BP → ap_hi_scaled</li>
//               <li>Diastolic BP → ap_lo_scaled</li>
//               <li>Cholesterol → cholesterol_encoded</li>
//               <li>Glucose → glucose_encoded</li>
//               <li>Smoking → smoke_binary</li>
//               <li>Alcohol → alco_binary</li>
//               <li>Physical Activity → active_binary</li>
//               <li>Derived Risk Ratio → risk_index</li>
//               <li>Bias Term → intercept</li>
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }




import { motion } from "framer-motion";
import {
  Database,
  SlidersHorizontal,
  Layers,
  Brain,
  HeartPulse
} from "lucide-react";

/* ======================================================
   MODEL TRANSPARENCY – FINAL (SIDE-BY-SIDE REFINEMENT)
   ====================================================== */

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
