import React from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserStore } from "@/lib/state/stores/userStore";

const AddUserModal = ({
  isAddUserOpen,
  setIsAddUserOpen,
  formData,
  setFormData,
  renderUserForm,
  handleAddUser,
}) => {
  const { isLoading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddUser();
  };

  return (
    <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account with role-specific information
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4">{renderUserForm(false)}</div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddUserOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isLoading ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
