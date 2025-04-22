"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Home,
  Hash,
  Edit,
  Shield,
  Activity,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ViewUserModal({ isOpen, onClose, user, onEdit }) {
  if (!user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-6 rounded-3xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              User Profile
            </DialogTitle>
            <div className="flex gap-2  mx-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onEdit(user);
                  onClose();
                }}
                className="rounded-full h-8 w-8 p-2"
              >
                <Edit className="h-4 w-4" />
              </Button>
              {/* <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="rounded-full h-8 w-8 p-0"
              >
                ×
              </Button> */}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl font-medium">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <Badge
                  variant={user.role === "Admin" ? "destructive" : "outline"}
                  className="rounded-full text-xs"
                >
                  {user.role}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Joined {formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Information Sections */}
          <div className="space-y-4">
            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                CONTACT INFORMATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium">
                      {user.mobile || "Not provided"}
                    </p>
                  </div>
                </div>
                {user.secondaryMobile && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Secondary Phone</p>
                      <p className="font-medium">{user.secondaryMobile}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Address Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                ADDRESS INFORMATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-medium">
                      {[user.city, user.state, user.country]
                        .filter(Boolean)
                        .join(", ") || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-medium">
                      {user.address || "Not provided"}
                    </p>
                  </div>
                </div>
                {user.pincode && (
                  <div className="flex items-center gap-3">
                    <Hash className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Postal Code</p>
                      <p className="font-medium">{user.pincode}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Account Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                ACCOUNT INFORMATION
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <Badge
                    variant={user.isActive ? "default" : "destructive"}
                    className="rounded-full mt-1"
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Login</p>
                  <p className="font-medium text-sm">
                    {formatDate(user.lastLogin)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email Verified</p>
                  <Badge
                    variant={user.isEmailVerified ? "default" : "outline"}
                    className="rounded-full mt-1"
                  >
                    {user.isEmailVerified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-full px-6"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                onEdit(user);
                onClose();
              }}
              className="rounded-full px-6"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
