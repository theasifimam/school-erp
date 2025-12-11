import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

export function GradeFormDialog({ open, onOpenChange, gradeData, onSuccess }) {
  const isEditing = !!gradeData;
  const [sections, setSections] = useState(gradeData?.sections || ["A", "B"]);
  const [newSection, setNewSection] = useState("");

  const addSection = () => {
    if (newSection && !sections.includes(newSection)) {
      setSections([...sections, newSection]);
      setNewSection("");
    }
  };

  const removeSection = (section) => {
    setSections(sections.filter((s) => s !== section));
  };

  // In a real app, you would use a form library like react-hook-form
  // and handle form submission properly
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data with sections
    // You would include sections in your submission data
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Grade" : "Add New Grade"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Grade Name
              </Label>
              <Input
                id="name"
                defaultValue={gradeData?.name || ""}
                className="col-span-3"
                placeholder="e.g. Grade 1"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coordinator" className="text-left">
                Grade Coordinator
              </Label>
              <Input
                id="coordinator"
                defaultValue={gradeData?.coordinator || ""}
                className="col-span-3"
                placeholder="e.g. John Smith"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Sections</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {sections.map((section) => (
                    <Badge
                      key={section}
                      variant="secondary"
                      className="px-2 py-1 flex items-center gap-1"
                    >
                      Section {section}
                      <button
                        type="button"
                        onClick={() => removeSection(section)}
                        className="ml-1 h-4 w-4 rounded-full bg-gray-200 flex items-center justify-center"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add section (e.g. C)"
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" size="sm" onClick={addSection}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subjects" className="text-left">
                Subjects
              </Label>
              <Input
                id="subjects"
                type="number"
                min="1"
                defaultValue={gradeData?.subjects || "6"}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxStudentsPerSection" className="text-left">
                Max Students/Section
              </Label>
              <Input
                id="maxStudentsPerSection"
                type="number"
                min="10"
                defaultValue={gradeData?.maxStudentsPerSection || "30"}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="academicYear" className="text-left">
                Academic Year
              </Label>
              <Select defaultValue={gradeData?.academicYear || "2025-2026"}>
                <SelectTrigger className="col-span-3 w-full">
                  <SelectValue placeholder="Select academic year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-left">
                Status
              </Label>
              <Select defaultValue={gradeData?.status || "active"}>
                <SelectTrigger className="col-span-3 w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Add Grade"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
