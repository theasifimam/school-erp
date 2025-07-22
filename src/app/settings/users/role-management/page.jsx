import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Badge } from "lucide-react";
import { roleDisplayNames, userCategories, users } from "../overview/page";

export default function RoleManagementPage() {
  return (
    <div value="roles" className="space-y-6">
      <div className="grid gap-6">
        {Object.entries(userCategories).map(([key, category]) => {
          const Icon = category.icon;
          return (
            <Card key={key}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-black text-white">
                    <Icon size={20} />
                  </div>
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>
                      {category.roles.length} role
                      {category.roles.length !== 1 ? "s" : ""} in this category
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.roles.map((role) => {
                    const roleUsers = users.filter(
                      (user) => user.role === role
                    );
                    return (
                      <div
                        key={role}
                        className="py-4 px-8 border rounded-3xl hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className={category.color}>
                            {roleDisplayNames[role]}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {roleUsers.length} users
                          </span>
                        </div>
                        <div className="space-y-1">
                          {roleUsers.slice(0, 3).map((user) => (
                            <div
                              key={user.id}
                              className="text-sm text-gray-700 flex items-center gap-2"
                            >
                              <div className="w-4 h-4 rounded-full bg-gray-300 flex-shrink-0"></div>
                              {user.name}
                            </div>
                          ))}
                          {roleUsers.length > 3 && (
                            <div className="text-xs text-gray-500">
                              +{roleUsers.length - 3} more
                            </div>
                          )}
                          {roleUsers.length === 0 && (
                            <div className="text-sm text-gray-500 italic">
                              No users assigned
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
