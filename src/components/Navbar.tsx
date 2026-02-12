import { Link, useLocation } from "react-router-dom";
import { Film, Ticket, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Movies", path: "/", icon: Film },
  { label: "Showtimes", path: "/showtimes", icon: Ticket },
  { label: "Promotions", path: "/promotions", icon: Tag },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-7 w-7 text-primary" />
          <span className="font-bebas text-2xl tracking-wider text-foreground">
            CINE<span className="text-primary">GOLD</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="outline" size="sm" className="gap-2 border-border text-foreground hover:bg-secondary">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
