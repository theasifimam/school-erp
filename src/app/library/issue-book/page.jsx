"use client";

import React, { useState } from "react";
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
import { Plus, Search, CalenderIcon, CalendarIcon, Badge } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import IssueBookFormModal from "@/components/library/IssueBookFormModal";
import { Pagination } from "@/components/common/Pagination";

export default function IssuesPage() {
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  return (
    <Card className="border-gray-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Book Issues</span>
          <IssueBookFormModal
            issueDialogOpen={issueDialogOpen}
            setIssueDialogOpen={setIssueDialogOpen}
          />
        </CardTitle>
        <CardDescription className="text-gray-400">
          Track book issues to students and manage due dates
        </CardDescription>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search by book or student name..."
              className="pl-10  "
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-48  ">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className=" ">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="issued">Issued</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-300 hover:">
              <TableHead>Issue ID</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issuesData.map((issue) => (
              <TableRow key={issue.id} className="border-gray-300 hover:">
                <TableCell>{issue.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{issue.bookTitle}</div>
                    <div className="text-sm text-gray-400">{issue.bookId}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{issue.studentName}</div>
                    <div className="text-sm text-gray-400">
                      {issue.studentId}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{issue.issueDate}</TableCell>
                <TableCell>{issue.dueDate}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      issue.status === "issued"
                        ? "bg-blue-600"
                        : issue.status === "returned"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }
                  >
                    {issue.status.charAt(0).toUpperCase() +
                      issue.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    {issue.status !== "returned" && (
                      <Dialog
                        open={
                          returnDialogOpen && selectedIssue?.id === issue.id
                        }
                        onOpenChange={(open) => {
                          setReturnDialogOpen(open);
                          if (!open) setSelectedIssue(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedIssue(issue)}
                            className="bg-green-700 hover:bg-green-600 border-green-600 text-white"
                          >
                            Return
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="border-gray-300">
                          <DialogHeader>
                            <DialogTitle>Return Book</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Confirm book return for {selectedIssue?.bookTitle}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-400">Book</p>
                                <p className="font-medium">
                                  {selectedIssue?.bookTitle}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Student</p>
                                <p className="font-medium">
                                  {selectedIssue?.studentName}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-400">
                                  Issue Date
                                </p>
                                <p>{selectedIssue?.issueDate}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">
                                  Due Date
                                </p>
                                <p>{selectedIssue?.dueDate}</p>
                              </div>
                            </div>
                            <div className="mb-4">
                              <Label htmlFor="returnDate">Return Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="  w-full flex justify-between items-center mt-2"
                                  >
                                    {format(new Date(), "PPP")}
                                    <CalendarIcon className="ml-2 h-4 w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 ">
                                  <Calendar
                                    mode="single"
                                    selected={new Date()}
                                    className=""
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div>
                              <Label htmlFor="condition">Book Condition</Label>
                              <Select defaultValue="good">
                                <SelectTrigger className=" mt-2">
                                  <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent className="">
                                  <SelectItem value="excellent">
                                    Excellent
                                  </SelectItem>
                                  <SelectItem value="good">Good</SelectItem>
                                  <SelectItem value="fair">Fair</SelectItem>
                                  <SelectItem value="poor">Poor</SelectItem>
                                  <SelectItem value="damaged">
                                    Damaged
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setReturnDialogOpen(false)}
                              className="bg-transparent"
                            >
                              Cancel
                            </Button>
                            <Button onClick={() => setReturnDialogOpen(false)}>
                              Confirm Return
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-300 pt-4">
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
