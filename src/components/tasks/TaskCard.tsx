import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MoreHorizontal, User } from "lucide-react";

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export default function TaskCard({ task, onDragStart }) {
  // Enhanced color system for better visual clarity
  const priorityColors = {
    high: {
      bg: "bg-red-50",
      text: "text-red-800",
      border: "border-red-300",
      badge: "bg-red-100 text-red-800 border-red-200",
      icon: "text-red-600",
    },
    medium: {
      bg: "bg-amber-50",
      text: "text-amber-800",
      border: "border-amber-300",
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      icon: "text-amber-600",
    },
    low: {
      bg: "bg-green-50",
      text: "text-green-800",
      border: "border-green-300",
      badge: "bg-green-100 text-green-800 border-green-200",
      icon: "text-green-600",
    },
  };

  const priorityColor = priorityColors[task.priority];

  return (
    <Card
      className={`mb-4 ${priorityColor.border} border cursor-move hover:shadow-md transition-all duration-200`}
      draggable="true"
      onDragStart={(e) => onDragStart(e, task)}
    >
      <CardHeader className={`py-2 ${priorityColor.bg}`}>
        <div className="flex justify-between items-start">
          <CardTitle
            className={`text-base font-semibold ${priorityColor.text}`}
          >
            {task.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="text-sm mt-1 line-clamp-2">
          {task.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mt-1 items-center">
          <Badge
            variant="outline"
            className={priorityColor.badge + " rounded-full"}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
          </Badge>
          <Badge
            variant="outline"
            className="bg-gray-100 rounded-full text-gray-800"
          >
            {task.department}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className=" text-xs text-gray-500 flex justify-between border-t mt-1 pt-2">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>Due: {formatDate(task.dueDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <span className="capitalize">{task.assignedTo}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
