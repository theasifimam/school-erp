"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Users,
  Calendar,
} from "lucide-react";
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal";
import SubjectFormModal from "@/components/classes/SubjectFormModal";
import { useSubjectStore } from "@/lib/state/stores/subjectStore";

export default function SubjectsPage() {
  // Sample subjects data with additional fields
  const initialSubjects = [
    {
      id: "sub-1",
      name: "Mathematics",
      classes: 5,
      teachers: 3,
      curriculum: "Standard",
      description:
        "Core mathematics curriculum covering algebra, geometry, and calculus.",
      scheduleHours: 8,
      department: "Science & Mathematics",
      gradeLevel: "All Grades",
    },
    {
      id: "sub-2",
      name: "Science",
      classes: 5,
      teachers: 2,
      curriculum: "Enhanced",
      description: "Comprehensive science program with laboratory experiments.",
      scheduleHours: 6,
      department: "Science & Mathematics",
      gradeLevel: "Middle School",
    },
    {
      id: "sub-3",
      name: "English",
      classes: 5,
      teachers: 4,
      curriculum: "Standard",
      description: "Language arts, literature, and composition.",
      scheduleHours: 7,
      department: "Humanities",
      gradeLevel: "All Grades",
    },
    {
      id: "sub-4",
      name: "History",
      classes: 4,
      teachers: 2,
      curriculum: "Standard",
      description: "World and local history with cultural studies.",
      scheduleHours: 5,
      department: "Humanities",
      gradeLevel: "High School",
    },
    {
      id: "sub-5",
      name: "Computer Science",
      classes: 3,
      teachers: 1,
      curriculum: "Advanced",
      description: "Programming, algorithms, and computer systems.",
      scheduleHours: 4,
      department: "Technology",
      gradeLevel: "High School",
    },
  ];

  // State management
  // const [subjects, setSubjects] = useState(initialSubjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // const [currentSubject, setCurrentSubject] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    classes: [],
    teachers: [],
    curriculum: "Standard",
    description: "",
    scheduleHours: "",
    department: "",
    gradeLevel: "",
  });

  const {
    currentSubject,
    deleteSubject,
    subjects,
    fetchSubjects,
    setSubjects,
    setCurrentSubject,
  } = useSubjectStore();

  // Filter subjects based on search query
  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open the edit modal with the subject data
  const handleEditClick = (subject) => {
    setFormData({
      id: subject.id,
      name: subject.name,
      classes: subject.classes,
      teachers: subject.teachers,
      curriculum: subject.curriculum,
      description: subject.description || "",
      scheduleHours: subject.scheduleHours || "",
      department: subject.department || "",
      gradeLevel: subject.gradeLevel || "",
    });
    setCurrentSubject(subject);
    setIsEditModalOpen(true);
  };

  // Open the view modal with the subject data
  const handleViewClick = (subject) => {
    setCurrentSubject(subject);
    setIsViewModalOpen(true);
  };

  // Open the delete confirmation dialog
  const handleDeleteClick = (subject) => {
    setCurrentSubject(subject);
    setIsDeleteDialogOpen(true);
  };

  // Add a new subject
  const handleAddClick = () => {
    setFormData({
      id: `sub-${subjects.length + 1}`,
      name: "",
      classes: "",
      teachers: "",
      curriculum: "Standard",
      description: "",
      scheduleHours: "",
      department: "",
      gradeLevel: "",
    });
    setCurrentSubject(null);
    setIsEditModalOpen(true);
  };

  // Delete the subject
  const handleDeleteSubject = () => {
    setSubjects(subjects.filter((subject) => subject.id !== currentSubject.id));
    setIsDeleteDialogOpen(false);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  console.log(subjects);
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Subjects</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  className="pl-8 w-64"
                  placeholder="Search subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleAddClick}>
                <Plus className="h-4 w-4" />
                Add Subject
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Subject Name</TableHead>
                <TableHead className="w-1/6">Code</TableHead>
                <TableHead className="w-1/6">Department</TableHead>
                <TableHead className="w-1/6">Curriculum Type</TableHead>
                <TableHead className="w-1/4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{subject.name}</TableCell>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>{subject.department}</TableCell>
                  <TableCell>{subject.type}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewClick(subject)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(subject)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(subject)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit/Add Subject Modal */}
      <SubjectFormModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        formData={formData}
        setFormData={setFormData}
        classes={[
          { _id: "class-1", name: "Class 1" },
          { _id: "class-2", name: "Class 2" },
          { _id: "class-3", name: "Class 3" },
          { _id: "class-4", name: "Class 4" },
          { _id: "class-5", name: "Class 5" },
          { _id: "class-6", name: "Class 6" },
          { _id: "class-7", name: "Class 7" },
          { _id: "class-8", name: "Class 8" },
          { _id: "class-9", name: "Class 9" },
          { _id: "class-10", name: "Class 10" },
          { _id: "class-11", name: "Class 11" },
          { _id: "class-12", name: "Class 12" },
        ]} // Array of class objects with _id and name
        teachers={[
          { _id: "teacher-1", name: "John Doe" },
          { _id: "teacher-2", name: "Jane Smith" },
          { _id: "teacher-3", name: "Alice Johnson" },
          { _id: "teacher-4", name: "Bob Brown" },
          { _id: "teacher-5", name: "Charlie Davis" },
          { _id: "teacher-6", name: "Diana Wilson" },
          { _id: "teacher-7", name: "Ethan Martinez" },
          { _id: "teacher-8", name: "Fiona Garcia" },
          { _id: "teacher-9", name: "George Lee" },
          { _id: "teacher-10", name: "Hannah Walker" },
        ]} // Array of teacher objects with _id and name
      />
      {/* View Subject Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Subject Details</DialogTitle>
          </DialogHeader>
          {currentSubject && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">
                  {currentSubject.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {currentSubject.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Curriculum</p>
                      <p className="text-sm text-gray-600">
                        {currentSubject.curriculum}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Teachers</p>
                      <p className="text-sm text-gray-600">
                        {currentSubject.teachers}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Classes per Week</p>
                      <p className="text-sm text-gray-600">
                        {currentSubject.classes}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Weekly Hours</p>
                      <p className="text-sm text-gray-600">
                        {currentSubject.scheduleHours || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium">Department</p>
                  <p className="text-sm text-gray-600">
                    {currentSubject.department || "Not assigned"}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="text-sm font-medium">Grade Level</p>
                  <p className="text-sm text-gray-600">
                    {currentSubject.gradeLevel || "Not specified"}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEditClick(currentSubject);
                  }}
                >
                  Edit
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationModal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteSubject}
        title={currentSubject?.name}
        description={`Are you sure you want to delete this ${currentSubject?.name}? This action cannot be undone.`}
      />
    </div>
  );
}

// Missing Clock component
function Clock(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
