// src/components/messages/EmptyState.tsx
import { Send } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
      <div className="h-20 w-20 rounded-full border-2 border-gray-200 flex items-center justify-center mb-4 bg-gray-50">
        <Send size={32} />
      </div>
      <p className="text-lg font-medium text-black">Your Messages</p>
      <p className="text-sm text-gray-500 mt-1">
        Send private messages to your contacts
      </p>
    </div>
  );
}
