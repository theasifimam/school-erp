"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Edit, Trash2, Users, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ClassFormDialog } from "@/components/classes/ClassFormDialog";
import { Pagination } from "@/components/common/Pagination";

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // Sample data with sections
  const classes = [
    {
      id: "cl-1",
      name: "Class 1-A",
      grade: "Grade 1",
      teacher: "John Smith",
      students: 25,
      subjects: 6,
      sections: ["A", "B"],
      capacity: 30,
    },
    {
      id: "cl-2",
      name: "Class 2-B",
      grade: "Grade 2",
      teacher: "Emma Johnson",
      students: 28,
      subjects: 7,
      sections: ["A", "B", "C"],
      capacity: 30,
    },
    // ... more classes
  ];

  // Filter classes
  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === "all" || cls.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClasses = filteredClasses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);

  const handleEdit = (cls) => {
    setSelectedClass(cls);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedClass(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Classes</p>
              <h3 className="text-xl font-bold">{classes.length}</h3>
            </div>
          </CardContent>
        </Card>
        {/* Add more stat cards as needed */}
      </div>

      {/* Main Classes Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Classes & Sections</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  className="pl-9 w-full"
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Filter by grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="Grade 1">Grade 1</SelectItem>
                  <SelectItem value="Grade 2">Grade 2</SelectItem>
                  {/* Add more grades */}
                </SelectContent>
              </Select>
              <Button className="w-full sm:w-auto" onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Class Teacher</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentClasses.length > 0 ? (
                currentClasses.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>{cls.grade}</TableCell>
                    <TableCell>{cls.teacher}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {cls.sections.map((section) => (
                          <Badge key={section} variant="outline">
                            Section {section}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{cls.students}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(cls.students / cls.capacity) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {cls.subjects}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(cls)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    No classes found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredClasses.length)} of{" "}
            {filteredClasses.length} classes
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredClasses.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            className="w-full rounded-b-2xl"
          />
        </CardFooter>
      </Card>

      {/* Class Form Dialog */}
      <ClassFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        classData={selectedClass}
        onSuccess={() => {
          // Refresh data or update state
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}
