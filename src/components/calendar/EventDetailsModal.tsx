import {
  AlertCircle,
  Bookmark,
  CheckCircle2,
  Clock,
  MapPin,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent } from "../ui/dialog";
import { format } from "date-fns";
import { Button } from "../ui";

const EventDetailsModal = ({
  selectedEvent,
  USER_ROLES,
  currentUser,
  showEventDetailsModal,
  setShowEventDetailsModal,
  EVENT_TYPES,
  handleDeleteEvent,
  handleEditEvent,
  handleApproveLeave,
  handleRejectLeave,
}) => {
  if (!selectedEvent) return null;

  const isLeaveRequest = selectedEvent.type === "LEAVE";
  const canManageEvent =
    currentUser.role === USER_ROLES.ADMIN ||
    (currentUser.role === USER_ROLES.TEACHER &&
      selectedEvent.teacherId === currentUser.id);

  return (
    <Dialog
      open={showEventDetailsModal}
      onOpenChange={setShowEventDetailsModal}
    >
      <DialogContent className="max-w-md rounded-3xl p-0 overflow-hidden">
        <div
          className="h-2"
          style={{ backgroundColor: selectedEvent.color }}
        ></div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge
              className="text-xs"
              style={{
                backgroundColor: `${selectedEvent.color}20`,
                color: selectedEvent.color,
              }}
            >
              {EVENT_TYPES[selectedEvent.type]?.label || selectedEvent.type}
            </Badge>

            {isLeaveRequest && (
              <Badge
                className={`ml-2 ${
                  selectedEvent.status === "pending"
                    ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                    : selectedEvent.status === "approved"
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                    : "bg-rose-100 text-rose-700 hover:bg-rose-100"
                }`}
              >
                {selectedEvent.status}
              </Badge>
            )}
          </div>

          <h3 className="text-xl font-semibold mb-4">{selectedEvent.title}</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">
                  {format(new Date(selectedEvent.start), "PPP")}
                </p>
                <p className="text-sm text-gray-600">
                  {format(new Date(selectedEvent.start), "h:mm a")} -{" "}
                  {format(new Date(selectedEvent.end), "h:mm a")}
                </p>
              </div>
            </div>

            {selectedEvent.location && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm">{selectedEvent.location}</p>
                </div>
              </div>
            )}

            {selectedEvent.class && (
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm">{selectedEvent.class}</p>
                </div>
              </div>
            )}

            {selectedEvent.description && (
              <div className="flex items-start gap-3">
                <Bookmark className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>
            )}

            {isLeaveRequest && selectedEvent.reason && (
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Reason</p>
                  <p className="text-sm text-gray-600">
                    {selectedEvent.reason}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            {isLeaveRequest &&
              currentUser.role === USER_ROLES.ADMIN &&
              selectedEvent.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-rose-600 border-rose-200 hover:bg-rose-50"
                    onClick={() => handleRejectLeave(selectedEvent.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" /> Reject
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                    onClick={() => handleApproveLeave(selectedEvent.id)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" /> Approve
                  </Button>
                </>
              )}

            {canManageEvent && !isLeaveRequest && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-rose-600 rounded-full border-rose-200 hover:bg-rose-50"
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleEditEvent(selectedEvent.id)}
                >
                  Edit
                </Button>
              </>
            )}

            <Button
              variant="default"
              size="sm"
              className="rounded-full"
              onClick={() => setShowEventDetailsModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
