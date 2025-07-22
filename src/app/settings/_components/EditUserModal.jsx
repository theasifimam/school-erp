import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/lib/state/stores/userStore";

const EditUserModal = ({
  isOpen,
  onClose,
  selectedUser,
  formData,
  setFormData,
  userRoleConfigs,
  fieldConfigs,
  handleEditUser,
  renderFormField,
}) => {
  const { isLoading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleEditUser();
  };

  if (!selectedUser) return null;

  const renderUserForm = () => {
    const config = userRoleConfigs[selectedUser.role];
    if (!config) return null;

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {/* Role Display (non-editable) */}
        <div>
          <label className="text-sm font-medium">Current Role</label>
          <div className="mt-1">
            <Badge variant="outline" className={config.color}>
              {config.title}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.fields.map((field) => renderFormField(field))}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information for {selectedUser.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4">{renderUserForm()}</div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isLoading ? "Updating..." : "Update User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
