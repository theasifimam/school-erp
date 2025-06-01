"use client";

import React, { useEffect, useState } from "react";
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
  Download,
  Filter,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Pagination } from "@/components/common/Pagination";
import { useStudentStore } from "@/lib/state/stores/studentStore";
// import { formatDateToDDMMYY,  } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FeePaymentModal from "@/components/finance/FeePaymentModal";
import FeeReceiptModal from "@/components/finance/FeeReceiptModal";

// Sample student data with fee information
export const students = [
  {
    _id: "std001",
    admissionNumber: "2023-001",
    firstName: "Rahul",
    lastName: "Sharma",
    class: "10",
    section: "A",
    totalFee: 25000,
    feeBalance: 5000,
    payments: ["pay001", "pay002"],
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
    payments: ["pay003", "pay004"],
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
    payments: ["pay005"],
  },
];

// Sample fee payment records
export const dummyFeeRecords = [
  {
    _id: "pay001",
    studentId: "std001",
    date: "2023-04-15",
    amount: 10000,
    paymentMethod: "bank_transfer",
    transactionId: "BANK123456",
    description: "Term 1 Fee",
    status: "paid",
    receiptNumber: "RC-2023-001",
  },
  {
    _id: "pay002",
    studentId: "std001",
    date: "2023-06-20",
    amount: 10000,
    paymentMethod: "cheque",
    chequeNumber: "CHQ789012",
    description: "Term 2 Fee",
    status: "paid",
    receiptNumber: "RC-2023-002",
  },
  {
    _id: "pay003",
    studentId: "std002",
    date: "2023-04-10",
    amount: 15000,
    paymentMethod: "online",
    transactionId: "PAYTM987654",
    description: "Annual Fee",
    status: "paid",
    receiptNumber: "RC-2023-003",
  },
  {
    _id: "pay004",
    studentId: "std002",
    date: "2023-07-05",
    amount: 8000,
    paymentMethod: "cash",
    description: "Term 2 Fee",
    status: "paid",
    receiptNumber: "RC-2023-004",
  },
  {
    _id: "pay005",
    studentId: "std003",
    date: "2023-05-12",
    amount: 15000,
    paymentMethod: "bank_transfer",
    transactionId: "BANK654321",
    description: "Term 1 Fee",
    status: "paid",
    receiptNumber: "RC-2023-005",
  },
  {
    _id: "pay006",
    studentId: "std003",
    date: "2023-08-18",
    amount: 5000,
    paymentMethod: "cheque",
    chequeNumber: "CHQ456789",
    description: "Sports Fee",
    status: "pending",
    receiptNumber: "RC-2023-006",
  },
];

// Sample fee structure for different classes
export const dummyFeeStructure = [
  {
    class: "9",
    tuitionFee: 15000,
    sportsFee: 3000,
    libraryFee: 2000,
    total: 20000,
  },
  {
    class: "10",
    tuitionFee: 17000,
    sportsFee: 3000,
    libraryFee: 2000,
    examFee: 3000,
    total: 25000,
  },
  {
    class: "11",
    tuitionFee: 20000,
    sportsFee: 3000,
    libraryFee: 2000,
    labFee: 2000,
    total: 27000,
  },
];

export default function FeeManagementPage() {
  const { fetchStudents, feeRecords, fetchFeeRecords } = useStudentStore();
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedFee, setSelectedFee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  //   useEffect(() => {
  //     fetchStudents();
  //     fetchFeeRecords();
  //   }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter students based on search term and status
  const filteredStudents = students?.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "paid" && student.feeBalance <= 0) ||
      (filterStatus === "pending" && student.feeBalance > 0);

    return matchesSearch && matchesStatus;
  });

  // Mobile Card Component for individual students
  const MobileStudentCard = ({ student }) => (
    <Card className="mb-4 border-gray-300">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header with Admission No and Status */}
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

          {/* Student Information */}
          <div className="border-l-4 border-blue-500 pl-3">
            <h3 className="font-semibold text-base">
              {student.firstName} {student.lastName}
            </h3>
            <p className="text-sm text-gray-500">Class: {student.class}</p>
          </div>

          {/* Fee Information */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Total Fee</p>
              <p className="font-medium">{student.totalFee}</p>
            </div>
            <div>
              <p className="text-gray-500">Balance</p>
              <p
                className={`font-medium ${
                  student.feeBalance > 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {student.feeBalance}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => {
                setSelectedStudent(student);
                setPaymentDialogOpen(true);
              }}
            >
              Register Payment
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedStudent(student);
                    setReceiptDialogOpen(true);
                  }}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Generate Receipt
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => sendFeeReminder(student)}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reminder
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const sendFeeReminder = (student) => {
    // Implement email sending logic here
    console.log(
      `Sending fee reminder to ${student.firstName} ${student.lastName}`
    );
    // Typically would call an API endpoint to send email
  };

  return (
    <Card className="border-gray-300  dark:border-gray-700">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg sm:text-xl font-semibold">
              Student Fee Management
            </CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              Track fee payments, generate receipts, and manage student accounts
            </CardDescription>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setPaymentDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Record Payment</span>
            </Button>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search by student name or admission number..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="sm:hidden" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        {/* Mobile View - Card Layout */}
        {isMobile ? (
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <MobileStudentCard key={student._id} student={student} />
            ))}
          </div>
        ) : (
          /* Desktop View - Table Layout */
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-300 dark:border-gray-700">
                  <TableHead className="whitespace-nowrap">Adm No</TableHead>
                  <TableHead className="whitespace-nowrap">Student</TableHead>
                  <TableHead className="whitespace-nowrap">Class</TableHead>
                  <TableHead className="whitespace-nowrap text-right">
                    Total Fee
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-right">
                    Paid
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-right">
                    Balance
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow
                    key={student._id}
                    className="border-gray-300  dark:border-gray-700"
                  >
                    <TableCell className="font-medium">
                      {student.admissionNumber}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {student.firstName} {student.lastName}
                      </div>
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell className="text-right">
                      {student.totalFee}
                    </TableCell>
                    <TableCell className="text-right">
                      {student.totalFee - student.feeBalance}
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        student.feeBalance > 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {student.feeBalance}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedStudent(student);
                            setPaymentDialogOpen(true);
                          }}
                        >
                          Pay
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedStudent(student);
                                setReceiptDialogOpen(true);
                              }}
                            >
                              <Printer className="mr-2 h-4 w-4" />
                              Generate Receipt
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => sendFeeReminder(student)}
                            >
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
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t border-gray-300 dark:border-gray-700 pt-4 px-4 sm:px-6">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={filteredStudents.length}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          className="w-full"
        />
      </CardFooter>

      {/* Payment Modal */}
      <FeePaymentModal
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        student={selectedStudent}
        // onSuccess={() => {
        //   fetchStudents();
        //   fetchFeeRecords();
        // }}
      />

      {/* Receipt Modal */}
      <FeeReceiptModal
        open={receiptDialogOpen}
        onOpenChange={setReceiptDialogOpen}
        student={selectedStudent}
        feeRecords={dummyFeeRecords.filter(
          (record) => record.studentId === selectedStudent?._id
        )}
      />
    </Card>
  );
}
