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
  UserCheck,
  Users,
  ClipboardList,
  RefreshCw,
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
import ViewUserModal from "../components/ViewUserModal";
import {
  useStudentError,
  useStudentLoading,
  useStudents,
  useStudentStore,
} from "@/lib/state/stores/studentStore";
import StudentFormModal from "../components/StudentFormModal";
import { Input } from "@/components/ui";
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal";
import { Pagination } from "@/components/common/Pagination";
import useQueryState from "@/lib/hooks/useQueryState";
import {
  getCurrentAndNextBatches,
  gradeList,
  sectionsList,
} from "@/assets/data/data";
import { Spinner } from "@/components/ui/spinner";
import StudentFormStatusModal from "../components/StudentFormStatusModal";
import { useClassStore } from "@/lib/state/stores/classStore";

export default function StudentManagement() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useQueryState("search", "");
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const [gradeFilter, setGradeFilter] = useQueryState("grade", "all");
  const [sectionFilter, setSectionFilter] = useQueryState("section", "all");
  const [batchFilter, setBatchFilter] = useQueryState("batch", "all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [activeView, setActiveView] = useState("admissions");
  const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);

  const fetchClasses = useClassStore((state) => state.fetchClasses);

  const fetchStudents = useStudentStore((state) => state.fetchStudents);
  const students = useStudents();
  const deleteStudent = useStudentStore((state) => state.deleteStudent);
  const updateStudentStatus = useStudentStore(
    (state) => state.updateStudentStatus
  );
  const isLoading = useStudentLoading();
  const error = useStudentError();

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, [fetchStudents, fetchClasses]);

  const handleStatusChange = async (studentId, newStatus, remarks) => {
    try {
      // Call your API to update status
      await updateStudentStatus(studentId, newStatus, remarks);
      fetchStudents(); // Refresh the list
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Separate students into admissions (pending process) and enrolled
  const admissionStudents = students?.filter((s) =>
    ["submitted", "under_review", "accepted", "rejected", "draft"].includes(
      s.status
    )
  );
  const enrolledStudents = students?.filter((s) => s.status === "enrolled");

  const overviewStats = {
    // Admission Stats
    newApplications:
      students?.filter((s) => s.status === "submitted")?.length || 0,
    underReview:
      students?.filter((s) => s.status === "under_review")?.length || 0,
    accepted: students?.filter((s) => s.status === "accepted")?.length || 0,
    rejected: students?.filter((s) => s.status === "rejected")?.length || 0,
    // Enrolled Stats
    totalEnrolled: enrolledStudents?.length || 0,
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

  // Determine which dataset to use based on active view
  const dataToFilter =
    activeView === "admissions" ? admissionStudents : enrolledStudents;

  // Filter logic
  const filteredUsers = dataToFilter.filter((user) => {
    const searchMatch =
      searchQuery === "" ||
      (user.firstName &&
        user.firstName.toLowerCase().includes(searchQuery?.toLowerCase())) ||
      (user.lastName &&
        user.lastName.toLowerCase().includes(searchQuery?.toLowerCase())) ||
      (user.email &&
        user.email.toLowerCase().includes(searchQuery?.toLowerCase())) ||
      (user._id && user._id.toString().includes(searchQuery));

    const gradeMatch =
      gradeFilter === "all" || user.appliedClass === gradeFilter;
    const sectionMatch =
      sectionFilter === "all" || user.section === sectionFilter;
    const batchMatch = batchFilter === "all" || user.batch === batchFilter;

    return searchMatch && gradeMatch && sectionMatch && batchMatch;
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
    deleteStudent(selectedUser._id);
    setIsDeleteDialogOpen(false);
  };

  const handleBulkDelete = () => {
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

  const getStatusStyles = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "submitted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "under_review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "enrolled":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

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
      {/* Main View Toggle */}
      <div className="mb-6 flex gap-2">
        <Button
          variant={activeView === "admissions" ? "default" : "outline"}
          onClick={() => {
            setActiveView("admissions");
            setCurrentPage(1);
            setSelectedUsers([]);
          }}
          className="rounded-full gap-2"
        >
          <ClipboardList className="h-4 w-4" />
          Admission Process ({admissionStudents?.length || 0})
        </Button>
        <Button
          variant={activeView === "enrolled" ? "default" : "outline"}
          onClick={() => {
            setActiveView("enrolled");
            setCurrentPage(1);
            setSelectedUsers([]);
          }}
          className="rounded-full gap-2"
        >
          <Users className="h-4 w-4" />
          Enrolled Students ({enrolledStudents?.length || 0})
        </Button>
      </div>
      {/* Stats Cards */}
      {activeView === "admissions" ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  New Applications
                </p>
                <p className="text-3xl font-bold mt-2">
                  {overviewStats.newApplications}
                </p>
              </div>
              <FileText className="h-10 w-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Under Review
                </p>
                <p className="text-3xl font-bold mt-2">
                  {overviewStats.underReview}
                </p>
              </div>
              <Clock className="h-10 w-10 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Accepted
                </p>
                <p className="text-3xl font-bold mt-2">
                  {overviewStats.accepted}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rejected
                </p>
                <p className="text-3xl font-bold mt-2">
                  {overviewStats.rejected}
                </p>
              </div>
              <XCircle className="h-10 w-10 text-red-500" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Enrolled
                </p>
                <p className="text-3xl font-bold mt-2">
                  {overviewStats.totalEnrolled}
                </p>
              </div>
              <GraduationCap className="h-10 w-10 text-purple-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  By Grade
                </p>
                <p className="text-lg font-semibold mt-2">View Details →</p>
              </div>
              <Users className="h-10 w-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Active Sessions
                </p>
                <p className="text-lg font-semibold mt-2">
                  {getCurrentAndNextBatches()[0]}
                </p>
              </div>
              <Calendar className="h-10 w-10 text-green-500" />
            </div>
          </div>
        </div>
      )}
      <div className="rounded-3xl shadow-sm border bg-white dark:bg-black border-gray-200 dark:border-gray-900 overflow-hidden">
        {/* Status Filter Tabs - Only for Admissions */}
        {activeView === "admissions" && (
          <Tabs defaultValue="all" className="p-4 pb-2">
            <TabsList className="border p-1">
              <TabsTrigger value="all" className="px-3 text-gray-800">
                All Applications
              </TabsTrigger>
              <TabsTrigger value="submitted" className="px-3 text-gray-800">
                New ({overviewStats.newApplications})
              </TabsTrigger>
              <TabsTrigger value="under_review" className="px-3 text-gray-800">
                Under Review ({overviewStats.underReview})
              </TabsTrigger>
              <TabsTrigger value="accepted" className="px-3 text-gray-800">
                Accepted ({overviewStats.accepted})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="px-3 text-gray-800">
                Rejected ({overviewStats.rejected})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Action Bar */}
        {selectedUsers.length > 0 && (
          <div className="m-4 mb-2 p-3 bg-blue-50 dark:bg-gray-900 rounded-3xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {students
                  .filter((user) => selectedUsers.includes(user.id))
                  .slice(0, 5)
                  .map((user) => (
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
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-xs border-2 border-blue-50 text-white">
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
              {activeView === "admissions" && (
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full gap-1 bg-green-600 hover:bg-green-700"
                >
                  <UserCheck size={14} />
                  Bulk Approve
                </Button>
              )}
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

          {activeView === "enrolled" && (
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
          )}

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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
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
                  {activeView === "admissions" ? "Applicant" : "Student"}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied For
                </th>
                {activeView === "enrolled" && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Section
                  </th>
                )}
                {activeView === "admissions" && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application Date
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {currentItems.length > 0 ? (
                currentItems.map((user) => (
                  <tr
                    key={user.id}
                    className="dark:hover:bg-gray-900 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="rounded border-gray-300 dark:border-gray-900 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.photo} />
                          <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {user.firstName ? user.firstName[0] : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {`${user.firstName || ""} ${user.lastName || ""}`}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {user.email || "No email"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      Class {user.appliedClass || "N/A"}
                    </td>
                    {activeView === "enrolled" && (
                      <td className="px-4 py-3 text-sm">
                        {user.section ? `Section ${user.section}` : "N/A"}
                      </td>
                    )}
                    {activeView === "admissions" && (
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                    )}
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
                        {/* Status update button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsViewModalOpen(true);
                            setIsStatusChangeModalOpen(true);
                          }}
                          className="rounded-full h-8 w-8 p-0"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
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
                          className="rounded-full h-8 w-8 p-0"
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
                          className="rounded-full h-8 w-8 p-0 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
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
                    {activeView === "admissions"
                      ? "No applications match your current filters."
                      : "No enrolled students match your current filters."}
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
        updateStudentStatus={isStatusChangeModalOpen}
        onStatusChange={handleStatusChange}
      />

      <StudentFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        studentData={selectedUser}
        onSuccess={() => {
          setIsEditModalOpen(false);
          fetchStudents();
        }}
        mode="edit"
      />
      {/* <StudentFormStatusModal
        isOpen={isStatusChangeModalOpen}
        onClose={() => setIsStatusChangeModalOpen(false)}
        student={selectedUser}
        onStatusChange={handleStatusChange}
      /> */}

      {/* // Single Delete Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        itemName={
          selectedUser
            ? `${selectedUser.firstName} ${selectedUser.lastName}`
            : ""
        }
        title={
          activeView === "admissions" ? "Delete Application" : "Delete Student"
        }
        description={`Are you sure you want to delete this ${
          activeView === "admissions" ? "application" : "student record"
        }? This action can't be undone!`}
        confirmButtonText="Confirm Delete"
      />
      {/* // Bulk Delete Modal */}
      <DeleteConfirmationModal
        isOpen={isBulkDeleteDialogOpen}
        onOpenChange={setIsBulkDeleteDialogOpen}
        onConfirm={handleBulkDelete}
        title={
          activeView === "admissions"
            ? "Delete Applications"
            : "Delete Students"
        }
        description={`Are you sure you want to delete these ${
          activeView === "admissions" ? "applications" : "student records"
        }? This action cannot be undone.`}
        confirmButtonText="Confirm Delete"
      />
    </div>
  );
}
