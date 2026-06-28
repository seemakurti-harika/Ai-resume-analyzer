import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Circle, Sparkles, Calendar, BookOpen, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/_authenticated/roadmap")({
  head: () => ({ meta: [{ title: "Learning Roadmap — Career Copilot" }] }),
  component: RoadmapPage,
});

const weeks = [
  {
    week: 1, theme: "Foundations", status: "done",
    tasks: ["Refresh JS/TS fundamentals", "DSA: arrays & strings (10 problems)", "Set up portfolio repo"],
    project: "Personal portfolio site",
  },
  {
    week: 2, theme: "Frontend depth", status: "active",
    tasks: ["React performance & memoization", "Forms, validation, accessibility", "Build a reusable component library"],
    project: "Mini design system (5 components)",
  },
  {
    week: 3, theme: "Backend & APIs", status: "upcoming",
    tasks: ["REST design patterns", "Auth & JWT basics", "Database modeling"],
    project: "Notes API with auth",
  },
  {
    week: 4, theme: "System & interviews", status: "upcoming",
    tasks: ["System design primer", "Behavioral STAR stories", "Mock interview marathon"],
    project: "End-to-end fullstack app",
  },
];

function RoadmapPage() {
  return (
    <>
      <PageHeader
        title="Learning Roadmap"
        subtitle="Your personalized 4-week sprint to interview readiness."
        actions={
          <Button className="rounded-xl"><Sparkles className="size-4 mr-2" /> Regenerate</Button>
        }
      />

      <div className="space-y-5">
        {weeks.map((w) => {
          const isActive = w.status === "active";
          const isDone = w.status === "done";
          return (
            <Card key={w.week} className={`p-6 rounded-3xl ${isActive ? "border-primary/40 shadow-[var(--shadow-soft)]" : ""}`}>
              <div className="flex items-start gap-4">
                <div className={`size-12 grid place-items-center rounded-2xl shrink-0 text-sm font-semibold ${
                  isDone ? "bg-[var(--color-success)]/15 text-[var(--color-success)]" :
                  isActive ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                }`}>W{w.week}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-lg">{w.theme}</h3>
                    {isDone && <Badge className="rounded-lg bg-[var(--color-success)] text-[var(--color-success-foreground)]">Completed</Badge>}
                    {isActive && <Badge className="rounded-lg">This week</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="size-3" /> Week {w.week} of 4
                  </div>

                  <div className="grid md:grid-cols-[1fr_auto] gap-6 mt-4">
                    <ul className="space-y-2">
                      {w.tasks.map((t, i) => (
                        <li key={t} className="flex items-center gap-2 text-sm">
                          {isDone || (isActive && i === 0) ? (
                            <CheckCircle2 className="size-4 text-[var(--color-success)]" />
                          ) : (
                            <Circle className="size-4 text-muted-foreground" />
                          )}
                          <span className={isDone ? "text-muted-foreground line-through" : ""}>{t}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 rounded-2xl bg-accent/40 min-w-[220px]">
                      <div className="flex items-center gap-2 text-xs text-accent-foreground/80 uppercase tracking-wide font-medium">
                        <Rocket className="size-3.5" /> Mini project
                      </div>
                      <div className="font-medium mt-1">{w.project}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 rounded-3xl mt-6 bg-gradient-to-br from-primary/10 to-transparent">
        <div className="flex items-center gap-3">
          <BookOpen className="size-6 text-primary" />
          <div className="flex-1">
            <div className="font-semibold">Want a different track?</div>
            <div className="text-sm text-muted-foreground">Regenerate the roadmap for a different role — data, ML, mobile, or backend.</div>
          </div>
          <Button variant="outline" className="rounded-xl">Customize</Button>
        </div>
      </Card>
    </>
  );
}
