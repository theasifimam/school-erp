// AttendanceModal.jsx
import { useState, useEffect } from "react";
import { Check, X, Clock, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AttendanceModal({
  isOpen,
  onClose,
  students,
  date,
  selectedClass,
  attendance,
  onSave,
  onAttendanceChange,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [localAttendance, setLocalAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Format date for display and comparisons
  const formattedDate = date.toISOString().split("T")[0];

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.class === selectedClass &&
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Initialize local attendance state from props
  useEffect(() => {
    setLocalAttendance(attendance);
  }, [attendance]);

  // Toggle attendance status for a student
  const toggleAttendance = (studentId, status) => {
    setLocalAttendance((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.studentId === studentId && item.date === formattedDate
      );

      if (existingIndex >= 0) {
        // Update existing record
        const updated = [...prev];
        updated[existingIndex].status = status;
        return updated;
      } else {
        // Add new record
        return [
          ...prev,
          {
            studentId,
            date: formattedDate,
            status,
          },
        ];
      }
    });
  };

  // Get attendance status for a student
  const getAttendanceStatus = (studentId) => {
    const record = localAttendance.find(
      (item) => item.studentId === studentId && item.date === formattedDate
    );
    return record ? record.status : null;
  };

  // Mark all students with a specific status
  const markAllStudents = (status) => {
    filteredStudents.forEach((student) => {
      toggleAttendance(student.id, status);
    });
  };

  // Handle save
  const handleSave = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await onAttendanceChange(localAttendance);
      await onSave();
      onClose();
    } catch (error) {
      console.error("Failed to save attendance", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Record Attendance for {selectedClass}</DialogTitle>
          <div className="text-sm text-gray-500">
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </DialogHeader>

        <div className="flex items-center justify-between mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => markAllStudents("present")}
              className="rounded-full px-4"
            >
              <Check className="h-4 w-4 mr-1" />
              All Present
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => markAllStudents("absent")}
              className="rounded-full px-4"
            >
              <X className="h-4 w-4 mr-1" />
              All Absent
            </Button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          <Table>
            <TableHeader className="bg-gray-50 sticky top-0">
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead className="hidden md:table-cell">
                  Roll Number
                </TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => {
                  const status = getAttendanceStatus(student.id);
                  return (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {student.rollNumber}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            variant={
                              status === "present" ? "default" : "outline"
                            }
                            size="sm"
                            className={`h-8 rounded-full ${
                              status === "present"
                                ? "bg-green-600 hover:bg-green-700"
                                : ""
                            }`}
                            onClick={() =>
                              toggleAttendance(student.id, "present")
                            }
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Present
                          </Button>
                          <Button
                            variant={
                              status === "absent" ? "default" : "outline"
                            }
                            size="sm"
                            className={`h-8 rounded-full ${
                              status === "absent"
                                ? "bg-red-600 hover:bg-red-700"
                                : ""
                            }`}
                            onClick={() =>
                              toggleAttendance(student.id, "absent")
                            }
                          >
                            <X className="h-4 w-4 mr-1" />
                            Absent
                          </Button>
                          <Button
                            variant={status === "late" ? "default" : "outline"}
                            size="sm"
                            className={`h-8 rounded-full ${
                              status === "late"
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : ""
                            }`}
                            onClick={() => toggleAttendance(student.id, "late")}
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            Late
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <DialogFooter>
          <Button variant="outline" className="rounded-full" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Attendance"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
