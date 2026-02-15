export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface SidebarLogoProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface NewChatButtonProps {
  isOpen: boolean;
}

export interface ChatHistoryProps {
  isOpen: boolean;
}

export interface AccountSettingsProps {
  isOpen: boolean;
}

export interface ChatHistoryItem {
  id: number;
  title: string;
}
