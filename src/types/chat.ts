export interface ChatMessage {
    id: string;
    content: string;
    timestamp: string;
    sender: 'user' | 'other';
    isRead: boolean;
}

export interface Chat {
    id: string;
    name: string;
    avatar?: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    isActive: boolean;
    messages: ChatMessage[];
}