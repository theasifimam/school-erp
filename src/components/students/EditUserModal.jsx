"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, User, Mail, Phone, MapPin, Home } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Form validation schema
const userSchema = z.object({
  avatar: z.string().optional(),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile must be at least 10 digits"),
  secondaryMobile: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  street: z.string().min(2, "Street is required"),
  pincode: z.string().min(3, "Pincode is required"),
  address: z.string().min(10, "Address must be at least 10 characters"),
});

export default function EditUserModal({ isOpen, onClose, user }) {
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: user || {
      avatar: "",
      fullName: "",
      email: "",
      mobile: "",
      secondaryMobile: "",
      country: "",
      state: "",
      city: "",
      street: "",
      pincode: "",
      address: "",
    },
  });

  const formData = watch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setValue("avatar", imageUrl);
    }
  };

  const onSubmit = (data) => {
    console.log("Updated User Data:", data);
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 rounded-3xl overflow-hidden h-[85vh] flex flex-col">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-lg font-semibold">
            Edit User Profile
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="px-6 py-4 space-y-6 overflow-y-auto">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <Avatar className="w-20 h-20 rounded-full border-2 border-gray-100">
                  <AvatarImage
                    src={formData.avatar || "/default-avatar.png"}
                    className="rounded-full"
                    alt="Profile"
                  />
                  <AvatarFallback className="rounded-full bg-gray-50 text-gray-600">
                    {formData.fullName ? formData.fullName[0] : "U"}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 bg-white border border-gray-200 text-gray-700 p-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Section: Personal Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <User className="h-4 w-4" />
                PERSONAL INFORMATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Full Name *
                  </label>
                  <Input {...register("fullName")} className="rounded-full" />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      {...register("email")}
                      className="rounded-full pl-10"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section: Contact Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                CONTACT INFORMATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Mobile *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      {...register("mobile")}
                      className="rounded-full pl-10"
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Secondary Mobile
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      {...register("secondaryMobile")}
                      className="rounded-full pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Address Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                ADDRESS INFORMATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Country *
                  </label>
                  <Input {...register("country")} className="rounded-full" />
                  {errors.country && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    State *
                  </label>
                  <Input {...register("state")} className="rounded-full" />
                  {errors.state && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    City *
                  </label>
                  <Input {...register("city")} className="rounded-full" />
                  {errors.city && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Street *
                  </label>
                  <Input {...register("street")} className="rounded-full" />
                  {errors.street && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.street.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Pincode *
                  </label>
                  <Input {...register("pincode")} className="rounded-full" />
                  {errors.pincode && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Full Address *
                </label>
                <Textarea
                  {...register("address")}
                  className="rounded-2xl min-h-[80px]"
                />
                {errors.address && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Fixed Action Buttons */}
          <div className="border-t px-6 py-4 mt-auto">
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-full px-6"
              >
                Cancel
              </Button>
              <Button type="submit" className="rounded-full px-6">
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
