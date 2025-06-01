import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save } from "lucide-react";

const UpdateUserForm = ({
  isOpen,
  onClose,
  userData,
  onSave,
  isUpdating = false,
}) => {
  const [editFormData, setEditFormData] = useState(userData);
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(editFormData, profilePicture);
  };

  const handleClose = () => {
    setEditFormData(userData);
    setProfilePicture(null);
    setImagePreview(null);
    onClose();
  };

  const getDisplayName = () => {
    if (userData?.fullName && userData.fullName.trim()) {
      return userData.fullName;
    }
    if (userData?.firstName || userData?.lastName) {
      return `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
    }
    return userData?.username || "N/A";
  };

  const formatRoleName = (role) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto overflow-x-hidden px-2 max-h-[60vh]">
          {/* Profile Picture */}
          <div className="flex items-center w-full justify-center relative">
            <Avatar className="h-20 w-20 relative">
              <AvatarImage
                src={
                  imagePreview ||
                  userData?.profilePicture?.url ||
                  "/placeholder-avatar.jpg"
                }
                alt={getDisplayName()}
              />
              <AvatarFallback>
                {getDisplayName()
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Camera button positioned absolutely relative to the container */}
            <Button
              variant="outline"
              size="sm"
              className="absolute -bottom-1 -right-1 z-10 h-8 w-8 p-0 rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-4 w-4" />
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={editFormData.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={editFormData.lastName || ""}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={editFormData.username || ""}
                disabled
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editFormData.email || ""}
                disabled
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={editFormData.phoneNumber || ""}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formatRoleName(editFormData.role)}
                disabled
                className="bg-muted"
              />
            </div>
          </div>

          {/* Employee/Student ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.role !== "student" && userData.role !== "parent" && (
              <div>
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={editFormData.employeeId || ""}
                  onChange={(e) =>
                    handleInputChange("employeeId", e.target.value)
                  }
                />
              </div>
            )}
            {userData.role === "student" && (
              <div>
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={editFormData.studentId || ""}
                  onChange={(e) =>
                    handleInputChange("studentId", e.target.value)
                  }
                />
              </div>
            )}
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  value={editFormData.address?.street || ""}
                  onChange={(e) =>
                    handleNestedChange("address", "street", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={editFormData.address?.city || ""}
                  onChange={(e) =>
                    handleNestedChange("address", "city", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={editFormData.address?.state || ""}
                  onChange={(e) =>
                    handleNestedChange("address", "state", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  value={editFormData.address?.zipCode || ""}
                  onChange={(e) =>
                    handleNestedChange("address", "zipCode", e.target.value)
                  }
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={editFormData.address?.country || "India"}
                  onChange={(e) =>
                    handleNestedChange("address", "country", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="emergencyName">Name</Label>
                <Input
                  id="emergencyName"
                  value={editFormData.emergencyContact?.name || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "emergencyContact",
                      "name",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="emergencyRelationship">Relationship</Label>
                <Input
                  id="emergencyRelationship"
                  value={editFormData.emergencyContact?.relationship || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "emergencyContact",
                      "relationship",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={editFormData.emergencyContact?.phone || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "emergencyContact",
                      "phone",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isUpdating}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserForm;
