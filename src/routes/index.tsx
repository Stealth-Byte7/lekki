import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookingModal } from "@/components/BookingModal";
import { CartButton, CartDrawer, useCart, fmt } from "@/components/Cart";
import { Instagram, Music2, MapPin, Clock, Phone, Flame, Star, ChevronDown, Wine, Sparkles, Crown, Plus } from "lucide-react";

import hero from "@/assets/hero.jpg";
import cocktail from "@/assets/cocktail.jpg";
import food from "@/assets/food.jpg";

import jollofImg from "@/assets/ng/jollof.jpg";
import suyaImg from "@/assets/ng/suya.jpg";
import peppersoupImg from "@/assets/ng/peppersoup.jpg";
import poundedyamImg from "@/assets/ng/poundedyam.jpg";
import amalaImg from "@/assets/ng/amala.jpg";
import shishaImg from "@/assets/ng/shisha.jpg";
import beerImg from "@/assets/ng/beer.jpg";
import chapmanImg from "@/assets/ng/chapman.jpg";
import spiritsImg from "@/assets/ng/spirits.jpg";

import heroVideoAsset from "@/assets/real/hero-video.mp4.asset.json";
import logoAsset from "@/assets/real/logo.jpg.asset.json";
import exteriorAsset from "@/assets/real/exterior.jpg.asset.json";
import exterior2Asset from "@/assets/real/exterior2.jpg.asset.json";
import exterior3Asset from "@/assets/real/exterior3.jpg.asset.json";
import interior1Asset from "@/assets/real/interior1.jpg.asset.json";
import interior2Asset from "@/assets/real/interior2.jpg.asset.json";
import posterAsset from "@/assets/real/poster.jpg.asset.json";

const heroVideo = heroVideoAsset.url;
const logoImg = logoAsset.url;
const exteriorImg = exteriorAsset.url;
const exterior2Img = exterior2Asset.url;
const exterior3Img = exterior3Asset.url;
const interior1Img = interior1Asset.url;
const interior2Img = interior2Asset.url;
const posterImg = posterAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lekki Lounge & Bar — The Pinnacle of Ilesa Nightlife" },
      { name: "description", content: "Upscale nightclub, restaurant and cocktail lounge in Ilesa, Osun State. VIP tables, premium spirits, Afro-fusion cuisine and weekly themed nights." },
      { property: "og:title", content: "Lekki Lounge & Bar" },
      { property: "og:description", content: "Experience the pinnacle of Ilesa nightlife." },
      { property: "og:image", content: hero },
    ],
  }),
  component: Home,
});

