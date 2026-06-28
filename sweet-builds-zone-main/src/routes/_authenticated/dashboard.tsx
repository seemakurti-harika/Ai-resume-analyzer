import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  FileText, Mic, Map, Trophy, TrendingUp, Target, Sparkles, ArrowRight,
  CheckCircle2, Clock, Briefcase,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Career Copilot" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const [name, setName] = useState("there");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const n = (data.user?.user_metadata?.full_name as string | undefined) ?? data.user?.email?.split("@")[0];
      if (n) setName(n.split(" ")[0]);
    });
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <>
      <PageHeader
        title={`${greeting}, ${name} 👋`}
        subtitle="Here's your career snapshot for today."
        actions={
          <Button asChild className="rounded-xl">
            <Link to="/resume"><Sparkles className="size-4 mr-2" /> Analyze resume</Link>
          </Button>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FileText} label="Resume Score" value="82" hint="+6 this week" tone="primary" progress={82} />
        <StatCard icon={Mic} label="Interview Readiness" value="68%" hint="3 mock sessions" tone="success" progress={68} />
        <StatCard icon={Briefcase} label="Applications" value="14" hint="4 in review" tone="warning" />
        <StatCard icon={TrendingUp} label="Learning Progress" value="Week 2/4" hint="On track" tone="accent" progress={50} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <Card className="p-6 rounded-3xl lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Quick actions</h3>
            <span className="text-xs text-muted-foreground">Start where you left off</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <QuickAction to="/resume" icon={FileText} title="Upload & score resume" desc="Get ATS-ready feedback" />
            <QuickAction to="/interview" icon={Mic} title="Start mock interview" desc="Technical + HR rounds" />
            <QuickAction to="/recruiter" icon={Briefcase} title="Get recruiter review" desc="Company-specific tips" />
            <QuickAction to="/roadmap" icon={Map} title="Open learning roadmap" desc="This week's tasks" />
          </div>
        </Card>

        {/* Weekly goals */}
        <Card className="p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Weekly goals</h3>
            <Target className="size-4 text-muted-foreground" />
          </div>
          <ul className="space-y-3">
            {[
              { label: "Polish resume to 90+", done: false, pct: 70 },
              { label: "Complete 2 mock interviews", done: false, pct: 50 },
              { label: "Finish Week 2 learning tasks", done: true, pct: 100 },
              { label: "Apply to 5 roles", done: false, pct: 40 },
            ].map((g, i) => (
              <li key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className={g.done ? "text-muted-foreground line-through" : ""}>{g.label}</span>
                  {g.done && <CheckCircle2 className="size-4 text-[var(--color-success)]" />}
                </div>
                <Progress value={g.pct} className="h-1.5" />
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent activity */}
        <Card className="p-6 rounded-3xl lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent activity</h3>
            <Button variant="ghost" size="sm" className="text-xs">View all <ArrowRight className="size-3 ml-1" /></Button>
          </div>
          <ul className="divide-y">
            {[
              { icon: FileText, title: "Resume analyzed — Frontend Engineer", time: "2 hours ago", tag: "Score 82" },
              { icon: Mic, title: "Mock interview: System Design", time: "Yesterday", tag: "7.4/10" },
              { icon: Briefcase, title: "Recruiter review — Acme Corp", time: "2 days ago", tag: "Strong fit" },
              { icon: Map, title: "Completed Week 2 mini project", time: "3 days ago", tag: "Done" },
            ].map((a, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                <div className="size-9 grid place-items-center rounded-xl bg-accent text-accent-foreground">
                  <a.icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{a.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="size-3" />{a.time}</div>
                </div>
                <Badge variant="secondary" className="rounded-lg">{a.tag}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        {/* Achievements */}
        <Card className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent">
          <Trophy className="size-6 text-primary mb-3" />
          <h3 className="font-semibold">Keep the streak alive</h3>
          <p className="text-sm text-muted-foreground mt-1">You've been active 5 days in a row. Hit 7 to unlock a profile badge.</p>
          <div className="mt-4 flex items-center gap-1">
            {[1,2,3,4,5,6,7].map((d) => (
              <div key={d} className={`flex-1 h-2 rounded-full ${d <= 5 ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>
          <div className="text-xs text-muted-foreground mt-2">Day 5 of 7</div>
        </Card>
      </div>
    </>
  );
}

function StatCard({
  icon: Icon, label, value, hint, progress, tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; value: string; hint?: string; progress?: number;
  tone: "primary" | "success" | "warning" | "accent";
}) {
  const toneClass = {
    primary: "bg-primary/10 text-primary",
    success: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    warning: "bg-[var(--color-warning)]/15 text-[var(--color-warning-foreground)]",
    accent: "bg-accent text-accent-foreground",
  }[tone];

  return (
    <Card className="p-5 rounded-3xl">
      <div className="flex items-start justify-between">
        <div className={`size-10 grid place-items-center rounded-2xl ${toneClass}`}>
          <Icon className="size-5" />
        </div>
      </div>
      <div className="mt-4 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
      {progress !== undefined && <Progress value={progress} className="h-1.5 mt-3" />}
      {hint && <div className="text-xs text-muted-foreground mt-2">{hint}</div>}
    </Card>
  );
}

function QuickAction({
  to, icon: Icon, title, desc,
}: { to: string; icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 p-4 rounded-2xl border bg-card hover:border-primary/40 hover:shadow-[var(--shadow-soft)] transition-all"
    >
      <div className="size-10 grid place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon className="size-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
