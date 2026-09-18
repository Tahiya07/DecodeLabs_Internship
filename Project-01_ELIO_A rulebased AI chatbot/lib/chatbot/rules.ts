import type { ChatResponse, ConversationContext } from "./types";

type Rule = {
  id: string;
  category: string;
  test: (input: string) => boolean;
  response: (context: ConversationContext) => string;
  isExit?: boolean;
};
const escapePattern = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const contains = (input: string, phrases: string[]) =>
  phrases.some((phrase) =>
    new RegExp(`(?:^|\\s)${escapePattern(phrase)}(?=\\s|$)`).test(input),
  );

export const rules: Rule[] = [
  {
    id: "exit",
    category: "Exit",
    test: (i) => ["bye", "goodbye", "exit", "quit"].includes(i),
    response: () =>
      "Goodbye. Elio is returning to a quiet idle state — thanks for the conversation.",
    isExit: true,
  },
  {
    id: "greeting",
    category: "Greeting",
    test: (i) =>
      contains(i, [
        "hello",
        "hi",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
      ]),
    response: (c) =>
      c.hasStarted
        ? "Hello again. I am ready to apply another explicit rule."
        : "Hello — I’m Elio, a local rule-based chatbot. What would you like to explore?",
  },
  {
    id: "identity",
    category: "Identity",
    test: (i) =>
      contains(i, [
        "who are you",
        "what are you",
        "your name",
        "what is your name",
      ]),
    response: () =>
      "I’m Elio: a rule-based AI chatbot. My answers come from predefined conditions, not a language model.",
  },
  {
    id: "capabilities",
    category: "Capabilities",
    test: (i) =>
      contains(i, [
        "what can you do",
        "help",
        "capabilities",
        "what do you do",
      ]),
    response: () =>
      "I can respond to predefined questions about AI, this project, and my design. Try asking “What is AI?” or “How does this work?”",
  },
  {
    id: "ai-concept",
    category: "AI Concept",
    test: (i) => contains(i, ["what is ai", "what is artificial intelligence"]),
    response: () =>
      "Artificial intelligence is a broad field for systems that perform tasks associated with reasoning or decisions. This project demonstrates one foundational approach: explicit rules.",
  },
  {
    id: "chatbot-concept",
    category: "AI Concept",
    test: (i) => i.includes("what is a chatbot"),
    response: () =>
      "A chatbot is software that communicates through messages. Elio selects replies with deterministic conditions instead of generating them.",
  },
  {
    id: "ml-concept",
    category: "AI Concept",
    test: (i) => i.includes("what is machine learning"),
    response: () =>
      "Machine learning learns patterns from data. Elio does not use machine learning — its behavior is specified directly in its rule set.",
  },
  {
    id: "project",
    category: "Project",
    test: (i) =>
      contains(i, [
        "what is this project",
        "tell me about this project",
        "project purpose",
      ]),
    response: () =>
      "This is Project 01: a rule-based AI chatbot built to demonstrate normalization, conditional logic, and transparent decision-making.",
  },
  {
    id: "architecture",
    category: "Project",
    test: (i) =>
      contains(i, [
        "how does this work",
        "how were you built",
        "how do you work",
      ]),
    response: () =>
      "Each message is normalized, checked against ordered rules, and mapped to a fixed response. The matched category is shown beside the conversation.",
  },
  {
    id: "wellbeing",
    category: "Casual",
    test: (i) => i.includes("how are you"),
    response: () =>
      "All systems are calm and deterministic. Thanks for asking.",
  },
  {
    id: "thanks",
    category: "Casual",
    test: (i) => contains(i, ["thank you", "thanks"]),
    response: () =>
      "You’re welcome. I’m here whenever you want to inspect another rule.",
  },
];

export const fallback: ChatResponse = {
  ruleId: "fallback",
  category: "Fallback",
  text: "I don’t have a rule for that yet. Try asking about my capabilities, AI, or this project.",
};
