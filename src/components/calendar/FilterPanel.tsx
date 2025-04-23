import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw } from "lucide-react";

interface EventType {
  color: string;
  label: string;
}

export const FiltersPanel = ({
  showFilters,
  searchTerm,
  setSearchTerm,
  filters,
  toggleFilter,
  clearFilters,
  classes,
  currentUser,
  USER_ROLES,
  EVENT_TYPES,
}: {
  showFilters: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: { types: string[]; classes: string[] };
  toggleFilter: (filterType: string, value: string) => void;
  clearFilters: () => void;
  classes: { id: string; name: string }[];
  currentUser: { role: string };
  USER_ROLES: { ADMIN: string; TEACHER: string };
  EVENT_TYPES: Record<string, EventType>;
}) => {
  if (!showFilters) return null;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <Label className="text-xs text-gray-500 mb-2 block">Search</Label>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search events..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1">
            <Label className="text-xs text-gray-500 mb-2 block">
              Event Types
            </Label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(EVENT_TYPES).map(([type, details]) => (
                <Badge
                  key={type}
                  variant={filters.types.includes(type) ? "default" : "outline"}
                  className="cursor-pointer"
                  style={{
                    backgroundColor: filters.types.includes(type)
                      ? details.color
                      : "transparent",
                    color: filters.types.includes(type)
                      ? "white"
                      : details.color,
                    borderColor: details.color,
                  }}
                  onClick={() => toggleFilter("types", type)}
                >
                  {details.label}
                </Badge>
              ))}
            </div>
          </div>

          {(currentUser.role === USER_ROLES.ADMIN ||
            currentUser.role === USER_ROLES.TEACHER) && (
            <div className="flex-1">
              <Label className="text-xs text-gray-500 mb-2 block">
                Classes
              </Label>
              <div className="flex flex-wrap gap-2">
                {classes.map((cls) => (
                  <Badge
                    key={cls.id}
                    variant={
                      filters.classes.includes(cls.id) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleFilter("classes", cls.id)}
                  >
                    {cls.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" /> Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
