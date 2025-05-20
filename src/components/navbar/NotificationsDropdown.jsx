import { useState, useEffect, useRef } from "react";
import {
  Bell,
  Info,
  X,
  AlertTriangle,
  MessageSquare,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";

const NotificationIcon = ({ type }) => {
  switch (type) {
    case "info":
      return <Info className="w-4 h-4" />;
    case "alert":
      return <AlertTriangle className="w-4 h-4" />;
    case "message":
      return <MessageSquare className="w-4 h-4" />;
    case "success":
      return <CheckCircle2 className="w-4 h-4" />;
    case "reminder":
      return <Calendar className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};

export default function NotificationsDropdown({
  notifications,
  setNotifications,
  setNotifOpen,
  notifOpen,
}) {
  const dropdownRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getIconBackground = (type) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-600";
      case "alert":
        return "bg-red-100 text-red-600";
      case "message":
        return "bg-violet-100 text-violet-600";
      case "success":
        return "bg-green-100 text-green-600";
      case "reminder":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const toggleNotifications = () => {
    setIsAnimating(true);
    setNotifOpen(!notifOpen);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setNotifOpen(false);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setNotifOpen]);

  // Reset animation state
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const unreadCount = notifications.length;

  return (
    <div className="relative notif-container z-10" ref={dropdownRef}>
      <button
        className={`p-2 rounded-full hover:bg-gray-100 transition-all duration-200 relative ${
          isAnimating ? "scale-110" : ""
        } ${notifOpen ? "bg-gray-100" : ""}`}
        onClick={toggleNotifications}
        aria-label="Notifications"
      >
        <Bell
          className={`w-5 h-5 ${notifOpen ? "text-blue-600" : "text-gray-600"}`}
        />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs p-0 animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </button>

      {/* Notifications Dropdown */}
      {notifOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200 w-80 z-50 transform transition-all duration-200 origin-top-right animate-in fade-in slide-in-from-top-5">
          <div className="p-4 rounded-t-3xl border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-blue-100">
            <h3 className="font-medium text-blue-700 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </h3>
            <div className="flex gap-2">
              <Badge className="bg-blue-500 hover:bg-blue-600 transition-colors">
                {unreadCount} new
              </Badge>
              {unreadCount > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {unreadCount === 0 ? (
            <div className="py-8 px-4 text-center text-gray-500">
              <div className="flex justify-center mb-3">
                <Bell className="w-10 h-10 text-gray-300" />
              </div>
              <p>No new notifications</p>
              <p className="text-xs mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`rounded-full p-2 ${getIconBackground(
                        notif.type
                      )}`}
                    >
                      <NotificationIcon type={notif.type} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{notif.text}</p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500">{notif.time}</p>
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="text-xs text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Mark as read
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-3 border-t rounded-b-3xl border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
            <a
              href="/notifications"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors text-center block font-medium"
            >
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
