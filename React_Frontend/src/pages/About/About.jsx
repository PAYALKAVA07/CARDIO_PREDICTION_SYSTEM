import { motion } from "framer-motion";
import {
  Cpu,
  Code2,
  Eye,
  ShieldCheck,
  Layers,
  Rocket,
  User,
  Sparkles,
  Activity,
  AlertTriangle,
  Network,
} from "lucide-react";

/* ================= ANIMATIONS ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const drawStroke = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const drawLine = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/* ================= PAGE ================= */

export default function About() {
  return (
    <div className="relative bg-bgMain min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

      <div className="max-w-7xl mx-auto px-4 py-20 space-y-28">
        {/* ================= HERO ================= */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1 mb-5 rounded-full bg-primaryLight text-primary text-sm"
          >
            <Sparkles size={14} />
            About the System
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-semibold text-textPrimary mb-4"
          >
            CardioRisk AI
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-textSecondary leading-relaxed"
          >
            CardioRisk AI is a data-driven cardiovascular risk prediction system
            designed to surface hidden risk patterns early — empowering users
            with clarity, transparency, and informed decision-making.
          </motion.p>
        </motion.section>

        {/* ================= STACK ARCHITECTURE ================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-semibold text-textPrimary mb-3"
          >
            Stack Architecture
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-textSecondary max-w-3xl mb-12"
          >
            A full-stack, production-ready architecture combining machine
            learning, scalable APIs, and a modern interactive frontend.
          </motion.p>

          <div className="relative grid md:grid-cols-2 gap-16 items-center">
            {/* Backend */}
            <GlassColumn
              icon={Cpu}
              title="AI & Backend"
              items={[
                {
                  title: "Python & Scikit-Learn",
                  desc: "Model training, preprocessing, and evaluation.",
                },
                {
                  title: "Random Forest Classifier",
                  desc: "Captures non-linear cardiovascular risk patterns.",
                },
                {
                  title: "FastAPI Inference Layer",
                  desc: "Real-time prediction and metrics API.",
                },
              ]}
            />

            {/* SVG CURVED DATA FLOW */}
            <motion.svg
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="hidden md:block absolute inset-0 pointer-events-none"
            >
              <motion.path
                variants={drawStroke}
                d="M 48% 40 C 55% 40, 55% 60, 62% 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary/60"
                markerEnd="url(#arrow)"
              />

              <defs>
                <marker
                  id="arrow"
                  markerWidth="10"
                  markerHeight="10"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
                </marker>
              </defs>
            </motion.svg>

            {/* Frontend */}
            <GlassColumn
              icon={Code2}
              title="Frontend & Experience"
              items={[
                {
                  title: "React + Vite",
                  desc: "Fast, modular frontend architecture.",
                },
                {
                  title: "Tailwind + Framer Motion",
                  desc: "Clean UI with motion-driven feedback.",
                },
                {
                  title: "Cloud Deployment",
                  desc: "Scalable, production-ready hosting.",
                },
              ]}
            />
          </div>
        </motion.section>

        {/* ================= TIMELINE ================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-5xl"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-semibold text-textPrimary mb-10"
          >
            Why cardiovascular risk often goes unnoticed
          </motion.h2>

          <div className="relative flex gap-6">
            <motion.div
              variants={drawLine}
              className="absolute left-[18px] top-0 bottom-24 w-px bg-borderSubtle origin-top"
            />

            <div className="space-y-10">
              <TimelineItem
                icon={Activity}
                title="Silent progression"
                desc="Cardiovascular disease develops quietly over years without obvious symptoms."
              />
              <TimelineItem
                icon={AlertTriangle}
                title="Misleading individual signals"
                desc="Blood pressure, cholesterol, or glucose may appear manageable in isolation."
              />
              <TimelineItem
                icon={Network}
                title="Hidden interactions"
                desc="Combined interactions significantly elevate long-term risk."
              />

              <motion.div
                variants={fadeUp}
                className="ml-12 p-5 rounded-xl bg-card border border-borderSubtle"
              >
                <p className="text-textSecondary">
                  CardioRisk AI identifies these hidden interactions by
                  analyzing multiple clinical and lifestyle signals together —
                  not in isolation.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ================= VALUE SYSTEM ================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-6xl"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-semibold text-textPrimary mb-10"
          >
            What makes this system different
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <ValueCard
              icon={Eye}
              title="Interpretability First"
              desc="Predictions are backed by understandable signals."
            />
            <ValueCard
              icon={ShieldCheck}
              title="Transparent Evaluation"
              desc="Metrics are openly presented and validated."
            />
            <ValueCard
              icon={Layers}
              title="Clear System Separation"
              desc="AI, data, and UX are independently structured."
            />
            <ValueCard
              icon={Rocket}
              title="Built for Real Use"
              desc="Designed and deployed as a real product."
            />
          </div>
        </motion.section>

        {/* ================= AUTHOR ================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="relative bg-card border border-borderSubtle shadow-lg rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 transition-transform duration-300"
          >
            {/* Avatar with animated glow */}
            <motion.div
              className="flex-shrink-0 relative"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
            >
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />
              {/* Avatar circle */}
              <div className="relative w-20 h-20 rounded-full bg-primaryLight flex items-center justify-center text-primary text-3xl font-bold shadow-inner">
                PK
              </div>
            </motion.div>

            {/* Author Info */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs uppercase tracking-widest text-muted mb-1">
                Project Author
              </p>
              <h3 className="text-xl font-semibold text-textPrimary mb-2">
                Payal R. Kava
              </h3>
              <p className="text-textSecondary text-sm leading-relaxed">
                Designed and developed as a full-stack AI system focused on
                transparent cardiovascular risk prediction and real-world
                deployment.
              </p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function TimelineItem({ icon: Icon, title, desc }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative flex gap-4 items-start ml-2"
    >
      <div className="p-2.5 rounded-lg bg-primaryLight text-primary z-10">
        <Icon size={18} />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-textPrimary mb-1">{title}</h4>
        <p className="text-textSecondary leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function GlassColumn({ icon: Icon, title, items }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="p-6 rounded-2xl bg-card/70 backdrop-blur border border-borderSubtle"
    >
      <div className="flex items-center gap-3 mb-6 text-primary">
        <Icon />
        <h3 className="text-sm uppercase tracking-wide">{title}</h3>
      </div>

      <div className="space-y-6">
        {items.map((item, i) => (
          <motion.div key={i} variants={fadeUp}>
            <h4 className="text-base font-semibold text-textPrimary mb-1">
              {item.title}
            </h4>
            <p className="text-textSecondary text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ValueCard({ icon: Icon, title, desc }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="p-5 rounded-xl bg-card border border-borderSubtle"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primaryLight">
          <Icon size={16} className="text-primary" />
        </div>
        <h4 className="text-base font-semibold text-textPrimary">{title}</h4>
      </div>
      <p className="text-textSecondary text-sm">{desc}</p>
    </motion.div>
  );
}
