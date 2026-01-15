import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  HeartPulse,
  Activity,
  BrainCircuit,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useEffect } from "react";

/* ======================================================
   HOME – CARDIORISK AI 
   ====================================================== */

export default function Home() {
  return (
    <div className="min-h-screen bg-bgMain overflow-hidden">
      {/* ==================================================
                HERO
        =============================================== */}
      <section className="px-3 pt-28 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Heart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{
              opacity: 1,
              scale: [1, 1.08, 1],
              rotate: [0, 5, -5, 0],
              transition: { duration: 2, repeat: Infinity, repeatType: "loop" },
            }}
            className="flex justify-center mb-6 drop-shadow-lg"
          >
            <HeartPulse size={105} className="text-primary" />
          </motion.div>

          {/* Heading with staggered words */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="text-6xl md:text-5xl font-semibold text-textPrimary mb-5 "
          >
            {"Your Heart Has a Story.".split("  ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {word}{" "}
              </motion.span>
            ))}
            <br />
            <span className="text-primary ">We Help You Read It.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-textSecondary max-w-2xl mx-auto mb-8"
          >
            CardioRisk AI applies interpretable machine learning to estimate
            cardiovascular disease risk using clinical and lifestyle data.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-5 flex-wrap"
          >
            <NavLink
              to="/assessment"
              className="px-8 py-3 rounded-xl bg-primary text-white
                   font-medium shadow-lg hover:opacity-90 transition-transform transform motion-safe:motion-reduce:scale-1"
            >
              Start Risk Assessment
            </NavLink>

            <NavLink
              to="/model-info"
              className="px-8 py-3 rounded-xl border border-borderSubtle
                   text-textPrimary hover:bg-card transition"
            >
              Explore the AI Model
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          WHY IT MATTERS
      ================================================== */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoCard
            icon={Activity}
            title="Silent Risk"
            text="Cardiovascular disease often develops quietly without clear early symptoms."
          />
          <InfoCard
            icon={BrainCircuit}
            title="AI Insight"
            text="Machine learning detects subtle, non-linear health patterns."
          />
          <InfoCard
            icon={ShieldCheck}
            title="Informed Action"
            text="Transparent predictions support proactive health decisions."
          />
        </div>
      </section>

      {/* ==================================================
           ANIMATED RISK COUNTER 
      ================================================== */}
      <section className="px-4 py-20 bg-card border-y border-borderSubtle">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-textPrimary mb-4">
            Most cardiovascular risks go unnoticed.
          </h2>

          <p className="text-textSecondary mb-10">
            Based on population data, a significant percentage of individuals
            remain unaware of their actual risk.
          </p>

          <RiskCounter value={78} />

          <p className="text-xs text-muted mt-6">
            Indicative population-level estimate for demonstration purposes.
          </p>
        </div>
      </section>

      {/* ==================================================
          PROCESS FLOW
      ================================================== */}
      <section className="px-4 py-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-textPrimary text-center mb-16">
            From Data to Decision
          </h2>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
            <ProcessStep
              step="01"
              icon={Activity}
              title="Health Inputs"
              text="Age, blood pressure, BMI, lifestyle and metabolic indicators."
            />
            <ProcessStep
              step="02"
              icon={BrainCircuit}
              title="AI Evaluation"
              text="Random Forest model analyzes learned risk patterns."
            />
            <ProcessStep
              step="03"
              icon={BarChart3}
              title="Risk Insight"
              text="Clear probability-based risk score with interpretability."
            />
          </div>
        </div>
      </section>

      {/* ==================================================
          FINAL CTA
      ================================================== */}
      <section className="px-4 pb-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-card border border-borderSubtle
                     rounded-2xl p-10 text-center shadow-lg"
        >
          <h3 className="text-xl font-semibold text-textPrimary mb-3">
            Prevention begins with awareness.
          </h3>

          <p className="text-textSecondary mb-8">
            Understand your cardiovascular risk using transparent AI.
          </p>

          <NavLink
            to="/assessment"
            className="inline-flex items-center gap-2 px-9 py-3
                       rounded-xl bg-primary text-white font-medium
                       hover:opacity-90 transition"
          >
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              Predict My Risk
            </motion.span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <ArrowRight size={16} />
            </motion.div>
          </NavLink>
        </motion.div>
      </section>
    </div>
  );
}

/* ======================================================
   COMPONENTS
   ====================================================== */

function InfoCard({ icon: Icon, title, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-borderSubtle rounded-xl p-6 shadow-lg hover:shadow-2xl cursor-pointer"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="p-3 rounded-lg bg-primary/10 w-fit mb-4"
      >
        <Icon size={20} className="text-primary" />
      </motion.div>
      <h3 className="text-lg font-semibold text-textPrimary mb-2">{title}</h3>
      <p className="text-sm text-textSecondary leading-relaxed">{text}</p>
    </motion.div>
  );
}

function RiskCounter({ value }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    animate(count, value, { duration: 1.8, ease: "easeOut" });
  }, [value]);

  return (
    <div className="flex justify-center">
      <div className="relative">
        <span className="text-7xl font-bold text-primary">
          <motion.span>{rounded}</motion.span>%
        </span>
      </div>
    </div>
  );
}

function ProcessStep({ step, icon: Icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative bg-card border border-borderSubtle rounded-xl p-7"
    >
      <span className="absolute -top-6 -right-4 text-6xl font-bold text-primary/10">
        {step}
      </span>

      <motion.div
        whileHover={{ scale: 1.08, rotate: [0, 3, -3, 0] }}
        transition={{ duration: 0.5 }}
        className="p-3 rounded-lg bg-primary/10 w-fit mb-4"
      >
        <Icon size={20} className="text-primary" />
      </motion.div>

      <h4 className="text-lg font-semibold text-textPrimary mb-2">{title}</h4>
      <p className="text-sm text-textSecondary leading-relaxed">{text}</p>
    </motion.div>
  );
}