function Home() {
  const [booking, setBooking] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav scrolled={scrolled} onBook={() => setBooking(true)} />
      <Hero onBook={() => setBooking(true)} />
      <About />
      <Menu onAdd={(name, price) => { cart.add(name, price); setCartOpen(true); }} />
      <Events />
      <Gallery />
      <Footer />
      <BookingModal open={booking} onOpenChange={setBooking} />
      <CartButton count={cart.count} onClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} cart={cart} />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ scrolled, onBook }: { scrolled: boolean; onBook: () => void }) {
  const links = [
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#events", label: "Events" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-5"}`}>
      <div className="container mx-auto px-6 grid grid-cols-[auto_1fr_auto] items-center gap-6">
        <a href="#top" className="flex items-center gap-2 min-w-0">
          <img src={logoImg} alt="Lekki Lounge & Bar" className="w-10 h-10 rounded-md object-cover ring-1 ring-gold/40" />
          <span className="font-display font-bold tracking-tight text-lg hidden sm:block">
            Lekki <span className="text-gold">Lounge</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center justify-center gap-8 text-sm">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-gold transition-colors uppercase tracking-wider text-xs">
              {l.label}
            </a>
          ))}
        </nav>
        <Button onClick={onBook} size="sm" className="bg-ink text-white hover:bg-ink/90 font-semibold">
          Book Table
        </Button>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        src={heroVideo}
        poster={posterImg}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl text-white">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-[#E8C66B] mb-8">
            <span className="w-8 h-px bg-[#E8C66B]" /> Ilesa · Osun State <span className="w-8 h-px bg-[#E8C66B]" />
          </span>
        </div>
        <h1 className="animate-fade-up font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6"
            style={{ animationDelay: "0.15s" }}>
          Experience the <span className="gradient-gold-text">Pinnacle</span><br />
          of Ilesa <span className="italic font-light">Nightlife</span>
        </h1>
        <p className="animate-fade-up text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
           style={{ animationDelay: "0.3s" }}>
          A modern lounge where craft cocktails, Afro-fusion cuisine and curated sound meet in the heart of Ilesa.
        </p>
        <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "0.45s" }}>
          <a href="#menu">
            <Button size="lg" variant="outline" className="border-white/40 bg-white/5 text-white hover:bg-white hover:text-ink h-14 px-8 min-w-[200px]">
              Explore Menu
            </Button>
          </a>
          <Button size="lg" onClick={onBook}
            className="bg-ink text-white hover:bg-ink/90 h-14 px-8 min-w-[200px] font-semibold ring-1 ring-[#C9A24A]/40">
            Reserve a Table
          </Button>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-[#E8C66B] transition-colors animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  const zones = [
    { name: "The Main Lounge", desc: "Warm wood, brass-lit bar and velvet booths. Where the night begins.", img: interior1Img },
    { name: "The Garden Terrace", desc: "Open-air seating under the lights, perfect for sundowners and shisha.", img: exterior2Img },
    { name: "The VVIP Suite", desc: "Private room for the few. Dedicated host, premium bottle service.", img: interior2Img },
  ];
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.4em] text-gold">The Concept</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 leading-tight">
              Where Ilesa comes <span className="gradient-gold-text">alive</span> after dark.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Lekki Lounge & Bar is a sanctuary for those who refuse the ordinary. Every detail —
              from the brass-lit bar to the tactile velvet seating — is engineered for a single
              purpose: to make the night unforgettable.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              An elite crowd. Uncompromising service. Three distinct zones, one obsidian world.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative">
              <img src={interior2Img} alt="Inside Lekki Lounge" loading="lazy" width={800} height={1024}
                className="rounded-2xl shadow-elegant w-full object-cover aspect-[4/5]" />
              <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-5 max-w-[200px] hidden md:block">
                <div className="flex items-center gap-2 text-gold mb-1">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm">"Ilesa's most refined night out."</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {zones.map((z, i) => (
            <Reveal key={z.name} delay={i * 0.1}>
              <div className="group relative h-80 rounded-2xl overflow-hidden glass-card cursor-pointer">
                <img src={z.img} alt={z.name} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="font-display text-2xl font-bold mb-2">{z.name}</h3>
                  <p className="text-sm text-muted-foreground">{z.desc}</p>
                  <div className="h-px w-12 bg-gold mt-4 group-hover:w-24 transition-all" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MENU ---------------- */
type MenuItem = { name: string; desc: string; price: number; cat: string; badge?: "Spicy" | "Popular" | "Chef's Pick"; img: string };
const MENU: MenuItem[] = [
  // Swallow & Local Specials
  { name: "Pounded Yam (Iyan) & Egusi / Efo Riro", cat: "Swallow & Local", price: 6500, desc: "Smooth pounded yam with melon-seed egusi or efo riro, loaded with assorted meat.", badge: "Popular", img: poundedyamImg },
  { name: "Amala Abula", cat: "Swallow & Local", price: 5500, desc: "Soft amala with gbegiri, ewedu and rich local stew. Choice of goat meat or bushmeat.", badge: "Chef's Pick", img: amalaImg },

  // Lounge Grills & Bites
  { name: "Smokey Party Jollof Rice", cat: "Grills & Bites", price: 5000, desc: "Wood-smoked party jollof, served with peppered chicken or fish and fried plantain.", badge: "Popular", img: jollofImg },
  { name: "Catfish Pepper Soup (Point & Kill)", cat: "Grills & Bites", price: 7500, desc: "Live catfish, intensely spiced broth, served with a side of bread or yam.", badge: "Spicy", img: peppersoupImg },
  { name: "Assorted Meat / Goat Pepper Soup", cat: "Grills & Bites", price: 4500, desc: "Slow-simmered assorted or goat meat in a fiery, herb-laced broth.", badge: "Spicy", img: peppersoupImg },
  { name: "Spicy Beef Suya & Asun Platter", cat: "Grills & Bites", price: 4000, desc: "Char-grilled beef suya and peppered goat asun with sliced onions and cabbage.", badge: "Spicy", img: suyaImg },

  // Drinks & Nightlife - Beers
  { name: "Star Lager", cat: "Drinks", price: 1500, desc: "Classic Nigerian lager. Always cold.", img: beerImg },
  { name: "Heineken", cat: "Drinks", price: 2500, desc: "Crisp Dutch import, served chilled.", img: beerImg },
  { name: "Goldberg", cat: "Drinks", price: 2000, desc: "Smooth West-styled premium lager.", img: beerImg },
  // Cocktails
  { name: "Chapman Deluxe", cat: "Drinks", price: 4500, desc: "House Chapman with Angostura, cucumber, orange and a hint of grenadine.", badge: "Popular", img: chapmanImg },
  { name: "Lekki Sunrise", cat: "Drinks", price: 4500, desc: "Vodka, passionfruit, citrus and grenadine sunrise. Bright and electric.", img: chapmanImg },

  // Premium Spirits (by bottle)
  { name: "Jameson Irish Whiskey", cat: "Premium Spirits", price: 45000, desc: "Full bottle service. Mixers and ice bucket included.", badge: "Popular", img: spiritsImg },
  { name: "Hennessy VS", cat: "Premium Spirits", price: 75000, desc: "Bottle service. Sparklers on request.", badge: "Chef's Pick", img: spiritsImg },
  { name: "Moët & Chandon Brut", cat: "Premium Spirits", price: 95000, desc: "Champagne by the bottle. Chilled, with flutes.", img: spiritsImg },

  // Shisha
  { name: "Premium Shisha Pot — Mint", cat: "Shisha Lounge", price: 6000, desc: "Crisp double-apple base with cool mint. Premium coal service.", img: shishaImg },
  { name: "Premium Shisha Pot — Blueberry", cat: "Shisha Lounge", price: 6000, desc: "Sweet, smooth blueberry blend. Long-lasting bowl.", img: shishaImg },
  { name: "Premium Shisha Pot — Apple", cat: "Shisha Lounge", price: 6000, desc: "Classic two-apple. The lounge favourite.", badge: "Popular", img: shishaImg },
  { name: "Premium Shisha Pot — Grape", cat: "Shisha Lounge", price: 6000, desc: "Rich grape with a soft finish.", img: shishaImg },
];
const CATS = ["All", "Swallow & Local", "Grills & Bites", "Drinks", "Premium Spirits", "Shisha Lounge"];

