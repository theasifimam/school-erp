import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { ChevronDown } from "lucide-react";

export default function SidebarItem({
  icon,
  label,
  route,
  isOpen,
  isActive = false,
  hasSubmenu = false,
  isSubmenuOpen = false,
  onSubmenuToggle,
  submenu = [],
  badge,
}) {
  const pathname = usePathname();

  const handleItemClick = (e) => {
    if (hasSubmenu && onSubmenuToggle) {
      e.preventDefault();
      onSubmenuToggle();
    }
  };

  // Collapsed sidebar item view
  if (!isOpen && !hasSubmenu) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={route || "#"} passHref>
            <div
              className={cn(
                "flex items-center justify-center p-3 mx-1 my-1.5 rounded-full relative transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <div className="flex items-center justify-center w-5 h-5">
                {icon}
              </div>
              {badge && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground rounded-full">
                  {badge}
                </Badge>
              )}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-popover text-popover-foreground border border-border"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  // Collapsed sidebar with submenu
  if (!isOpen && hasSubmenu) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center justify-center p-3 mx-1 my-1.5 rounded-full relative cursor-pointer transition-all duration-200",
              isActive
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
            onClick={onSubmenuToggle}
          >
            <div className="flex items-center justify-center w-5 h-5">
              {icon}
            </div>
            {badge && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground rounded-full">
                {badge}
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="p-0 bg-popover text-popover-foreground border border-border overflow-hidden rounded-xl shadow-md"
        >
          <div className="py-1.5 px-2">
            <p className="font-semibold border-b border-border pb-1.5">
              {label}
            </p>
            <div className="space-y-1 mt-1.5">
              {submenu.map((item, index) => (
                <Link href={item.route} key={index} passHref>
                  <div className="flex items-center gap-2 py-1.5 px-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors">
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="h-5 ml-auto bg-primary text-primary-foreground">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  // Expanded sidebar view
  return (
    <div className="mb-0.5">
      {/* Main Item */}
      <div
        className={cn(
          "relative flex items-center gap-3 px-3 py-2.5 mx-1.5 my-0.5 rounded-full group transition-all duration-200",
          isActive
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
        onClick={handleItemClick}
      >
        {route && !hasSubmenu ? (
          <Link href={route} className="flex items-center gap-3 w-full">
            <div
              className={cn(
                "w-6 h-6 flex items-center justify-center flex-shrink-0",
                isActive
                  ? "text-primary-foreground"
                  : "group-hover:text-accent-foreground"
              )}
            >
              {icon}
            </div>
            <span className="text-sm font-medium">{label}</span>
          </Link>
        ) : (
          <>
            <div
              className={cn(
                "w-6 h-6 flex items-center justify-center flex-shrink-0",
                isActive
                  ? "text-primary-foreground"
                  : "group-hover:text-accent-foreground"
              )}
            >
              {icon}
            </div>
            <span className="text-sm font-medium flex-1">{label}</span>
            {hasSubmenu && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isSubmenuOpen && "transform rotate-180",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground group-hover:text-accent-foreground"
                )}
              />
            )}
          </>
        )}
        {badge && (
          <Badge
            className={cn(
              "ml-auto",
              isActive
                ? "bg-primary-foreground text-primary"
                : "bg-primary text-primary-foreground"
            )}
          >
            {badge}
          </Badge>
        )}
      </div>

      {/* Submenu */}
      {hasSubmenu && isSubmenuOpen && (
        <div className="mt-1 ml-4 pl-4 border-l border-border space-y-0.5">
          {submenu.map((item, index) => {
            const isItemActive = pathname === item.route;
            return (
              <Link href={item.route} key={index} passHref>
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-full text-sm group transition-colors",
                    isItemActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <div className="w-4 h-4 flex items-center justify-center text-muted-foreground group-hover:text-accent-foreground">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-primary text-primary-foreground">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
