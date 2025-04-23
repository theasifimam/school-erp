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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";

interface EventType {
  label: string;
  // Add other properties if needed
}

interface EventModalProps {
  showEventModal: boolean;
  setShowEventModal: (show: boolean) => void;
  newEvent: any; // Define proper type
  setNewEvent: (event: any) => void;
  handleAddEvent: () => void;
  classes: any[];
  subjects: any[];
  locations: any[];
  EVENT_TYPES: Record<string, EventType>;
  USER_ROLES: any;
  currentUser: any;
  handleDeleteEvent: () => void;
}

export const EventModal = ({
  showEventModal,
  setShowEventModal,
  newEvent,
  setNewEvent,
  handleAddEvent,
  classes,
  subjects,
  locations,
  EVENT_TYPES,
}) => {
  return (
    <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
      <DialogContent className="max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle>
            {newEvent.id ? "Edit Event" : "Add New Event"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4 max-h-[55vh] overflow-y-auto">
          <div>
            <Label htmlFor="event-title">Event Title</Label>
            <Input
              id="event-title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              placeholder="Enter event title"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="event-type">Event Type</Label>
            <Select
              value={newEvent.type}
              onValueChange={(value) =>
                setNewEvent({ ...newEvent, type: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(EVENT_TYPES).map(
                  ([type, details]: [string, EventType]) => (
                    <SelectItem key={type} value={type}>
                      {details.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="event-start">Start Date & Time</Label>
              <Input
                id="event-start"
                type="datetime-local"
                value={format(new Date(newEvent.start), "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    start: new Date(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="event-end">End Date & Time</Label>
              <Input
                id="event-end"
                type="datetime-local"
                value={format(new Date(newEvent.end), "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    end: new Date(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {(newEvent.type === "CLASS" || newEvent.type === "EXAM") && (
            <>
              <div>
                <Label htmlFor="event-class">Class</Label>
                <Select
                  value={newEvent.class}
                  onValueChange={(value) =>
                    setNewEvent({ ...newEvent, class: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.name}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="event-subject">Subject</Label>
                <Select
                  value={newEvent.subject}
                  onValueChange={(value) =>
                    setNewEvent({ ...newEvent, subject: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.name}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div>
            <Label htmlFor="event-location">Location</Label>
            <Select
              value={newEvent.location}
              onValueChange={(value) =>
                setNewEvent({ ...newEvent, location: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.name}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="event-description">Description</Label>
            <Textarea
              id="event-description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              placeholder="Add event details"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="event-recurring"
              checked={newEvent.recurring}
              onCheckedChange={(checked) =>
                setNewEvent({ ...newEvent, recurring: checked })
              }
            />
            <Label htmlFor="event-recurring" className="text-sm">
              Recurring Event
            </Label>
          </div>

          {newEvent.recurring && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="event-recurrence">Recurrence</Label>
                <Select
                  value={newEvent.recurrencePattern}
                  onValueChange={(value) =>
                    setNewEvent({ ...newEvent, recurrencePattern: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="event-recurrence-end">Until</Label>
                <Input
                  id="event-recurrence-end"
                  type="date"
                  value={format(
                    new Date(newEvent.recurrenceEndDate),
                    "yyyy-MM-dd"
                  )}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      recurrenceEndDate: new Date(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          )}

          {(newEvent.type === "CLASS" ||
            newEvent.type === "EXAM" ||
            newEvent.type === "EVENT") && (
            <div className="flex items-center gap-2">
              <Switch
                id="event-notify"
                checked={newEvent.notifyStudents}
                onCheckedChange={(checked) =>
                  setNewEvent({ ...newEvent, notifyStudents: checked })
                }
              />
              <Label htmlFor="event-notify" className="text-sm">
                Notify Students
              </Label>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setShowEventModal(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleAddEvent} className="rounded-full">
            {newEvent.id ? "Update Event" : "Add Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
