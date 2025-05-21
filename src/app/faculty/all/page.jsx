"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Plus,
  Search,
  MoreHorizontal,
  Filter,
  Download,
  Upload,
  Trash2,
  Edit,
  Phone,
  Briefcase,
  Check,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination } from "@/components/common/Pagination";
import { toast } from "sonner";
import ViewFacultyModal from "@/components/faculty/ViewFacultyModal";
import DeleteFacultyModal from "@/components/faculty/DeleteFacultyModal";
import {
  useFaculties,
  useFacultyError,
  useFacultyLoading,
  useFacultyStore,
} from "@/lib/state/stores/facultyStore";
import FacultyFormModal from "@/components/faculty/FacultyFormModal";
import useQueryState from "@/lib/hooks/useQueryState";

// Mock data for teachers
const initialTeachers = [
  {
    id: "t-001",
    name: "Dr. Eleanor Rigby",
    email: "eleanor.rigby@schoolerp.com",
    phone: "+1 (555) 123-4567",
    subject: "Mathematics",
    qualification: "Ph.D. in Mathematics",
    joiningDate: "2018-08-15",
    department: "Science",
    address: "123 Penny Lane, Liverpool",
    gender: "Female",
    status: "active",
    salary: 75000,
    image: "/api/placeholder/128/128",
  },
  {
    id: "t-002",
    name: "Prof. Jude Maxwell",
    email: "jude.maxwell@schoolerp.com",
    phone: "+1 (555) 234-5678",
    subject: "English Literature",
    qualification: "M.A. in English",
    joiningDate: "2019-07-10",
    department: "Humanities",
    address: "456 Abbey Road, London",
    gender: "Male",
    status: "active",
    salary: 68000,
    image: "/api/placeholder/128/128",
  },
  {
    id: "t-003",
    name: "Ms. Lucy Diamond",
    email: "lucy.diamond@schoolerp.com",
    phone: "+1 (555) 345-6789",
    subject: "Physics",
    qualification: "M.Sc. in Physics",
    joiningDate: "2020-01-15",
    department: "Science",
    address: "789 Sky Drive, Cambridge",
    gender: "Female",
    status: "on leave",
    salary: 72000,
    image: "/api/placeholder/128/128",
  },
  {
    id: "t-004",
    name: "Mr. Desmond Jones",
    email: "desmond.jones@schoolerp.com",
    phone: "+1 (555) 456-7890",
    subject: "History",
    qualification: "Ph.D. in History",
    joiningDate: "2017-09-05",
    department: "Humanities",
    address: "101 Strawberry Fields, Manchester",
    gender: "Male",
    status: "active",
    salary: 70000,
    image: "/api/placeholder/128/128",
  },
  {
    id: "t-005",
    name: "Mrs. Rita Harrison",
    email: "rita.harrison@schoolerp.com",
    phone: "+1 (555) 567-8901",
    subject: "Chemistry",
    qualification: "Ph.D. in Chemistry",
    joiningDate: "2021-03-22",
    department: "Science",
    address: "202 Blackbird Ave, Oxford",
    gender: "Female",
    status: "active",
    salary: 71000,
    image: "/api/placeholder/128/128",
  },
  {
    id: "t-006",
    name: "Dr. Walter White",
    email: "walter.white@schoolerp.com",
    phone: "+1 (555) 678-9012",
    subject: "Chemistry",
    qualification: "Ph.D. in Chemistry",
    joiningDate: "2015-06-14",
    department: "Science",
    address: "308 Negra Arroyo Lane, Albuquerque",
    gender: "Male",
    status: "inactive",
    salary: 0, // former employee
    image: "/api/placeholder/128/128",
  },
  {
    id: "t-007",
    name: "Ms. Jane Doe",
    email: "jane.doe@schoolerp.com",
    phone: "+1 (555) 789-0123",
    subject: "Physical Education",
    qualification: "B.Ed. in Physical Education",
    joiningDate: "2022-08-01",
    department: "Sports",
    address: "404 Not Found St, Digital City",
    gender: "Female",
    status: "active",
    salary: 65000,
    image: "/api/placeholder/128/128",
  },
];

const departments = [
  "Science",
  "Humanities",
  "Languages",
  "Arts",
  "Sports",
  "Mathematics",
  "Computer Science",
];

