"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { studentsData, issuesData } from "@/assets/data/data";

export default function LibraryStudents() {
  return (
    <Card className=" border-gray-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Student Records</CardTitle>
        <CardDescription className="text-gray-400">
          Access and manage student records related to library activities
        </CardDescription>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search by student name or ID..."
              className="pl-10  border-gray-700"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-48  border-gray-700">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent className=" border-gray-700">
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="10">Grade 10</SelectItem>
              <SelectItem value="11">Grade 11</SelectItem>
              <SelectItem value="12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-300 hover:">
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Grade/Class</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Books Borrowed</TableHead>
              <TableHead>Overdue</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsData.map((student) => (
              <TableRow key={student.id} className="border-gray-300 hover:">
                <TableCell>{student.id}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.contact}</TableCell>
                <TableCell>
                  {
                    issuesData.filter(
                      (issue) =>
                        issue.studentId === student.id &&
                        issue.status !== "returned"
                    ).length
                  }
                </TableCell>
                <TableCell>
                  {issuesData.filter(
                    (issue) =>
                      issue.studentId === student.id &&
                      issue.status === "overdue"
                  ).length > 0 ? (
                    <Badge className="bg-red-600">
                      {
                        issuesData.filter(
                          (issue) =>
                            issue.studentId === student.id &&
                            issue.status === "overdue"
                        ).length
                      }
                    </Badge>
                  ) : (
                    <Badge className="bg-green-600">0</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-700 hover:bg-blue-600 border-blue-600 text-white"
                  >
                    View History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-300 pt-4">
        <div className="text-sm text-gray-400">
          Showing {studentsData.length} students
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className=" border-gray-700">
            Previous
          </Button>
          <Button variant="outline" className=" border-gray-700">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
