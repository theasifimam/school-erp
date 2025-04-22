"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, ChevronRight, User, BookOpen, Home, Phone } from "lucide-react";
import { toast } from "sonner";

export default function ModernAdmissionForm() {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formSections = [
    {
      id: "personalInfo",
      label: "Personal",
      icon: <User className="mr-2 h-4 w-4" />,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-600"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-600"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="gender"
              className="text-sm font-medium text-gray-600"
            >
              Gender
            </Label>
            <Select>
              <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dob" className="text-sm font-medium text-gray-600">
              Date of Birth
            </Label>
            <Input
              id="dob"
              type="date"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="bloodGroup"
              className="text-sm font-medium text-gray-600"
            >
              Blood Group
            </Label>
            <Select>
              <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 w-full">
                <SelectValue placeholder="Select Blood Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a+">A+</SelectItem>
                <SelectItem value="a-">A-</SelectItem>
                <SelectItem value="b+">B+</SelectItem>
                <SelectItem value="b-">B-</SelectItem>
                <SelectItem value="ab+">AB+</SelectItem>
                <SelectItem value="ab-">AB-</SelectItem>
                <SelectItem value="o+">O+</SelectItem>
                <SelectItem value="o-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="nationality"
              className="text-sm font-medium text-gray-600"
            >
              Nationality
            </Label>
            <Input
              id="nationality"
              placeholder="e.g. American"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
        </div>
      ),
    },
    {
      id: "contactInfo",
      label: "Contact",
      icon: <Phone className="mr-2 h-4 w-4" />,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="student@example.com"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-600"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-600"
            >
              Current Address
            </Label>
            <Input
              id="address"
              placeholder="123 Main St"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="city" className="text-sm font-medium text-gray-600">
              City
            </Label>
            <Input
              id="city"
              placeholder="New York"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="zipCode"
              className="text-sm font-medium text-gray-600"
            >
              Zip Code
            </Label>
            <Input
              id="zipCode"
              placeholder="10001"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
        </div>
      ),
    },
    {
      id: "familyInfo",
      label: "Family",
      icon: <Home className="mr-2 h-4 w-4" />,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="fatherName"
              className="text-sm font-medium text-gray-600"
            >
              Father&apos;s Name
            </Label>
            <Input
              id="fatherName"
              placeholder="John Doe Sr."
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="fatherOccupation"
              className="text-sm font-medium text-gray-600"
            >
              Father&apos;s Occupation
            </Label>
            <Input
              id="fatherOccupation"
              placeholder="Engineer"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="motherName"
              className="text-sm font-medium text-gray-600"
            >
              Mother&apos;s Name
            </Label>
            <Input
              id="motherName"
              placeholder="Jane Doe"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="motherOccupation"
              className="text-sm font-medium text-gray-600"
            >
              Mother&apos;s Occupation
            </Label>
            <Input
              id="motherOccupation"
              placeholder="Doctor"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="parentEmail"
              className="text-sm font-medium text-gray-600"
            >
              Parent&apos;s Email
            </Label>
            <Input
              id="parentEmail"
              type="email"
              placeholder="parent@example.com"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="parentPhone"
              className="text-sm font-medium text-gray-600"
            >
              Parent&apos;s Phone
            </Label>
            <Input
              id="parentPhone"
              type="tel"
              placeholder="(123) 456-7890"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
        </div>
      ),
    },
    {
      id: "academicInfo",
      label: "Academic",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="appliedClass"
              className="text-sm font-medium text-gray-600"
            >
              Applying for Class
            </Label>
            <Select>
              <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 w-full">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nursery">Nursery</SelectItem>
                <SelectItem value="kg">Kindergarten</SelectItem>
                <SelectItem value="1">Class 1</SelectItem>
                <SelectItem value="2">Class 2</SelectItem>
                <SelectItem value="3">Class 3</SelectItem>
                <SelectItem value="4">Class 4</SelectItem>
                <SelectItem value="5">Class 5</SelectItem>
                <SelectItem value="6">Class 6</SelectItem>
                <SelectItem value="7">Class 7</SelectItem>
                <SelectItem value="8">Class 8</SelectItem>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="session"
              className="text-sm font-medium text-gray-600"
            >
              Academic Session
            </Label>
            <Select>
              <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 w-full">
                <SelectValue placeholder="Select Session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2025-2026">2025-2026</SelectItem>
                <SelectItem value="2026-2027">2026-2027</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="previousSchool"
              className="text-sm font-medium text-gray-600"
            >
              Previous School (if any)
            </Label>
            <Input
              id="previousSchool"
              placeholder="ABC School"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="lastClass"
              className="text-sm font-medium text-gray-600"
            >
              Last Class Attended
            </Label>
            <Input
              id="lastClass"
              placeholder="e.g. Class 5"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="lastGrade"
              className="text-sm font-medium text-gray-600"
            >
              Last Grade/Percentage
            </Label>
            <Input
              id="lastGrade"
              placeholder="e.g. A / 85%"
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="stream"
              className="text-sm font-medium text-gray-600"
            >
              Stream (for Class 11-12)
            </Label>
            <Select>
              <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 w-full">
                <SelectValue placeholder="Select Stream" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
                <SelectItem value="arts">Arts/Humanities</SelectItem>
                <SelectItem value="na">Not Applicable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
  ];

  const nextTab = () => {
    const currentIndex = formSections.findIndex(
      (section) => section.id === activeTab
    );
    if (currentIndex < formSections.length - 1) {
      setActiveTab(formSections[currentIndex + 1].id);
    }
  };

  // Page Version
  const PageVersion = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <Card className="overflow-hidden border-0 shadow-xs rounded-3xl">
          <CardHeader>
            <CardTitle>Student Admission</CardTitle>
            <CardDescription>
              {" "}
              Complete the form to apply for admission
            </CardDescription>
          </CardHeader>
          <div className="flex bg-white border-b border-gray-100 p-4">
            {formSections.map((section, index) => (
              <div
                key={section.id}
                className={`flex items-center ${index > 0 ? "ml-4" : ""}`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                    activeTab === section.id
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {activeTab === section.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-sm ${
                    activeTab === section.id
                      ? "text-indigo-600 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {section.label}
                </span>
                {index < formSections.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-300 ml-2" />
                )}
              </div>
            ))}
          </div>

          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="hidden">
                {formSections.map((section) => (
                  <TabsTrigger key={section.id} value={section.id}>
                    {section.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {formSections.map((section) => (
                <TabsContent
                  key={section.id}
                  value={section.id}
                  className="mt-0"
                >
                  {section.fields}
                </TabsContent>
              ))}
            </Tabs>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                className="bg-white rounded-full"
                onClick={() => {
                  const currentIndex = formSections.findIndex(
                    (section) => section.id === activeTab
                  );
                  if (currentIndex > 0) {
                    setActiveTab(formSections[currentIndex - 1].id);
                  }
                }}
                disabled={activeTab === formSections[0].id}
              >
                Previous
              </Button>
              {activeTab === formSections[formSections.length - 1].id ? (
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 rounded-full"
                  onClick={() =>
                    toast("Event has been created", {
                      description: "Sunday, December 03, 2023 at 9:00 AM",
                      action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                      },
                    })
                  }
                >
                  Submit Application
                </Button>
              ) : (
                <Button
                  onClick={nextTab}
                  className="bg-indigo-600 hover:bg-indigo-700 rounded-full"
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  // Modal Version
  const ModalVersion = () => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Open Admission Form
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="text-xl font-bold text-center">
              Student Admission Form
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-6">
                {formSections.map((section) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="flex items-center justify-center data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none"
                  >
                    {section.icon}
                    <span className="hidden sm:inline">{section.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {formSections.map((section) => (
                <TabsContent
                  key={section.id}
                  value={section.id}
                  className="mt-0"
                >
                  {section.fields}
                </TabsContent>
              ))}
            </Tabs>

            <div className="flex justify-between mt-8">
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  className="bg-white"
                  onClick={() => {
                    const currentIndex = formSections.findIndex(
                      (section) => section.id === activeTab
                    );
                    if (currentIndex > 0) {
                      setActiveTab(formSections[currentIndex - 1].id);
                    }
                  }}
                  disabled={activeTab === formSections[0].id}
                >
                  Previous
                </Button>
                <div className="w-px h-6 bg-gray-200" />
                {activeTab === formSections[formSections.length - 1].id ? (
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => {
                      toast("Event has been created", {
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                      });
                    }}
                  >
                    Submit Application
                  </Button>
                ) : (
                  <Button
                    onClick={nextTab}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <div>
      <PageVersion key={activeTab} />
      {/* Uncomment below to show the modal version */}
      {/* Uncomment below to show the modal version */}
      {/* <ModalVersion /> */}
    </div>
  );
}
function useToast(): { toast: any } {
  throw new Error("Function not implemented.");
}
