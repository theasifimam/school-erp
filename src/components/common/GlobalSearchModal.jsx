import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  User,
  GraduationCap,
  BookOpen,
  Users,
  FileText,
  Car,
  Code,
  Calendar,
  X,
  Clock,
  TrendingUp,
  Hash,
} from "lucide-react";

// Mock data for demonstration
const mockData = {
  users: [
    {
      id: 1,
      name: "John Admin",
      role: "Administrator",
      email: "john@school.com",
      avatar: "JA",
    },
    {
      id: 2,
      name: "Sarah Teacher",
      role: "Teacher",
      email: "sarah@school.com",
      avatar: "ST",
    },
    {
      id: 3,
      name: "Mike Manager",
      role: "Manager",
      email: "mike@school.com",
      avatar: "MM",
    },
  ],
  students: [
    {
      id: 1,
      name: "Alice Johnson",
      grade: "Grade 10",
      rollNo: "2024001",
      section: "A",
    },
    {
      id: 2,
      name: "Bob Smith",
      grade: "Grade 9",
      rollNo: "2024002",
      section: "B",
    },
    {
      id: 3,
      name: "Emma Wilson",
      grade: "Grade 11",
      rollNo: "2024003",
      section: "A",
    },
    {
      id: 4,
      name: "David Brown",
      grade: "Grade 8",
      rollNo: "2024004",
      section: "C",
    },
  ],
  books: [
    {
      id: 1,
      title: "Mathematics Grade 10",
      author: "Dr. Smith",
      isbn: "978-0123456789",
      available: 25,
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      author: "Prof. Johnson",
      isbn: "978-0123456790",
      available: 12,
    },
    {
      id: 3,
      title: "English Literature",
      author: "Mary Wilson",
      isbn: "978-0123456791",
      available: 8,
    },
  ],
  faculties: [
    {
      id: 1,
      name: "Mathematics Department",
      head: "Dr. Anderson",
      teachers: 8,
      subjects: ["Algebra", "Calculus", "Geometry"],
    },
    {
      id: 2,
      name: "Science Department",
      head: "Prof. Lee",
      teachers: 12,
      subjects: ["Physics", "Chemistry", "Biology"],
    },
    {
      id: 3,
      name: "English Department",
      head: "Ms. Davis",
      teachers: 6,
      subjects: ["Literature", "Grammar", "Writing"],
    },
  ],
  pages: [
    {
      id: 1,
      title: "Student Dashboard",
      path: "/students",
      description: "Manage student information",
    },
    {
      id: 2,
      title: "Fee Management",
      path: "/fees",
      description: "Handle fee payments and records",
    },
    {
      id: 3,
      title: "Attendance System",
      path: "/attendance",
      description: "Track student attendance",
    },
    {
      id: 4,
      title: "Grade Reports",
      path: "/grades",
      description: "View and manage grades",
    },
  ],
  vehicles: [
    {
      id: 1,
      number: "BUS-001",
      route: "Route A - Downtown",
      capacity: 40,
      driver: "Tom Wilson",
    },
    {
      id: 2,
      number: "BUS-002",
      route: "Route B - Suburbs",
      capacity: 35,
      driver: "Lisa Brown",
    },
    {
      id: 3,
      number: "VAN-001",
      route: "Route C - Hills",
      capacity: 15,
      driver: "Mark Davis",
    },
  ],
  functions: [
    {
      id: 1,
      name: "Generate Report",
      category: "Reports",
      description: "Create attendance reports",
    },
    {
      id: 2,
      name: "Bulk SMS",
      category: "Communication",
      description: "Send messages to parents",
    },
    {
      id: 3,
      name: "Fee Calculator",
      category: "Finance",
      description: "Calculate student fees",
    },
  ],
  holidays: [
    {
      id: 1,
      name: "Summer Vacation",
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      type: "Academic",
    },
    {
      id: 2,
      name: "Independence Day",
      startDate: "2024-08-15",
      endDate: "2024-08-15",
      type: "National",
    },
    {
      id: 3,
      name: "Winter Break",
      startDate: "2024-12-25",
      endDate: "2025-01-02",
      type: "Academic",
    },
  ],
};

