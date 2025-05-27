"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Filter, CheckCircle, Circle, Clock } from "lucide-react";

// Custom components from shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import KanbanColumn from "@/components/tasks/KanbanColumn";
import TaskForm from "@/components/tasks/TaskForm";

// Task data
const initialTasks = [
  {
    id: "1",
    title: "Update Student Enrollment Records",
    description:
      "Review and update incoming student enrollment data for Spring semester",
    priority: "high",
    status: "in-progress",
    dueDate: "2025-05-10",
    assignedTo: "admin",
    department: "Registrar",
    createdAt: "2025-04-20",
  },
  {
    id: "2",
    title: "Generate End-of-Month Financial Report",
    description:
      "Compile financial data and generate monthly balance sheets and income statements",
    priority: "high",
    status: "pending",
    dueDate: "2025-05-02",
    assignedTo: "finance",
    department: "Finance",
    createdAt: "2025-04-25",
  },
  {
    id: "3",
    title: "Process Teacher Attendance Records",
    description:
      "Review and approve exception requests in teacher attendance system",
    priority: "medium",
    status: "pending",
    dueDate: "2025-05-05",
    assignedTo: "hr",
    department: "HR",
    createdAt: "2025-04-26",
  },
  {
    id: "4",
    title: "Update Course Curriculum",
    description:
      "Make changes to Science department course curriculum based on latest requirements",
    priority: "medium",
    status: "completed",
    dueDate: "2025-04-28",
    assignedTo: "academic",
    department: "Academic",
    createdAt: "2025-04-15",
  },
  {
    id: "5",
    title: "Review IT Infrastructure Upgrade Proposals",
    description: "Evaluate vendor proposals for network infrastructure upgrade",
    priority: "low",
    status: "in-progress",
    dueDate: "2025-05-15",
    assignedTo: "admin",
    department: "IT",
    createdAt: "2025-04-22",
  },
  {
    id: "6",
    title: "Prepare Mid-term Examination Schedule",
    description: "Create and publish examination timetable for all grades",
    priority: "high",
    status: "completed",
    dueDate: "2025-04-25",
    assignedTo: "academic",
    department: "Academic",
    createdAt: "2025-04-10",
  },
];

export default function KanbanTasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Get tasks by status
  const pendingTasks = filteredTasks.filter(
    (task) => task.status === "pending"
  );
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress"
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "completed"
  );

  // Apply filters whenever dependencies change
  useEffect(() => {
    let result = [...tasks];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply department filter
    if (departmentFilter !== "all") {
      result = result.filter((task) => task.department === departmentFilter);
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      result = result.filter((task) => task.priority === priorityFilter);
    }

    setFilteredTasks(result);
  }, [tasks, searchQuery, departmentFilter, priorityFilter]);

  // Get unique departments for filter
  const departments = ["all", ...new Set(tasks.map((task) => task.department))];

  // Drag and drop handlers
  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    // Update task status
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  // Task modal handlers
  const handleAddTask = () => {
    setCurrentTask(null);
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleCreateTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, taskWithId]);
    setIsModalOpen(false);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setIsModalOpen(false);
  };

  // Calculate stats
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    highPriority: tasks.filter((t) => t.priority === "high").length,
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Task Board</h1>
            <p>Manage and track all ERP system tasks</p>
          </div>
          <Button className="rounded-full" onClick={handleAddTask}>
            <Plus className="h-4 w-4 mr-2" /> Create New Task
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {/* Total Tasks */}
          <Card className="bg-white dark:bg-background border-l-4 border-indigo-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold">{stats.total}</div>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Completed */}
          <Card className="bg-green-50 dark:bg-background border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {stats.completed}
                </div>
                <p className="text-sm text-green-800">Completed</p>
                <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${(stats.completed / stats.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* In Progress */}
          <Card className="bg-blue-50 dark:bg-background border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  {stats.inProgress}
                </div>
                <p className="text-sm text-blue-800">In Progress</p>
                <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(stats.inProgress / stats.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Pending */}
          <Card className="bg-gray-100 dark:bg-background border-l-4 border-gray-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-600">
                  {stats.pending}
                </div>
                <p className="text-sm text-gray-800">Pending</p>
                <div className="mt-2 w-full bg-gray-300 rounded-full h-2">
                  <div
                    className="bg-gray-600 h-2 rounded-full"
                    style={{ width: `${(stats.pending / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-gray-200 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* High Priority */}
          <Card className="bg-red-50 dark:bg-background border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-red-600">
                  {stats.highPriority}
                </div>
                <p className="text-sm text-red-800">High Priority</p>
                <div className="mt-2 w-full bg-red-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{
                      width: `${(stats.highPriority / stats.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-black border-gray-700 p-4 rounded-3xl shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10 border-gray-300"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" /> More Filters
              </Button>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="flex flex-col md:flex-row gap-6 mb-6 h-full min-h-[600px]">
            <KanbanColumn
              title="To Do"
              tasks={pendingTasks}
              status="pending"
              onDrop={(e) => handleDrop(e, "pending")}
              onDragOver={handleDragOver}
              onDragStart={handleDragStart}
              onTaskClick={handleEditTask}
              icon={<Circle className="h-5 w-5 text-gray-600" />}
              bgColor="bg-gray-50 dark:bg-background"
              borderColor="border-gray-200 dark:border-gray-900"
              textColor="text-gray-800"
            />

            <KanbanColumn
              title="In Progress"
              tasks={inProgressTasks}
              status="in-progress"
              onDrop={(e) => handleDrop(e, "in-progress")}
              onDragOver={handleDragOver}
              onDragStart={handleDragStart}
              onTaskClick={handleEditTask}
              icon={<Clock className="h-5 w-5 text-blue-600" />}
              bgColor="bg-blue-50 dark:bg-background"
              borderColor="border-blue-200 dark:border-gray-900"
              textColor="text-blue-800"
            />

            <KanbanColumn
              title="Completed"
              tasks={completedTasks}
              status="completed"
              onDrop={(e) => handleDrop(e, "completed")}
              onDragOver={handleDragOver}
              onDragStart={handleDragStart}
              onTaskClick={handleEditTask}
              icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              bgColor="bg-green-50 dark:bg-background"
              borderColor="border-green-200 dark:border-gray-900"
              textColor="text-green-800"
            />
          </div>
        </div>

        {/* Task Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {isCreating ? "Create New Task" : "Edit Task"}
              </DialogTitle>
            </DialogHeader>
            <TaskForm
              task={currentTask}
              isCreating={isCreating}
              onCreate={handleCreateTask}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
