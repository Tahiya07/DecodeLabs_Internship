"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiCore } from "./ai-core";
import { ChatMessage } from "./chat-message";
import { useChat } from "@/hooks/use-chat";

const prompts = [
  "What can you do?",
  "How does this work?",
  "What is AI?",
  "Tell me about this project",
];
export function Chatbot() {
  const { messages, botState, matchedRule, hasStarted, sendMessage } =
    useChat();
  const [input, setInput] = useState("");
  const chatEnd = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = input;
    setInput("");
    void sendMessage(value);
  };
  return (
    <section
      id="chat"
      className={`chat-shell ${hasStarted ? "started" : ""}`}
      aria-label="Elio chat"
    >
      <div className="core-head">
        <AiCore state={botState} />
        <div>
          <p className="eyebrow">AI CORE</p>
          <p className="core-status">
            {botState === "exit"
              ? "SESSION CLOSED"
              : botState === "processing"
                ? "RULE ENGINE SCANNING"
                : "RULE ENGINE ACTIVE"}
          </p>
        </div>
      </div>
      <AnimatePresence>
        {matchedRule && hasStarted && (
          <motion.div
            className="rule-notice"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span>RULE MATCHED</span>
            {matchedRule}
          </motion.div>
        )}
      </AnimatePresence>
      {!hasStarted && (
        <div className="landing-copy">
          <p className="eyebrow">LOCAL • DETERMINISTIC • RULE-BASED</p>
          <h1>
            ELIO: RULE-BASED
            <br />
            INTELLIGENCE
          </h1>
          <p>An interactive chatbot powered by explicit decision rules.</p>
          <button
            className="start"
            onClick={() => document.getElementById("composer")?.focus()}
          >
            Start a conversation <span>→</span>
          </button>
          <div className="prompts" aria-label="Suggested prompts">
            {prompts.map((prompt) => (
              <button key={prompt} onClick={() => void sendMessage(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}
      {hasStarted && (
        <div
          className="conversation"
          aria-live="polite"
          aria-label="Conversation"
        >
          <motion.div layout className="messages">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={chatEnd} />
          </motion.div>
        </div>
      )}
      <form className="composer" onSubmit={submit}>
        <label className="sr-only" htmlFor="composer">
          Message Elio
        </label>
        <input
          id="composer"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask Elio something…"
          autoComplete="off"
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={!input.trim()}
        >
          ↗
        </button>
      </form>
    </section>
  );
}