function Menu({ onAdd }: { onAdd: (name: string, price: number) => void }) {
  const [cat, setCat] = useState("All");
  const items = cat === "All" ? MENU : MENU.filter(i => i.cat === cat);

  return (
    <section id="menu" className="relative py-32 px-6 bg-cocoa text-cream">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">Curated</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 text-cream">The Menu</h2>
            <p className="text-cream/60 text-sm mt-3 max-w-xl mx-auto">From hearty Naija classics to premium bottle service — order to your table or take it home.</p>
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-5 py-2.5 rounded-full text-sm transition-all border ${
                cat === c
                  ? "bg-gold text-ink border-gold"
                  : "border-cream/20 text-cream/70 hover:border-gold/60 hover:text-cream"
              }`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={item.name} className="rounded-2xl overflow-hidden group transition-all animate-fade-up bg-[#1a130e] border border-cream/10 hover:border-gold/50 flex flex-col"
                 style={{ animationDelay: `${(i % 6) * 0.06}s` }}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={item.img} alt={item.name} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a130e] via-transparent to-transparent" />
                {item.badge && (
                  <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1 ${
                    item.badge === "Spicy" ? "bg-wine text-cream" : "bg-gold text-ink"
                  }`}>
                    {item.badge === "Spicy" ? <Flame className="w-3 h-3" /> : <Star className="w-3 h-3 fill-current" />}
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-display font-bold text-lg leading-tight text-cream">{item.name}</h3>
                  <span className="text-gold font-semibold whitespace-nowrap">{fmt(item.price)}</span>
                </div>
                <p className="text-sm text-cream/65 leading-relaxed flex-1">{item.desc}</p>
                <button
                  onClick={() => onAdd(item.name, item.price)}
                  className="mt-4 inline-flex items-center justify-center gap-2 h-10 rounded-full bg-gold/15 text-gold border border-gold/40 hover:bg-gold hover:text-ink font-semibold text-sm transition-all"
                >
                  <Plus className="w-4 h-4" /> Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- EVENTS ---------------- */
function Events() {
  const events = [
    { day: "WED", name: "Ladies Night", desc: "Complimentary cocktails for ladies until midnight. Live sax sets.", img: cocktail, accent: "neon", icon: Sparkles },
    { day: "FRI", name: "Afrobeats High", desc: "The freshest Afrobeats spun until 5 AM. The city's most beautiful crowd.", img: interior2Img, accent: "gold", icon: Flame },
    { day: "SAT", name: "Bottle Service Saturdays", desc: "Premium bottle drops, sparklers and a packed house.", img: interior1Img, accent: "neon", icon: Crown },
    { day: "SUN", name: "Brunch & Live Band", desc: "Bottomless brunch from 2 PM with a live band on the terrace.", img: exterior2Img, accent: "gold", icon: Wine },
  ];

  // simple weekly countdown to next Friday
  const [tl, setTl] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const next = new Date(now);
      const diff = (5 - now.getDay() + 7) % 7 || 7;
      next.setDate(now.getDate() + diff);
      next.setHours(22, 0, 0, 0);
      const ms = next.getTime() - now.getTime();
      const d = Math.floor(ms / 86400000);
      const h = Math.floor((ms % 86400000) / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      setTl(`${d}d ${h}h ${m}m`);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="events" className="py-32 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-gold">Weekly</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">Nightly Themes</h2>
            </div>
            <div className="glass-card rounded-xl px-5 py-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Next Afrobeats High</p>
              <p className="font-mono text-xl text-gold">{tl}</p>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((e, i) => {
            const Icon = e.icon;
            return (
              <Reveal key={e.name} delay={i * 0.08}>
                <div className="group relative h-72 rounded-2xl overflow-hidden bg-ink text-white">
                  <img src={e.img} alt={e.name} loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.45) 60%, rgba(10,10,10,0.2) 100%)" }} />
                  <div className="relative h-full p-7 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-5xl font-bold gradient-gold-text">
                        {e.day}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white border border-white/25">
                        This Week
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-[#E8C66B]" />
                        <h3 className="font-display text-2xl font-bold">{e.name}</h3>
                      </div>
                      <p className="text-white/75 text-sm">{e.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- GALLERY ---------------- */
function Gallery() {
  const imgs = [
    { src: exteriorImg, span: "row-span-2" },
    { src: interior1Img, span: "" },
    { src: interior2Img, span: "" },
    { src: exterior2Img, span: "" },
    { src: exterior3Img, span: "row-span-2" },
    { src: cocktail, span: "" },
    { src: food, span: "" },
  ];
  return (
    <section id="gallery" className="py-32 px-6 bg-cocoa text-cream">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">Visual</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 text-cream">Inside the Lounge</h2>
            <p className="text-cream/60 text-sm mt-3 max-w-xl mx-auto">Straight from our doors in Ilesa — the lights, the crowd, the late nights.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[200px] md:grid-rows-[240px] auto-rows-[200px] md:auto-rows-[240px] gap-3">
          {imgs.map((im, i) => (
            <div key={i} className={`relative overflow-hidden rounded-xl group ring-1 ring-cream/10 ${im.span}`}>
              <img src={im.src} alt="" loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors" />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/60 transition-all rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer id="contact" className="relative pt-24 pb-10 px-6 border-t border-border/40">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logoImg} alt="Lekki Lounge & Bar" className="w-10 h-10 rounded-md object-cover ring-1 ring-gold/40" />
              <span className="font-display font-bold text-lg">Lekki <span className="text-gold">Lounge</span></span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              The pinnacle of Ilesa nightlife — premium spirits, Afro-fusion cuisine and curated sound, every night.
            </p>
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-3">Newsletter</p>
              <form className="flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="you@email.com" className="bg-input/50 border-border h-11" />
                <Button className="bg-ink text-white hover:bg-ink/90 h-11">Join</Button>
              </form>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 text-gold">Visit</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gold" /> Town Planning Junction, Ogbon Egbe Street, beside Easy Make Building, Ilesa 233285, Osun State, Nigeria</li>
              <li className="flex gap-3"><Clock className="w-4 h-4 shrink-0 mt-0.5 text-gold" /> Tues–Sun · 4 PM – 5 AM</li>
              <li className="flex gap-3"><Phone className="w-4 h-4 shrink-0 mt-0.5 text-gold" /> Reservations — coming soon</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 text-gold">Follow</h4>
            <div className="flex gap-3">
              {[Instagram, Music2].map((Icon, i) => (
                <a key={i} href="#" aria-label="social"
                  className="w-10 h-10 rounded-full glass-card grid place-items-center hover:border-gold/60 hover:text-gold transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a href="#" aria-label="X / Twitter"
                className="w-10 h-10 rounded-full glass-card grid place-items-center hover:border-gold/60 hover:text-gold transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Lekki Lounge & Bar. All rights reserved.</p>
          <p>Crafted for the night.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- REVEAL ---------------- */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ animationDelay: `${delay}s` }}
      className={vis ? "animate-fade-up" : "opacity-0"}>
      {children}
    </div>
  );
}
