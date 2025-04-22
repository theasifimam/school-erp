"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export const EventModal = ({
  open,
  onOpenChange,
  eventData,
  onEventDataChange,
  onSubmit,
  userRole,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-3xl">
        <DialogHeader>
          <DialogTitle>
            {userRole === "admin" ? "Add School Event" : "Schedule Class"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium pl-3">Title</label>
              <Input
                value={eventData.title}
                onChange={(e) =>
                  onEventDataChange({ ...eventData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium pl-3">Type</label>
              <Select
                value={eventData.type}
                onValueChange={(value) =>
                  onEventDataChange({ ...eventData, type: value })
                }
              >
                <SelectTrigger className="rounded-3xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {userRole === "admin" && (
                    <>
                      <SelectItem value="event">School Event</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                    </>
                  )}
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium pl-3">Start</label>
              <Input
                type="datetime-local"
                value={format(eventData.start, "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) =>
                  onEventDataChange({
                    ...eventData,
                    start: new Date(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium pl-3">End</label>
              <Input
                type="datetime-local"
                value={format(eventData.end, "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) =>
                  onEventDataChange({
                    ...eventData,
                    end: new Date(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {userRole === "admin" && (
            <div className="space-y-1">
              <label className="text-sm font-medium pl-3">Location</label>
              <Input
                value={eventData.location || ""}
                onChange={(e) =>
                  onEventDataChange({ ...eventData, location: e.target.value })
                }
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium pl-3">Description</label>
            <Textarea
              value={eventData.description}
              onChange={(e) =>
                onEventDataChange({ ...eventData, description: e.target.value })
              }
            />
          </div>

          {eventData.type === "class" && (
            <div className="space-y-1">
              <label className="text-sm font-medium pl-3">Topic</label>
              <Input
                value={eventData.topic || ""}
                onChange={(e) =>
                  onEventDataChange({ ...eventData, topic: e.target.value })
                }
              />
            </div>
          )}

          {eventData.type === "exam" && (
            <div className="space-y-1">
              <label className="text-sm font-medium">Syllabus</label>
              <Input
                value={eventData.syllabus || ""}
                onChange={(e) =>
                  onEventDataChange({ ...eventData, syllabus: e.target.value })
                }
              />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="rounded-3xl"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={onSubmit} className="rounded-3xl">
            {userRole === "admin" ? "Add Event" : "Schedule Class"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
