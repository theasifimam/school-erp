"use client";

import { Conversation } from "../_types/conversations";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, ArrowLeft, Phone, Video, Info } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

interface ActiveConversationProps {
  conversation: Conversation;
  onBack?: () => void;
  className?: string;
}

export default function ActiveConversation({
  conversation,
  onBack,
  className,
}: ActiveConversationProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Card
      className={cn(
        "flex flex-col bg-background/95 backdrop-blur-sm h-[calc(100vh-170px)] rounded-3xl py-0",
        className
      )}
    >
      <CardHeader className="px-4 pt-4 border-b flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          {isMobile && onBack && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-1"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}

          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src={conversation.customer.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              {conversation.customer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold truncate">
                {conversation.customer.name}
              </CardTitle>
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground truncate pb-0">
              {conversation.customer.email}
              <span className="hidden sm:inline">
                {" "}
                • {conversation.customer.lastActive}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary"
          >
            <Phone className="h-10 w-10" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary"
          >
            <Video className="h-10 w-10" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-3xl gap-5">
              <DropdownMenuItem className="gap-2 rounded-3xl">
                <Info className="h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 rounded-3xl">
                <Phone className="h-4 w-4" />
                Call Customer
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-destructive rounded-3xl">
                <MoreVertical className="h-4 w-4" />
                Delete Conversation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <div className="flex-1 overflow-hidden flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-2 space-y-1.5 bg-gradient-to-b from-muted/10 to-background">
          <div className="w-full text-center mb-4">
            <span className="inline-block px-3 py-1 text-xs text-muted-foreground bg-muted rounded-full">
              Conversation started {conversation.messages[0]?.time || "today"}
            </span>
          </div>

          {conversation.messages ? (
            conversation.messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                isAdmin={message.sender === "admin"}
                showTime={
                  index === conversation.messages.length - 1 ||
                  conversation.messages[index + 1]?.sender !== message.sender
                }
              />
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
              <div className="rounded-full bg-muted p-3">
                <MessageBubble
                  className="h-10 w-10"
                  message={undefined}
                  isAdmin={false}
                />
              </div>
              <p>No messages yet</p>
              <p className="text-sm text-center max-w-xs">
                Start the conversation by sending your first message
              </p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
