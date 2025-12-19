"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  Mail,
  Printer,
  Filter,
  MoreVertical,
  Users,
  BookOpen,
  ShoppingCart,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  Wallet,
  CreditCard,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const salaryData = [
  {
    _id: "sal001",
    employeeId: "EMP001",
    name: "Dr. Anjali Verma",
    designation: "Principal",
    department: "Administration",
    basicSalary: 75000,
    allowances: 15000,
    deductions: 5000,
    netSalary: 85000,
    status: "paid",
    paymentDate: "2024-01-31",
  },
  {
    _id: "sal002",
    employeeId: "EMP002",
    name: "Rajesh Kumar",
    designation: "Math Teacher",
    department: "Teaching",
    basicSalary: 45000,
    allowances: 8000,
    deductions: 3000,
    netSalary: 50000,
    status: "pending",
    paymentDate: null,
  },
  {
    _id: "sal003",
    employeeId: "EMP003",
    name: "Sunita Sharma",
    designation: "Lab Assistant",
    department: "Support Staff",
    basicSalary: 25000,
    allowances: 3000,
    deductions: 2000,
    netSalary: 26000,
    status: "paid",
    paymentDate: "2024-01-31",
  },
];

const expenditureData = [
  {
    _id: "exp001",
    date: "2024-01-15",
    category: "Books & Stationery",
    vendor: "Academic Publishers Ltd",
    description: "Science textbooks for Class 10",
    amount: 45000,
    paymentMethod: "bank_transfer",
    status: "paid",
    invoiceNumber: "INV-2024-001",
  },
  {
    _id: "exp002",
    date: "2024-01-20",
    category: "Furniture",
    vendor: "Office Furniture Co.",
    description: "Student desks and chairs",
    amount: 125000,
    paymentMethod: "cheque",
    status: "paid",
    invoiceNumber: "INV-2024-002",
  },
  {
    _id: "exp003",
    date: "2024-01-25",
    category: "Utilities",
    vendor: "State Electricity Board",
    description: "Monthly electricity bill",
    amount: 35000,
    paymentMethod: "online",
    status: "pending",
    invoiceNumber: "INV-2024-003",
  },
  {
    _id: "exp004",
    date: "2024-01-28",
    category: "Maintenance",
    vendor: "BuildRight Services",
    description: "Roof repair work",
    amount: 78000,
    paymentMethod: "bank_transfer",
    status: "paid",
    invoiceNumber: "INV-2024-004",
  },
];

