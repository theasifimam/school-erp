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
import { useClassStore } from "@/lib/state/stores/classStore";
import { useFacultyStore } from "@/lib/state/stores/facultyStore";
import { gradeList, sectionsList } from "@/assets/data/data";

export function ClassFormDialog({ open, onOpenChange, classData, onSuccess }) {
  const isEditMode = Boolean(classData);
  const {
    classes,
    currentClass,
    isLoading,
    error,
    successMessage,
    createClass,
    updateClass,
  } = useClassStore();

  const { fetchFaculties, faculties } = useFacultyStore();

  // Initialize with default values or existing class data
  const defaultFormData = {
    name: "",
    grade: "",
    classTeacher: "",
    capacity: 30,
    section: "",
    description: "",
  };

  const [formData, setFormData] = useState(classData || defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Reset form when dialog opens/closes or classData changes
  useEffect(() => {
    if (open) {
      setFormData(classData || defaultFormData);
      setErrors({});
      setTouched({});
    }
  }, [open, classData]);

  useEffect(() => {
    fetchFaculties();
  }, []);

  // Fixed validation function to match actual form field names
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length < 2
          ? "Class name must be at least 2 characters."
          : "";
      case "grade":
        return !value ? "Please select a grade level." : "";
      case "classTeacher": // Changed from "teacher" to "classTeacher"
        return !value ? "Please select a teacher." : "";
      case "capacity":
        return value < 1 || value > 50
          ? "Capacity must be between 1 and 50."
          : "";
      case "section":
        return !value ? "Please, Enter section is required." : "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Updated field names to match the actual form data
    const fields = ["name", "grade", "classTeacher", "capacity", "section"];

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
    ["name", "grade", "classTeacher", "capacity", "section"].forEach(
      (field) => {
        allTouched[field] = true;
      }
    );
    setTouched(allTouched);

    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateClass(formData._id, formData);
      } else {
        await createClass(formData);
      }

      // Modified success handling to not depend on successMessage
      onSuccess({ formData });
      onOpenChange(false);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Form submission error:", error);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1 max-h-[50vh] overflow-y-auto ">
            <div>
              <Label htmlFor="name" className="mb-1 block">
                Class Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Class 1-A or Grade 3-B"
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
                    {gradeList.map((grade) => (
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
                <Label htmlFor="classTeacher" className="mb-1 block">
                  Class Teacher
                </Label>
                <Select
                  value={formData.classTeacher}
                  onValueChange={(value) =>
                    handleSelectChange("classTeacher", value)
                  }
                >
                  <SelectTrigger
                    id="classTeacher"
                    aria-invalid={errors.classTeacher ? "true" : "false"}
                    aria-describedby={
                      errors.classTeacher ? "classTeacher-error" : undefined
                    }
                    className="w-full"
                  >
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties.map((teacher) => (
                      <SelectItem key={teacher._id} value={teacher._id}>
                        {teacher.firstName} {teacher.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.classTeacher && (
                  <p
                    id="classTeacher-error"
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.classTeacher}
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
              <Label htmlFor="section" className="mb-1 block">
                Section
              </Label>
              <div className="flex gap-2 mt-2 w-full">
                <Select
                  value={formData.section}
                  onValueChange={(value) =>
                    handleSelectChange("section", value)
                  }
                >
                  <SelectTrigger
                    id="section"
                    name="section"
                    aria-invalid={errors.section ? "true" : "false"}
                    aria-describedby={
                      errors.section ? "section-error" : undefined
                    }
                    className="w-full"
                  >
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectionsList.map((section) => (
                      <SelectItem key={section} value={section}>
                        {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.section && (
                <p id="section-error" className="text-sm text-destructive mt-1">
                  {errors.section}
                </p>
              )}
            </div>
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
      </DialogContent>
    </Dialog>
  );
}
