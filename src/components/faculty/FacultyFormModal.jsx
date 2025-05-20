import { useState, useEffect } from "react";
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
import { User, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MultiSelect } from "../ui/MultiSelect";

export default function FacultyFormModal({
  isDialogOpen,
  setIsDialogOpen,
  formData,
  setFormData,
  departments = [
    "Science",
    "Humanities",
    "Languages",
    "Arts",
    "Sports",
    "Mathematics",
    "Computer Science",
  ],
  classes = [
    { value: "1", label: "Class 1" },
    { value: "2", label: "Class 2" },
    { value: "3", label: "Class 3" },
    { value: "4", label: "Class 4" },
    { value: "5", label: "Class 5" },
    { value: "6", label: "Class 6" },
    { value: "7", label: "Class 7" },
    { value: "8", label: "Class 8" },
    { value: "9", label: "Class 9" },
    { value: "10", label: "Class 10" },
    { value: "11", label: "Class 11" },
    { value: "12", label: "Class 12" },
  ],
  subjects = [
    { value: "math", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
    { value: "history", label: "History" },
  ],
  isEditing = false,
  handleSave,
}) {
  const [errors, setErrors] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    // Set preview URL if formData has profilePicture
    if (
      formData.profilePicture &&
      typeof formData.profilePicture === "string"
    ) {
      setPreviewUrl(formData.profilePicture);
    }
  }, [formData.profilePicture]);

  // File input change handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setFormData((prev) => ({ ...prev, profilePicture: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "joiningDate",
      "qualification",
      "contactNumber",
      "email",
      "designation",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${
          field?.charAt(0)?.toUpperCase() +
          field?.slice(1).replace(/([A-Z])/g, " $1")
        } is required`;
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Contact number validation
    if (
      formData.contactNumber &&
      !/^\+?[0-9\s()-]{10,15}$/.test(formData.contactNumber)
    ) {
      newErrors.contactNumber = "Invalid contact number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const formDataWithFile = new FormData();

      // Append all form data
      Object.keys(formData).forEach((key) => {
        if (
          key !== "profilePicture" ||
          (key === "profilePicture" && typeof formData[key] !== "string")
        ) {
          formDataWithFile.append(key, formData[key]);
        }
      });

      // Append file if exists
      if (profilePicture) {
        formDataWithFile.append("profilePicture", profilePicture);
      }

      handleSave(formDataWithFile);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[600px] rounded-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Faculty Member" : "Add New Faculty Member"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details of the faculty member below."
              : "Enter the details of the new faculty member according to the required fields."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-[70vh] overflow-y-auto">
          {/* Profile Picture Upload */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                {previewUrl ? (
                  <AvatarImage src={previewUrl} alt="Profile" />
                ) : (
                  <AvatarFallback>
                    <User className="h-12 w-12 text-gray-400" />
                  </AvatarFallback>
                )}
              </Avatar>
              <label
                htmlFor="profilePicture"
                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer"
              >
                <Upload className="h-4 w-4" />
              </label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-500">
              Upload faculty profile picture
            </p>
          </div>

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
                    "w-full",
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

          {/*  Date of Birth */}
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
                value={
                  formData.dateOfBirth
                    ? formData.dateOfBirth.substring(0, 10)
                    : ""
                }
                onChange={handleInputChange}
                className={errors.dateOfBirth ? "border-red-500" : ""}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Joining Date */}
            <div className="space-y-2">
              <Label htmlFor="joiningDate">
                Joining Date<span className="text-red-500">*</span>
              </Label>
              <Input
                id="joiningDate"
                name="joiningDate"
                type="date"
                value={
                  formData.joiningDate
                    ? formData.joiningDate.substring(0, 10)
                    : ""
                }
                onChange={handleInputChange}
                className={errors.joiningDate ? "border-red-500" : ""}
              />
              {errors.joiningDate && (
                <p className="text-red-500 text-xs">{errors.joiningDate}</p>
              )}
            </div>

            {/* Qualification */}
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

            {/* experience */}
            <div className="space-y-2">
              <Label htmlFor="experience">Experience (Years)</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                min="0"
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

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                name="department"
                value={formData.department || ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, department: value }))
                }
              >
                <SelectTrigger className="w-full">
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

            {/* Designation */}
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

            {/* Salary */}
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                name="salary"
                type="number"
                min="0"
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

          {/* Subjects */}
          <div className="col-span-2 md:col-span-2 space-y-2">
            <Label htmlFor="subjects">Subjects</Label>
            <MultiSelect
              options={subjects}
              selected={formData.subjects || []}
              onChange={(values) =>
                setFormData((prev) => ({ ...prev, subjects: values }))
              }
              placeholder="Select subjects..."
            />
          </div>

          {/* Classes */}
          <div className="col-span-1 md:col-span-2 space-y-2">
            <Label htmlFor="classes">Classes</Label>
            <MultiSelect
              options={classes}
              selected={formData.classes || []}
              onChange={(values) =>
                setFormData((prev) => ({ ...prev, classes: values }))
              }
              placeholder="Select classes..."
            />
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

          {formData.isClassTeacher && (
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label htmlFor="classTeacherOf">Class Teacher Of</Label>
              <Select
                name="classTeacherOf"
                value={formData.classTeacherOf || ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, classTeacherOf: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes &&
                    classes.map((cls) => (
                      <SelectItem key={cls._id} value={cls._id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

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
            onClick={() => setIsDialogOpen(false)}
            className="rounded-full"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="rounded-full">
            {isEditing ? "Update Faculty" : "Add Faculty"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