const categoryConfig = {
  users: { icon: User, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  students: {
    icon: GraduationCap,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  books: {
    icon: BookOpen,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  faculties: {
    icon: Users,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  pages: { icon: FileText, color: "text-cyan-400", bgColor: "bg-cyan-500/10" },
  vehicles: {
    icon: Car,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  functions: { icon: Code, color: "text-pink-400", bgColor: "bg-pink-500/10" },
  holidays: { icon: Calendar, color: "text-red-400", bgColor: "bg-red-500/10" },
};

const recentSearches = [
  { type: "students", query: "Alice Johnson" },
  { type: "books", query: "Mathematics" },
  { type: "pages", query: "Fee Management" },
];

const GlobalSearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const inputRef = useRef(null);

  // Search function
  const performSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults({});
      setTotalResults(0);
      return;
    }

    const searchResults = {};
    let total = 0;

    Object.keys(mockData).forEach((category) => {
      const filtered = mockData[category].filter((item) => {
        const searchText = searchQuery.toLowerCase();
        switch (category) {
          case "users":
            return (
              item.name.toLowerCase().includes(searchText) ||
              item.role.toLowerCase().includes(searchText) ||
              item.email.toLowerCase().includes(searchText)
            );
          case "students":
            return (
              item.name.toLowerCase().includes(searchText) ||
              item.grade.toLowerCase().includes(searchText) ||
              item.rollNo.toLowerCase().includes(searchText)
            );
          case "books":
            return (
              item.title.toLowerCase().includes(searchText) ||
              item.author.toLowerCase().includes(searchText) ||
              item.isbn.toLowerCase().includes(searchText)
            );
          case "faculties":
            return (
              item.name.toLowerCase().includes(searchText) ||
              item.head.toLowerCase().includes(searchText) ||
              item.subjects.some((subject) =>
                subject.toLowerCase().includes(searchText)
              )
            );
          case "pages":
            return (
              item.title.toLowerCase().includes(searchText) ||
              item.description.toLowerCase().includes(searchText)
            );
          case "vehicles":
            return (
              item.number.toLowerCase().includes(searchText) ||
              item.route.toLowerCase().includes(searchText) ||
              item.driver.toLowerCase().includes(searchText)
            );
          case "functions":
            return (
              item.name.toLowerCase().includes(searchText) ||
              item.category.toLowerCase().includes(searchText) ||
              item.description.toLowerCase().includes(searchText)
            );
          case "holidays":
            return (
              item.name.toLowerCase().includes(searchText) ||
              item.type.toLowerCase().includes(searchText)
            );
          default:
            return false;
        }
      });

      if (filtered.length > 0) {
        searchResults[category] = filtered;
        total += filtered.length;
      }
    });

    setResults(searchResults);
    setTotalResults(total);
    setSelectedIndex(0);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const renderResultItem = (item, category, index) => {
    const config = categoryConfig[category];
    const IconComponent = config.icon;

    return (
      <div
        key={`${category}-${item.id}`}
        className={`flex items-center gap-3 p-3 rounded-4xl cursor-pointer transition-all duration-200 ${
          selectedIndex === index
            ? "bg-black/50 border border-gray-700"
            : "hover:bg-gray-800/50"
        }`}
        onClick={() => {
          console.log(`Selected ${category}:`, item);
          setIsOpen(false);
        }}
      >
        <div className={`p-2 rounded-3xl ${config.bgColor}`}>
          <IconComponent className={`w-4 h-4 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          {category === "users" && (
            <>
              <div className="font-medium text-white truncate">{item.name}</div>
              <div className="text-sm text-gray-400">
                {item.role} • {item.email}
              </div>
            </>
          )}
          {category === "students" && (
            <>
              <div className="font-medium text-white truncate">{item.name}</div>
              <div className="text-sm text-gray-400">
                {item.grade} • Roll No: {item.rollNo} • Section {item.section}
              </div>
            </>
          )}
          {category === "books" && (
            <>
              <div className="font-medium text-white truncate">
                {item.title}
              </div>
              <div className="text-sm text-gray-400">
                {item.author} • Available: {item.available}
              </div>
            </>
          )}
          {category === "faculties" && (
            <>
              <div className="font-medium text-white truncate">{item.name}</div>
              <div className="text-sm text-gray-400">
                Head: {item.head} • {item.teachers} teachers
              </div>
            </>
          )}
          {category === "pages" && (
            <>
              <div className="font-medium text-white truncate">
                {item.title}
              </div>
              <div className="text-sm text-gray-400">{item.description}</div>
            </>
          )}
          {category === "vehicles" && (
            <>
              <div className="font-medium text-white truncate">
                {item.number}
              </div>
              <div className="text-sm text-gray-400">
                {item.route} • Driver: {item.driver}
              </div>
            </>
          )}
          {category === "functions" && (
            <>
              <div className="font-medium text-white truncate">{item.name}</div>
              <div className="text-sm text-gray-400">
                {item.category} • {item.description}
              </div>
            </>
          )}
          {category === "holidays" && (
            <>
              <div className="font-medium text-white truncate">{item.name}</div>
              <div className="text-sm text-gray-400">
                {item.type} • {item.startDate} to {item.endDate}
              </div>
            </>
          )}
        </div>
        <div className="text-xs text-gray-500 uppercase tracking-wider">
          {category.slice(0, -1)}
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer border border-gray-200 dark:border-gray-800 text-gray-300 text-sm transition-all"
      >
        <Search className="w-4 h-4 text-gray-500" />
        <span className="text-gray-500">Search...</span>
        <div className="flex gap-1 ml-auto">
          <kbd className="px-1.5 py-0.5 text-xs text-gray-500">⌘</kbd>
          <kbd className="px-1.5 py-0.5 text-xs text-gray-500">K</kbd>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 border border-gray-700 rounded-4xl shadow-2xl w-full max-w-2xl max-h-[70vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-700">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for users, students, books, pages, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-800 rounded-md text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {!query.trim() ? (
            /* Recent searches and suggestions */
            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Searches
                </h3>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => {
                    const config = categoryConfig[search.type];
                    const IconComponent = config.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded-full cursor-pointer"
                        onClick={() => setQuery(search.query)}
                      >
                        <div className={`p-1.5 rounded-full ${config.bgColor}`}>
                          <IconComponent
                            className={`w-3 h-3 ${config.color}`}
                          />
                        </div>
                        <span className="text-gray-300">{search.query}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Quick Access
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(categoryConfig).map((category) => {
                    const config = categoryConfig[category];
                    const IconComponent = config.icon;
                    return (
                      <div
                        key={category}
                        className="flex items-center gap-2 p-2 hover:bg-gray-800/50 rounded-full cursor-pointer"
                        onClick={() => setQuery(category)}
                      >
                        <div className={`p-1.5 rounded-full ${config.bgColor}`}>
                          <IconComponent
                            className={`w-3 h-3 ${config.color}`}
                          />
                        </div>
                        <span className="text-gray-300 capitalize">
                          {category}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Search results */
            <div className="p-4">
              {totalResults > 0 ? (
                <>
                  <div className="mb-4 flex items-center gap-2 text-sm text-gray-400">
                    <Hash className="w-4 h-4" />
                    {totalResults} results found
                  </div>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {Object.keys(results).map((category) => {
                      const config = categoryConfig[category];
                      const IconComponent = config.icon;
                      return (
                        <div key={category}>
                          <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2 capitalize">
                            <IconComponent
                              className={`w-4 h-4 ${config.color}`}
                            />
                            {category} ({results[category].length})
                          </h3>
                          <div className="space-y-1">
                            {results[category].map((item, index) =>
                              renderResultItem(item, category, index)
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-400 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-500">
                    Try searching for users, students, books, or other items
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-700 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded-full">↑↓</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded-full">↵</kbd>
              <span>Select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded-full">ESC</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
