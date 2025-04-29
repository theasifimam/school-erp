import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import TaskForm from "./TaskForm"; // Assuming you have a TaskForm component

export default function KanbanColumn({
  title,
  tasks,
  status,
  onDrop,
  onDragOver,
  onDragStart,
  icon,
  bgColor,
  borderColor,
  textColor,
  onCreateTask, // Add this prop for creating new tasks
  onUpdateTask, // Add this prop for updating existing tasks
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleSubmit = (taskData) => {
    if (isCreating) {
      onCreateTask({ ...taskData, status });
    } else {
      onUpdateTask({ ...selectedTask, ...taskData });
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`flex-1 ${bgColor} p-4 rounded-3xl border ${borderColor} h-full min-h-96 flex flex-col`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        data-status={status}
      >
        <div
          className={`flex items-center gap-2 mb-4 ${textColor} font-medium`}
        >
          {icon}
          <h3>{title}</h3>
          <Badge className={`${bgColor} ${textColor} ml-2`}>
            {tasks.length}
          </Badge>
        </div>
        <div className="overflow-y-auto flex-grow">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={onDragStart}
              onClick={() => handleTaskClick(task)}
            />
          ))}
          {tasks.length === 0 && (
            <div className="flex items-center justify-center h-24 border border-dashed rounded-lg text-gray-400 text-sm">
              No tasks
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          className="mt-2 w-full rounded-full border border-dashed"
          onClick={handleAddTask}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Task
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isCreating ? "Add New Task" : "Edit Task"}
            </DialogTitle>
          </DialogHeader>
          <TaskForm
            task={selectedTask || { title: "", description: "" }}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
