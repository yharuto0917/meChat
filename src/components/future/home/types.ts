export interface InputBarProps {
  onSend?: (message: string) => void;
}

export type ThinkingLevel = 'low' | 'medium' | 'high';

export interface ModelOption {
  id: string;
  name: string;
}

export interface ToolOption {
  id: string;
  name: string;
  enabled: boolean;
}
