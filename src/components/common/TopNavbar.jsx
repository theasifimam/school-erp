"use client";

import { useState, useEffect } from "react";
import {
  School,
  Search,
  CheckSquare,
  X,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  ChevronRight,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import NotificationsDropdown from "../navbar/NotificationsDropdown";
import { Button } from "@/components/ui/button";
import AvatarDropdown from "../navbar/AvatarDropdown";
import { MobileMenuToggle } from "./SidebarSection";
import { useTheme } from "next-themes";

export default function TopNavbar({
  isMobileOpen,
  setIsMobileOpen,
  isOpen,
  setIsOpen,
}) {
  const { setTheme, theme } = useTheme();
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

  // Toggle sidebar function
  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      // lg breakpoint
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Main Navigation Bar */}
      <nav className=" text-gray-800 px-4 flex justify-between border-l-0 items-center h-16 border-b border-gray-200/50 dark:border-gray-900 sticky top-0 z-50 ">
        {/* Left side - Logo/Brand and Main Nav Links */}
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-black hover:bg-gray-100 rounded-full"
            onClick={toggleSidebar}
          >
            {isMobileOpen ? (
              <X size={20} />
            ) : window.innerWidth < 1024 ? (
              <Menu size={20} />
            ) : isOpen ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronRight size={20} className="rotate-180" />
            )}
          </Button>
          <div className="flex items-center gap-2">
            <School className="text-indigo-600 w-6 h-6" />
            <h1 className="text-xl dark:text-white font-semibold hidden md:block">
              EduManage
            </h1>
          </div>

          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="text-gray-100" /> : <Moon />}
          </button>
        </div>

        <MobileMenuToggle
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          isOpen={isMobileOpen}
        />

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
                <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                  <h3 className="font-medium text-gray-700">My Tasks</h3>
                  <Badge className="bg-amber-500 rounded-3xl pb-1">
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
                    className="bg-gray-600 text-black p-2 rounded-3xl hover:bg-gray-700"
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
              </div>
            )}
          </div>

          {/* Notifications */}
          <NotificationsDropdown
            {...{ notifications, setNotifications, setNotifOpen, notifOpen }}
          />

          {/* Avatar Dropdown */}
          <AvatarDropdown />
        </div>
      </nav>
    </div>
  );
}
