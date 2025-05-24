// components/calendar/CalendarFilters.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw } from "lucide-react";

export function CalendarFilters({
  showFilters,
  filters,
  searchTerm,
  setSearchTerm,
  toggleFilter,
  clearFilters,
  currentUser,
  classes,
  EVENT_TYPES,
  USER_ROLES,
}) {
  if (!showFilters) return null;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <EventTypeFilter
            filters={filters}
            toggleFilter={toggleFilter}
            EVENT_TYPES={EVENT_TYPES}
          />

          {(currentUser.role === USER_ROLES.ADMIN ||
            currentUser.role === USER_ROLES.TEACHER) && (
            <ClassFilter
              filters={filters}
              toggleFilter={toggleFilter}
              classes={classes}
            />
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
}

function SearchFilter({ searchTerm, setSearchTerm }) {
  return (
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
  );
}

function EventTypeFilter({ filters, toggleFilter, EVENT_TYPES }) {
  return (
    <div className="flex-1">
      <Label className="text-xs text-gray-500 mb-2 block">Event Types</Label>
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
              color: filters.types.includes(type) ? "white" : details.color,
              borderColor: details.color,
            }}
            onClick={() => toggleFilter("types", type)}
          >
            {details.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function ClassFilter({ filters, toggleFilter, classes }) {
  return (
    <div className="flex-1">
      <Label className="text-xs text-gray-500 mb-2 block">Classes</Label>
      <div className="flex flex-wrap gap-2">
        {classes.map((cls) => (
          <Badge
            key={cls.id}
            variant={filters.classes.includes(cls.id) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleFilter("classes", cls.id)}
          >
            {cls.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
