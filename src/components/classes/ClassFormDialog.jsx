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
import { useClassStore } from "@/lib/state/stores/classStore";

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

  // Initialize with default values or existing class data
  const defaultFormData = {
    name: "",
    code: "",
    academicYear: "",
    order: 1,
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

  // Validation function
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length < 2
          ? "Class name must be at least 2 characters."
          : "";
      case "code":
        return !value.trim()
          ? "Class code is required."
          : !/^[A-Za-z0-9]+$/.test(value.trim())
          ? "Code must contain only letters and numbers."
          : "";
      case "academicYear":
        return !value.trim()
          ? "Academic year is required."
          : !/^\d{4}-\d{4}$/.test(value.trim())
          ? "Format must be YYYY-YYYY (e.g., 2025-2026)."
          : "";
      case "order":
        return value < 1
          ? "Order must be at least 1."
          : !Number.isInteger(Number(value))
          ? "Order must be a whole number."
          : "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = ["name", "code", "academicYear", "order"];

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
    ["name", "code", "academicYear", "order"].forEach((field) => {
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
        await updateClass(formData._id, formData);
      } else {
        await createClass(formData);
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
      [name]: name === "order" ? parseInt(value) || "" : value,
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
            {isEditMode ? "Edit Class" : "Add New Class"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the class information below."
              : "Fill in the details to create a new class."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 px-1 max-h-[50vh] overflow-y-auto">
            <div>
              <Label htmlFor="name" className="mb-1 block">
                Class Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Class 1, Grade 5, 10th"
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
                <Label htmlFor="code" className="mb-1 block">
                  Class Code
                </Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="e.g., C1, G5, X10"
                  value={formData.code}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.code ? "true" : "false"}
                  aria-describedby={errors.code ? "code-error" : undefined}
                />
                {errors.code && (
                  <p id="code-error" className="text-sm text-destructive mt-1">
                    {errors.code}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="order" className="mb-1 block">
                  Order
                </Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  min="1"
                  placeholder="e.g., 1, 2, 3"
                  value={formData.order}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.order ? "true" : "false"}
                  aria-describedby={errors.order ? "order-error" : undefined}
                />
                {errors.order && (
                  <p id="order-error" className="text-sm text-destructive mt-1">
                    {errors.order}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="academicYear" className="mb-1 block">
                Academic Year
              </Label>
              <Input
                id="academicYear"
                name="academicYear"
                placeholder="e.g., 2025-2026"
                value={formData.academicYear}
                onChange={handleInputChange}
                onBlur={handleBlur}
                aria-invalid={errors.academicYear ? "true" : "false"}
                aria-describedby={
                  errors.academicYear ? "academicYear-error" : undefined
                }
              />
              {errors.academicYear && (
                <p
                  id="academicYear-error"
                  className="text-sm text-destructive mt-1"
                >
                  {errors.academicYear}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="mb-1 block">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description of the class"
                value={formData.description || ""}
                onChange={handleInputChange}
                rows={3}
              />
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
