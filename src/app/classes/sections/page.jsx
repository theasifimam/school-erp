"use client";

import React, { use, useEffect, useState } from "react";
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
import { Pagination } from "@/components/common/Pagination";
import { SectionFormModal } from "@/components/classes/SectionFormModal";
import { useClassStore } from "@/lib/state/stores/classStore";
import { useSectionStore } from "@/lib/state/stores/sectionStore";

export default function GradesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const {
    fetchSections,
    sections,
    currentSection,
    deleteSection,
    updateSection,
    successMessage,
  } = useSectionStore();

  const { fetchClasses } = useClassStore();
  // Fetch classes on mount
  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchSections();
  }, [successMessage]);

  // Filter grades
  const filteredGrades = sections.filter((section) => {
    const matchesSearch =
      section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.coordinator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || section.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGrades = filteredGrades.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGrades.length / itemsPerPage);

  const handleEdit = (section) => {
    setSelectedGrade(section);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedGrade(null);
    setIsDialogOpen(true);
  };

  // Calculate summary stats
  const totalStudents = sections.reduce(
    (sum, section) => sum + section.students,
    0
  );
  const totalClasses = sections.reduce(
    (sum, section) => sum + section.classes,
    0
  );
  const totalSections = sections.reduce(
    (sum, section) => sum + section.sections?.length,
    0
  );
  const activeSections = sections.filter(
    (section) => section.status === "active"
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="rounded-3xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Sections</p>
              <h3 className="text-xl font-bold">{sections.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl">
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
        <Card className="rounded-3xl">
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
        <Card className="rounded-3xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Grades</p>
              <h3 className="text-xl font-bold">{activeSections}</h3>
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
                Add Section
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Section Name</TableHead>
                <TableHead>Room No.</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sections.length > 0 ? (
                sections.map((section) => (
                  <TableRow key={section._id}>
                    <TableCell className="font-medium">
                      {section.name}
                    </TableCell>
                    <TableCell>{section.roomNumber}</TableCell>
                    <TableCell>{section.capacity}</TableCell>
                    <TableCell>
                      {section.classId ? section.classId.name : "N/A"}
                    </TableCell>
                    <TableCell>
                      {section.academicYear ? section.academicYear : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          section.status === "active" ? "success" : "secondary"
                        }
                        className={
                          section.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {section.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(section)}
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
      <SectionFormModal
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
