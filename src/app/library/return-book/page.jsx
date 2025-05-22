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
import { useEffect, useState } from "react";
import { useBookstore } from "@/lib/state/stores/bookStore";
import { formatDateToDDMMYY } from "@/lib/utils";

export function getConditionBadge(condition) {
  const conditionStyles = {
    excellent: {
      className: "bg-green-600 hover:bg-green-600 text-white rounded-full",
      label: "Excellent",
    },
    good: {
      className: "bg-green-500 hover:bg-green-500 text-white rounded-full",
      label: "Good",
    },
    fair: {
      className: "bg-yellow-500 hover:bg-yellow-500 text-white rounded-full",
      label: "Fair",
    },
    poor: {
      className: "bg-orange-500 hover:bg-orange-500 text-white rounded-full",
      label: "Poor",
    },
    damaged: {
      className: "bg-red-500 hover:bg-red-500 text-white rounded-full",
      label: "Damaged",
    },
    lost: {
      className: "bg-red-700 hover:bg-red-700 text-white rounded-full",
      label: "Lost",
    },
  };

  // Default to 'good' if condition is not recognized
  const style = conditionStyles[condition] || conditionStyles.good;

  return <Badge className={style.className}>{style.label}</Badge>;
}

export default function ReturnBookPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { fetchReturnedBooks, returnedBooks, isLoading, error } =
    useBookstore();

  useEffect(() => {
    fetchReturnedBooks();
  }, []);

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
            {returnedBooks.data
              .filter((issue) => issue.returnDate)
              .map((issue) => (
                <TableRow key={issue._id} className="border-gray-300 hover:">
                  <TableCell>{`R${issue._id.slice(1)}`}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{issue.book?.title}</div>
                      <div className="text-sm text-gray-400">
                        {issue.book?._id}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>
                        {issue.issuedTo?.firstName} {issue.issuedTo?.lastName}
                      </div>
                      <div className="text-sm text-gray-400">
                        {issue.issuedTo?._id}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDateToDDMMYY(issue.issueDate)}</TableCell>
                  <TableCell>{formatDateToDDMMYY(issue.returnDate)}</TableCell>
                  <TableCell>
                    {getConditionBadge(issue.bookCondition)}
                  </TableCell>
                  <TableCell>₹{issue.fine || 0}</TableCell>
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
