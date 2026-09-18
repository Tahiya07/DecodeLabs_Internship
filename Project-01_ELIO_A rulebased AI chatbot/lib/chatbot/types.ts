export type MessageRole = "user" | "bot";
export type BotState = "idle" | "typing" | "processing" | "responding" | "exit";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  ruleId?: string;
  category?: string;
}

export interface ChatResponse {
  text: string;
  ruleId: string;
  category: string;
  isExit?: boolean;
}

export interface ConversationContext {
  hasStarted: boolean;
  messageCount: number;
  lastIntent?: string;
}
