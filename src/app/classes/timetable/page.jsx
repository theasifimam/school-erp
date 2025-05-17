"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  Edit,
  Trash2,
  Plus,
  AlertCircle,
  Check,
  FileDown,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import AddTimetableModal from "@/components/classes/AddTimetableModal";
import EditTimetableModal from "@/components/classes/EditTimetableModal";
import { Input } from "@/components/ui/input";
// Import jspdf-html2canvas for simple PDF generation
// We'll use a simpler approach since jspdf-autotable is causing issues

export default function TimetablePage() {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState("class1a");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [schoolName, setSchoolName] = useState("Highland Academy");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    time: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
  });

  useEffect(() => {
    // Check if jspdf is already loaded
    if (!window.jspdf) {
      // Create script element
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.async = true;

      // Append to document
      document.body.appendChild(script);

      // Clean up
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  // Classes data
  const classes = [
    { id: "class1a", name: "Class 1-A" },
    { id: "class2b", name: "Class 2-B" },
    { id: "class3c", name: "Class 3-C" },
    { id: "class4d", name: "Class 4-D" },
    { id: "class5e", name: "Class 5-E" },
  ];

  // Sample timetable data
  const [timetableData, setTimetableData] = useState([
    {
      id: 1,
      time: "08:00 - 08:45",
      monday: "Mathematics",
      tuesday: "Science",
      wednesday: "English",
      thursday: "History",
      friday: "Mathematics",
    },
    {
      id: 2,
      time: "08:50 - 09:35",
      monday: "Science",
      tuesday: "Mathematics",
      wednesday: "Computer Science",
      thursday: "English",
      friday: "Science",
    },
    {
      id: 3,
      time: "09:40 - 10:25",
      monday: "English",
      tuesday: "History",
      wednesday: "Mathematics",
      thursday: "Science",
      friday: "Computer Science",
    },
    {
      id: 4,
      time: "10:40 - 11:25",
      monday: "History",
      tuesday: "English",
      wednesday: "Science",
      thursday: "Mathematics",
      friday: "English",
    },
    {
      id: 5,
      time: "11:30 - 12:15",
      monday: "Computer Science",
      tuesday: "Computer Science",
      wednesday: "History",
      thursday: "Computer Science",
      friday: "History",
    },
  ]);

  // Subject options
  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Computer Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Geography",
    "Art",
    "Music",
    "Physical Education",
  ];

  // Handle add form change
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({
      ...addFormData,
      [name]: value,
    });
  };

  // Handle add form submit
  const handleAddSubmit = () => {
    // Validate form
    if (!addFormData.time) {
      setFormError("Time slot is required");
      return;
    }

    // Check if the time slot already exists
    if (timetableData.some((item) => item.time === addFormData.time)) {
      setFormError("This time slot already exists");
      return;
    }

    // Add new timetable entry
    const newEntry = {
      id: timetableData.length + 1,
      ...addFormData,
    };

    setTimetableData([...timetableData, newEntry]);
    setAddFormData({
      time: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
    });
    setIsAddModalOpen(false);
    setFormError("");
    showSuccess("Timetable entry added successfully");
  };

  // Handle edit button click
  const handleEditClick = (item) => {
    setCurrentEditItem(item);
    setIsEditModalOpen(true);
  };

  // Handle edit form change
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditItem({
      ...currentEditItem,
      [name]: value,
    });
  };

  // Handle edit form submit
  const handleEditSubmit = () => {
    // Validate form
    if (!currentEditItem.time) {
      setFormError("Time slot is required");
      return;
    }

    // Check if the time slot already exists (excluding the current item)
    if (
      timetableData.some(
        (item) =>
          item.time === currentEditItem.time && item.id !== currentEditItem.id
      )
    ) {
      setFormError("This time slot already exists");
      return;
    }

    // Update timetable entry
    const updatedTimetable = timetableData.map((item) =>
      item.id === currentEditItem.id ? currentEditItem : item
    );

    setTimetableData(updatedTimetable);
    setIsEditModalOpen(false);
    setFormError("");
    showSuccess("Timetable entry updated successfully");
  };

  // Handle delete
  const handleDelete = (id) => {
    const updatedTimetable = timetableData.filter((item) => item.id !== id);
    setTimetableData(updatedTimetable);
    showSuccess("Timetable entry deleted successfully");
  };

  // Show success message
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Get current class name
  const getCurrentClassName = () => {
    const classObj = classes.find((c) => c.id === selectedClass);
    return classObj ? classObj.name : "";
  };

  // Handle PDF export with enhanced design
  const handleExportPDF = () => {
    try {
      // Create a new PDF document
      const doc = new window.jspdf.jsPDF();
      const className = getCurrentClassName();

      // Set document properties
      doc.setProperties({
        title: `${schoolName} - ${className} Timetable`,
        subject: `Class Schedule for Week of ${format(
          selectedDay,
          "MMMM d, yyyy"
        )}`,
        creator: "School Management System",
      });

      // Colors
      const primaryColor = [0, 70, 140]; // Dark blue
      const secondaryColor = [80, 140, 210]; // Light blue
      const accentColor = [220, 80, 60]; // Red accent
      const bgColor = [245, 247, 250]; // Light background

      // Set page margins
      const margin = 15;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const contentWidth = pageWidth - margin * 2;

      let yPos = margin;

      // Add school logo (placeholder rectangle with school initial)
      doc.setFillColor(...primaryColor);
      doc.rect(margin, yPos, 15, 15, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text(schoolName.charAt(0), margin + 7.5, yPos + 10, {
        align: "center",
      });

      // Add school name
      doc.setFontSize(20);
      doc.setTextColor(...primaryColor);
      doc.setFont("helvetica", "bold");
      doc.text(schoolName, margin + 20, yPos + 10);

      yPos += 20;

      // Add horizontal line
      doc.setDrawColor(...secondaryColor);
      doc.setLineWidth(0.5);
      doc.line(margin, yPos, pageWidth - margin, yPos);

      yPos += 10;

      // Add timetable header
      doc.setFontSize(16);
      doc.setTextColor(...primaryColor);
      doc.setFont("helvetica", "bold");
      doc.text(`Class Timetable: ${className}`, margin, yPos);

      yPos += 7;

      // Add week date
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.setFont("helvetica", "normal");
      doc.text(`Week of ${format(selectedDay, "MMMM d, yyyy")}`, margin, yPos);

      yPos += 15;

      // Calculate table dimensions
      const timeColWidth = 35;
      const dayColWidth = (contentWidth - timeColWidth) / 5;
      const headerHeight = 12;
      const rowHeight = 14;

      // Draw table background
      doc.setFillColor(...bgColor);
      doc.rect(
        margin,
        yPos,
        contentWidth,
        (timetableData.length + 1) * rowHeight,
        "F"
      );

      // Draw header row
      doc.setFillColor(...primaryColor);
      doc.rect(margin, yPos, contentWidth, headerHeight, "F");

      // Add header text
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);

      // Time column header
      doc.text("TIME", margin + timeColWidth / 2, yPos + headerHeight / 2 + 1, {
        align: "center",
      });

      // Day column headers
      const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
      days.forEach((day, i) => {
        doc.text(
          day,
          margin + timeColWidth + dayColWidth * i + dayColWidth / 2,
          yPos + headerHeight / 2 + 1,
          { align: "center" }
        );
      });

      yPos += headerHeight;

      // Draw table data
      timetableData.forEach((row, index) => {
        const isEven = index % 2 === 0;

        // Alternating row colors
        if (isEven) {
          doc.setFillColor(255, 255, 255);
        } else {
          doc.setFillColor(240, 245, 250);
        }

        doc.rect(margin, yPos, contentWidth, rowHeight, "F");

        // Time column
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...primaryColor);
        doc.text(
          row.time,
          margin + timeColWidth / 2,
          yPos + rowHeight / 2 + 1,
          { align: "center" }
        );

        // Subject columns
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);

        const subjects = [
          row.monday,
          row.tuesday,
          row.wednesday,
          row.thursday,
          row.friday,
        ];
        subjects.forEach((subject, i) => {
          if (!subject) return;

          // Add subject text
          const xPos = margin + timeColWidth + dayColWidth * i;

          // Add subject highlight for visual distinction
          if (subject && subject.trim() !== "") {
            // Choose a consistent but different color for each unique subject
            const subjectHash = hashCode(subject) % 5;
            const colors = [
              [230, 240, 255], // Light blue
              [240, 250, 240], // Light green
              [255, 240, 235], // Light orange
              [245, 235, 255], // Light purple
              [255, 245, 225], // Light yellow
            ];

            doc.setFillColor(...colors[subjectHash]);
            doc.roundedRect(
              xPos + 2,
              yPos + 2,
              dayColWidth - 4,
              rowHeight - 4,
              2,
              2,
              "F"
            );
          }

          // Draw the subject text
          doc.text(
            subject || "",
            xPos + dayColWidth / 2,
            yPos + rowHeight / 2 + 1,
            { align: "center", maxWidth: dayColWidth - 6 }
          );
        });

        yPos += rowHeight;
      });

      // Draw table border
      doc.setDrawColor(...secondaryColor);
      doc.setLineWidth(0.5);
      doc.rect(
        margin,
        yPos - rowHeight * timetableData.length - headerHeight,
        contentWidth,
        rowHeight * timetableData.length + headerHeight
      );

      // Draw vertical divider lines
      let xPos = margin + timeColWidth;
      for (let i = 0; i < 5; i++) {
        doc.line(
          xPos,
          yPos - rowHeight * timetableData.length - headerHeight,
          xPos,
          yPos
        );
        xPos += dayColWidth;
      }

      // Draw horizontal divider lines
      let dividerYPos = yPos - rowHeight * timetableData.length;
      for (let i = 0; i < timetableData.length; i++) {
        doc.line(margin, dividerYPos, margin + contentWidth, dividerYPos);
        dividerYPos += rowHeight;
      }

      // Add footer
      const footerYPos = pageHeight - margin;

      // Add horizontal line
      doc.setDrawColor(...secondaryColor);
      doc.setLineWidth(0.5);
      doc.line(margin, footerYPos - 15, pageWidth - margin, footerYPos - 15);

      // Add generated date
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(
        `Generated on ${format(new Date(), "MMMM d, yyyy, h:mm a")}`,
        margin,
        footerYPos - 5
      );

      // Add page number
      doc.text(`Page 1 of 1`, pageWidth - margin, footerYPos - 5, {
        align: "right",
      });

      // Save the PDF
      doc.save(`${schoolName} - ${className} Timetable.pdf`);
      setIsExportModalOpen(false);
      showSuccess("Timetable exported successfully");
    } catch (error) {
      console.error("PDF export error:", error);
      setFormError("Failed to export PDF. Please try again.");
    }
  };

  // Helper function to get consistent colors for subjects
  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }

  return (
    <div className="container mx-auto py-6">
      {/* Success Message */}
      {successMessage && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>
              Select a date to view the timetable
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDay}
              onSelect={setSelectedDay}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-2 w-full">
              <Button
                className="w-full"
                onClick={() => {
                  setAddFormData({
                    time: "",
                    monday: "",
                    tuesday: "",
                    wednesday: "",
                    thursday: "",
                    friday: "",
                  });
                  setFormError("");
                  setIsAddModalOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Entry
              </Button>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => setIsExportModalOpen(true)}
              >
                <FileDown className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Weekly Timetable</CardTitle>
                <CardDescription>
                  {getCurrentClassName()} | Week of{" "}
                  {format(selectedDay, "MMMM d, yyyy")}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  View Monthly
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setIsExportModalOpen(true)}
                >
                  <FileDown className="mr-1 h-3 w-3" />
                  Export PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="day">Day View</TabsTrigger>
              </TabsList>

              <TabsContent value="table" className="w-full">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/6">Time</TableHead>
                        <TableHead className="w-1/6">Monday</TableHead>
                        <TableHead className="w-1/6">Tuesday</TableHead>
                        <TableHead className="w-1/6">Wednesday</TableHead>
                        <TableHead className="w-1/6">Thursday</TableHead>
                        <TableHead className="w-1/6">Friday</TableHead>
                        <TableHead className="w-12">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timetableData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">
                            {row.time}
                          </TableCell>
                          <TableCell>{row.monday}</TableCell>
                          <TableCell>{row.tuesday}</TableCell>
                          <TableCell>{row.wednesday}</TableCell>
                          <TableCell>{row.thursday}</TableCell>
                          <TableCell>{row.friday}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEditClick(row)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500 hover:text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Timetable Entry
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      timetable entry? This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-500 hover:bg-red-600"
                                      onClick={() => handleDelete(row.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="day">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Schedule for {format(selectedDay, "EEEE, MMMM d, yyyy")}
                  </h3>

                  {timetableData.map((row) => {
                    // Determine which day of the week to show based on selectedDay
                    const dayOfWeek = format(selectedDay, "EEEE").toLowerCase();
                    const subject =
                      dayOfWeek === "monday"
                        ? row.monday
                        : dayOfWeek === "tuesday"
                        ? row.tuesday
                        : dayOfWeek === "wednesday"
                        ? row.wednesday
                        : dayOfWeek === "thursday"
                        ? row.thursday
                        : dayOfWeek === "friday"
                        ? row.friday
                        : "No class";

                    // Skip weekends
                    if (dayOfWeek === "saturday" || dayOfWeek === "sunday") {
                      return null;
                    }

                    return (
                      <Card
                        key={row.id}
                        className="border-l-4 border-l-blue-500"
                      >
                        <CardHeader className="py-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-sm font-medium">
                              {row.time}
                            </CardTitle>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleEditClick(row)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-red-500 hover:text-red-600"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Timetable Entry
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      timetable entry? This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-500 hover:bg-red-600"
                                      onClick={() => handleDelete(row.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-base font-medium">{subject}</p>
                        </CardContent>
                      </Card>
                    );
                  })}

                  {(format(selectedDay, "EEEE").toLowerCase() === "saturday" ||
                    format(selectedDay, "EEEE").toLowerCase() === "sunday") && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertTitle>Weekend</AlertTitle>
                      <AlertDescription>
                        No classes are scheduled for weekends.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Add Timetable Entry Modal */}
      <AddTimetableModal
        {...{
          isAddModalOpen,
          setIsAddModalOpen,
          addFormData,
          setAddFormData,
          handleAddFormChange,
          handleAddSubmit,
          formError,
          subjects,
        }}
        getCurrentClassName={getCurrentClassName}
      />

      {/* Edit Timetable Entry Modal */}
      <EditTimetableModal
        {...{
          isEditModalOpen,
          setIsEditModalOpen,
          currentEditItem,
          setCurrentEditItem,
          handleEditFormChange,
          handleEditSubmit,
          formError,
          subjects,
          getCurrentClassName,
        }}
      />

      {/* Export PDF Modal */}
      <AlertDialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Export Timetable PDF</AlertDialogTitle>
            <AlertDialogDescription>
              Enter school name to include in the PDF heading.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  School Name
                </label>
                <Input
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Enter school name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleExportPDF}>
              <FileDown className="mr-2 h-4 w-4" /> Export PDF
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
