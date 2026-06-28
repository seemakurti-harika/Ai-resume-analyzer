import { createFileRoute } from "@tanstack/react-router";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/_authenticated/progress")({
  head: () => ({ meta: [{ title: "Progress — Career Copilot" }] }),
  component: ProgressPage,
});

const resumeHistory = [
  { week: "W1", score: 62 }, { week: "W2", score: 68 }, { week: "W3", score: 74 },
  { week: "W4", score: 76 }, { week: "W5", score: 80 }, { week: "W6", score: 82 },
];
const interviewScores = [
  { date: "Aug 12", score: 6.2 }, { date: "Aug 19", score: 7.0 },
  { date: "Aug 26", score: 7.4 }, { date: "Sep 02", score: 8.1 }, { date: "Sep 09", score: 8.4 },
];
const skills = [
  { skill: "React", value: 85 }, { skill: "TypeScript", value: 78 }, { skill: "Node", value: 65 },
  { skill: "SQL", value: 70 }, { skill: "System Design", value: 55 }, { skill: "Communication", value: 80 },
];
const applications = [
  { name: "Applied", value: 14 }, { name: "Review", value: 4 }, { name: "Interview", value: 3 }, { name: "Offer", value: 1 },
];

function ProgressPage() {
  return (
    <>
      <PageHeader title="Progress" subtitle="Track your growth across resume, interviews, and skills." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-3xl">
          <div className="mb-4">
            <h3 className="font-semibold">Resume score over time</h3>
            <p className="text-xs text-muted-foreground">Past 6 weeks</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={resumeHistory}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis domain={[40, 100]} stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="score" stroke="var(--color-primary)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl">
          <div className="mb-4">
            <h3 className="font-semibold">Interview scores</h3>
            <p className="text-xs text-muted-foreground">Last 5 sessions</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={interviewScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis domain={[0, 10]} stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="score" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl">
          <div className="mb-4">
            <h3 className="font-semibold">Skills progress</h3>
            <p className="text-xs text-muted-foreground">Self + AI assessment</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <RadarChart data={skills}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl">
          <div className="mb-4">
            <h3 className="font-semibold">Application pipeline</h3>
            <p className="text-xs text-muted-foreground">Current cycle</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={applications}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </>
  );
}
