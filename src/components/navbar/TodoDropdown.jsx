"use client";

import { useState } from "react";
import { CheckSquare, Plus, Edit, Trash2, GripVertical, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function TodoDropdown() {
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

      const [removed] = newTodos.splice(draggedIndex, 1);
      newTodos.splice(targetIndex, 0, removed);
      setTodos(newTodos);
      setDraggedItem(null);
    }
  };

  return (
    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-3xl border border-gray-200 w-80 z-50 max-h-96 overflow-hidden flex flex-col">
      <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
        <h3 className="font-medium text-indigo-700">My Tasks</h3>
        <Badge className="bg-amber-500">
          {todos.filter((t) => !t.completed).length} pending
        </Badge>
      </div>

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

      <div className="overflow-y-auto flex-1 max-h-64">
        {todos.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`p-3 flex items-center hover:bg-gray-50 ${
                  draggedItem?.id === todo.id ? "opacity-50" : ""
                }`}
                draggable
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
                        todo.completed ? "line-through text-gray-400" : ""
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
  );
}
