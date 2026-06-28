import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard, FileText, Building2, Mic, Map, LineChart, Settings,
  Sparkles, LogOut, Menu, X, Bell, Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "Resume Center", icon: FileText },
  { to: "/recruiter", label: "Recruiter Review", icon: Building2 },
  { to: "/interview", label: "Mock Interview", icon: Mic },
  { to: "/roadmap", label: "Learning Roadmap", icon: Map },
  { to: "/progress", label: "Progress", icon: LineChart },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const qc = useQueryClient();
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setEmail(data.user.email ?? "");
        setName(
          (data.user.user_metadata?.full_name as string | undefined) ??
          (data.user.email?.split("@")[0] ?? "")
        );
      }
    });
  }, []);

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const initials = (name || email || "U").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
        <SidebarInner initials={initials} name={name} email={email} onSignOut={signOut} />
      </aside>

      {/* Sidebar — mobile */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 flex flex-col bg-sidebar text-sidebar-foreground">
            <SidebarInner initials={initials} name={name} email={email} onSignOut={signOut} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 h-16 flex items-center gap-3 border-b bg-background/80 backdrop-blur px-4 sm:px-6">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-accent">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              placeholder="Search resumes, interviews, skills…"
              className="w-full h-10 pl-10 pr-3 rounded-xl bg-muted/60 border border-transparent focus:border-border focus:bg-card focus:outline-none text-sm"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Bell className="size-5" />
          </Button>
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarInner({
  initials, name, email, onSignOut,
}: { initials: string; name: string; email: string; onSignOut: () => void }) {
  return (
    <>
      <div className="h-16 flex items-center gap-2 px-5 border-b">
        <div className="size-9 grid place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </div>
        <div className="leading-tight">
          <div className="font-semibold text-sm">Career Copilot</div>
          <div className="text-[11px] text-muted-foreground">AI career OS</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
            inactiveProps={{ className: "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground" }}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{name || "User"}</div>
            <div className="text-xs text-muted-foreground truncate">{email}</div>
          </div>
          <button onClick={onSignOut} className="p-2 rounded-lg hover:bg-accent" title="Sign out">
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </>
  );
}
