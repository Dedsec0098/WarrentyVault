
import { Link, useLocation } from "react-router-dom";
import { 
  Bell, Calendar, FileText, Home, PlusCircle, Settings, User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "My Warranties", path: "/warranties" },
  { icon: PlusCircle, label: "Add Warranty", path: "/add-warranty" },
  { icon: Calendar, label: "Upcoming Expirations", path: "/upcoming" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold">WARRANTY VAULT</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <ul className="grid grid-flow-row auto-rows-max gap-2 px-2">
          {sidebarLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="block">
                <Button
                  variant={location.pathname === link.path ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    location.pathname === link.path &&
                      "bg-secondary font-medium text-secondary-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-4 rounded-lg px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
