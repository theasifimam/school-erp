"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  MoreHorizontal,
  Filter,
  Download,
  Upload,
  Trash2,
  Edit,
  DollarSign,
  Calendar,
  CreditCard,
  Tag,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Check,
  BarChart4,
  PieChart,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data for finances
const initialTransactions = [
  {
    id: "tx-001",
    date: "2025-04-10",
    amount: 5000,
    type: "income",
    category: "Tuition Fees",
    description: "Student ID 2025-042 - Term 2 Fees",
    paymentMethod: "Bank Transfer",
    status: "completed",
  },
  {
    id: "tx-002",
    date: "2025-04-05",
    amount: 2500,
    type: "expense",
    category: "Salaries",
    description: "Part-time Math Tutor Payment",
    paymentMethod: "Bank Transfer",
    status: "completed",
  },
  {
    id: "tx-003",
    date: "2025-04-02",
    amount: 1200,
    type: "expense",
    category: "Utilities",
    description: "Electricity Bill - March 2025",
    paymentMethod: "Direct Debit",
    status: "completed",
  },
  {
    id: "tx-004",
    date: "2025-04-15",
    amount: 3500,
    type: "income",
    category: "Donations",
    description: "Alumni Association Annual Donation",
    paymentMethod: "Check",
    status: "pending",
  },
  {
    id: "tx-005",
    date: "2025-04-18",
    amount: 800,
    type: "expense",
    category: "Supplies",
    description: "Lab Equipment for Science Department",
    paymentMethod: "Credit Card",
    status: "completed",
  },
  {
    id: "tx-006",
    date: "2025-04-20",
    amount: 1500,
    type: "expense",
    category: "Maintenance",
    description: "Plumbing Repair - Main Building",
    paymentMethod: "Credit Card",
    status: "completed",
  },
  {
    id: "tx-007",
    date: "2025-04-22",
    amount: 6000,
    type: "income",
    category: "Tuition Fees",
    description: "Student ID 2025-078 - Full Year Payment",
    paymentMethod: "Bank Transfer",
    status: "completed",
  },
  {
    id: "tx-008",
    date: "2025-04-01",
    amount: 2000,
    type: "expense",
    category: "IT Services",
    description: "Annual Software Licenses Renewal",
    paymentMethod: "Credit Card",
    status: "failed",
  },
  {
    id: "tx-009",
    date: "2025-04-12",
    amount: 4500,
    type: "income",
    category: "Exam Fees",
    description: "End of Term Examination Fees - Grade 10",
    paymentMethod: "Bank Transfer",
    status: "completed",
  },
  {
    id: "tx-010",
    date: "2025-04-17",
    amount: 950,
    type: "expense",
    category: "Transportation",
    description: "School Bus Maintenance",
    paymentMethod: "Credit Card",
    status: "pending",
  },
];

// Categories for transactions
const incomeCategories = [
  "Tuition Fees",
  "Donations",
  "Grants",
  "Exam Fees",
  "Book Sales",
  "Event Income",
  "Cafeteria Sales",
  "Other Income",
];

const expenseCategories = [
  "Salaries",
  "Utilities",
  "Supplies",
  "Maintenance",
  "IT Services",
  "Transportation",
  "Insurance",
  "Food Services",
  "Professional Development",
  "Other Expenses",
];

// Payment methods
const paymentMethods = [
  "Bank Transfer",
  "Credit Card",
  "Cash",
  "Check",
  "Direct Debit",
  "Mobile Payment",
  "Other",
];

