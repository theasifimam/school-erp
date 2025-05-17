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

const EditTimetableModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  currentEditItem,
  setCurrentEditItem,
  handleEditFormChange,
  handleEditSubmit,
  formError,
  subjects,
  getCurrentClassName,
}) => {
  // Time change handler to update the combined time string format
  const handleTimeChange = (field, value) => {
    let newTimeValue = { ...currentEditItem.timeObj };
    newTimeValue[field] = value;

    // Create the formatted time string (e.g. "08:00 - 08:45")
    const formattedTime = `${newTimeValue.startTime || ""} - ${
      newTimeValue.endTime || ""
    }`;

    setCurrentEditItem({
      ...currentEditItem,
      time: formattedTime,
      timeObj: newTimeValue,
    });
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Timetable Entry</DialogTitle>
          <DialogDescription>
            Edit timetable entry for {getCurrentClassName()}.
          </DialogDescription>
        </DialogHeader>

        {formError && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        {currentEditItem && (
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
                  value={currentEditItem.timeObj?.startTime || ""}
                  onChange={(e) =>
                    handleTimeChange("startTime", e.target.value)
                  }
                  className="w-full"
                />
                <span className="mx-1">to</span>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={currentEditItem.timeObj?.endTime || ""}
                  onChange={(e) => handleTimeChange("endTime", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-monday" className="text-right">
                Monday
              </Label>
              <Select
                name="monday"
                value={currentEditItem.monday}
                onValueChange={(value) =>
                  setCurrentEditItem({ ...currentEditItem, monday: value })
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
              <Label htmlFor="edit-tuesday" className="text-right">
                Tuesday
              </Label>
              <Select
                name="tuesday"
                value={currentEditItem.tuesday}
                onValueChange={(value) =>
                  setCurrentEditItem({ ...currentEditItem, tuesday: value })
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
              <Label htmlFor="edit-wednesday" className="text-right">
                Wednesday
              </Label>
              <Select
                name="wednesday"
                value={currentEditItem.wednesday}
                onValueChange={(value) =>
                  setCurrentEditItem({ ...currentEditItem, wednesday: value })
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
              <Label htmlFor="edit-thursday" className="text-right">
                Thursday
              </Label>
              <Select
                name="thursday"
                value={currentEditItem.thursday}
                onValueChange={(value) =>
                  setCurrentEditItem({ ...currentEditItem, thursday: value })
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
              <Label htmlFor="edit-friday" className="text-right">
                Friday
              </Label>
              <Select
                name="friday"
                value={currentEditItem.friday}
                onValueChange={(value) =>
                  setCurrentEditItem({ ...currentEditItem, friday: value })
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
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTimetableModal;
