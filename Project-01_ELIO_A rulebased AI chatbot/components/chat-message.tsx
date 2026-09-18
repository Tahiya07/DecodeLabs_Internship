"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ChatMessage as ChatMessageType } from "@/lib/chatbot/types";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      layout
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
      className={`message ${message.role}`}
    >
      <p className="message-label">
        {message.role === "user" ? "YOU" : "ELIO"}
      </p>
      <p className="message-text">{message.content}</p>
    </motion.article>
  );
}