export default function FinancePage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    type: "expense",
    category: "",
    description: "",
    paymentMethod: "",
    status: "completed",
  });

  const itemsPerPage = 5;

  // Load transactions data (simulating API call)
  useEffect(() => {
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setTransactions(initialTransactions);
      setIsLoading(false);
    }, 800);
  }, []);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  // Add new transaction
  const handleAddTransaction = () => {
    // Generate a new ID
    const newId = `tx-${String(transactions.length + 1).padStart(3, "0")}`;

    // Create new transaction with form data
    const newTransaction = {
      ...formData,
      id: newId,
      date: formData.date || new Date().toISOString().split("T")[0],
    };

    // Add to transactions list
    setTransactions((prev) => [newTransaction, ...prev]);

    // Reset form and close dialog
    setFormData({
      id: "",
      date: new Date().toISOString().split("T")[0],
      amount: 0,
      type: "expense",
      category: "",
      description: "",
      paymentMethod: "",
      status: "completed",
    });

    setIsCreateDialogOpen(false);
    showNotification(
      `${
        newTransaction.type === "income" ? "Income" : "Expense"
      } record added successfully!`
    );
  };

  // Update existing transaction
  const handleUpdateTransaction = () => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === formData.id ? { ...formData } : transaction
      )
    );

    setIsEditDialogOpen(false);
    showNotification("Transaction updated successfully!");
  };

  // Delete transaction
  const handleDeleteTransaction = () => {
    setTransactions((prev) =>
      prev.filter((tx) => tx.id !== selectedTransaction.id)
    );
    setIsDeleteDialogOpen(false);
    showNotification("Transaction deleted successfully");
  };

  // Filter transactions based on search query and filters
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    const matchesCategory =
      categoryFilter === "all" || transaction.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;

    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate financial statistics
  const totalIncome = transactions
    .filter((tx) => tx.type === "income" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === "expense" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpenses;

  const pendingIncome = transactions
    .filter((tx) => tx.type === "income" && tx.status === "pending")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const pendingExpenses = transactions
    .filter((tx) => tx.type === "expense" && tx.status === "pending")
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Calculate category statistics
  const categoryStats = [...incomeCategories, ...expenseCategories]
    .map((cat) => {
      const amount = transactions
        .filter((tx) => tx.category === cat && tx.status === "completed")
        .reduce(
          (sum, tx) => sum + (tx.type === "income" ? tx.amount : -tx.amount),
          0
        );

      return { category: cat, amount };
    })
    .filter((stat) => stat.amount !== 0)
    .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

  // Open edit dialog with transaction data
  const openEditDialog = (transaction) => {
    setFormData({ ...transaction });
    setIsEditDialogOpen(true);
  };

  // Open view dialog with transaction data
  const openViewDialog = (transaction) => {
    setSelectedTransaction(transaction);
    setIsViewDialogOpen(true);
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteDialogOpen(true);
  };

  // Open create dialog with empty form
  const openCreateDialog = (type = "expense") => {
    setFormData({
      id: "",
      date: new Date().toISOString().split("T")[0],
      amount: 0,
      type: type,
      category: "",
      description: "",
      paymentMethod: "",
      status: "completed",
    });
    setIsCreateDialogOpen(true);
  };

  // Export transactions data as CSV
  const exportFinanceData = () => {
    // Create CSV content
    const headers = [
      "ID",
      "Date",
      "Amount",
      "Type",
      "Category",
      "Description",
      "Payment Method",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredTransactions.map((tx) =>
        [
          tx.id,
          tx.date,
          tx.amount,
          tx.type,
          tx.category,
          `"${tx.description.replace(/"/g, '""')}"`, // Handle quotes in descriptions
          tx.paymentMethod,
          tx.status,
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
      `finance_data_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-emerald-600" />
          Financial Management
        </h1>
        <p className="text-gray-500">
          Track and manage school income, expenses and financial records
        </p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card
          className={balance >= 0 ? "border-emerald-200" : "border-red-200"}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                balance >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {isLoading ? (
                <div className="h-8 w-28 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                formatCurrency(balance)
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Available funds</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {isLoading ? (
                <div className="h-8 w-28 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                formatCurrency(totalIncome)
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              Completed transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {isLoading ? (
                <div className="h-8 w-28 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                formatCurrency(totalExpenses)
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
              Completed transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {isLoading ? (
                <div className="h-8 w-28 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                formatCurrency(pendingIncome - pendingExpenses)
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Awaiting settlement</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          onClick={() => openCreateDialog("income")}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Income
        </Button>

        <Button
          onClick={() => openCreateDialog("expense")}
          className="bg-red-600 hover:bg-red-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Type Filter */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Filter by type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Filter by category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>

              <SelectItem
                disabled
                className="text-xs font-semibold text-emerald-600 uppercase"
              >
                Income Categories
              </SelectItem>
              {incomeCategories.map((cat) => (
                <SelectItem key={`income-${cat}`} value={cat}>
                  {cat}
                </SelectItem>
              ))}

              <SelectItem
                disabled
                className="text-xs font-semibold text-red-600 uppercase"
              >
                Expense Categories
              </SelectItem>
              {expenseCategories.map((cat) => (
                <SelectItem key={`expense-${cat}`} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Layers className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportFinanceData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Upload className="h-4 w-4 mr-2" />
                Import Transactions
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
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          {/* Transactions Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Payment Method
                  </TableHead>
                  <TableHead>Amount</TableHead>
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
                        <TableCell>
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
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
                ) : paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="whitespace-nowrap">
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {transaction.description}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {transaction.category}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {transaction.paymentMethod}
                      </TableCell>
                      <TableCell
                        className={`font-medium ${
                          transaction.type === "income"
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openViewDialog(transaction)}
                            aria-label="View details"
                          >
                            <Search className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(transaction)}
                            aria-label="Edit"
                          >
                            <Edit className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(transaction)}
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
                    <TableCell colSpan={7} className="h-24 text-center">
                      No transactions found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;

                  // Show first page, current page, last page and pages around current
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          isActive={pageNumber === currentPage}
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }

                  // Show ellipsis for gaps

                  if (pageNumber === 2 || pageNumber === totalPages - 1) {
                    return (
                      <PaginationItem key={`ellipsis-${pageNumber}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </TabsContent>

        <TabsContent value="categories">
          {/* Category Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Categories</CardTitle>
                <CardDescription>
                  Financial distribution by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mr-4"></div>
                          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {categoryStats.slice(0, 7).map((stat, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-1/3 mr-2">
                          <p className="text-sm font-medium">{stat.category}</p>
                        </div>
                        <div className="w-2/3 flex items-center">
                          <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${
                                stat.amount > 0
                                  ? "bg-emerald-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${Math.min(
                                  (Math.abs(stat.amount) /
                                    Math.max(
                                      ...categoryStats.map((s) =>
                                        Math.abs(s.amount)
                                      )
                                    )) *
                                    100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span
                            className={`ml-2 text-xs font-medium ${
                              stat.amount > 0
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {formatCurrency(stat.amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <BarChart4 className="h-4 w-4" />
                  View Full Report
                </Button>
              </CardFooter>
            </Card>

            {/* Category Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Insights</CardTitle>
                <CardDescription>Key metrics and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="h-16 bg-gray-200 rounded animate-pulse"
                        ></div>
                      ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-emerald-100 rounded-full mr-3">
                          <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Highest Income</p>
                          <p className="text-xs text-gray-500">
                            {transactions
                              .filter((tx) => tx.type === "income")
                              .sort((a, b) => b.amount - a.amount)[0]
                              ?.category || "N/A"}
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-emerald-600">
                        {formatCurrency(
                          transactions
                            .filter((tx) => tx.type === "income")
                            .sort((a, b) => b.amount - a.amount)[0]?.amount || 0
                        )}
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-red-100 rounded-full mr-3">
                          <ArrowDownRight className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Highest Expense</p>
                          <p className="text-xs text-gray-500">
                            {transactions
                              .filter((tx) => tx.type === "expense")
                              .sort((a, b) => b.amount - a.amount)[0]
                              ?.category || "N/A"}
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-red-600">
                        {formatCurrency(
                          transactions
                            .filter((tx) => tx.type === "expense")
                            .sort((a, b) => b.amount - a.amount)[0]?.amount || 0
                        )}
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full mr-3">
                          <PieChart className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Income/Expense Ratio
                          </p>
                          <p className="text-xs text-gray-500">
                            Balance distribution
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {totalExpenses
                          ? (totalIncome / totalExpenses).toFixed(2) + "x"
                          : "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-full mr-3">
                          <CreditCard className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Most Used Payment
                          </p>
                          <p className="text-xs text-gray-500">
                            Payment method frequency
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-purple-600">
                        {Object.entries(
                          transactions.reduce((acc, tx) => {
                            acc[tx.paymentMethod] =
                              (acc[tx.paymentMethod] || 0) + 1;
                            return acc;
                          }, {})
                        ).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  View Monthly Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Transaction Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {formData.type === "income"
                ? "Add New Income"
                : "Add New Expense"}
            </DialogTitle>
            <DialogDescription>
              Enter the details of the {formData.type}. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3 flex">
                <div className="flex items-center justify-center h-10 w-10 rounded-l-md border border-r-0 bg-gray-50">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                </div>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="rounded-l-none"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                name="type"
                value={formData.type}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    type: value,
                    category: "",
                  }));
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                name="category"
                value={formData.category}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, category: value }));
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {formData.type === "income"
                    ? incomeCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))
                    : expenseCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentMethod" className="text-right">
                Payment Method
              </Label>
              <Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, paymentMethod: value }));
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, status: value }));
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
                rows={3}
                placeholder="Enter a detailed description..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddTransaction}
              className={
                formData.type === "income"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-red-600 hover:bg-red-700"
              }
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Transaction Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Edit {formData.type === "income" ? "Income" : "Expense"}
            </DialogTitle>
            <DialogDescription>
              Make changes to the {formData.type} record. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3 flex">
                <div className="flex items-center justify-center h-10 w-10 rounded-l-md border border-r-0 bg-gray-50">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                </div>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="rounded-l-none"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                name="type"
                value={formData.type}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    type: value,
                    category: "",
                  }));
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                name="category"
                value={formData.category}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, category: value }));
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {formData.type === "income"
                    ? incomeCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))
                    : expenseCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentMethod" className="text-right">
                Payment Method
              </Label>
              <Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, paymentMethod: value }));
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, status: value }));
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
                rows={3}
                placeholder="Enter a detailed description..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateTransaction}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Transaction Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Full information about this transaction
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {selectedTransaction.id}
                </h3>
                <Badge
                  className={
                    selectedTransaction.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : selectedTransaction.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {selectedTransaction.status.charAt(0).toUpperCase() +
                    selectedTransaction.status.slice(1)}
                </Badge>
              </div>

              <div className="border-t border-b py-4 my-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span
                    className={`text-xl font-bold ${
                      selectedTransaction.type === "income"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedTransaction.type === "income" ? "+" : "-"}
                    {formatCurrency(selectedTransaction.amount)}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Date</span>
                  <span>
                    {new Date(selectedTransaction.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Type</span>
                  <Badge
                    variant="outline"
                    className={
                      selectedTransaction.type === "income"
                        ? "border-emerald-200 text-emerald-800"
                        : "border-red-200 text-red-800"
                    }
                  >
                    {selectedTransaction.type.charAt(0).toUpperCase() +
                      selectedTransaction.type.slice(1)}
                  </Badge>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Category</span>
                  <span>{selectedTransaction.category}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Payment Method</span>
                  <span>{selectedTransaction.paymentMethod}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Description
                </h4>
                <p className="bg-gray-50 p-3 rounded-md text-gray-700">
                  {selectedTransaction.description}
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => openEditDialog(selectedTransaction)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="ghost" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Transaction Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="border rounded-md p-4 mb-4 bg-gray-50">
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  {selectedTransaction.description}
                </span>
                <span
                  className={`font-medium ${
                    selectedTransaction.type === "income"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedTransaction.type === "income" ? "+" : "-"}
                  {formatCurrency(selectedTransaction.amount)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  {new Date(selectedTransaction.date).toLocaleDateString()}
                </span>
                <span>{selectedTransaction.category}</span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteTransaction}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
