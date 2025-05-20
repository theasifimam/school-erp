"use client";

import { CalendarIcon, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { issuesData } from "@/assets/data/data";
import { Pagination } from "@/components/common/Pagination";
import { useState } from "react";

export default function ReturnBookPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  return (
    <Card className=" border-gray-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Book Returns</CardTitle>
        <CardDescription className="text-gray-400">
          Track and manage book returns and book conditions
        </CardDescription>
        <div className="flex gap-4 mt-2 mb-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search by book ID or student name..."
              className="pl-10 "
            />
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-20 gap-1">
                  From
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-3xl">
                <Calendar mode="single" className="" />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-20 gap-1">
                  To
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-3xl">
                <Calendar mode="single" className="rounded-3xl" />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-300 hover:">
              <TableHead>Return ID</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Fine</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issuesData
              .filter((issue) => issue.returnDate)
              .map((issue) => (
                <TableRow key={issue.id} className="border-gray-300 hover:">
                  <TableCell>{`R${issue.id.slice(1)}`}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{issue.bookTitle}</div>
                      <div className="text-sm text-gray-400">
                        {issue.bookId}
                      </div>
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
                  <TableCell>{issue.returnDate}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-600">Good</Badge>
                  </TableCell>
                  <TableCell>₹0.00</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <Pagination
          currentPage={1}
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
