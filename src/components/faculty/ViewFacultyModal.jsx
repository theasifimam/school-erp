import { Calendar, Edit, Mail, Phone, User } from "lucide-react";
import { Button } from "../ui";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function ViewFacultyModal({
  isViewDialogOpen,
  setIsViewDialogOpen,
  selectedTeacher,
}) {
  return (
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        {selectedTeacher && (
          <>
            <DialogHeader>
              <DialogTitle>Teacher Profile</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedTeacher.name}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={selectedTeacher.image}
                      alt={selectedTeacher.name}
                    />
                    <AvatarFallback className="text-lg">
                      {selectedTeacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Badge
                    className={`mt-2 ${
                      selectedTeacher.status === "active"
                        ? "bg-green-100 text-green-800"
                        : selectedTeacher.status === "on leave"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedTeacher.status === "active"
                      ? "Active"
                      : selectedTeacher.status === "on leave"
                      ? "On Leave"
                      : "Inactive"}
                  </Badge>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {selectedTeacher.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {selectedTeacher.subject}, {selectedTeacher.department}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      {selectedTeacher.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      {selectedTeacher.phone}
                    </div>
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      {selectedTeacher.gender}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      Joined:{" "}
                      {new Date(
                        selectedTeacher.joiningDate
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-1">Qualification</h4>
                  <p className="text-sm">{selectedTeacher.qualification}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-1">Address</h4>
                  <p className="text-sm">{selectedTeacher.address}</p>
                </div>

                {selectedTeacher.status !== "inactive" && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Salary</h4>
                    <p className="text-sm">
                      ${selectedTeacher.salary.toLocaleString()}/year
                    </p>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setIsViewDialogOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false);
                  openEditDialog(selectedTeacher);
                }}
                className="rounded-full"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
