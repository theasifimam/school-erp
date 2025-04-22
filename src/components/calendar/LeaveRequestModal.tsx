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
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";

export const LeaveRequestModal = ({
  open,
  onOpenChange,
  leaveData,
  onLeaveDataChange,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Request Leave
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium pl-3">Leave Type</label>
              <Select
                value={leaveData.type}
                onValueChange={(value) =>
                  onLeaveDataChange({ ...leaveData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal Leave</SelectItem>
                  <SelectItem value="family">Family Reason</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium pl-3">Start Date</label>
              <Input
                type="date"
                value={format(leaveData.start, "yyyy-MM-dd")}
                onChange={(e) =>
                  onLeaveDataChange({
                    ...leaveData,
                    start: new Date(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium pl-3">End Date</label>
              <Input
                type="date"
                value={format(leaveData.end, "yyyy-MM-dd")}
                onChange={(e) =>
                  onLeaveDataChange({
                    ...leaveData,
                    end: new Date(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium pl-3">Reason</label>
            <Textarea
              value={leaveData.reason}
              onChange={(e) =>
                onLeaveDataChange({ ...leaveData, reason: e.target.value })
              }
              placeholder="Please provide details for your leave request"
            />
          </div>
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
            Submit Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
