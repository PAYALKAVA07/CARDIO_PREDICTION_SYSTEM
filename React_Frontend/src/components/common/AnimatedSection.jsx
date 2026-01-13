import { motion } from "framer-motion";

export default function AnimatedSection({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
