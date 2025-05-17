import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AddTimetableModal = ({
  isAddModalOpen,
  setIsAddModalOpen,
  addFormData,
  setAddFormData,
  handleAddSubmit,
  formError,
  subjects,
  getCurrentClassName,
}) => {
  // Time change handler to update the combined time string format
  const handleTimeChange = (field, value) => {
    let newTimeValue = { ...addFormData.timeObj };
    newTimeValue[field] = value;

    // Create the formatted time string (e.g. "08:00 - 08:45")
    const formattedTime = `${newTimeValue.startTime || ""} - ${
      newTimeValue.endTime || ""
    }`;

    setAddFormData({
      ...addFormData,
      time: formattedTime,
      timeObj: newTimeValue,
    });
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Timetable Entry</DialogTitle>
          <DialogDescription>
            Add a new timetable entry for {getCurrentClassName()}.
          </DialogDescription>
        </DialogHeader>

        {formError && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time Slot
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={addFormData.timeObj?.startTime || ""}
                onChange={(e) => handleTimeChange("startTime", e.target.value)}
                className="w-full"
              />
              <span className="mx-1">to</span>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={addFormData.timeObj?.endTime || ""}
                onChange={(e) => handleTimeChange("endTime", e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="monday" className="text-right">
              Monday
            </Label>
            <Select
              name="monday"
              value={addFormData.monday}
              onValueChange={(value) =>
                setAddFormData({ ...addFormData, monday: value })
              }
            >
              <SelectTrigger className="col-span-3 w-full">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tuesday" className="text-right">
              Tuesday
            </Label>
            <Select
              name="tuesday"
              value={addFormData.tuesday}
              onValueChange={(value) =>
                setAddFormData({ ...addFormData, tuesday: value })
              }
            >
              <SelectTrigger className="col-span-3 w-full">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="wednesday" className="text-right">
              Wednesday
            </Label>
            <Select
              name="wednesday"
              value={addFormData.wednesday}
              onValueChange={(value) =>
                setAddFormData({ ...addFormData, wednesday: value })
              }
            >
              <SelectTrigger className="col-span-3 w-full">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="thursday" className="text-right">
              Thursday
            </Label>
            <Select
              name="thursday"
              value={addFormData.thursday}
              onValueChange={(value) =>
                setAddFormData({ ...addFormData, thursday: value })
              }
            >
              <SelectTrigger className="col-span-3 w-full">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="friday" className="text-right">
              Friday
            </Label>
            <Select
              name="friday"
              value={addFormData.friday}
              onValueChange={(value) =>
                setAddFormData({ ...addFormData, friday: value })
              }
            >
              <SelectTrigger className="col-span-3 w-full">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleAddSubmit}>
            Add Entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTimetableModal;
