"use client";
import { motion, useReducedMotion } from "framer-motion";
const stages = [
  "User input",
  "Normalization",
  "Rule matching",
  "Conditional logic",
  "Response",
];
export function ProcessFlow() {
  const reduce = useReducedMotion();
  return (
    <section id="how-it-works" className="process-section">
      <div className="eyebrow">HOW THE INTELLIGENCE WORKS</div>
      <h2>Transparent by design.</h2>
      <p>Every response follows a visible, deterministic path.</p>
      <div className="pipeline">
        {stages.map((stage, index) => (
          <motion.div
            key={stage}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.08 }}
            className="pipe-stage"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{stage}</strong>
            {index < stages.length - 1 && <i className="connector"></i>}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
