import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { ShoppingBag, Plus, Minus, Trash2, Check } from "lucide-react";

export type CartItem = { name: string; price: number; qty: number };

export const fmt = (n: number) => "N" + n.toLocaleString("en-NG");

type Mode = "table" | "pickup" | "delivery";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const add = (name: string, price: number) => {
    setItems((p) => {
      const ex = p.find((i) => i.name === name);
      if (ex) return p.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i));
      return [...p, { name, price, qty: 1 }];
    });
  };
  const dec = (name: string) => {
    setItems((p) =>
      p.flatMap((i) => (i.name === name ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]))
    );
  };
  const remove = (name: string) => setItems((p) => p.filter((i) => i.name !== name));
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return { items, add, dec, remove, clear, total, count };
}

export function CartButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open cart"
      className="fixed bottom-6 right-6 z-40 h-16 w-16 rounded-full bg-gold text-ink shadow-elegant flex items-center justify-center"
    >
      <ShoppingBag className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-wine text-cream text-xs font-bold rounded-full min-w-[24px] h-6 px-1 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartDrawer({
  open,
  onOpenChange,
  cart,
}: {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  cart: ReturnType<typeof useCart>;
}) {
  const [mode, setMode] = useState<Mode>("table");
  const [table, setTable] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [placed, setPlaced] = useState<{ id: string; mode: Mode } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.items.length === 0) return;
    if (mode === "table" && !table.trim()) return toast.error("Please enter your table number.");
    if (mode !== "table" && (!name.trim() || !phone.trim())) return toast.error("Name and phone required.");
    if (mode === "delivery" && !address.trim()) return toast.error("Delivery address required.");

    const id = "LLB-" + Math.random().toString(36).slice(2, 7).toUpperCase();

    const itemString = cart.items
      .map((item) => `- ${item.qty}x ${item.name} (${fmt(item.price * item.qty)})`)
      .join("\n");

    const fulfillmentDetails =
      mode === "table"
        ? `Order Type: Table Service\nTable Number: ${table}`
        : mode === "pickup"
        ? `Order Type: Pickup\nCustomer: ${name}\nPhone: ${phone}`
        : `Order Type: Home Delivery\nCustomer: ${name}\nPhone: ${phone}\nAddress: ${address}`;

    const whatsappPayload =
      `*NEW LOUNGE ORDER PLACED*\n\n` +
      `Order ID: ${id}\n` +
      `----------------------------------------\n` +
      `${fulfillmentDetails}\n` +
      `----------------------------------------\n` +
      `ITEMS ORDERED:\n${itemString}\n` +
      `----------------------------------------\n` +
      `TOTAL BILL: ${fmt(cart.total)}\n\n` +
      `Sent instantly from Lekki Lounge App.`;

    const encodedMessage = encodeURIComponent(whatsappPayload);
    window.open(`https://wa.me/+2348149160279?text=${encodedMessage}`, "_blank");

    setPlaced({ id, mode });
    cart.clear();
  };

  const reset = () => {
    setPlaced(null);
    setTable("");
    setName("");
    setPhone("");
    setAddress("");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-cocoa text-cream border-l border-cream/10 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-cream font-display text-2xl">
            {placed ? "Order Confirmed: Your Order" : "Your Cart"}
          </SheetTitle>
        </SheetHeader>

        {placed ? (
          <div className="mt-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gold/20 text-gold grid place-items-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <p className="text-cream/80">Thank you. The kitchen has received your order.</p>
            <div className="rounded-xl border border-gold/30 bg-ink/40 p-5">
              <p className="text-xs uppercase tracking-widest text-gold mb-1">Order ID</p>
              <p className="font-mono text-2xl text-cream">{placed.id}</p>
            </div>
            <p className="text-sm text-cream/60 mt-3">
              {placed.mode === "table" ? "Serving to your table shortly." : placed.mode === "pickup" ? "We will text you when it is ready for pickup." : "Out for delivery within 45 mins."}
            </p>
            <Button onClick={reset} className="w-full bg-gold text-ink hover:bg-gold/90 font-semibold">
              Close
            </Button>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="mt-12 text-center text-cream/60">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>Your cart is empty. Tap + on any menu item to begin.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-6">
            <div className="space-y-3">
              {cart.items.map((it) => (
                <div key={it.name} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-ink/40 border border-cream/10">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-cream">{it.name}</p>
                    <p className="text-xs text-gold">{fmt(it.price)}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button type="button" onClick={() => cart.dec(it.name)} className="w-7 h-7 rounded-md bg-cream/10 flex items-center justify-center hover:bg-cream/20">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm">{it.qty}</span>
                    <button type="button" onClick={() => cart.add(it.name, it.price)} className="w-7 h-7 rounded-md bg-cream/10 flex items-center justify-center hover:bg-cream/20">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => cart.remove(it.name)} className="w-7 h-7 rounded-md hover:bg-wine/20 text-wine/80 ml-1 flex items-center justify-center">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-cream/10 pt-4">
              <span className="text-cream/70 uppercase text-xs tracking-widest">Total</span>
              <span className="text-2xl font-display font-bold text-gold">{fmt(cart.total)}</span>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-gold mb-2">How would you like it?</p>
              <div className="grid grid-cols-3 gap-2">
                {(["table", "pickup", "delivery"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`px-3 py-2.5 rounded-lg text-xs uppercase tracking-wider border transition-all ${
                      mode === m ? "bg-gold text-ink border-gold font-semibold" : "border-cream/20 text-cream/70 hover:border-gold/50"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {mode === "table" ? (
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-cream/60">Table Number</label>
                  <Input
                    placeholder="Table number (e.g. 12)"
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                    className="bg-ink/40 border-cream/20 text-cream placeholder:text-cream/40 h-11"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-cream/60">Your Name</label>
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-ink/40 border-cream/20 text-cream placeholder:text-cream/40 h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-cream/60">Phone Number</label>
                    <Input
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-ink/40 border-cream/20 text-cream placeholder:text-cream/40 h-11"
                    />
                  </div>
                  {mode === "delivery" && (
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-cream/60">Delivery Address</label>
                      <Input
                        placeholder="Delivery address in Ilesa"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="bg-ink/40 border-cream/20 text-cream placeholder:text-cream/40 h-11"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-gold text-ink hover:bg-gold/90 h-12 font-semibold">
              Place Order ({fmt(cart.total)})
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}