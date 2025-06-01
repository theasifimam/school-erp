"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Search,
  Edit,
  Eye,
  Trash2,
  Download,
  Calendar,
  GraduationCap,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewUserModal from "@/components/students/ViewUserModal";
import {
  useStudentError,
  useStudentLoading,
  useStudents,
  useStudentStore,
} from "@/lib/state/stores/studentStore";
import StudentFormModal from "@/components/students/StudentFormModal";
import { Input } from "@/components/ui";
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal";
import { Pagination } from "@/components/common/Pagination";
import { StatsCards } from "@/components/students/StatsCards";
import useQueryState from "@/lib/hooks/useQueryState";
import {
  getCurrentAndNextBatches,
  gradeList,
  sectionsList,
} from "@/assets/data/data";
import { Spinner } from "@/components/ui/spinner";

export default function StudentManagement() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useQueryState("role", "all");
  const [searchQuery, setSearchQuery] = useQueryState("search", "");
  const [gradeFilter, setGradeFilter] = useQueryState("grade", "all");
  const [sectionFilter, setSectionFilter] = useQueryState("section", "all");
  const [batchFilter, setBatchFilter] = useQueryState("batch", "all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [activeTab, setActiveTab] = useState("all");

  const fetchStudents = useStudentStore((state) => state.fetchStudents);
  const students = useStudents();
  const isLoading = useStudentLoading();
  const error = useStudentError();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Mock data for counts
  const overviewStats = {
    total: students?.length || 0,
    active: students?.filter((s) => s.status === "enrolled")?.length || 0,
    pending:
      students?.filter(
        (s) => s.status === "submitted" || s.status === "under_review"
      )?.length || 0,
    rejected: students?.filter((s) => s.status === "rejected")?.length || 0,
    accepted: students?.filter((s) => s.status === "accepted")?.length || 0,
    draft: students?.filter((s) => s.status === "draft")?.length || 0,
  };

  if (isLoading)
    return (
      <div className="w-full flex justify-center mt-8">
        <Spinner size="md" className="bg-black dark:bg-white" />
      </div>
    );
  if (error)
    return <div className="p-10 text-center text-red-500">Error: {error}</div>;
  if (!students || students.length === 0)
    return <div className="p-10 text-center">No students found.</div>;

  // Filter logic for students based on multiple criteria
  const filteredUsers = students.filter((user) => {
    const statusMatch = statusFilter === "all" || user.status === statusFilter;

    // Search across multiple fields
    const searchMatch =
      searchQuery === "" ||
      (user.firstName &&
        user.firstName.toLowerCase().includes(searchQuery?.toLowerCase())) ||
      (user.lastName &&
        user.lastName.toLowerCase().includes(searchQuery?.toLowerCase())) ||
      (user.email &&
        user.email.toLowerCase().includes(searchQuery?.toLowerCase())) ||
      (user._id && user._id.toString().includes(searchQuery));

    // Additional filters (mocked since we don't have this data in original students)
    const gradeMatch =
      gradeFilter === "all" || user.appliedClass === gradeFilter;
    const sectionMatch =
      sectionFilter === "all" || user.section === sectionFilter;
    const batchMatch = batchFilter === "all" || user.batch === batchFilter;

    return (
      statusMatch && searchMatch && gradeMatch && sectionMatch && batchMatch
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDelete = () => {
    // Implement your delete logic here
    console.log("Deleting user:", selectedUser);
    setIsDeleteDialogOpen(false);
  };

  const handleBulkDelete = () => {
    console.log("Deleting users:", selectedUsers);
    setSelectedUsers([]);
    setIsBulkDeleteDialogOpen(false);
  };

  const selectAllUsers = () => {
    if (selectedUsers.length === currentItems.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentItems.map((user) => user.id));
    }
  };

  // Status badge color mapping function
  const getStatusStyles = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "under_review":
        return "bg-yellow-100 text-yellow-800";
      case "enrolled":
        return "bg-purple-100 text-purple-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status icon based on status
  const renderStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "submitted":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "under_review":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "enrolled":
        return <GraduationCap className="h-4 w-4 text-purple-500" />;
      case "draft":
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen">
      <StatsCards overviewStats={overviewStats} />

      <div className="rounded-3xl shadow-sm border bg-white dark:bg-black border-gray-200 dark:border-gray-900 overflow-hidden">
        {/* Tabs */}
        <Tabs
          defaultValue="all"
          className="p-4 pb-2"
          value={activeTab}
          onValueChange={(val) => {
            setActiveTab(val);
            setStatusFilter(val === "all" ? "all" : val);
          }}
        >
          <TabsList className="border p-1">
            <TabsTrigger value="all" className="px-3 text-gray-800 ">
              All
            </TabsTrigger>
            <TabsTrigger value="enrolled" className="px-3 text-gray-800 ">
              Enrolled
            </TabsTrigger>
            <TabsTrigger value="submitted" className="px-3 text-gray-800 ">
              Submitted
            </TabsTrigger>
            <TabsTrigger value="under_review" className="px-3 text-gray-800 ">
              Under Review
            </TabsTrigger>
            <TabsTrigger value="accepted" className="px-3 text-gray-800 ">
              Accepted
            </TabsTrigger>
            <TabsTrigger value="rejected" className="px-3 text-gray-800 ">
              Rejected
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {/* Action Bar */}
        {selectedUsers.length > 0 && (
          <div className="m-4 mb-2 p-3 bg-blue-50 dark:bg-gray-900 rounded-3xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {students
                  .filter((user) => selectedUsers.includes(user.id))
                  .slice(0, 5)
                  .map((user, index) => (
                    <Avatar
                      key={user.id}
                      className="h-8 w-8 border-2 border-blue-50"
                    >
                      <AvatarImage src={user.avatar} alt={user.firstName} />
                      <AvatarFallback className="text-xs bg-gray-400">
                        {user.firstName ? user.firstName[0] : "U"}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                {selectedUsers.length > 5 && (
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-xs border-2 border-blue-50">
                    +{selectedUsers.length - 5}
                  </div>
                )}
              </div>
              <span className="text-sm font-medium ml-1">
                {selectedUsers.length} selected
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-1"
              >
                <Download size={14} />
                Export
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsBulkDeleteDialogOpen(true)}
                className="rounded-full gap-1"
              >
                <Trash2 size={14} />
                Delete
              </Button>
            </div>
          </div>
        )}
        {/* Filter Bar */}
        <div className="p-4 mb-1 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              name="search"
              placeholder="Search by name, email, ID..."
              className="pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent w-full"
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Grade/Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              {gradeList.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sectionFilter} onValueChange={setSectionFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>
              {sectionsList.map((section) => (
                <SelectItem key={section} value={section}>
                  Section {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={batchFilter} onValueChange={setBatchFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Academic Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {getCurrentAndNextBatches().map((batch) => (
                <SelectItem key={batch} value={batch}>
                  {batch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Date Range</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-3xl" align="start">
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <Input
                    type="date"
                    className="w-full border p-2"
                    onChange={(e) =>
                      setDateRange((prev) => ({
                        ...prev,
                        from: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <Input
                    type="date"
                    className="w-full border p-2"
                    onChange={(e) =>
                      setDateRange((prev) => ({
                        ...prev,
                        to: e.target.value,
                      }))
                    }
                  />
                </div>
                <Button className="w-full">Apply</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="">
              <tr>
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      currentItems.length > 0 &&
                      selectedUsers.length === currentItems.length
                    }
                    onChange={selectAllUsers}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade/Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((user) => (
                  <tr
                    key={user.id}
                    className="dark:hover:bg-gray-900 hover:bg-gray-50  dark:border-gray-900"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="rounded border-gray-300 dark:border-gray-900 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {user.firstName?.length}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-800">
                            {user.firstName ? user.firstName[0] : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {`${user.firstName || ""} ${user.lastName || ""}`}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.email || "No email"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      Class {user.appliedClass || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {user.section ? `Section ${user.section}` : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {renderStatusIcon(user.status)}
                        <Badge
                          variant="outline"
                          className={`rounded-full text-xs ${getStatusStyles(
                            user.status
                          )}`}
                        >
                          {user.status || "N/A"}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsViewModalOpen(true);
                          }}
                          className="rounded-full h-8 w-8 p-0 z-20"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsEditModalOpen(true);
                          }}
                          className="rounded-full h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="rounded-full h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No students match your current filters. Try adjusting your
                    search or filter settings.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          className="w-full rounded-none"
        />
      </div>
      {/* Modals */}
      <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        student={selectedUser}
        onEdit={() => {
          setIsViewModalOpen(false);
          setIsEditModalOpen(true);
        }}
      />
      <StudentFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSuccess={() => {
          setIsEditModalOpen(false);
          fetchStudents();
        }}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Student"
        description={`Are you sure you want to delete? This action can't be undone! Think twice before deleting`}
        confirmButtonText="Confirm Delete"
      />

      <DeleteConfirmationModal
        isOpen={isBulkDeleteDialogOpen}
        onOpenChange={setIsBulkDeleteDialogOpen}
        onConfirm={handleBulkDelete}
        title="Delete Students"
        description={` Are you sure you want to delete these students? This action cannot
              be undone.`}
        confirmButtonText="Confirm Delete"
      />
    </div>
  );
}
