import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LogOut, User, LayoutDashboard, Gift } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate, Link, useLocation } from "react-router-dom";

const AdminNavigation = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const navLinks = [
    { path: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { path: "/adminoffer", label: "Offers", icon: <Gift className="w-4 h-4" /> },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-6 bg-card rounded-2xl border border-border/50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-lg">{user?.email}</p>
            <p className="text-sm text-muted-foreground">Administrator</p>
          </div>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="gap-2 border-border/50 hover:border-destructive/20 hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      {/* Navigation Section */}
      <div className="flex gap-3 mb-8">
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path}>
            <Button
              variant={location.pathname === link.path ? "default" : "outline"}
              className={`gap-2 transition-all ${
                location.pathname === link.path
                  ? "bg-primary text-white"
                  : "hover:bg-primary/10"
              }`}
            >
              {link.icon}
              {link.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminNavigation;
