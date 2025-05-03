import { Bell, Info } from "lucide-react";
import { Badge } from "../ui/badge";

export default function NotificationsDropdown({
  notifications,
  setNotifications,
  setNotifOpen,
  notifOpen,
}) {
  return (
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
            <Badge className="bg-blue-500">{notifications.length} new</Badge>
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
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
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
  );
}
