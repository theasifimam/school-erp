import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AlertCircle } from "lucide-react";

export default function DeleteFacultyModal({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedTeacher,
  handleDeleteTeacher,
}) {
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this teacher from the system?
          </DialogDescription>
        </DialogHeader>

        {selectedTeacher && (
          <div className="py-4 flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={selectedTeacher.image}
                alt={selectedTeacher.name}
              />
              <AvatarFallback>
                {selectedTeacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{selectedTeacher.name}</h4>
              <p className="text-sm text-gray-500">
                {selectedTeacher.subject}, {selectedTeacher.department}
              </p>
            </div>
          </div>
        )}

        <Alert className="bg-amber-50 border-amber-200 text-amber-800">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            This action cannot be undone. This will permanently remove the
            teacher's data from our servers.
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteTeacher}>
            Delete Teacher
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