export default function TeachersPage() {
  const router = useRouter();
  const [teachers, setFaculties] = useState([]);
  const [searchQuery, setSearchQuery] = useQueryState("search", "");
  const [statusFilter, setStatusFilter] = useQueryState("status", "all");
  const [departmentFilter, setDepartmentFilter] = useQueryState(
    "department",
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    subject: "",
    qualification: "",
    joiningDate: "",
    department: "",
    address: "",
    gender: "",
    status: "active",
    salary: 0,
    image: "/api/placeholder/128/128",
  });

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchFaculties = useFacultyStore((state) => state.fetchFaculties);
  const faculties = useFaculties();
  const isLoading = useFacultyLoading();
  const error = useFacultyError();
  const createFaculty = useFacultyStore((state) => state.createFaculty);
  const updateFaculty = useFacultyStore((state) => state.updateFaculty);
  const deleteFaculty = useFacultyStore((state) => state.deleteFaculty);
  const clearCurrentFaculty = useFacultyStore(
    (state) => state.clearCurrentFaculty
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new teacher
  const handleAddFaculty = () => {
    // Generate a new ID
    const newId = `t-${String(teachers.length + 1).padStart(3, "0")}`;

    // Create new teacher with form data
    const newTeacher = {
      ...formData,
      id: newId,
      joiningDate:
        formData.joiningDate || new Date().toISOString().split("T")[0],
    };

    // Add to teachers list
    setFaculties((prev) => [...prev, newTeacher]);

    // Reset form and close dialog
    setFormData({
      id: "",
      name: "",
      email: "",
      phone: "",
      subject: "",
      qualification: "",
      joiningDate: "",
      department: "",
      address: "",
      gender: "",
      status: "active",
      salary: 0,
      image: "/api/placeholder/128/128",
    });

    createFaculty(newTeacher);
    setIsCreateDialogOpen(false);
  };

  // Load teachers data (simulating API call)
  useEffect(() => {
    // Simulate API call with timeout
    fetchFaculties();
  }, [searchQuery, statusFilter, departmentFilter]);
  console.log(faculties);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Update existing teacher
  const handleUpdateTeacher = () => {
    // setFaculties((prev) =>
    //   prev.map((teacher) =>
    //     teacher.id === formData.id ? { ...formData } : teacher
    //   )
    // );

    updateFaculty(formData._id, formData);
    // setIsEditDialogOpen(false);
  };

  // Delete teacher
  const handleDeleteTeacher = () => {
    setFaculties((prev) =>
      prev.filter((teacher) => teacher.id !== selectedTeacher.id)
    );
    setIsDeleteDialogOpen(false);
    toast("Faculty removed successfully", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "X",
        onClick: () => console.log("remove"),
      },
    });
  };

  // Filter teachers based on search query and filters
  const filteredTeachers = faculties.filter((teacher) => {
    // Skip teachers missing required fields
    if (!teacher.firstName || !teacher.email) {
      return false;
    }

    const searchLower = searchQuery?.toLowerCase() || "";

    const matchesSearch =
      teacher.firstName.toLowerCase().includes(searchLower) ||
      teacher.email.toLowerCase().includes(searchLower) ||
      (teacher.subject && teacher.subject.toLowerCase().includes(searchLower));

    const matchesStatus =
      statusFilter === "all" || teacher.status === statusFilter;

    const matchesDepartment =
      departmentFilter === "all" || teacher.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate department statistics
  const departmentStats = departments
    .map((dept) => {
      const count = teachers.filter(
        (teacher) => teacher.department === dept
      ).length;
      return { department: dept, count };
    })
    .sort((a, b) => b.count - a.count);

  // Open edit dialog with teacher data
  const openEditDialog = (teacher) => {
    setFormData({ ...teacher });
    setIsEditDialogOpen(true);
  };

  // Open view dialog with teacher data
  const openViewDialog = (teacher) => {
    setSelectedTeacher(teacher);
    setIsViewDialogOpen(true);
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };

  // Open create dialog with empty form
  const openCreateDialog = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      phone: "",
      subject: "",
      qualification: "",
      joiningDate: new Date().toISOString().split("T")[0],
      department: "",
      address: "",
      gender: "",
      status: "active",
      salary: 0,
      image: "/api/placeholder/128/128",
    });
    setIsCreateDialogOpen(true);
  };

  // Export teachers data as CSV
  const exportTeachersData = () => {
    // Create CSV content
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Subject",
      "Department",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredTeachers.map((teacher) =>
        [
          teacher.id,
          teacher.name,
          teacher.email,
          teacher.phone,
          teacher.subject,
          teacher.department,
          teacher.status,
        ].join(",")
      ),
    ].join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `teachers_data_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-gray-600" />
          Faculty Management
        </h1>
        <p className="text-gray-400">Manage faculty information and records</p>
      </div>

      {/* Notification Alert */}
      {notification && (
        <Alert
          className={`mb-4 ${
            notification.type === "success"
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <AlertDescription
            className={`flex items-center ${
              notification.type === "success"
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {notification.type === "success" ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <AlertCircle className="h-4 w-4 mr-2" />
            )}
            {notification.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                teachers.length
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Faculty members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                teachers.filter((t) => t.status === "active").length
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Currently teaching</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                new Set(teachers.map((t) => t.department)).size
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Academic divisions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              On Leave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                teachers.filter((t) => t.status === "on leave").length
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Currently on leave</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search teachers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on leave">On Leave</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Department Filter */}
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Filter by department" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex-1 md:flex-initial rounded-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Teacher
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl">
              <DropdownMenuItem onClick={exportTeachersData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Upload className="h-4 w-4 mr-2" />
                Import Teachers
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="departments">By Department</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          {/* Faculties Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Faculty</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Subject
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Department
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Contact
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading state
                  Array(itemsPerPage)
                    .fill(0)
                    .map((_, index) => (
                      <TableRow key={`skeleton-${index}`}>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                            <div>
                              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse mr-1"></div>
                            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse mr-1"></div>
                            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : paginatedTeachers.length > 0 ? (
                  paginatedTeachers.map((teacher) => (
                    <TableRow key={teacher._id}>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={teacher.image}
                              alt={teacher.firstName}
                            />
                            <AvatarFallback>
                              {teacher.firstName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {teacher.firstName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {teacher.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {teacher.subject}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {teacher.department}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-3 w-3 mr-1" />
                          {teacher.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            teacher.status === "active"
                              ? "bg-green-100 text-green-800"
                              : teacher.status === "on leave"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {teacher.status === "active"
                            ? "Active"
                            : teacher.status === "on leave"
                            ? "On Leave"
                            : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openViewDialog(teacher)}
                            aria-label="View details"
                          >
                            <ExternalLink className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setIsEditDialogOpen(teacher);
                              setFormData(teacher);
                            }}
                            aria-label="Edit"
                          >
                            <Edit className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(teacher)}
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No teachers found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            className="mt-4"
          />
        </TabsContent>

        <TabsContent value="departments">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? // Loading skeleton for departments
                Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Card
                      key={`dept-skeleton-${index}`}
                      className="animate-pulse"
                    >
                      <CardHeader>
                        <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Array(3)
                            .fill(0)
                            .map((_, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2"
                              >
                                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))
              : departmentStats.map((dept) => {
                  const deptTeachers = teachers.filter(
                    (t) => t.department === dept.department
                  );

                  return (
                    <Card key={dept.department}>
                      <CardHeader>
                        <CardTitle>{dept.department}</CardTitle>
                        <CardDescription>{dept.count} Teachers</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {deptTeachers.slice(0, 3).map((teacher) => (
                            <div
                              key={teacher.id}
                              className="flex items-center gap-2"
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={teacher.image}
                                  alt={teacher.name}
                                />
                                <AvatarFallback>
                                  {teacher.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-sm">{teacher.name}</div>
                            </div>
                          ))}
                          {dept.count > 3 && (
                            <Button
                              variant="ghost"
                              className="text-xs text-gray-500 mt-2"
                              onClick={() => {
                                setDepartmentFilter(dept.department);
                                setStatusFilter("all");
                                document
                                  .querySelector('[data-value="list"]')
                                  .click();
                              }}
                            >
                              View all {dept.count} teachers
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Teacher Dialog */}
      <FacultyFormModal
        isDialogOpen={isCreateDialogOpen}
        setIsDialogOpen={setIsCreateDialogOpen}
        formData={formData}
        setFormData={setFormData}
        departments={departments}
        handleSave={handleAddFaculty}
      />
      {/* Edit Teacher Dialog */}
      <FacultyFormModal
        isEditing={true}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={setIsEditDialogOpen}
        formData={formData}
        setFormData={setFormData}
        departments={departments}
        handleSave={handleUpdateTeacher}
      />

      {/* View Teacher Dialog */}
      <ViewFacultyModal
        {...{ isViewDialogOpen, setIsViewDialogOpen, selectedTeacher }}
      />

      {/* Delete Teacher Dialog */}
      <DeleteFacultyModal
        {...{
          isDeleteDialogOpen,
          setIsDeleteDialogOpen,
          selectedTeacher,
          handleDeleteTeacher,
        }}
      />
    </div>
  );
}
