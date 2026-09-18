"use client";
import { useCallback, useRef, useState } from "react";
import { respondTo } from "@/lib/chatbot/engine";
import type { BotState, ChatMessage } from "@/lib/chatbot/types";

const wait = (ms: number) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [botState, setBotState] = useState<BotState>("idle");
  const [matchedRule, setMatchedRule] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const submitting = useRef(false);
  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || submitting.current) return;
      submitting.current = true;
      setHasStarted(true);
      setBotState("typing");
      const user: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        timestamp: Date.now(),
      };
      setMessages((previous) => [...previous, user]);
      await wait(260);
      setBotState("processing");
      const response = respondTo(text, {
        hasStarted,
        messageCount: messages.length,
        lastIntent: messages.at(-1)?.ruleId,
      });
      setMatchedRule(response.category);
      await wait(420);
      setBotState("responding");
      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          role: "bot",
          content: response.text,
          timestamp: Date.now(),
          ruleId: response.ruleId,
          category: response.category,
        },
      ]);
      await wait(560);
      setBotState(response.isExit ? "exit" : "idle");
      submitting.current = false;
    },
    [hasStarted, messages],
  );
  return { messages, botState, matchedRule, hasStarted, sendMessage };
}
