"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  School,
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  BookOpen,
  Users,
  Calendar,
  ClipboardList,
  GraduationCap,
  FileText,
  DollarSign,
  Bus,
  Library,
  Award,
  CheckSquare,
  X,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function TopNavbar() {
  // To-Do List State
  const [todoOpen, setTodoOpen] = useState(false);
  const [todos, setTodos] = useState([
    { id: 1, text: "Review student attendance reports", completed: false },
    { id: 2, text: "Prepare for parent-teacher conference", completed: false },
    { id: 3, text: "Submit grade reports", completed: true },
    { id: 4, text: "Staff meeting at 3 PM", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);

  // Notifications State
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New student enrollment request",
      time: "5 min ago",
      type: "info",
    },
    {
      id: 2,
      text: "Staff meeting reminder",
      time: "1 hour ago",
      type: "reminder",
    },
    {
      id: 3,
      text: "Fee payment pending for Grade 10",
      time: "2 hours ago",
      type: "alert",
    },
  ]);

  // Quick Links Menu State
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);

  // To-Do List Functions
  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (todo) => {
    setEditing(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditing(null);
  };

  const handleDragStart = (todo) => {
    setDraggedItem(todo);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetTodo) => {
    if (draggedItem && draggedItem.id !== targetTodo.id) {
      const newTodos = [...todos];
      const draggedIndex = newTodos.findIndex(
        (todo) => todo.id === draggedItem.id
      );
      const targetIndex = newTodos.findIndex(
        (todo) => todo.id === targetTodo.id
      );

      // Remove dragged item
      const [removed] = newTodos.splice(draggedIndex, 1);
      // Insert at new position
      newTodos.splice(targetIndex, 0, removed);

      setTodos(newTodos);
      setDraggedItem(null);
    }
  };

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (todoOpen && !event.target.closest(".todo-container")) {
        setTodoOpen(false);
      }
      if (notifOpen && !event.target.closest(".notif-container")) {
        setNotifOpen(false);
      }
      if (quickLinksOpen && !event.target.closest(".quicklinks-container")) {
        setQuickLinksOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [todoOpen, notifOpen, quickLinksOpen]);

  return (
    <div className="flex flex-col">
      {/* Main Navigation Bar */}
      <nav className="bg-white text-gray-800 px-4 flex justify-between items-center h-16 border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        {/* Left side - Logo/Brand and Main Nav Links */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <School className="text-indigo-600 w-6 h-6" />
            <h1 className="text-xl font-semibold hidden md:block">EduManage</h1>
          </div>
        </div>

        {/* Right side - Search, Notifications, ToDo, User */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative hidden md:block lg:w-64 md:w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search students, faculty..."
              className="pl-10 bg-gray-50 border-gray-200 focus:border-indigo-300 rounded-full text-sm h-9"
            />
          </div>

          {/* Todo List Button */}
          <div className="relative todo-container">
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              onClick={() => setTodoOpen(!todoOpen)}
            >
              <CheckSquare className="w-5 h-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs p-0">
                {todos.filter((t) => !t.completed).length}
              </Badge>
            </button>

            {/* Todo List Dropdown */}
            {todoOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-3xl border border-gray-200 w-80 z-50 max-h-96 overflow-hidden flex flex-col">
                <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
                  <h3 className="font-medium text-indigo-700">My Tasks</h3>
                  <Badge className="bg-amber-500">
                    {todos.filter((t) => !t.completed).length} pending
                  </Badge>
                </div>

                {/* Todo Form */}
                <form
                  onSubmit={addTodo}
                  className="p-3 border-b border-gray-100 flex gap-2"
                >
                  <Input
                    type="text"
                    placeholder="Add new task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="text-sm flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>

                {/* Todo List */}
                <div className="overflow-y-auto flex-1 max-h-64">
                  {todos.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {todos.map((todo) => (
                        <li
                          key={todo.id}
                          className={`p-3 flex items-center hover:bg-gray-50 ${
                            draggedItem && draggedItem.id === todo.id
                              ? "opacity-50"
                              : ""
                          }`}
                          draggable={true}
                          onDragStart={() => handleDragStart(todo)}
                          onDragOver={handleDragOver}
                          onDrop={() => handleDrop(todo)}
                        >
                          <div className="cursor-grab text-gray-400 mr-2">
                            <GripVertical className="w-4 h-4" />
                          </div>
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="rounded border-gray-300 text-indigo-600 mr-3 focus:ring-indigo-500"
                          />

                          {editing === todo.id ? (
                            <div className="flex-1 flex items-center gap-2">
                              <Input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="text-sm flex-1 h-8"
                                autoFocus
                              />
                              <button
                                onClick={() => saveEdit(todo.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                <CheckSquare className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditing(null)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <span
                                className={`flex-1 text-sm ${
                                  todo.completed
                                    ? "line-through text-gray-400"
                                    : ""
                                }`}
                              >
                                {todo.text}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => startEdit(todo)}
                                  className="text-gray-400 hover:text-indigo-600 p-1"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteTodo(todo.id)}
                                  className="text-gray-400 hover:text-red-600 p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No tasks yet. Add one above!
                    </div>
                  )}
                </div>

                <div className="p-2 border-t border-gray-100 bg-gray-50">
                  <a
                    href="/tasks"
                    className="text-xs text-indigo-600 hover:text-indigo-800 text-center block"
                  >
                    View all tasks
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative notif-container">
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs p-0">
                {notifications.length}
              </Badge>
            </button>

            {/* Notifications Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-80 z-50">
                <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-blue-50">
                  <h3 className="font-medium text-blue-700">Notifications</h3>
                  <Badge className="bg-blue-500">
                    {notifications.length} new
                  </Badge>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3 border-b border-gray-100 hover:bg-gray-50"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-full p-2 ${
                            notif.type === "info"
                              ? "bg-blue-100 text-blue-600"
                              : notif.type === "alert"
                              ? "bg-red-100 text-red-600"
                              : "bg-amber-100 text-amber-600"
                          }`}
                        >
                          <Info className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{notif.text}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notif.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-gray-100 bg-gray-50">
                  <a
                    href="/notifications"
                    className="text-xs text-blue-600 hover:text-blue-800 text-center block"
                  >
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Avatar Dropdown Menu */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-2 focus:outline-none group pl-2">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium">Principal Smith</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <Avatar className="w-9 h-9 cursor-pointer border-2 border-transparent group-hover:border-indigo-300 transition-all">
                  <AvatarImage src="/admin-avatar.jpg" alt="Admin" />
                  <AvatarFallback className="bg-indigo-100 text-indigo-600 font-medium">
                    PS
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors hidden md:block" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-white shadow-lg rounded-xl w-64 p-2 border border-gray-200 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                align="end"
                sideOffset={8}
              >
                {/* Profile Section */}
                <DropdownMenu.Item className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-3 focus:outline-none">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/admin-avatar.jpg" alt="Admin" />
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 font-medium">
                      PS
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Principal Smith</p>
                    <p className="text-xs text-gray-500">
                      principal@edumanage.edu
                    </p>
                  </div>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="h-px bg-gray-100 my-1" />

                {/* Essential Menu Items */}
                <DropdownMenu.Group>
                  <DropdownMenu.Item asChild>
                    <a
                      href="/dashboard"
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center text-gray-700 gap-3 focus:outline-none text-sm"
                    >
                      <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                      <span>Dashboard</span>
                    </a>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item asChild>
                    <a
                      href="/profile"
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center text-gray-700 gap-3 focus:outline-none text-sm"
                    >
                      <User className="w-4 h-4 text-indigo-500" />
                      <span>My Profile</span>
                    </a>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item asChild>
                    <a
                      href="/settings"
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center text-gray-700 gap-3 focus:outline-none text-sm"
                    >
                      <Settings className="w-4 h-4 text-indigo-500" />
                      <span>Settings</span>
                    </a>
                  </DropdownMenu.Item>
                </DropdownMenu.Group>

                <DropdownMenu.Separator className="h-px bg-gray-100 my-1" />

                <DropdownMenu.Item asChild>
                  <a
                    href="/logout"
                    className="p-3 hover:bg-red-50 rounded-lg cursor-pointer flex items-center text-red-500 gap-3 focus:outline-none text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </a>
                </DropdownMenu.Item>

                <DropdownMenu.Arrow className="fill-white" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </nav>

      {/* Secondary Navigation - Mobile only */}
      <div className="lg:hidden flex overflow-x-auto bg-indigo-50 px-4 py-2 gap-4 text-sm font-medium text-gray-700 border-b border-indigo-100">
        <a
          href="/dashboard"
          className="whitespace-nowrap flex items-center gap-1"
        >
          <LayoutDashboard className="w-4 h-4 text-indigo-500" />
          <span>Dashboard</span>
        </a>
        <a
          href="/students"
          className="whitespace-nowrap flex items-center gap-1"
        >
          <Users className="w-4 h-4 text-indigo-500" />
          <span>Students</span>
        </a>
        <a
          href="/academics"
          className="whitespace-nowrap flex items-center gap-1"
        >
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <span>Academics</span>
        </a>
        <a
          href="/calendar"
          className="whitespace-nowrap flex items-center gap-1"
        >
          <Calendar className="w-4 h-4 text-indigo-500" />
          <span>Calendar</span>
        </a>
        <a href="/more" className="whitespace-nowrap flex items-center gap-1">
          <ChevronDown className="w-4 h-4 text-indigo-500" />
          <span>More</span>
        </a>
      </div>
    </div>
  );
}
