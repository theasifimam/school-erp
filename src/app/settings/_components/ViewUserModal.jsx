"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ViewUserModal = ({
  isOpen,
  onClose,
  selectedUser,
  userRoleConfigs,
  fieldConfigs,
}) => {
  if (!selectedUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={selectedUser?.avatar}
                alt={selectedUser?.username || "User Avatar"}
              ></AvatarImage>
              <AvatarFallback>
                {selectedUser?.username.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {selectedUser?.name || selectedUser?.username}
          </DialogTitle>
          <DialogDescription>
            <Badge
              variant="outline"
              className={userRoleConfigs[selectedUser?.role]?.color}
            >
              {userRoleConfigs[selectedUser?.role]?.title}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userRoleConfigs[selectedUser.role]?.fields.map((field) => {
              const config = fieldConfigs[field];
              const value = selectedUser[field];
              if (!value) return null;

              return (
                <div key={field} className="p-3 bg-gray-50 rounded-lg">
                  <Label className="text-sm font-medium ml-0">
                    {config.label}
                  </Label>
                  <p className="text-sm mt-1 text-gray-900">{value}</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 pt-4 border-t">
            <Badge
              variant="outline"
              className={
                selectedUser.isActive
                  ? "border-green-200 text-green-800 bg-green-50"
                  : "border-red-200 text-red-800 bg-red-50"
              }
            >
              Status: {selectedUser.isActive ? "Active" : "Inactive"}
            </Badge>
            <p className="text-sm ">
              Last Login: {selectedUser.lastLogin || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserModal;
