"use client";

import { useState } from "react";
import ConversationsList from "./_components/ConversationsList";
import ActiveConversation from "./_components/ActiveConversation";
import MessageInput from "./_components/MessageInput";
import { conversations as initialConversations } from "./_data/conversations";
import { Conversation } from "./_types/conversations";

export default function MessagesPage() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [activeChat, setActiveChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const activeConversation = conversations.find((c) => c.id === activeChat);

  const handleSendMessage = () => {
    if (newMessage.trim() && activeConversation) {
      // Update the conversation with the new message
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === activeChat) {
          const newMsg = {
            id: Math.max(0, ...conv.messages.map((m) => m.id)) + 1,
            text: newMessage,
            sender: "me",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "sent",
          };
          return {
            ...conv,
            lastMessage: newMessage,
            messages: [...conv.messages, newMsg],
          };
        }
        return conv;
      });

      setConversations(updatedConversations);
      setNewMessage("");
    }
  };

  const handleNewConversation = () => {
    const newId = Math.max(0, ...conversations.map((c) => c.id)) + 1;
    const newConversation: Conversation = {
      id: newId,
      customer: {
        id: newId * 100, // Just creating a unique ID
        name: "New Contact",
        email: "new@example.com",
        avatar: "",
        lastActive: "Just now",
      },
      lastMessage: "Conversation started",
      unread: 0,
      archived: false,
      messages: [],
    };

    setConversations([newConversation, ...conversations]);
    setActiveChat(newId);
  };

  const handleNewGroup = () => {
    const newId = Math.max(0, ...conversations.map((c) => c.id)) + 1;
    const newGroup: Conversation = {
      id: newId,
      customer: {
        id: -newId, // Negative ID for groups
        name: "New Group",
        email: "",
        avatar: "",
        lastActive: "Just now",
      },
      lastMessage: "Group created",
      unread: 0,
      archived: false,
      isGroup: true,
      members: [],
      messages: [],
    };

    setConversations([newGroup, ...conversations]);
    setActiveChat(newId);
  };

  const handleArchiveAll = () => {
    setConversations(
      conversations.map((conv) => ({
        ...conv,
        archived: true,
      }))
    );
    // Optionally deselect the active chat if it was archived
    if (activeConversation) {
      setActiveChat(null);
    }
  };

  const handleMarkAllAsRead = () => {
    setConversations(
      conversations.map((conv) => ({
        ...conv,
        unread: 0,
      }))
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-3rem)] p-4">
      <ConversationsList
        conversations={conversations}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        onNewConversation={handleNewConversation}
        onNewGroup={handleNewGroup}
        onArchiveAll={handleArchiveAll}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
      <div className="lg:col-span-8 h-full flex flex-col">
        {activeConversation ? (
          <>
            <ActiveConversation conversation={activeConversation} />
            <MessageInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          </>
        ) : (
          <div className="h-full flex items-center justify-center bg-card rounded-lg">
            <p className="text-muted-foreground">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
