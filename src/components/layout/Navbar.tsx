
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, Menu, Search, Shield, User, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">
              WARRANTY <span className="text-primary">VAULT</span>
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search warranties..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="p-2">
                <Bell className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" className="p-2">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile menu button */}
        <Button variant="ghost" className="p-2 md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile navigation */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-50 border-b bg-background md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="container py-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search warranties..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <nav className="flex flex-col space-y-2">
            <Link to="/dashboard" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
            </Link>
            <Link to="/warranties" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start">All Warranties</Button>
            </Link>
            <Link to="/add-warranty" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start">Add Warranty</Button>
            </Link>
            <Link to="/profile" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start">Profile</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
