"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { BotState } from "@/lib/chatbot/types";

export function AiCore({ state }: { state: BotState }) {
  const reduce = useReducedMotion();
  const active = state === "processing" || state === "responding";
  const scale =
    state === "responding"
      ? [1, 1.16, 1]
      : state === "exit"
        ? 0.84
        : [1, 1.06, 1];
  return (
    <div
      className={`core-wrap state-${state}`}
      aria-label={`AI core is ${state}`}
    >
      <motion.div
        className="core-orbit orbit-one"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{
          duration: active ? 3 : 14,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <i />
      </motion.div>
      <motion.div
        className="core-orbit orbit-two"
        animate={reduce ? {} : { rotate: -360 }}
        transition={{
          duration: active ? 4 : 18,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <i />
      </motion.div>
      <motion.div
        className="core-glow"
        animate={{ scale, opacity: state === "exit" ? 0.32 : 1 }}
        transition={{
          duration: reduce ? 0 : active ? 0.45 : 3,
          repeat: Array.isArray(scale) ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
      <div className="core-center">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
