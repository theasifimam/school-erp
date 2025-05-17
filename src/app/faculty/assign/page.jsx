"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Search,
  Edit,
  Calendar,
  UserRound,
  BookOpen,
  Filter,
  Clock,
  MoreHorizontal,
} from "lucide-react";

export default function ClassAssignment() {
  const [faculty, setFaculty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      faculty: "Dr. Smith",
      class: "Grade 10 - A",
      subject: "Mathematics",
      schedule: "Mon, Wed, Fri - 9:00 AM",
      status: "active",
      startDate: "2025-01-15",
      endDate: "2025-05-30",
    },
    {
      id: 2,
      faculty: "Ms. Johnson",
      class: "Grade 11 - B",
      subject: "Physics",
      schedule: "Tue, Thu - 10:30 AM",
      status: "active",
      startDate: "2025-01-15",
      endDate: "2025-05-30",
    },
    {
      id: 3,
      faculty: "Mr. Williams",
      class: "Grade 9 - C",
      subject: "History",
      schedule: "Mon, Wed - 1:15 PM",
      status: "pending",
      startDate: "2025-01-20",
      endDate: "2025-05-30",
    },
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [schedule, setSchedule] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bulkAssign, setBulkAssign] = useState(false);
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const facultyMembers = [
    { id: "1", name: "Dr. Smith" },
    { id: "2", name: "Ms. Johnson" },
    { id: "3", name: "Mr. Williams" },
    { id: "4", name: "Mrs. Brown" },
    { id: "5", name: "Dr. Garcia" },
    { id: "6", name: "Mr. Thompson" },
  ];

  const classes = [
    { id: "1", name: "Grade 10 - A" },
    { id: "2", name: "Grade 10 - B" },
    { id: "3", name: "Grade 11 - A" },
    { id: "4", name: "Grade 11 - B" },
    { id: "5", name: "Grade 9 - A" },
    { id: "6", name: "Grade 9 - B" },
    { id: "7", name: "Grade 12 - A" },
    { id: "8", name: "Grade 12 - B" },
  ];

  const subjects = [
    { id: "1", name: "Mathematics" },
    { id: "2", name: "Physics" },
    { id: "3", name: "Chemistry" },
    { id: "4", name: "Biology" },
    { id: "5", name: "History" },
    { id: "6", name: "English" },
    { id: "7", name: "Computer Science" },
    { id: "8", name: "Geography" },
  ];

  const scheduleOptions = [
    { id: "1", time: "Mon, Wed, Fri - 9:00 AM" },
    { id: "2", time: "Tue, Thu - 10:30 AM" },
    { id: "3", time: "Mon, Wed - 1:15 PM" },
    { id: "4", time: "Tue, Thu, Fri - 2:30 PM" },
  ];

  useEffect(() => {
    // Set default dates
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];

    const threeMonthsLater = new Date(today);
    threeMonthsLater.setMonth(today.getMonth() + 3);
    const formattedThreeMonths = threeMonthsLater.toISOString().split("T")[0];

    setStartDate(formattedToday);
    setEndDate(formattedThreeMonths);
  }, []);

  const handleAddAssignment = () => {
    if (bulkAssign) {
      handleBulkAssign();
      return;
    }

    if (
      !faculty ||
      !selectedClass ||
      !selectedSubject ||
      !schedule ||
      !startDate ||
      !endDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const selectedFacultyName = facultyMembers.find(
      (f) => f.id === faculty
    )?.name;
    const selectedClassName = classes.find((c) => c.id === selectedClass)?.name;
    const selectedSubjectName = subjects.find(
      (s) => s.id === selectedSubject
    )?.name;

    const newAssignment = {
      id: assignments.length + 1,
      faculty: selectedFacultyName,
      class: selectedClassName,
      subject: selectedSubjectName,
      schedule: schedule,
      status: "pending",
      startDate: startDate,
      endDate: endDate,
    };

    setAssignments([...assignments, newAssignment]);
    toast.success(`Assignment created for ${selectedFacultyName}`);
    resetForm();
  };

  const handleBulkAssign = () => {
    if (
      selectedFaculties.length === 0 ||
      selectedClasses.length === 0 ||
      !selectedSubject ||
      !schedule ||
      !startDate ||
      !endDate
    ) {
      toast.error("Please fill in all required fields for bulk assignment");
      return;
    }

    const newAssignments = [];
    const selectedSubjectName = subjects.find(
      (s) => s.id === selectedSubject
    )?.name;

    selectedFaculties.forEach((facId) => {
      selectedClasses.forEach((classId) => {
        const selectedFacultyName = facultyMembers.find(
          (f) => f.id === facId
        )?.name;
        const selectedClassName = classes.find((c) => c.id === classId)?.name;

        newAssignments.push({
          id: assignments.length + newAssignments.length + 1,
          faculty: selectedFacultyName,
          class: selectedClassName,
          subject: selectedSubjectName,
          schedule: schedule,
          status: "pending",
          startDate: startDate,
          endDate: endDate,
        });
      });
    });

    setAssignments([...assignments, ...newAssignments]);
    toast.success(`Created ${newAssignments.length} assignments successfully`);
    resetForm();
    setBulkAssign(false);
    setSelectedFaculties([]);
    setSelectedClasses([]);
  };

  const handleDeleteAssignment = (id) => {
    const assignmentToDelete = assignments.find((a) => a.id === id);
    if (assignmentToDelete) {
      setAssignments(assignments.filter((a) => a.id !== id));
      toast.success(`Assignment for ${assignmentToDelete.faculty} deleted`);
    }
  };

  const handleEditAssignment = (assignment) => {
    setSelectedAssignment(assignment);

    // Find IDs from names
    const facId = facultyMembers.find((f) => f.name === assignment.faculty)?.id;
    const classId = classes.find((c) => c.name === assignment.class)?.id;
    const subjectId = subjects.find((s) => s.name === assignment.subject)?.id;

    setFaculty(facId || "");
    setSelectedClass(classId || "");
    setSelectedSubject(subjectId || "");
    setSchedule(assignment.schedule);
    setStartDate(assignment.startDate);
    setEndDate(assignment.endDate);

    setIsEditDialogOpen(true);
  };

  const handleUpdateAssignment = () => {
    if (
      !faculty ||
      !selectedClass ||
      !selectedSubject ||
      !schedule ||
      !startDate ||
      !endDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const selectedFacultyName = facultyMembers.find(
      (f) => f.id === faculty
    )?.name;
    const selectedClassName = classes.find((c) => c.id === selectedClass)?.name;
    const selectedSubjectName = subjects.find(
      (s) => s.id === selectedSubject
    )?.name;

    const updatedAssignments = assignments.map((a) => {
      if (a.id === selectedAssignment.id) {
        return {
          ...a,
          faculty: selectedFacultyName,
          class: selectedClassName,
          subject: selectedSubjectName,
          schedule: schedule,
          startDate: startDate,
          endDate: endDate,
        };
      }
      return a;
    });

    setAssignments(updatedAssignments);
    toast.success("Assignment updated successfully");
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleApproveAssignment = (id) => {
    const updatedAssignments = assignments.map((a) => {
      if (a.id === id) {
        return { ...a, status: "active" };
      }
      return a;
    });

    setAssignments(updatedAssignments);
    toast.success("Assignment approved");
  };

  const resetForm = () => {
    setFaculty("");
    setSelectedClass("");
    setSelectedSubject("");
    setSchedule("");
    setSelectedAssignment(null);
  };

  const toggleFacultySelection = (facultyId) => {
    if (selectedFaculties.includes(facultyId)) {
      setSelectedFaculties(selectedFaculties.filter((id) => id !== facultyId));
    } else {
      setSelectedFaculties([...selectedFaculties, facultyId]);
    }
  };

  const toggleClassSelection = (classId) => {
    if (selectedClasses.includes(classId)) {
      setSelectedClasses(selectedClasses.filter((id) => id !== classId));
    } else {
      setSelectedClasses([...selectedClasses, classId]);
    }
  };

  // Filter assignments based on search term and status
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || assignment.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssignments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);

  return (
    <div className="space-y-6 bg-white text-black dark:bg-black dark:text-white">
      <Tabs defaultValue="assignments" className="w-full">
        <TabsList className="grid grid-cols-2 rounded-full mb-4">
          <TabsTrigger value="assignments" className="rounded-full">
            Assignments
          </TabsTrigger>
          <TabsTrigger value="create" className="rounded-full">
            Create Assignment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card className="rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                {bulkAssign
                  ? "Bulk Assign Classes to Faculty"
                  : "Assign Classes to Faculty"}
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto rounded-full text-xs"
                  onClick={() => setBulkAssign(!bulkAssign)}
                >
                  {bulkAssign ? "Single Assignment" : "Bulk Assignment"}
                </Button>
              </CardTitle>
              <CardDescription>
                {bulkAssign
                  ? "Create multiple class assignments at once by selecting multiple faculty members and classes"
                  : "Create a single class assignment by selecting a faculty member, class, and subject"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {bulkAssign ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Select Faculty Members
                      </h3>
                      <ScrollArea className="h-48 border rounded-2xl p-2">
                        {facultyMembers.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center space-x-2 py-2"
                          >
                            <Checkbox
                              id={`faculty-${member.id}`}
                              checked={selectedFaculties.includes(member.id)}
                              onCheckedChange={() =>
                                toggleFacultySelection(member.id)
                              }
                              className="rounded-full"
                            />
                            <label
                              htmlFor={`faculty-${member.id}`}
                              className="text-sm"
                            >
                              {member.name}
                            </label>
                          </div>
                        ))}
                      </ScrollArea>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedFaculties.length} faculty members selected
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Select Classes
                      </h3>
                      <ScrollArea className="h-48 border rounded-2xl p-2">
                        {classes.map((cls) => (
                          <div
                            key={cls.id}
                            className="flex items-center space-x-2 py-2"
                          >
                            <Checkbox
                              id={`class-${cls.id}`}
                              checked={selectedClasses.includes(cls.id)}
                              onCheckedChange={() =>
                                toggleClassSelection(cls.id)
                              }
                              className="rounded-full"
                            />
                            <label
                              htmlFor={`class-${cls.id}`}
                              className="text-sm"
                            >
                              {cls.name}
                            </label>
                          </div>
                        ))}
                      </ScrollArea>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedClasses.length} classes selected
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Subject
                      </label>
                      <Select
                        value={selectedSubject}
                        onValueChange={setSelectedSubject}
                        className="w-full"
                      >
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent className="rounded-full">
                          {subjects.map((subject) => (
                            <SelectItem
                              key={subject.id}
                              value={subject.id}
                              className="rounded-md"
                            >
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Schedule
                      </label>
                      <Select value={schedule} onValueChange={setSchedule}>
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select Schedule" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg">
                          {scheduleOptions.map((opt) => (
                            <SelectItem
                              key={opt.id}
                              value={opt.time}
                              className="rounded-md"
                            >
                              {opt.time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Start Date
                      </label>
                      <Input
                        type="date"
                        className="rounded-full"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        End Date
                      </label>
                      <Input
                        type="date"
                        className="rounded-full"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Faculty
                      </label>
                      <Select value={faculty} onValueChange={setFaculty}>
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select Faculty" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg">
                          {facultyMembers.map((member) => (
                            <SelectItem
                              key={member.id}
                              value={member.id}
                              className="rounded-md"
                            >
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Class
                      </label>
                      <Select
                        value={selectedClass}
                        onValueChange={setSelectedClass}
                      >
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg">
                          {classes.map((cls) => (
                            <SelectItem
                              key={cls.id}
                              value={cls.id}
                              className="rounded-md"
                            >
                              {cls.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Subject
                      </label>
                      <Select
                        value={selectedSubject}
                        onValueChange={setSelectedSubject}
                      >
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg">
                          {subjects.map((subject) => (
                            <SelectItem
                              key={subject.id}
                              value={subject.id}
                              className="rounded-md"
                            >
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Schedule
                      </label>
                      <Select value={schedule} onValueChange={setSchedule}>
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select Schedule" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg">
                          {scheduleOptions.map((opt) => (
                            <SelectItem
                              key={opt.id}
                              value={opt.time}
                              className="rounded-md"
                            >
                              {opt.time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Start Date
                      </label>
                      <Input
                        type="date"
                        className="rounded-full"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        End Date
                      </label>
                      <Input
                        type="date"
                        className="rounded-full"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleAddAssignment}
                className="rounded-full"
                disabled={
                  bulkAssign
                    ? selectedFaculties.length === 0 ||
                      selectedClasses.length === 0 ||
                      !selectedSubject ||
                      !schedule ||
                      !startDate ||
                      !endDate
                    : !faculty ||
                      !selectedClass ||
                      !selectedSubject ||
                      !schedule ||
                      !startDate ||
                      !endDate
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                {bulkAssign ? "Bulk Assign" : "Assign"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card className="rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Current Assignments
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search assignments..."
                      className="rounded-full pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="rounded-full w-full sm:w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100 dark:bg-gray-900">
                      <TableHead className="font-medium">Faculty</TableHead>
                      <TableHead className="font-medium">Class</TableHead>
                      <TableHead className="font-medium">Subject</TableHead>
                      <TableHead className="font-medium hidden md:table-cell">
                        Schedule
                      </TableHead>
                      <TableHead className="font-medium hidden md:table-cell">
                        Duration
                      </TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                      <TableHead className="text-right font-medium">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length > 0 ? (
                      currentItems.map((assignment) => (
                        <TableRow
                          key={assignment.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-950"
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <UserRound className="h-4 w-4" />
                              {assignment.faculty}
                            </div>
                          </TableCell>
                          <TableCell>{assignment.class}</TableCell>
                          <TableCell>{assignment.subject}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {assignment.schedule}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span className="text-xs">
                                {assignment.startDate} to {assignment.endDate}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                assignment.status === "active"
                                  ? "default"
                                  : "outline"
                              }
                              className={`rounded-full px-2 ${
                                assignment.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                              }`}
                            >
                              {assignment.status === "active"
                                ? "Active"
                                : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              {assignment.status === "pending" && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full hover:bg-green-100 dark:hover:bg-green-900"
                                        onClick={() =>
                                          handleApproveAssignment(assignment.id)
                                        }
                                      >
                                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Approve Assignment</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900"
                                      onClick={() =>
                                        handleEditAssignment(assignment)
                                      }
                                    >
                                      <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit Assignment</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                                      onClick={() =>
                                        handleDeleteAssignment(assignment.id)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete Assignment</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-gray-500"
                        >
                          No assignments found. Try changing your search or
                          filter criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                Showing {currentItems.length} of {filteredAssignments.length}{" "}
                assignments
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <div className="flex items-center justify-center px-2 text-sm">
                  Page {currentPage} of {totalPages || 1}
                </div>
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Assignment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Assignment
            </DialogTitle>
            <DialogDescription>
              Update the class assignment details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Faculty</label>
              <Select value={faculty} onValueChange={setFaculty}>
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Select Faculty" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {facultyMembers.map((member) => (
                    <SelectItem
                      key={member.id}
                      value={member.id}
                      className="rounded-md"
                    >
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {classes.map((cls) => (
                    <SelectItem
                      key={cls.id}
                      value={cls.id}
                      className="rounded-md"
                    >
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Subject</label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {subjects.map((subject) => (
                    <SelectItem
                      key={subject.id}
                      value={subject.id}
                      className="rounded-md"
                    >
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Schedule</label>
              <Select value={schedule} onValueChange={setSchedule}>
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Select Schedule" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {scheduleOptions.map((opt) => (
                    <SelectItem
                      key={opt.id}
                      value={opt.time}
                      className="rounded-md"
                    >
                      {opt.time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Start Date
                </label>
                <Input
                  type="date"
                  className="rounded-full"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  End Date
                </label>
                <Input
                  type="date"
                  className="rounded-full"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button className="rounded-full" onClick={handleUpdateAssignment}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Missing component for Check icon
function Check(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
