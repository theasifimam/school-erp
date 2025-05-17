"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ClassFormDialog({
  open,
  onOpenChange,
  classData,
  onSuccess,
  teachers = [],
}) {
  const isEditMode = Boolean(classData);

  // Initialize with default values or existing class data
  const defaultFormData = {
    name: "",
    grade: "",
    teacher: "",
    capacity: 30,
    sections: ["A"],
    description: "",
  };

  const [formData, setFormData] = useState(classData || defaultFormData);
  const [sectionInput, setSectionInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Reset form when dialog opens/closes or classData changes
  useEffect(() => {
    if (open) {
      setFormData(classData || defaultFormData);
      setErrors({});
      setTouched({});
      setSectionInput("");
    }
  }, [open, classData]);

  // Use sample teachers if none provided
  const availableTeachers =
    teachers.length > 0
      ? teachers
      : [
          { id: "t1", name: "John Smith" },
          { id: "t2", name: "Emma Johnson" },
          { id: "t3", name: "Michael Brown" },
          { id: "t4", name: "Sarah Davis" },
        ];

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length < 2
          ? "Class name must be at least 2 characters."
          : "";
      case "grade":
        return !value ? "Please select a grade level." : "";
      case "teacher":
        return !value ? "Please select a teacher." : "";
      case "capacity":
        return value < 1 || value > 50
          ? "Capacity must be between 1 and 50."
          : "";
      case "sections":
        return value.length < 1 ? "At least one section is required." : "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = ["name", "grade", "teacher", "capacity", "sections"];

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched for validation
    const allTouched = {};
    ["name", "grade", "teacher", "capacity", "sections"].forEach((field) => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        isEditMode ? "Class updated successfully" : "Class created successfully"
      );
      onSuccess(formData);
      onOpenChange(false);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Mark field as touched
    setTouched({ ...touched, [name]: true });

    // Validate field if touched
    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: validateField(name, value),
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Mark field as touched
    setTouched({ ...touched, [name]: true });

    // Validate field
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const addSection = () => {
    if (!sectionInput.trim()) return;

    const normalizedInput = sectionInput.trim().toUpperCase();

    if (!formData.sections.includes(normalizedInput)) {
      const newSections = [...formData.sections, normalizedInput];
      setFormData({
        ...formData,
        sections: newSections,
      });

      // Clear any sections error
      if (errors.sections) {
        setErrors({
          ...errors,
          sections: "",
        });
      }
    } else {
      toast.error(`Section ${normalizedInput} already exists`);
    }

    setSectionInput("");
  };

  const removeSection = (sectionToRemove) => {
    const newSections = formData.sections.filter(
      (section) => section !== sectionToRemove
    );

    setFormData({
      ...formData,
      sections: newSections,
    });

    // Validate sections after removal
    if (newSections.length === 0) {
      setErrors({
        ...errors,
        sections: "At least one section is required.",
      });
    }
  };

  const handleSectionInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSection();
    }
  };

  const gradeOptions = [
    "Kindergarten",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <ScrollArea className="max-h-[80vh] pr-4">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Class" : "Add New Class"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the class information below."
                : "Fill in the details to create a new class."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4 ">
            <div>
              <Label htmlFor="name" className="mb-1 block">
                Class Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Mathematics 101"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-destructive mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="grade" className="mb-1 block">
                  Grade Level
                </Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => handleSelectChange("grade", value)}
                >
                  <SelectTrigger
                    id="grade"
                    aria-invalid={errors.grade ? "true" : "false"}
                    aria-describedby={errors.grade ? "grade-error" : undefined}
                    className="w-full"
                  >
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.grade && (
                  <p id="grade-error" className="text-sm text-destructive mt-1">
                    {errors.grade}
                  </p>
                )}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="teacher" className="mb-1 block">
                  Class Teacher
                </Label>
                <Select
                  value={formData.teacher}
                  onValueChange={(value) =>
                    handleSelectChange("teacher", value)
                  }
                >
                  <SelectTrigger
                    id="teacher"
                    aria-invalid={errors.teacher ? "true" : "false"}
                    aria-describedby={
                      errors.teacher ? "teacher-error" : undefined
                    }
                    className="w-full"
                  >
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTeachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.name}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.teacher && (
                  <p
                    id="teacher-error"
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.teacher}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="capacity" className="mb-1 block">
                Student Capacity
              </Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                max="50"
                value={formData.capacity}
                onChange={handleInputChange}
                onBlur={handleBlur}
                aria-invalid={errors.capacity ? "true" : "false"}
                aria-describedby={
                  errors.capacity ? "capacity-error" : undefined
                }
              />
              {errors.capacity && (
                <p
                  id="capacity-error"
                  className="text-sm text-destructive mt-1"
                >
                  {errors.capacity}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="mb-1 block">
                Class Description (Optional)
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Brief description of the class"
                value={formData.description || ""}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="section-input" className="mb-1 block">
                Sections
              </Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="section-input"
                  value={sectionInput}
                  onChange={(e) => setSectionInput(e.target.value)}
                  onKeyDown={handleSectionInputKeyDown}
                  placeholder="Add section (e.g., B)"
                  className="flex-1"
                  maxLength={3}
                  aria-invalid={errors.sections ? "true" : "false"}
                  aria-describedby={
                    errors.sections ? "sections-error" : undefined
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSection}
                  disabled={!sectionInput.trim()}
                  aria-label="Add section"
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2" id="sections-list">
                {formData.sections?.map((section) => (
                  <Badge
                    key={section}
                    variant="secondary"
                    className="flex items-center"
                  >
                    <span>Section {section}</span>
                    <button
                      type="button"
                      onClick={() => removeSection(section)}
                      className="ml-1 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-offset-1 rounded-full"
                      aria-label={`Remove Section ${section}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {errors.sections && (
                <p
                  id="sections-error"
                  className="text-sm text-destructive mt-1"
                >
                  {errors.sections}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Press Enter to quickly add a section
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEditMode ? "Save Changes" : "Create Class"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
