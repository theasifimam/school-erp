"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { Label } from "../../../components/ui";

export const LeaveRequestModal = ({
  showLeaveModal,
  setShowLeaveModal,
  leaveRequest,
  setLeaveRequest,
  handleSubmitLeave,
  LEAVE_TYPES,
}) => {
  return (
    <Dialog open={showLeaveModal} onOpenChange={setShowLeaveModal}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>Request Leave</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="leave-type">Leave Type</Label>
            <Select
              value={leaveRequest.type}
              onValueChange={(value) =>
                setLeaveRequest({ ...leaveRequest, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                {LEAVE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="leave-start">From Date</Label>
              <Input
                id="leave-start"
                type="date"
                value={format(new Date(leaveRequest.start), "yyyy-MM-dd")}
                onChange={(e) =>
                  setLeaveRequest({
                    ...leaveRequest,
                    start: new Date(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="leave-end">To Date</Label>
              <Input
                id="leave-end"
                type="date"
                value={format(new Date(leaveRequest.end), "yyyy-MM-dd")}
                onChange={(e) =>
                  setLeaveRequest({
                    ...leaveRequest,
                    end: new Date(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="leave-reason">Reason</Label>
            <Textarea
              id="leave-reason"
              value={leaveRequest.reason}
              onChange={(e) =>
                setLeaveRequest({ ...leaveRequest, reason: e.target.value })
              }
              placeholder="Enter reason for leave"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="leave-contact">Emergency Contact Number</Label>
            <Input
              id="leave-contact"
              value={leaveRequest.contactNumber}
              onChange={(e) =>
                setLeaveRequest({
                  ...leaveRequest,
                  contactNumber: e.target.value,
                })
              }
              placeholder="Enter contact number"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowLeaveModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmitLeave}>Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
