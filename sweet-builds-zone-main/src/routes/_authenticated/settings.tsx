import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, Download, Trash2, LogOut, User as UserIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/PageHeader";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — Career Copilot" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [dark, setDark] = useState(false);
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? "");
      const { data: profile } = await supabase.from("profiles").select("full_name, headline").eq("id", user.id).maybeSingle();
      if (profile) {
        setFullName(profile.full_name ?? "");
        setHeadline(profile.headline ?? "");
      }
    })();
  }, []);

  function toggleDark(v: boolean) {
    setDark(v);
    document.documentElement.classList.toggle("dark", v);
  }

  async function saveProfile() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("profiles")
      .upsert({ id: user.id, full_name: fullName, headline, updated_at: new Date().toISOString() });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  }

  function exportData() {
    const blob = new Blob([JSON.stringify({ email, fullName, headline, exportedAt: new Date() }, null, 2)],
      { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "career-copilot-data.json"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported");
  }

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <>
      <PageHeader title="Settings" subtitle="Manage your profile, theme, and data." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 rounded-3xl lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <UserIcon className="size-4 text-primary" />
            <h3 className="font-semibold">Profile</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fn">Full name</Label>
              <Input id="fn" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-11 rounded-xl mt-1" />
            </div>
            <div>
              <Label htmlFor="hl">Headline</Label>
              <Input id="hl" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g. Frontend Engineer · React + TS"
                className="h-11 rounded-xl mt-1" />
            </div>
            <div>
              <Label htmlFor="em">Email</Label>
              <Input id="em" value={email} disabled className="h-11 rounded-xl mt-1 bg-muted" />
            </div>
            <Button onClick={saveProfile} disabled={loading} className="rounded-xl">
              {loading ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 rounded-3xl">
            <h3 className="font-semibold mb-4">Appearance</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
                <div>
                  <div className="text-sm font-medium">Dark mode</div>
                  <div className="text-xs text-muted-foreground">Reduce eye strain at night</div>
                </div>
              </div>
              <Switch checked={dark} onCheckedChange={toggleDark} />
            </div>
          </Card>

          <Card className="p-6 rounded-3xl">
            <h3 className="font-semibold mb-4">Data</h3>
            <Button variant="outline" className="w-full rounded-xl justify-start" onClick={exportData}>
              <Download className="size-4 mr-2" /> Export my data
            </Button>
            <Button variant="outline" className="w-full rounded-xl justify-start mt-2 text-destructive hover:text-destructive"
              onClick={() => toast.message("Contact support to delete your account.")}>
              <Trash2 className="size-4 mr-2" /> Delete account
            </Button>
          </Card>

          <Card className="p-6 rounded-3xl">
            <h3 className="font-semibold mb-4">Session</h3>
            <Button variant="outline" className="w-full rounded-xl" onClick={signOut}>
              <LogOut className="size-4 mr-2" /> Sign out
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}
