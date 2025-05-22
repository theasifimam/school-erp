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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { issuesData } from "@/assets/data/data";
import {
  Plus,
  Search,
  CalenderIcon,
  CalendarIcon,
  Badge,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import IssueBookFormModal from "@/components/library/IssueBookFormModal";
import { Pagination } from "@/components/common/Pagination";
import { useBookstore } from "@/lib/state/stores/bookStore";
import { formatDateToDDMMYY } from "@/lib/utils";
import ReturnModal from "@/components/library/ReturnModal";

export default function IssuesPage() {
  const { issuedBooks, fetchIssuedBooks, successMessage } = useBookstore();
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchIssuedBooks();
  }, [successMessage]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile Card Component for individual issues
  const MobileIssueCard = ({ issue }) => (
    <Card className="mb-4 border-gray-300">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header with ID and Status */}
          <div className="flex justify-between items-start">
            <div className="text-sm text-gray-500">ID: {issue?._id}</div>
            <Badge
              className={
                issue?.status === "issued"
                  ? "bg-blue-600"
                  : issue?.status === "returned"
                  ? "bg-green-600"
                  : "bg-red-600"
              }
            >
              {issue?.status.charAt(0).toUpperCase() + issue?.status.slice(1)}
            </Badge>
          </div>

          {/* Book Information */}
          <div className="border-l-4 border-blue-500 pl-3">
            <h3 className="font-semibold text-base">{issue?.book?.title}</h3>
            <p className="text-sm text-gray-500">Book ID: {issue?.book?._id}</p>
          </div>

          {/* Student Information */}
          <div className="border-l-4 border-green-500 pl-3">
            <h4 className="font-medium">
              {issue?.issuedTo?.firstName} {issue?.issuedTo?.lastName}
            </h4>
            <p className="text-sm text-gray-500">
              Student ID: {issue?.issuedTo?._id}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Issue Date</p>
              <p className="font-medium">
                {formatDateToDDMMYY(issue?.issueDate)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Due Date</p>
              <p className="font-medium">
                {formatDateToDDMMYY(issue?.dueDate)}
              </p>
            </div>
          </div>

          {/* Action Button */}
          {issue?.status !== "returned" && (
            <div className="pt-2">
              <ReturnModal
                returnDialogOpen={returnDialogOpen}
                setReturnDialogOpen={setReturnDialogOpen}
                selectedIssue={selectedIssue}
                setSelectedIssue={setSelectedIssue}
                issue={issue}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card className="border-gray-300">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg sm:text-xl font-semibold">
              Book Issues
            </CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              Track book issues to students and manage due dates
            </CardDescription>
          </div>
          <div className="flex justify-end">
            <IssueBookFormModal
              issueDialogOpen={issueDialogOpen}
              setIssueDialogOpen={setIssueDialogOpen}
            />
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
              placeholder="Search by book or student name..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="sm:hidden" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="issued">Issued</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        {/* Mobile View - Card Layout */}
        {isMobile ? (
          <div className="space-y-4">
            {issuedBooks.map((issue) => (
              <MobileIssueCard key={issue?._id} issue={issue} />
            ))}
          </div>
        ) : (
          /* Desktop View - Table Layout */
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-300">
                  <TableHead className="whitespace-nowrap">Issue ID</TableHead>
                  <TableHead className="whitespace-nowrap">Book</TableHead>
                  <TableHead className="whitespace-nowrap">Student</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Issue Date
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Due Date</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issuedBooks.map((issue) => (
                  <TableRow key={issue?._id} className="border-gray-300">
                    <TableCell className="font-mono text-sm">
                      {issue?._id}
                    </TableCell>
                    <TableCell>
                      <div className="min-w-0">
                        <div className="font-medium truncate">
                          {issue?.book?.title}
                        </div>
                        <div className="text-sm text-gray-400 truncate">
                          {issue?.book?._id}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-0">
                        <div className="truncate">
                          {issue?.issuedTo?.firstName}{" "}
                          {issue?.issuedTo?.lastName}
                        </div>
                        <div className="text-sm text-gray-400 truncate">
                          {issue?.issuedTo?._id}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDateToDDMMYY(issue?.issueDate)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDateToDDMMYY(issue?.dueDate)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          issue?.status === "issued"
                            ? "bg-blue-600"
                            : issue?.status === "returned"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }
                      >
                        {issue?.status.charAt(0).toUpperCase() +
                          issue?.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {issue?.status !== "returned" && (
                          <ReturnModal
                            returnDialogOpen={returnDialogOpen}
                            setReturnDialogOpen={setReturnDialogOpen}
                            selectedIssue={selectedIssue}
                            setSelectedIssue={setSelectedIssue}
                            issue={issue}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t border-gray-300 pt-4 px-4 sm:px-6">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={issuesData.length}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
}