export default function FinanceManagementPage() {
  const [activeTab, setActiveTab] = useState("student-fees");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

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

  const MobileSalaryCard = ({ salary }) => (
    <Card className="mb-4 border-gray-300">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="text-sm text-gray-500">ID: {salary.employeeId}</div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                salary.status === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {salary.status.charAt(0).toUpperCase() + salary.status.slice(1)}
            </div>
          </div>
          <div className="border-l-4 border-purple-500 pl-3">
            <h3 className="font-semibold text-base">{salary.name}</h3>
            <p className="text-sm text-gray-500">{salary.designation}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Basic Salary</p>
              <p className="font-medium">
                ₹{salary.basicSalary.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Net Salary</p>
              <p className="font-medium text-green-600">
                ₹{salary.netSalary.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="flex-1"
              disabled={salary.status === "paid"}
            >
              Process Payment
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const MobileExpenditureCard = ({ expense }) => (
    <Card className="mb-4 border-gray-300">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="text-sm text-gray-500">{expense.date}</div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                expense.status === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
            </div>
          </div>
          <div className="border-l-4 border-orange-500 pl-3">
            <h3 className="font-semibold text-base">{expense.category}</h3>
            <p className="text-sm text-gray-500">{expense.vendor}</p>
            <p className="text-xs text-gray-400 mt-1">{expense.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Amount</p>
              <p className="font-bold text-lg">
                ₹{expense.amount.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Invoice</p>
              <p className="text-sm font-medium">{expense.invoiceNumber}</p>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              View Invoice
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
    );
  };

  const SalaryTable = () => {
    const filteredSalaries = getFilteredData(salaryData, "salary");

    return (
      <Table>
        <TableHeader>
          <TableRow className="border-gray-300 dark:border-gray-700">
            <TableHead>Employee ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead className="text-right">Basic</TableHead>
            <TableHead className="text-right">Allowances</TableHead>
            <TableHead className="text-right">Deductions</TableHead>
            <TableHead className="text-right">Net Salary</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSalaries.map((salary) => (
            <TableRow
              key={salary._id}
              className="border-gray-300 dark:border-gray-700"
            >
              <TableCell className="font-medium">{salary.employeeId}</TableCell>
              <TableCell>{salary.name}</TableCell>
              <TableCell>{salary.designation}</TableCell>
              <TableCell className="text-right">
                ₹{salary.basicSalary.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                ₹{salary.allowances.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                ₹{salary.deductions.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-medium text-green-600">
                ₹{salary.netSalary.toLocaleString()}
              </TableCell>
              <TableCell>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                    salary.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {salary.status.charAt(0).toUpperCase() +
                    salary.status.slice(1)}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <Button size="sm" disabled={salary.status === "paid"}>
                    Process
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const ExpenditureTable = () => {
    const filteredExpenses = getFilteredData(expenditureData, "expenditure");

    return (
      <Table>
        <TableHeader>
          <TableRow className="border-gray-300 dark:border-gray-700">
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExpenses.map((expense) => (
            <TableRow
              key={expense._id}
              className="border-gray-300 dark:border-gray-700"
            >
              <TableCell>{expense.date}</TableCell>
              <TableCell className="font-medium">{expense.category}</TableCell>
              <TableCell>{expense.vendor}</TableCell>
              <TableCell className="max-w-xs truncate">
                {expense.description}
              </TableCell>
              <TableCell className="text-right font-medium">
                ₹{expense.amount.toLocaleString()}
              </TableCell>
              <TableCell className="capitalize">
                {expense.paymentMethod.replace("_", " ")}
              </TableCell>
              <TableCell>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                    expense.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {expense.status.charAt(0).toUpperCase() +
                    expense.status.slice(1)}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  // Summary Cards
  const SummaryCards = () => {
    const totalFeeCollected = students.reduce(
      (sum, s) => sum + (s.totalFee - s.feeBalance),
      0
    );
    const totalFeePending = students.reduce((sum, s) => sum + s.feeBalance, 0);
    const totalSalaryPaid = salaryData
      .filter((s) => s.status === "paid")
      .reduce((sum, s) => sum + s.netSalary, 0);
    const totalExpenditure = expenditureData
      .filter((e) => e.status === "paid")
      .reduce((sum, e) => sum + e.amount, 0);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-gray-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Fee Collected</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{totalFeeCollected.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Fee Pending</p>
                <p className="text-2xl font-bold text-red-600">
                  ₹{totalFeePending.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Salaries Paid</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{totalSalaryPaid.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Expenditure</p>
                <p className="text-2xl font-bold text-orange-600">
                  ₹{totalExpenditure.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Finance Management</h1>
          <p className="text-gray-500 mt-1">
            Complete financial overview and management system
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Reports
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Main Content Card */}
      <Card className="border-gray-300 dark:border-gray-700">
        <CardHeader className="px-4 sm:px-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger
                value="student-fees"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Student Fees</span>
                <span className="sm:hidden">Fees</span>
              </TabsTrigger>
              <TabsTrigger value="salaries" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Salaries</span>
                <span className="sm:hidden">Salary</span>
              </TabsTrigger>
              <TabsTrigger
                value="expenditure"
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Expenditure</span>
                <span className="sm:hidden">Expense</span>
              </TabsTrigger>
            </TabsList>

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

            <TabsContent value="student-fees" className="mt-6">
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
            </TabsContent>

            <TabsContent value="salaries" className="mt-6">
              <CardContent className="px-0">
                {isMobile ? (
                  <div className="space-y-4 px-4">
                    {getFilteredData(salaryData, "salary").map((salary) => (
                      <MobileSalaryCard key={salary._id} salary={salary} />
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto px-6">
                    <SalaryTable />
                  </div>
                )}
              </CardContent>
            </TabsContent>

            <TabsContent value="expenditure" className="mt-6">
              <CardContent className="px-0">
                {isMobile ? (
                  <div className="space-y-4 px-4">
                    {getFilteredData(expenditureData, "expenditure").map(
                      (expense) => (
                        <MobileExpenditureCard
                          key={expense._id}
                          expense={expense}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto px-6">
                    <ExpenditureTable />
                  </div>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}
