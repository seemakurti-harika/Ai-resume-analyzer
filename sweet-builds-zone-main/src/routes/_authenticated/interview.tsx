import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mic, Send, Sparkles, RefreshCcw, Bot, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/_authenticated/interview")({
  head: () => ({ meta: [{ title: "Mock Interview — Career Copilot" }] }),
  component: InterviewPage,
});

type Msg = { role: "ai" | "you"; text: string };

function InterviewPage() {
  const [tab, setTab] = useState<"technical" | "hr">("technical");
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Welcome! Let's start with a quick warm-up: walk me through a recent project you're proud of, and the trickiest bug you fixed." },
  ]);

  function send() {
    if (!input.trim()) return;
    const next: Msg[] = [...msgs, { role: "you", text: input }];
    setMsgs(next);
    setInput("");
    setTimeout(() => {
      setMsgs([...next, { role: "ai", text: "Good context. Can you describe how you decided on the data structure, and the trade-offs you considered?" }]);
    }, 600);
  }

  return (
    <>
      <PageHeader
        title="Mock Interview"
        subtitle="Practice with an AI interviewer and get scored feedback."
        actions={
          <Button variant="outline" className="rounded-xl" onClick={() => setMsgs(msgs.slice(0,1))}>
            <RefreshCcw className="size-4 mr-2" /> Restart
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <Card className="rounded-3xl overflow-hidden flex flex-col h-[calc(100vh-220px)] min-h-[520px]">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-9 grid place-items-center rounded-2xl bg-primary/10 text-primary">
                <Bot className="size-4" />
              </div>
              <div>
                <div className="text-sm font-medium">AI Interviewer</div>
                <div className="text-xs text-muted-foreground">Session in progress</div>
              </div>
            </div>
            <Tabs value={tab} onValueChange={(v) => setTab(v as "technical" | "hr")}>
              <TabsList className="rounded-xl">
                <TabsTrigger value="technical" className="rounded-lg">Technical</TabsTrigger>
                <TabsTrigger value="hr" className="rounded-lg">HR</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "you" ? "flex-row-reverse" : ""}`}>
                <div className={`size-8 grid place-items-center rounded-xl shrink-0 ${m.role === "ai" ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"}`}>
                  {m.role === "ai" ? <Bot className="size-4" /> : <User className="size-4" />}
                </div>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${m.role === "ai" ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your answer…"
              className="flex-1 h-11 px-4 rounded-xl bg-muted/60 border border-transparent focus:bg-card focus:border-border focus:outline-none text-sm"
            />
            <Button variant="outline" className="rounded-xl size-11 p-0" title="Voice (coming soon)">
              <Mic className="size-4" />
            </Button>
            <Button className="rounded-xl h-11" onClick={send}>
              <Send className="size-4 mr-2" /> Send
            </Button>
          </div>
        </Card>

        {/* Side panel */}
        <div className="space-y-6">
          <Card className="p-5 rounded-3xl">
            <h3 className="font-semibold flex items-center gap-2 mb-3"><Sparkles className="size-4 text-primary" /> Live evaluation</h3>
            <div className="space-y-3 text-sm">
              <ScoreRow label="Clarity" value={8.2} />
              <ScoreRow label="Technical depth" value={7.0} />
              <ScoreRow label="Communication" value={8.6} />
              <ScoreRow label="Confidence" value={7.4} />
            </div>
          </Card>

          <Card className="p-5 rounded-3xl">
            <h3 className="font-semibold mb-3">Recent sessions</h3>
            <ul className="space-y-3">
              {[
                { title: "System Design", date: "Yesterday", score: "7.4" },
                { title: "React + Hooks", date: "3 days ago", score: "8.1" },
                { title: "HR Round", date: "Last week", score: "8.6" },
              ].map((s) => (
                <li key={s.title} className="flex items-center justify-between gap-3 py-2 border-b last:border-0">
                  <div>
                    <div className="text-sm font-medium">{s.title}</div>
                    <div className="text-xs text-muted-foreground">{s.date}</div>
                  </div>
                  <Badge variant="secondary" className="rounded-lg">{s.score}/10</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  const pct = (value / 10) * 100;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value.toFixed(1)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
