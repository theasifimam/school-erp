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
import {
  Search,
  Plus,
  Edit,
  Trash2,
  GraduationCap,
  BookOpen,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GradeFormDialog } from "@/components/classes/GradeFormDialog";
import { Pagination } from "@/components/common/Pagination";

export default function GradesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  // Sample data for grades
  const grades = [
    {
      id: "gr-1",
      name: "Grade 1",
      coordinator: "Emily Parker",
      classes: 3,
      students: 85,
      subjects: 6,
      sections: ["A", "B", "C"],
      maxStudentsPerSection: 30,
      status: "active",
      academicYear: "2025-2026",
    },
    {
      id: "gr-2",
      name: "Grade 2",
      coordinator: "Michael Wilson",
      classes: 4,
      students: 112,
      subjects: 7,
      sections: ["A", "B", "C", "D"],
      maxStudentsPerSection: 30,
      status: "active",
      academicYear: "2025-2026",
    },
    {
      id: "gr-3",
      name: "Grade 3",
      coordinator: "Sarah Johnson",
      classes: 3,
      students: 95,
      subjects: 8,
      sections: ["A", "B", "C"],
      maxStudentsPerSection: 35,
      status: "active",
      academicYear: "2025-2026",
    },
    {
      id: "gr-4",
      name: "Grade 4",
      coordinator: "David Thompson",
      classes: 3,
      students: 90,
      subjects: 9,
      sections: ["A", "B", "C"],
      maxStudentsPerSection: 35,
      status: "active",
      academicYear: "2025-2026",
    },
    {
      id: "gr-5",
      name: "Grade 5",
      coordinator: "Lisa Anderson",
      classes: 2,
      students: 65,
      subjects: 10,
      sections: ["A", "B"],
      maxStudentsPerSection: 35,
      status: "inactive",
      academicYear: "2024-2025",
    },
    // ... more grades
  ];

  // Filter grades
  const filteredGrades = grades.filter((grade) => {
    const matchesSearch =
      grade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.coordinator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || grade.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGrades = filteredGrades.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGrades.length / itemsPerPage);

  const handleEdit = (grade) => {
    setSelectedGrade(grade);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedGrade(null);
    setIsDialogOpen(true);
  };

  // Calculate summary stats
  const totalStudents = grades.reduce((sum, grade) => sum + grade.students, 0);
  const totalClasses = grades.reduce((sum, grade) => sum + grade.classes, 0);
  const totalSections = grades.reduce(
    (sum, grade) => sum + grade.sections.length,
    0
  );
  const activeGrades = grades.filter(
    (grade) => grade.status === "active"
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="rounded-full">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Grades</p>
              <h3 className="text-xl font-bold">{grades.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-full">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <h3 className="text-xl font-bold">{totalStudents}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-full">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Sections</p>
              <h3 className="text-xl font-bold">{totalSections}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-full">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Grades</p>
              <h3 className="text-xl font-bold">{activeGrades}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grades Table */}
      <Card className="rounded-3xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Grades Management</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  className="pl-9 w-full"
                  placeholder="Search grades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full sm:w-auto" onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Grade
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Grade Name</TableHead>
                <TableHead>Coordinator</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentGrades.length > 0 ? (
                currentGrades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.name}</TableCell>
                    <TableCell>{grade.coordinator}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {grade.sections.map((section) => (
                          <Badge key={section} variant="outline">
                            Section {section}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{grade.students}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (grade.students /
                                  (grade.sections.length *
                                    grade.maxStudentsPerSection)) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {grade.subjects}
                      </Badge>
                    </TableCell>
                    <TableCell>{grade.academicYear}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          grade.status === "active" ? "success" : "secondary"
                        }
                        className={
                          grade.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {grade.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(grade)}
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
                  <TableCell colSpan={8} className="text-center h-24">
                    No grades found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="w-full flex justify-between items-center">
          <Pagination
            currentPage={currentPage}
            totalItems={filteredGrades.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            className="w-full"
          />
        </CardFooter>
      </Card>

      {/* Grade Form Dialog */}
      <GradeFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        gradeData={selectedGrade}
        onSuccess={() => {
          // Refresh data or update state
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}
