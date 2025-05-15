import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { ChevronDown } from "lucide-react";

// Enhanced Sidebar Item Component
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
                  ? "bg-gray-800 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              )}
            >
              <div className="flex items-center justify-center w-5 h-5">
                {icon}
              </div>
              {badge && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-600 text-white rounded-full">
                  {badge}
                </Badge>
              )}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-white text-black border-gray-200"
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
                ? "bg-gray-800 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            )}
            onClick={onSubmenuToggle}
          >
            <div className="flex items-center justify-center w-5 h-5">
              {icon}
            </div>
            {badge && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-600 text-white rounded-full">
                {badge}
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="p-0 bg-white border-gray-200 overflow-hidden rounded-xl shadow-md"
        >
          <div className="py-1.5 px-2">
            <p className="font-semibold text-black border-b border-gray-200 pb-1.5">
              {label}
            </p>
            <div className="space-y-1 mt-1.5">
              {submenu.map((item, index) => (
                <Link href={item.route} key={index} passHref>
                  <div className="flex items-center gap-2 py-1.5 px-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="h-5 ml-auto bg-red-500 hover:bg-red-600 text-white">
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
          "relative flex items-center gap-3 px-3 py-2.5 mx-1.5 my-0.5 rounded-full cursor-pointer group transition-all duration-200",
          isActive
            ? "bg-gray-800 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100 hover:text-black"
        )}
        onClick={handleItemClick}
      >
        {route && !hasSubmenu ? (
          <Link href={route} className="flex items-center gap-3 w-full">
            <div
              className={cn(
                "w-6 h-6 flex items-center justify-center flex-shrink-0",
                isActive ? "text-white" : "text-gray-600 group-hover:text-black"
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
                isActive ? "text-white" : "text-gray-600 group-hover:text-black"
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
                    ? "text-white"
                    : "text-gray-500 group-hover:text-black"
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
                ? "bg-white text-gray-800"
                : "bg-red-500 hover:bg-red-600 text-white"
            )}
          >
            {badge}
          </Badge>
        )}
      </div>

      {/* Submenu */}
      {hasSubmenu && isSubmenuOpen && (
        <div className="mt-1 ml-4 pl-4 border-l border-gray-200 space-y-0.5">
          {submenu.map((item, index) => {
            const isItemActive = pathname === item.route;
            return (
              <Link href={item.route} key={index} passHref>
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-full text-sm group transition-colors",
                    isItemActive
                      ? "bg-gray-100 text-black font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-black"
                  )}
                >
                  <div className="w-4 h-4 flex items-center justify-center text-gray-500 group-hover:text-black">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-red-500 hover:bg-red-600 text-white">
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
