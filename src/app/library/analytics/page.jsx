"use client";

import { BarChart4 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
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
import { issuesData } from "@/assets/data/data";
import { booksData } from "@/assets/data/data";

export default function Analytics() {
  return (
    <div className="grid grid-cols-2 gap-6 min-h-screen overflow-y-auto">
      <Card className=" border-gray-300">
        <CardHeader>
          <CardTitle>Book Circulation Overview</CardTitle>
          <CardDescription className="text-gray-400">
            Monthly statistics on book issues and returns
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <BarChart4 size={64} className="mx-auto mb-4 opacity-50" />
            <p>Bar Chart visualization would appear here</p>
            <p className="text-sm">Showing monthly book circulation trends</p>
          </div>
        </CardContent>
      </Card>

      <Card className=" border-gray-300">
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
          <CardDescription className="text-gray-400">
            Distribution of books by category
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <BarChart4 size={64} className="mx-auto mb-4 opacity-50" />
            <p>Pie Chart visualization would appear here</p>
            <p className="text-sm">Showing distribution of books by category</p>
          </div>
        </CardContent>
      </Card>

      <Card className=" border-gray-300 col-span-2">
        <CardHeader>
          <CardTitle>Library Statistics</CardTitle>
          <CardDescription className="text-gray-400">
            Key metrics and statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-6">
            <div className=" p-6 rounded-lg">
              <h3 className="text-gray-400 text-sm font-medium mb-2">
                Total Books
              </h3>
              <p className="text-3xl font-bold">
                {booksData.reduce(
                  (acc, book) => acc + parseInt(book.copies),
                  0
                )}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                <span className="text-green-400">+5%</span> from last month
              </p>
            </div>
            <div className=" p-6 rounded-lg">
              <h3 className="text-gray-400 text-sm font-medium mb-2">
                Available Books
              </h3>
              <p className="text-3xl font-bold">
                {booksData.reduce(
                  (acc, book) => acc + parseInt(book.available),
                  0
                )}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                <span className="text-red-400">-3%</span> from last month
              </p>
            </div>
            <div className=" p-6 rounded-lg">
              <h3 className="text-gray-400 text-sm font-medium mb-2">
                Books Issued
              </h3>
              <p className="text-3xl font-bold">
                {
                  issuesData.filter(
                    (issue) =>
                      issue.status === "issued" || issue.status === "overdue"
                  ).length
                }
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Currently in circulation
              </p>
            </div>
            <div className=" p-6 rounded-lg">
              <h3 className="text-gray-400 text-sm font-medium mb-2">
                Overdue Books
              </h3>
              <p className="text-3xl font-bold text-red-400">
                {
                  issuesData.filter((issue) => issue.status === "overdue")
                    .length
                }
              </p>
              <p className="text-sm text-gray-400 mt-2">Need attention</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-4">Most Popular Books</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-300 hover:">
                  <TableHead>Book Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Issue Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-gray-300 hover:">
                  <TableCell className="font-medium">
                    Advanced Mathematics
                  </TableCell>
                  <TableCell>Mathematics</TableCell>
                  <TableCell className="text-right">14</TableCell>
                </TableRow>
                <TableRow className="border-gray-300 hover:">
                  <TableCell className="font-medium">
                    The Great Gatsby
                  </TableCell>
                  <TableCell>Literature</TableCell>
                  <TableCell className="text-right">12</TableCell>
                </TableRow>
                <TableRow className="border-gray-300 hover:">
                  <TableCell className="font-medium">
                    Introduction to Physics
                  </TableCell>
                  <TableCell>Science</TableCell>
                  <TableCell className="text-right">10</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
