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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSectionStore } from "@/lib/state/stores/sectionStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { useClassStore } from "@/lib/state/stores/classStore";

export function SectionFormModal({
  open,
  onOpenChange,
  sectionData,
  classId,
  onSuccess,
}) {
  const isEditMode = Boolean(sectionData);
  const {
    sections,
    currentSection,
    isLoading,
    error,
    successMessage,
    createSection,
    updateSection,
  } = useSectionStore();
  const { classes } = useClassStore();

  // Initialize with default values or existing section data
  const defaultFormData = {
    classId: classId || "",
    name: "",
    capacity: "",
    classTeacher: "",
    roomNumber: "",
  };

  const [formData, setFormData] = useState(sectionData || defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Reset form when dialog opens/closes or sectionData changes
  useEffect(() => {
    if (open) {
      setFormData(
        sectionData || { ...defaultFormData, classId: classId || "" }
      );
      setErrors({});
      setTouched({});
    }
  }, [open, sectionData, classId]);

  // Validation function
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length < 1
          ? "Section name is required."
          : value.trim().length > 10
          ? "Section name must be 10 characters or less."
          : "";
      case "classId":
        return !value.trim() ? "Class ID is required." : "";
      case "capacity":
        return !value
          ? "Capacity is required."
          : value < 1
          ? "Capacity must be at least 1."
          : !Number.isInteger(Number(value))
          ? "Capacity must be a whole number."
          : "";
      case "roomNumber":
        return !value.trim() ? "Room number is required." : "";
      default:
        return "";
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    const fields = ["name", "classId", "capacity", "roomNumber"];

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched for validation
    const allTouched = {};
    ["name", "classId", "capacity", "roomNumber"].forEach((field) => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateSection(formData._id, formData);
      } else {
        await createSection(formData);
      }

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
      [name]: name === "capacity" ? parseInt(value) || "" : value,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Section" : "Add New Section"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the section information below."
              : "Fill in the details to create a new section."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 px-1 max-h-[50vh] overflow-y-auto">
            <div>
              <Label htmlFor="name" className="mb-1 block">
                Section Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., A, B, C, D"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capacity" className="mb-1 block">
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  placeholder="e.g., 30, 40, 50"
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
                <Label htmlFor="roomNumber" className="mb-1 block">
                  Room Number
                </Label>
                <Input
                  id="roomNumber"
                  name="roomNumber"
                  placeholder="e.g., 101, A-202"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.roomNumber ? "true" : "false"}
                  aria-describedby={
                    errors.roomNumber ? "roomNumber-error" : undefined
                  }
                />
                {errors.roomNumber && (
                  <p
                    id="roomNumber-error"
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.roomNumber}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="classTeacher" className="mb-1 block">
                Class Teacher ID (Optional)
              </Label>
              <Input
                id="classTeacher"
                name="classTeacher"
                placeholder="Teacher ID or ObjectId"
                value={formData.classTeacher || ""}
                onChange={handleInputChange}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave blank if no teacher is assigned yet
              </p>
            </div>

            {!isEditMode && (
              <div>
                <Label htmlFor="classId" className="mb-1 block">
                  Class ID
                </Label>

                <Select
                  name="classId"
                  value={formData.classId || ""}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, classId: value }))
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "w-full",
                      errors.classId ? "border-red-500" : ""
                    )}
                  >
                    <SelectValue placeholder="Select classId" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes?.map((cls) => (
                      <SelectItem key={cls._id} value={cls._id}>
                        {cls.name} - ({cls.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <Input
                  id="classId"
                  name="classId"
                  placeholder="Class ObjectId"
                  value={formData.classId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.classId ? "true" : "false"}
                  aria-describedby={
                    errors.classId ? "classId-error" : undefined
                  }
                  disabled={!!classId}
                /> */}
                {errors.classId && (
                  <p
                    id="classId-error"
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.classId}
                  </p>
                )}
              </div>
            )}
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
              {isEditMode ? "Save Changes" : "Create Section"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
