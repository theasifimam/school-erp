"use client";

import React, { useEffect, useState } from "react";
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
import { ClassFormDialog } from "@/app/classes/components/ClassFormDialog";
import { Pagination } from "@/components/common/Pagination";
import { useClassStore } from "@/lib/state/stores/classStore";
import { gradeList } from "@/assets/data/data";
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal";

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { classes, fetchClasses, isLoading, deleteClass } = useClassStore();

  // Filter classes
  const filteredClasses = classes.filter((cls) => {
    const matchesSearch = cls.name
      .toLowerCase()
      .includes(searchTerm?.toLowerCase());
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
    console.log("Editing class:", cls);
    setSelectedClass({
      ...cls,
      id: cls._id,
      classTeacher: cls?.classTeacher?._id,
    });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedClass(null);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="space-y-6">
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
                  {/* Add more grades */}
                  {gradeList.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
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
                <TableHead>Class Code</TableHead>
                <TableHead>Class Order</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentClasses?.length > 0 ? (
                currentClasses?.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>{cls.code}</TableCell>
                    <TableCell>{cls?.order} </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge key={cls.section} variant="outline">
                          Section {cls.section}
                        </Badge>
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedClass(cls);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
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

      <DeleteConfirmationModal
        {...{
          isOpen: isDeleteDialogOpen,
          onOpenChange: setIsDeleteDialogOpen,
          selectedClass,
          title: "Delete Class",
          itemName: selectedClass?.name,
          description: `Are you sure you want to delete ${selectedClass?.name}? This action cannot be undone.`,
          confirmButtonText: "Delete Class",
          onConfirm: async () => {
            await deleteClass(selectedClass._id);
            setIsDeleteDialogOpen(false);
            setSelectedClass(null);
          },
        }}
      />
    </div>
  );
}
