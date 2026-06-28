import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, FileText, Sparkles, Download, CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/resume")({
  head: () => ({ meta: [{ title: "Resume Center — Career Copilot" }] }),
  component: ResumePage,
});

function ResumePage() {
  const [analyzed, setAnalyzed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<string>("Jane_Doe_Resume.pdf");

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f.name);
    setLoading(true);
    setTimeout(() => { setLoading(false); setAnalyzed(true); toast.success("Resume analyzed"); }, 1200);
  }

  return (
    <>
      <PageHeader
        title="Resume Center"
        subtitle="Upload your resume and get an AI-powered ATS analysis."
        actions={analyzed && (
          <Button variant="outline" className="rounded-xl" onClick={() => toast.success("Report downloaded")}>
            <Download className="size-4 mr-2" /> Download report
          </Button>
        )}
      />

      {/* Upload */}
      <Card className="p-6 rounded-3xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="size-12 grid place-items-center rounded-2xl bg-primary/10 text-primary shrink-0">
            <FileText className="size-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{file}</div>
            <div className="text-sm text-muted-foreground">PDF · Last analyzed just now</div>
          </div>
          <label className="inline-flex">
            <input type="file" accept=".pdf,.docx" className="hidden" onChange={handleUpload} />
            <span className="cursor-pointer inline-flex items-center h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
              {loading ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Upload className="size-4 mr-2" />}
              {loading ? "Analyzing…" : "Upload new"}
            </span>
          </label>
        </div>
      </Card>

      {analyzed && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ATS Score */}
          <Card className="p-6 rounded-3xl">
            <h3 className="font-semibold mb-1">ATS Score</h3>
            <p className="text-xs text-muted-foreground mb-4">How well your resume passes automated filters.</p>
            <div className="relative size-40 mx-auto">
              <svg viewBox="0 0 100 100" className="size-40 -rotate-90">
                <circle cx="50" cy="50" r="42" stroke="var(--color-border)" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="42" stroke="var(--color-primary)" strokeWidth="10" fill="none"
                  strokeDasharray={`${(82/100) * 264} 264`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="text-3xl font-semibold">82</div>
                  <div className="text-xs text-muted-foreground">/ 100</div>
                </div>
              </div>
            </div>
            <Badge className="rounded-lg mt-4 w-full justify-center bg-[var(--color-success)] text-[var(--color-success-foreground)]">
              Strong
            </Badge>
          </Card>

          {/* Resume Health */}
          <Card className="p-6 rounded-3xl lg:col-span-2">
            <h3 className="font-semibold mb-4">Resume Health</h3>
            <div className="space-y-4">
              {[
                { label: "Formatting & ATS readability", value: 90 },
                { label: "Impact statements & metrics", value: 72 },
                { label: "Keyword coverage", value: 78 },
                { label: "Length & conciseness", value: 88 },
                { label: "Action verbs & clarity", value: 80 },
              ].map((h) => (
                <div key={h.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{h.label}</span><span className="text-muted-foreground">{h.value}%</span>
                  </div>
                  <Progress value={h.value} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Skills */}
          <Card className="p-6 rounded-3xl lg:col-span-2">
            <h3 className="font-semibold mb-4">Matched & Missing Skills</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-[var(--color-success)]" /> Matched
                </div>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Node.js", "PostgreSQL", "Git", "REST APIs", "Tailwind", "Jest"].map((s) => (
                    <Badge key={s} variant="secondary" className="rounded-lg">{s}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-2">
                  <XCircle className="size-3.5 text-destructive" /> Missing
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "Kubernetes", "GraphQL", "AWS", "System Design"].map((s) => (
                    <Badge key={s} variant="outline" className="rounded-lg border-destructive/30 text-destructive">{s}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Resume info */}
          <Card className="p-6 rounded-3xl">
            <h3 className="font-semibold mb-4">Resume Information</h3>
            <dl className="space-y-3 text-sm">
              <InfoRow k="Name" v="Jane Doe" />
              <InfoRow k="Email" v="jane@example.com" />
              <InfoRow k="Role target" v="Frontend Engineer" />
              <InfoRow k="Experience" v="2 years" />
              <InfoRow k="Education" v="B.Tech, CSE" />
              <InfoRow k="Pages" v="1" />
            </dl>
          </Card>

          {/* AI analysis + improvement */}
          <Card className="p-6 rounded-3xl lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-4 text-primary" />
              <h3 className="font-semibold">AI Resume Analysis & Improvements</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Insight tone="success" title="What's working" items={[
                "Strong impact verbs across recent roles",
                "Concise one-page layout with clear hierarchy",
                "Quantified results in 3 of 5 bullets",
              ]} />
              <Insight tone="warning" title="Suggested improvements" items={[
                "Add a 'Skills' section grouping by category",
                "Quantify outcomes for older roles (e.g. '+30% conversion')",
                "Include a brief professional summary at the top",
                "Mention Docker / AWS exposure if applicable",
              ]} />
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium text-right">{v}</dd>
    </div>
  );
}

function Insight({ tone, title, items }: { tone: "success" | "warning"; title: string; items: string[] }) {
  const Icon = tone === "success" ? CheckCircle2 : AlertCircle;
  const color = tone === "success" ? "text-[var(--color-success)]" : "text-[var(--color-warning-foreground)]";
  return (
    <div className="p-4 rounded-2xl border bg-muted/30">
      <div className={`flex items-center gap-2 font-medium mb-2 ${color}`}>
        <Icon className="size-4" /> {title}
      </div>
      <ul className="space-y-1.5 text-sm">
        {items.map((i) => <li key={i} className="flex gap-2"><span className="text-muted-foreground">•</span><span>{i}</span></li>)}
      </ul>
    </div>
  );
}
