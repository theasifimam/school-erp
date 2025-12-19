import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  GraduationCap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const StudentFormStatusModal = ({
  isOpen,
  onOpenChange,
  student,
  onStatusChange,
  onClose,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  // Reset form when modal opens with new student
  useEffect(() => {
    if (isOpen && student) {
      setSelectedStatus(student.status || "");
      setRemarks("");
    }
  }, [isOpen, student]);

  const statusOptions = [
    { value: "submitted", label: "Submitted", icon: FileText, color: "blue" },
    {
      value: "under_review",
      label: "Under Review",
      icon: Clock,
      color: "yellow",
    },
    { value: "accepted", label: "Accepted", icon: CheckCircle, color: "green" },
    { value: "rejected", label: "Rejected", icon: XCircle, color: "red" },
    {
      value: "enrolled",
      label: "Enrolled",
      icon: GraduationCap,
      color: "purple",
    },
  ];

  const handleSubmit = () => {
    if (selectedStatus && selectedStatus !== student?.status) {
      onStatusChange(student._id, selectedStatus, remarks);
      onOpenChange(false);
    }
  };

  const getColorClasses = (color, isSelected) => {
    const colors = {
      blue: isSelected
        ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
        : "border-gray-200 bg-white hover:border-blue-300 dark:bg-gray-950 dark:border-gray-800 dark:hover:border-blue-700",
      yellow: isSelected
        ? "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
        : "border-gray-200 bg-white hover:border-yellow-300 dark:bg-gray-950 dark:border-gray-800 dark:hover:border-yellow-700",
      green: isSelected
        ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
        : "border-gray-200 bg-white hover:border-green-300 dark:bg-gray-950 dark:border-gray-800 dark:hover:border-green-700",
      red: isSelected
        ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
        : "border-gray-200 bg-white hover:border-red-300 dark:bg-gray-950 dark:border-gray-800 dark:hover:border-red-700",
      purple: isSelected
        ? "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
        : "border-gray-200 bg-white hover:border-purple-300 dark:bg-gray-950 dark:border-gray-800 dark:hover:border-purple-700",
    };
    return colors[color] || colors.blue;
  };

  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Change Application Status
          </DialogTitle>
          <DialogDescription>
            Update the status for {student.firstName} {student.lastName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto">
          {/* Current Status */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-3xl border border-gray-200 dark:border-gray-800">
            <Label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
              Current Status
            </Label>
            <p className="text-lg font-semibold capitalize">
              {student.status?.replace("_", " ")}
            </p>
          </div>

          {/* Status Options */}
          <div>
            <Label className="block mb-3">Select New Status</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedStatus === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedStatus(option.value)}
                    className={`p-4 rounded-full border-2 transition-all flex items-center gap-3 ${getColorClasses(
                      option.color,
                      isSelected
                    )}`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isSelected ? "" : "text-gray-400 dark:text-gray-600"
                      }`}
                    />
                    <span className={`font-medium`}>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Remarks */}
          <div>
            <Label htmlFor="remarks" className="mb-2">
              Remarks (Optional)
            </Label>
            <Textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add any notes about this status change..."
              className="resize-none"
              rows={4}
            />
          </div>

          {/* Status Change Info */}
          {selectedStatus === "accepted" && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-3xl p-4">
              <p className="text-sm text-green-800 dark:text-green-300">
                💡 After accepting, you can enroll the student from the accepted
                applications list.
              </p>
            </div>
          )}
          {selectedStatus === "enrolled" && (
            <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-3xl p-4">
              <p className="text-sm text-purple-800 dark:text-purple-300">
                💡 This will move the student to the "Enrolled Students"
                section. Make sure to assign a section.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedStatus || selectedStatus === student.status}
          >
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentFormStatusModal;
