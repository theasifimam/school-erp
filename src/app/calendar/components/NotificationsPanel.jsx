import { Button } from "@/components/ui/button";
import { Bell, Trash2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

export const NotificationsPanel = ({
  unreadCount,
  showNotifications,
  setShowNotifications,
  notifications,
  markAllNotificationsAsRead,
  deleteNotification,
  markNotificationAsRead,
}) => {
  return (
    <Card className="absolute right-0 w-80 z-50 mt-2">
      <CardContent className="p-0">
        <div className="p-3 border-b flex justify-between items-center">
          <h3 className="font-medium">Notifications</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={markAllNotificationsAsRead}
          >
            Mark all as read
          </Button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b flex items-start gap-3 ${
                  notification.read ? "bg-white" : "bg-blue-50"
                }`}
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{notification.title}</h4>
                  <p className="text-xs text-gray-600">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {format(new Date(notification.date), "PPp")}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
