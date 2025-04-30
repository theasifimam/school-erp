"use client";

import { useState, useMemo } from "react";
import { Conversation } from "../_types/conversations";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Plus,
  MailPlus,
  Archive,
  Users,
  Mail,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ConversationItem from "./ConversationItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function ConversationsList({
  conversations,
  activeChat,
  setActiveChat,
  onNewConversation,
  onNewGroup,
  onArchiveAll,
  onMarkAllAsRead,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter conversations based on search and tab
  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const matchesSearch =
        conversation.customer.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        conversation.lastMessage
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "unread" && conversation.unread > 0) ||
        (activeTab === "archived" && conversation?.archived);

      return matchesSearch && matchesTab;
    });
  }, [conversations, searchTerm, activeTab]);

  const unreadCount = useMemo(
    () =>
      conversations.reduce(
        (count, conv) => count + (conv.unread > 0 ? 1 : 0),
        0
      ),
    [conversations]
  );

  return (
    <Card className="lg:col-span-4 gap-2 flex flex-col h-[calc(100vh-110px)] scroll-auto border-r rounded-3xl">
      <CardHeader className="px-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl font-semibold">Messages</CardTitle>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-full"
              onClick={() => {
                // Filter button functionality
                // You can implement filter logic here
              }}
            >
              <Filter className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="h-8 rounded-full gap-1"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">New</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onNewConversation} className="gap-2">
                  <MailPlus className="h-4 w-4" />
                  New Message
                </DropdownMenuItem>
                {onNewGroup && (
                  <DropdownMenuItem onClick={onNewGroup} className="gap-2">
                    <Users className="h-4 w-4" />
                    New Group
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                {onMarkAllAsRead && (
                  <DropdownMenuItem onClick={onMarkAllAsRead} className="gap-2">
                    <Mail className="h-4 w-4" />
                    Mark All as Read
                  </DropdownMenuItem>
                )}
                {onArchiveAll && (
                  <DropdownMenuItem onClick={onArchiveAll} className="gap-2">
                    <Archive className="h-4 w-4" />
                    Archive All
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>

      <div className="px-4 pb-2 border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full rounded-full text-xs">
            <TabsTrigger value="all" className="rounded-full">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="rounded-full text-xs">
              <div className="flex items-center gap-2">
                Unread
                {unreadCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="h-5 w-5 p-0 flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </TabsTrigger>
            <TabsTrigger value="archived" className="rounded-full text-xs">
              Archived
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          {filteredConversations.length > 0 ? (
            <div className="divide-y">
              {filteredConversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={activeChat === conversation.id}
                  onClick={() => setActiveChat(conversation.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <Search className="h-8 w-8 text-muted-foreground mb-2" />
              <CardDescription>
                {searchTerm
                  ? "No conversations match your search"
                  : activeTab === "unread"
                  ? "No unread conversations"
                  : "No archived conversations"}
              </CardDescription>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
