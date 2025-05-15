import { useState } from "react";
import { Button, Input, Label, Switch } from "../ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { cn } from "../../lib/utils";
import { z } from "zod";

export default function AddFacultyModal({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  formData,
  setFormData,
  handleInputChange,
  departments,
  handleAddTeacher,
}) {
  const [errors, setErrors] = useState({});

  // Define validation schema with Zod
  const facultySchema = z.object({
    employeeId: z.string().min(1, "Employee ID is required"),
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Please select a gender" }),
    }),
    dateOfBirth: z.date({
      required_error: "Date of birth is required",
      invalid_type_error: "Invalid date format",
    }),
    joiningDate: z.date({
      required_error: "Joining date is required",
      invalid_type_error: "Invalid date format",
    }),
    qualification: z.string().min(1, "Qualification is required"),
    experience: z.number().nonnegative().optional().default(0),
    contactNumber: z
      .string()
      .min(1, "Contact number is required")
      .regex(/^\+?[0-9\s()-]{10,15}$/, "Invalid contact number format"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    address: z.string().optional(),
    designation: z.string().min(1, "Designation is required"),
    department: z.string().optional(),
    salary: z.number().nonnegative().optional(),
    isClassTeacher: z.boolean().default(false),
    isActive: z.boolean().default(true),
  });

  const validateForm = () => {
    try {
      facultySchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      const zodErrors = {};
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const path = err.path[0];
          zodErrors[path] = err.message;
        });
      }
      setErrors(zodErrors);
      return false;
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleAddTeacher();
    }

    console.log("Form Data:", formData);
  };

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Faculty Member</DialogTitle>
          <DialogDescription>
            Enter the details of the new faculty member according to the
            required fields.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 sm:max-w-[800px] max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {/* Left Column */}
            <div className="space-y-2">
              <Label htmlFor="employeeId">
                Employee ID<span className="text-red-500">*</span>
              </Label>
              <Input
                id="employeeId"
                name="employeeId"
                value={formData.employeeId || ""}
                onChange={handleInputChange}
                placeholder="EMP-001"
                className={errors.employeeId ? "border-red-500" : ""}
              />
              {errors.employeeId && (
                <p className="text-red-500 text-xs">{errors.employeeId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleInputChange}
                placeholder="First name"
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                name="middleName"
                value={formData.middleName || ""}
                onChange={handleInputChange}
                placeholder="Middle name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleInputChange}
                placeholder="Last name"
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                placeholder="john.doe@schoolerp.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">
                Contact Number<span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber || ""}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
                className={errors.contactNumber ? "border-red-500" : ""}
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-xs">{errors.contactNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">
                Gender<span className="text-red-500">*</span>
              </Label>
              <Select
                name="gender"
                value={formData.gender || ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, gender: value }))
                }
              >
                <SelectTrigger
                  className={cn(
                    "w-full rounded-md",
                    errors.gender ? "border-red-500" : ""
                  )}
                >
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-xs">{errors.gender}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* Right Column */}
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">
                Date of Birth<span className="text-red-500">*</span>
              </Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth || ""}
                onChange={handleInputChange}
                className={errors.dateOfBirth ? "border-red-500" : ""}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="joiningDate">
                Joining Date<span className="text-red-500">*</span>
              </Label>
              <Input
                id="joiningDate"
                name="joiningDate"
                type="date"
                value={formData.joiningDate || ""}
                onChange={handleInputChange}
                className={errors.joiningDate ? "border-red-500" : ""}
              />
              {errors.joiningDate && (
                <p className="text-red-500 text-xs">{errors.joiningDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification">
                Qualification<span className="text-red-500">*</span>
              </Label>
              <Input
                id="qualification"
                name="qualification"
                value={formData.qualification || ""}
                onChange={handleInputChange}
                placeholder="Ph.D. in Education"
                className={errors.qualification ? "border-red-500" : ""}
              />
              {errors.qualification && (
                <p className="text-red-500 text-xs">{errors.qualification}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience (Years)</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                value={formData.experience || 0}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    experience: Number(e.target.value),
                  }))
                }
                placeholder="5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                name="department"
                value={formData.department || ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, department: value }))
                }
              >
                <SelectTrigger className="w-full rounded-md">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">
                Designation<span className="text-red-500">*</span>
              </Label>
              <Input
                id="designation"
                name="designation"
                value={formData.designation || ""}
                onChange={handleInputChange}
                placeholder="Assistant Professor"
                className={errors.designation ? "border-red-500" : ""}
              />
              {errors.designation && (
                <p className="text-red-500 text-xs">{errors.designation}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                name="salary"
                type="number"
                value={formData.salary || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    salary: Number(e.target.value),
                  }))
                }
                placeholder="70000"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              placeholder="Full address"
              rows={3}
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex items-center space-x-2">
            <Switch
              id="isClassTeacher"
              checked={formData.isClassTeacher || false}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isClassTeacher: checked }))
              }
            />
            <Label htmlFor="isClassTeacher">Is Class Teacher</Label>
          </div>

          <div className="col-span-1 md:col-span-2 flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive !== false}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isActive: checked }))
              }
            />
            <Label htmlFor="isActive">Is Active</Label>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsCreateDialogOpen(false)}
            className="rounded-full"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="rounded-full">
            Add Faculty
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
