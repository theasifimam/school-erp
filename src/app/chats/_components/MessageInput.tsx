"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, X, Image, Video, FileText, Mic } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface FilePreview {
  file: File;
  preview: string;
  type: "image" | "video" | "audio" | "document";
}

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (value: string) => void;
  handleSendMessage: () => void;
  className?: string;
}

export default function MessageInput({
  newMessage,
  setNewMessage,
  handleSendMessage,
  className,
}: MessageInputProps) {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [showAttachOptions, setShowAttachOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => {
        let type: FilePreview["type"] = "document";
        if (file.type.startsWith("image/")) type = "image";
        else if (file.type.startsWith("video/")) type = "video";
        else if (file.type.startsWith("audio/")) type = "audio";

        return {
          file,
          preview: type === "document" ? "" : URL.createObjectURL(file),
          type,
        };
      });
      setFiles((prev) => [...prev, ...newFiles]);
      setShowAttachOptions(false);
    }
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    URL.revokeObjectURL(fileToRemove.preview);
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (newMessage.trim() || files.length > 0) {
      handleSendMessage();
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      setFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const triggerFileInput = (accept: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept;
      fileInputRef.current.click();
      setShowAttachOptions(false);
    }
  };

  return (
    <div className={cn("p-4 border-t bg-background space-y-3", className)}>
      {/* File Previews */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 bg-muted/50 rounded-lg">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              {file.type === "image" && (
                <img
                  src={file.preview}
                  alt="Preview"
                  className="h-16 w-16 object-cover rounded-md"
                />
              )}
              {file.type === "video" && (
                <video
                  src={file.preview}
                  className="h-16 w-16 object-cover rounded-md"
                  controls={false}
                />
              )}
              {file.type === "audio" && (
                <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center">
                  <Mic className="h-5 w-5" />
                </div>
              )}
              {file.type === "document" && (
                <div className="h-16 w-32 bg-muted rounded-md flex flex-col items-center justify-center p-2">
                  <FileText className="h-4 w-4 mb-1" />
                  <p className="text-xs text-center truncate w-full">
                    {file.file.name}
                  </p>
                </div>
              )}
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
          multiple
        />

        <Popover open={showAttachOptions} onOpenChange={setShowAttachOptions}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" type="button">
              <Paperclip className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start" side="top">
            <div className="grid grid-cols-2 gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-8 px-2 justify-start"
                onClick={() => triggerFileInput("image/*")}
              >
                <Image className="h-4 w-4 mr-2" />
                Image
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-8 px-2 justify-start"
                onClick={() => triggerFileInput("video/*")}
              >
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-8 px-2 justify-start"
                onClick={() => triggerFileInput("audio/*")}
              >
                <Mic className="h-4 w-4 mr-2" />
                Audio
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-8 px-2 justify-start"
                onClick={() => triggerFileInput(".pdf,.doc,.docx")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Document
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Input
          placeholder="Type a message..."
          className="flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          onClick={handleSend}
          disabled={!newMessage.trim() && files.length === 0}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
