import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronLeft, ChevronRight, Sparkles, Users, Crown } from "lucide-react";

type Zone = "Standard" | "VIP" | "VVIP";

const ZONES: { id: Zone; price: string; perks: string; icon: typeof Users }[] = [
  { id: "Standard", price: "₦25,000", perks: "Lounge access · Bar seating", icon: Users },
  { id: "VIP", price: "₦150,000", perks: "Reserved booth · Bottle service · Priority entry", icon: Sparkles },
  { id: "VVIP", price: "₦500,000", perks: "Green Room · Dedicated host · Premium bottles", icon: Crown },
];

export function BookingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "", phone: "", date: "", time: "21:00", party: "4", zone: "VIP" as Zone, table: "T-04",
  });
  const [confirmed, setConfirmed] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setTimeout(() => { setStep(1); setConfirmed(null); }, 300);
    }
  }, [open]);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = () => {
    const id = "LL-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setConfirmed(id);
  };

  const stepValid =
    (step === 1 && data.name.trim() && data.phone.trim()) ||
    (step === 2 && data.date && data.time && data.party) ||
    step === 3;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl glass-card border-gold/20 p-0 overflow-hidden">
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        <div className="relative p-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-display">
              {confirmed ? "Reservation Confirmed" : "Reserve Your Night"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {confirmed ? "We've saved your spot. See you soon." : `Step ${step} of 3 — premium service awaits.`}
            </DialogDescription>
          </DialogHeader>

          {!confirmed && (
            <div className="mt-6 flex gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1 flex-1 rounded-full transition-all ${s <= step ? "bg-gold" : "bg-muted"}`} />
              ))}
            </div>
          )}

          <div className="mt-8 min-h-[300px]">
            {confirmed ? (
              <div className="text-center py-8 animate-fade-up">
                <div className="mx-auto w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6 glow-gold">
                  <Check className="w-10 h-10 text-gold" />
                </div>
                <p className="text-muted-foreground mb-2">Confirmation ID</p>
                <p className="text-2xl font-mono gradient-gold-text mb-6">{confirmed}</p>
                <div className="glass-card rounded-xl p-5 text-left max-w-sm mx-auto space-y-2 text-sm">
                  <Row label="Guest" value={data.name} />
                  <Row label="Date" value={`${data.date} · ${data.time}`} />
                  <Row label="Party" value={`${data.party} guests`} />
                  <Row label="Zone" value={`${data.zone} — ${data.table}`} />
                </div>
                <Button onClick={() => onOpenChange(false)} className="mt-8 bg-ink text-white hover:bg-ink/90">
                  Done
                </Button>
              </div>
            ) : step === 1 ? (
              <div className="space-y-5 animate-fade-up">
                <Field label="Full Name">
                  <Input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="Your name" className="bg-input/50 border-border h-12" />
                </Field>
                <Field label="Phone Number">
                  <Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}
                    placeholder="+234 ..." className="bg-input/50 border-border h-12" />
                </Field>
              </div>
            ) : step === 2 ? (
              <div className="space-y-5 animate-fade-up">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Date">
                    <Input type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })}
                      className="bg-input/50 border-border h-12" />
                  </Field>
                  <Field label="Time">
                    <select value={data.time} onChange={(e) => setData({ ...data, time: e.target.value })}
                      className="bg-input/50 border border-border rounded-md h-12 px-3 w-full text-foreground">
                      {["18:00","19:00","20:00","21:00","22:00","23:00","00:00","01:00"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Party Size">
                  <div className="flex gap-2 flex-wrap">
                    {["2","4","6","8","10","12+"].map(n => (
                      <button key={n} onClick={() => setData({ ...data, party: n })}
                        className={`px-5 h-12 rounded-md border transition-all ${data.party===n ? "bg-ink text-white border-ink" : "border-border hover:border-gold/50"}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            ) : (
              <div className="space-y-5 animate-fade-up">
                <Field label="Zone">
                  <div className="grid gap-3">
                    {ZONES.map(z => {
                      const Icon = z.icon;
                      const active = data.zone === z.id;
                      return (
                        <button key={z.id} onClick={() => setData({ ...data, zone: z.id })}
                          className={`text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                            active ? "border-gold bg-gold/5 glow-gold" : "border-border hover:border-gold/40"
                          }`}>
                          <Icon className={`w-6 h-6 ${active ? "text-gold" : "text-muted-foreground"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3">
                              <span className="font-semibold">{z.id}</span>
                              <span className="text-gold text-sm">{z.price}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 truncate">{z.perks}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Field>
                <Field label="Pick a Table">
                  <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 18 }).map((_, i) => {
                      const id = `T-${String(i+1).padStart(2,"0")}`;
                      const taken = [2,7,11,14].includes(i);
                      const active = data.table === id;
                      return (
                        <button key={id} disabled={taken}
                          onClick={() => setData({ ...data, table: id })}
                          className={`aspect-square rounded-md text-xs font-mono transition-all ${
                            taken ? "bg-muted/30 text-muted-foreground/40 cursor-not-allowed line-through" :
                            active ? "bg-ink text-white" : "bg-secondary hover:bg-secondary/70"
                          }`}>
                          {id.slice(2)}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              </div>
            )}
          </div>

          {!confirmed && (
            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={back} disabled={step === 1} className="text-muted-foreground">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              {step < 3 ? (
                <Button onClick={next} disabled={!stepValid} className="bg-ink text-white hover:bg-ink/90">
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={submit} className="bg-ink text-white hover:bg-ink/90 ring-1 ring-[#C9A24A]/40">
                  Confirm Reservation
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
