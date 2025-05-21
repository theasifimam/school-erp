import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Menu,
  X,
  Settings,
  User,
  BookOpen,
  Calendar,
} from "lucide-react";

// SidebarSection component with improved mobile support
function SidebarSection({ title, children, isOpen }) {
  return (
    <div className="mt-2 mb-1">
      {isOpen && (
        <div className="px-3 py-1.5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </h2>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

// New MobileNavigation component to be added at the bottom of your layout
export function MobileNavigation({ pathname, router }) {
  const [isVisible, setIsVisible] = useState(false);

  // Show mobile nav only when scrolling up or at the top
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setIsVisible(true); // Make visible by default

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Primary navigation items for mobile
  const mobileNavItems = [
    { icon: <Home size={20} />, label: "Home", route: "/" },
    { icon: <Calendar size={20} />, label: "Calendar", route: "/calendar" },
    { icon: <BookOpen size={20} />, label: "Classes", route: "/classes" },
    { icon: <User size={20} />, label: "Profile", route: "/profile" },
    { icon: <Settings size={20} />, label: "Settings", route: "/settings" },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 transition-transform duration-300 shadow-lg lg:hidden",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
      aria-label="Mobile Navigation"
      role="navigation"
    >
      <div className="flex items-center justify-around px-2 py-3">
        {mobileNavItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.route)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-16 py-1 rounded-lg transition-colors",
              pathname === item.route
                ? "text-gray-800 bg-gray-100"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            )}
            aria-label={item.label}
            aria-current={pathname === item.route ? "page" : undefined}
          >
            <div className="flex items-center justify-center">{item.icon}</div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Optional: Safe area padding for iOS devices */}
      <div className="h-safe-area-bottom w-full bg-white" />
    </div>
  );
}

// A more accessible mobile menu toggle button for the Sidebar
export function MobileMenuToggle({ onClick, isOpen }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-4 left-4 z-40 bg-white shadow-md text-black border border-gray-200 hover:bg-gray-100 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  );
}

export default SidebarSection;
