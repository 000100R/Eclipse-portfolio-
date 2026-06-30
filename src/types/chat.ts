export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  links?: { label: string; href: string }[];
  timestamp: Date;
}

export type ChatStatus = "idle" | "typing" | "error";
