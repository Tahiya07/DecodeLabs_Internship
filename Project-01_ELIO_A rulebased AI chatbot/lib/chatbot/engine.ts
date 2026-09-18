import { normalizeInput } from "./normalize";
import { fallback, rules } from "./rules";
import type { ChatResponse, ConversationContext } from "./types";

export function respondTo(
  message: string,
  context: ConversationContext,
): ChatResponse {
  const input = normalizeInput(message);
  const rule = rules.find((candidate) => candidate.test(input));
  return rule
    ? {
        text: rule.response(context),
        ruleId: rule.id,
        category: rule.category,
        isExit: rule.isExit,
      }
    : fallback;
}
