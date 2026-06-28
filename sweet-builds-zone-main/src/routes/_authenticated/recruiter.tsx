import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/_authenticated/recruiter")({
  head: () => ({ meta: [{ title: "Recruiter Review — Career Copilot" }] }),
  component: RecruiterPage,
});

function RecruiterPage() {
  const [reviewed, setReviewed] = useState(false);
  const [company, setCompany] = useState("Acme Corp");
  const [role, setRole] = useState("Frontend Engineer");

  return (
    <>
      <PageHeader title="Recruiter Review" subtitle="Get a recruiter-style review tailored to a specific company & role." />

      <Card className="p-6 rounded-3xl mb-6">
        <div className="grid md:grid-cols-[1fr_1fr_auto] gap-3 items-end">
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="h-11 rounded-xl mt-1" />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} className="h-11 rounded-xl mt-1" />
          </div>
          <Button className="h-11 rounded-xl" onClick={() => setReviewed(true)}>
            <Sparkles className="size-4 mr-2" /> Generate review
          </Button>
        </div>
      </Card>

      {reviewed && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 rounded-3xl">
            <ShieldCheck className="size-6 text-primary mb-2" />
            <div className="text-sm text-muted-foreground">ATS compatibility</div>
            <div className="text-3xl font-semibold mt-1">86<span className="text-base text-muted-foreground">/100</span></div>
            <Progress value={86} className="h-1.5 mt-3" />
            <p className="text-xs text-muted-foreground mt-3">Your resume parses cleanly in {company}'s ATS.</p>
          </Card>
          <Card className="p-6 rounded-3xl">
            <TrendingUp className="size-6 text-[var(--color-success)] mb-2" />
            <div className="text-sm text-muted-foreground">Interview probability</div>
            <div className="text-3xl font-semibold mt-1">High</div>
            <Badge className="rounded-lg mt-3 bg-[var(--color-success)] text-[var(--color-success-foreground)]">~ 72% callback</Badge>
            <p className="text-xs text-muted-foreground mt-3">Based on JD match and recent recruiter signals.</p>
          </Card>
          <Card className="p-6 rounded-3xl">
            <Building2 className="size-6 text-primary mb-2" />
            <div className="text-sm text-muted-foreground">Company fit</div>
            <div className="text-3xl font-semibold mt-1">Strong</div>
            <Progress value={78} className="h-1.5 mt-3" />
            <p className="text-xs text-muted-foreground mt-3">Aligns with {role} expectations at {company}.</p>
          </Card>

          <Card className="p-6 rounded-3xl lg:col-span-3">
            <h3 className="font-semibold mb-4">Recruiter feedback</h3>
            <div className="space-y-4 text-sm">
              {[
                { tag: "Strengths", color: "bg-[var(--color-success)]/15 text-[var(--color-success)]", items: [
                  "Clear front-end specialization with React + TypeScript.",
                  "Impact bullets are quantified and outcome-driven.",
                  "Portfolio links and GitHub strengthen credibility.",
                ]},
                { tag: "Gaps", color: "bg-destructive/10 text-destructive", items: [
                  "No mention of testing strategy or CI/CD experience.",
                  "Cloud/infra exposure is missing for senior tracks.",
                ]},
                { tag: "Suggestions", color: "bg-primary/10 text-primary", items: [
                  "Lead with a 2-line summary tailored to the role.",
                  "Move side projects above hobbies; quantify usage.",
                  "Add a one-liner on collaboration with design / PM.",
                ]},
              ].map((b) => (
                <div key={b.tag}>
                  <Badge className={`rounded-lg ${b.color} mb-2`}>{b.tag}</Badge>
                  <ul className="space-y-1.5 pl-1">
                    {b.items.map((i) => <li key={i} className="flex gap-2"><span className="text-muted-foreground">•</span><span>{i}</span></li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {!reviewed && (
        <Card className="p-12 rounded-3xl text-center border-dashed">
          <Building2 className="size-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Enter a company and role above to generate a tailored review.</p>
        </Card>
      )}
    </>
  );
}
