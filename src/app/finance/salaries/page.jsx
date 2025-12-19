"use client";

import { Button, Card, CardContent, CardHeader, Input } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Filter,
  Mail,
  MoreVertical,
  Plus,
  Printer,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

// Sample Data
const students = [
  {
    _id: "std001",
    admissionNumber: "2023-001",
    firstName: "Rahul",
    lastName: "Sharma",
    class: "10",
    section: "A",
    totalFee: 25000,
    feeBalance: 5000,
  },
  {
    _id: "std002",
    admissionNumber: "2023-002",
    firstName: "Priya",
    lastName: "Patel",
    class: "9",
    section: "B",
    totalFee: 23000,
    feeBalance: 0,
  },
  {
    _id: "std003",
    admissionNumber: "2023-003",
    firstName: "Aarav",
    lastName: "Gupta",
    class: "11",
    section: "C",
    totalFee: 27000,
    feeBalance: 12000,
  },
];

export default function Salaries() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("student-fees");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter functions
  const getFilteredData = (data, type) => {
    return data.filter((item) => {
      let matchesSearch = false;
      let matchesStatus = filterStatus === "all";

      switch (type) {
        case "students":
          matchesSearch =
            item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.admissionNumber
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          if (filterStatus === "paid") matchesStatus = item.feeBalance <= 0;
          if (filterStatus === "pending") matchesStatus = item.feeBalance > 0;
          break;
        case "salary":
          matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.designation.toLowerCase().includes(searchTerm.toLowerCase());
          if (filterStatus !== "all")
            matchesStatus = item.status === filterStatus;
          break;
        case "expenditure":
          matchesSearch =
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
          if (filterStatus !== "all")
            matchesStatus = item.status === filterStatus;
          break;
      }

      return matchesSearch && matchesStatus;
    });
  };

  // Mobile Card Components
  const MobileStudentCard = ({ student }) => (
    <Card className="mb-4 border-gray-300">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="text-sm text-gray-500">
              Adm No: {student.admissionNumber}
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                student.feeBalance <= 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {student.feeBalance <= 0 ? "Paid" : "Pending"}
            </div>
          </div>
          <div className="border-l-4 border-blue-500 pl-3">
            <h3 className="font-semibold text-base">
              {student.firstName} {student.lastName}
            </h3>
            <p className="text-sm text-gray-500">Class: {student.class}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Total Fee</p>
              <p className="font-medium">
                ₹{student.totalFee.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Balance</p>
              <p
                className={`font-medium ${
                  student.feeBalance > 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                ₹{student.feeBalance.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1">
              Register Payment
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Desktop Table Components
  const StudentFeesTable = () => {
    const filteredStudents = getFilteredData(students, "students");

    return (
      <Card className="border-gray-300 dark:border-gray-700">
        <CardHeader className="px-4 sm:px-6">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Search..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <div className="flex items-center gap-2">
                    <Filter size={16} />
                    <SelectValue placeholder="Filter" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add New</span>
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-300 dark:border-gray-700">
                <TableHead>Adm No</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead className="text-right">Total Fee</TableHead>
                <TableHead className="text-right">Paid</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow
                  key={student._id}
                  className="border-gray-300 dark:border-gray-700"
                >
                  <TableCell className="font-medium">
                    {student.admissionNumber}
                  </TableCell>
                  <TableCell>
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell className="text-right">
                    ₹{student.totalFee.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{(student.totalFee - student.feeBalance).toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      student.feeBalance > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    ₹{student.feeBalance.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                        student.feeBalance <= 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.feeBalance <= 0 ? "Paid" : "Pending"}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button size="sm">Pay</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            Generate Receipt
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Reminder
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardHeader>
      </Card>
    );
  };

  return (
    <CardContent className="px-0">
      {isMobile ? (
        <div className="space-y-4 px-4">
          {getFilteredData(students, "students").map((student) => (
            <MobileStudentCard key={student._id} student={student} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto px-6">
          <StudentFeesTable />
        </div>
      )}
    </CardContent>
  );
}
