export interface Customer {
  id: number;
  name: string;
  email: string;
  avatar: string;
  lastActive: string;
}

export interface Message {
  isNew: any;
  id: number;
  sender: string;
  text: string;
  time: string;
  status: "delivered" | "read" | null,
  groupPosition: "first" | "middle" | "last" | "single";
}

export interface Conversation {
  id: number;
  customer: Customer;
  lastMessage: string;
  unread: number;
  messages?: Message[];
}