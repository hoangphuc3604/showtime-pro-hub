import { useState, useCallback } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { movies } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tag, CreditCard } from "lucide-react";
import TicketTypeSelector, { ticketTypes } from "@/components/booking/TicketTypeSelector";
import FoodDrinksSelector, { foodItems } from "@/components/booking/FoodDrinksSelector";
import CountdownTimer from "@/components/booking/CountdownTimer";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const seatsPerRow = 6;
const takenSeats = ["B3", "B4", "D5", "D6", "F2", "G5", "G6"];
const vipRows = ["D", "E", "F"];

const promoCodes: Record<string, number> = {
  MEMBER30: 0.3,
  STUDENT20: 0.2,
  WELCOME10: 0.1,
};

const mockMembers: Record<string, { memberId: string; fullName: string; phone: string; identityCard: string; email: string; score: number }> = {
  MEM001: { memberId: "MEM001", fullName: "Tran Van Tien", phone: "0775335515", identityCard: "123456789", email: "tientran@gmail.com", score: 50000 },
  "123456789": { memberId: "MEM001", fullName: "Tran Van Tien", phone: "0775335515", identityCard: "123456789", email: "tientran@gmail.com", score: 50000 },
  MEM002: { memberId: "MEM002", fullName: "Nguyen Minh", phone: "0901234567", identityCard: "987654321", email: "minh@email.com", score: 12000 },
};

const Booking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const time = searchParams.get("time") || "18:00";
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const isEmployeeMode = searchParams.get("mode") === "employee";
  const initialMember = searchParams.get("member") || "";
  const initialPromo = searchParams.get("promo") || "";
  const movie = movies.find((m) => m.id === id);

  const [selected, setSelected] = useState<string[]>([]);
  const [ticketQty, setTicketQty] = useState<Record<string, number>>({});
  const [foodQty, setFoodQty] = useState<Record<string, number>>({});
  const [memberCode, setMemberCode] = useState(initialMember);
  const [promoCode, setPromoCode] = useState(initialPromo);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(
    initialPromo && promoCodes[initialPromo.toUpperCase()] ? initialPromo.toUpperCase() : null
  );
  const [checkedMember, setCheckedMember] = useState<typeof mockMembers[string] | null>(
    initialMember && mockMembers[initialMember] ? mockMembers[initialMember] : null
  );
  const [timerActive, setTimerActive] = useState(false);

  const handleTimerExpired = useCallback(() => {
    setSelected([]);
    setTimerActive(false);
    toast({ title: "Seat hold time expired. Please select again.", variant: "destructive" });
  }, []);

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Movie not found.</p>
      </div>
    );
  }

  const totalTickets = Object.values(ticketQty).reduce((a, b) => a + b, 0);

  const toggleSeat = (seat: string) => {
    if (takenSeats.includes(seat)) return;
    if (totalTickets === 0) {
      toast({ title: "Please select ticket type first", variant: "destructive" });
      return;
    }
    setSelected((prev) => {
      if (prev.includes(seat)) return prev.filter((s) => s !== seat);
      if (prev.length >= totalTickets) {
        toast({ title: `You can only select ${totalTickets} seat(s)`, variant: "destructive" });
        return prev;
      }
      // Start timer on first seat selection
      if (prev.length === 0) setTimerActive(true);
      return [...prev, seat];
    });
  };

  // Price calculation
  const ticketSubtotal = Object.entries(ticketQty).reduce((sum, [id, qty]) => {
    const t = ticketTypes.find((tt) => tt.id === id);
    return sum + (t ? t.price * qty : 0);
  }, 0);

  const foodSubtotal = Object.entries(foodQty).reduce((sum, [id, qty]) => {
    const f = foodItems.find((fi) => fi.id === id);
    return sum + (f ? f.price * qty : 0);
  }, 0);

  const subtotal = ticketSubtotal + foodSubtotal;
  const discountRate = appliedPromo ? promoCodes[appliedPromo] || 0 : 0;
  const discount = Math.round(ticketSubtotal * discountRate);
  const total = subtotal - discount;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (promoCodes[code]) {
      setAppliedPromo(code);
      toast({ title: `Promo "${code}" applied! (${promoCodes[code] * 100}% off)` });
    } else {
      toast({ title: "Invalid promo code", variant: "destructive" });
    }
  };

  const handleCheckMember = () => {
    const code = memberCode.trim();
    const member = mockMembers[code];
    if (member) {
      setCheckedMember(member);
      toast({ title: `Member found: ${member.fullName}` });
    } else {
      setCheckedMember(null);
      toast({ title: "No member found!", variant: "destructive" });
    }
  };

  // handleTimerExpired defined above early return

  const handleContinue = () => {
    if (totalTickets === 0) {
      toast({ title: "Please select ticket type", variant: "destructive" });
      return;
    }
    if (selected.length < totalTickets) {
      toast({ title: `Please select ${totalTickets - selected.length} more seat(s)`, variant: "destructive" });
      return;
    }

    const selectedFood = Object.entries(foodQty)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = foodItems.find((f) => f.id === id)!;
        return { name: item.name, qty, price: item.price };
      });

    const selectedTickets = Object.entries(ticketQty)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const t = ticketTypes.find((tt) => tt.id === id)!;
        return { name: `${t.name} (${t.category})`, qty, price: t.price };
      });

    const bookingData = {
      movieTitle: movie.title,
      poster: movie.poster,
      genre: movie.genre,
      date,
      time,
      screen: "Scrn02",
      seats: selected.sort(),
      tickets: selectedTickets,
      food: selectedFood,
      ticketSubtotal,
      foodSubtotal,
      promoCode: appliedPromo || undefined,
      memberCode: checkedMember?.memberId || undefined,
      discount,
      total,
      bookingId: `TK${Date.now().toString().slice(-6)}`,
      memberInfo: checkedMember || undefined,
      isEmployeeMode,
    };
    navigate("/booking-confirmation", { state: bookingData });
  };

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {isEmployeeMode && (
          <div className="mb-4 rounded-md bg-primary/10 border border-primary/30 px-4 py-2 text-sm text-primary">
            🏢 Employee Mode — Selling ticket for walk-in customer
          </div>
        )}

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left: Main Content */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 space-y-8">
            <div>
              <h1 className="font-bebas text-3xl tracking-wide text-foreground">Book Tickets</h1>
              <p className="text-sm text-muted-foreground">{movie.title} · {date} · {time}</p>
            </div>

            {/* Timer removed from here - now in booking summary */}

            {/* 1. Ticket Type Selection */}
            <TicketTypeSelector quantities={ticketQty} onChange={(q) => { setTicketQty(q); setSelected([]); setTimerActive(false); }} />

            {/* 2. Seat Map */}
            <div>
              <h2 className="font-bebas text-2xl tracking-wide text-foreground mb-1">Select Your Seats</h2>
              {totalTickets > 0 && (
                <p className="text-xs text-muted-foreground mb-4">
                  Select {totalTickets} seat(s) · {selected.length}/{totalTickets} selected
                </p>
              )}

              {/* Screen */}
              <div className="mx-auto mt-2 mb-4 h-2 w-3/4 rounded-full bg-primary/40" />
              <p className="mb-4 text-center text-xs uppercase tracking-widest text-muted-foreground">Screen</p>

              <div className="flex flex-col items-center gap-2 overflow-x-auto py-2">
                {rows.map((row) => (
                  <div key={row} className="flex items-center gap-2">
                    <span className="w-6 text-sm font-medium text-muted-foreground">{row}</span>
                    {Array.from({ length: seatsPerRow }, (_, i) => {
                      const seat = `${row}${i + 1}`;
                      const seatLabel = `${i + 1}${row}`;
                      const isTaken = takenSeats.includes(seat);
                      const isSelected = selected.includes(seat);
                      const isVip = vipRows.includes(row);
                      return (
                        <button
                          key={seat}
                          onClick={() => toggleSeat(seat)}
                          disabled={isTaken}
                          className={`h-11 w-11 rounded-t-lg text-xs font-semibold transition-colors ${
                            isTaken
                              ? "cursor-not-allowed bg-muted text-muted-foreground/40"
                              : isSelected
                              ? "bg-primary text-primary-foreground"
                              : isVip
                              ? "bg-accent/30 text-accent-foreground hover:bg-accent/50 ring-1 ring-accent/30"
                              : "bg-secondary text-secondary-foreground hover:bg-primary/30"
                          }`}
                        >
                          {seatLabel}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1"><span className="inline-block h-4 w-4 rounded-t-md bg-primary" /> Selected</span>
                <span className="flex items-center gap-1"><span className="inline-block h-4 w-4 rounded-t-md bg-muted" /> Taken</span>
                <span className="flex items-center gap-1"><span className="inline-block h-4 w-4 rounded-t-md bg-secondary" /> Available</span>
                <span className="flex items-center gap-1"><span className="inline-block h-4 w-4 rounded-t-md bg-accent/30 ring-1 ring-accent/30" /> VIP</span>
              </div>
            </div>

            {/* 3. Food & Drinks */}
            <FoodDrinksSelector quantities={foodQty} onChange={setFoodQty} />
          </motion.div>

          {/* Right: Sticky Booking Summary */}
          <div className="w-full lg:max-w-sm">
            <div className="lg:sticky lg:top-20">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h2 className="font-bebas text-2xl tracking-wide text-foreground">Booking Summary</h2>
                <CountdownTimer durationSeconds={300} onExpired={handleTimerExpired} active={timerActive} />
                <div className="mt-4 flex gap-4">
                  <img src={movie.poster} alt={movie.title} className="h-28 w-20 rounded object-cover" />
                  <div>
                    <h3 className="font-bebas text-lg text-primary">{movie.title}</h3>
                    <p className="text-xs text-muted-foreground">{movie.genre}</p>
                    <p className="mt-2 text-sm text-foreground">📅 {date}</p>
                    <p className="text-sm text-foreground">🕐 {time}</p>
                  </div>
                </div>

                {/* Tickets */}
                {Object.entries(ticketQty).filter(([,q]) => q > 0).length > 0 && (
                  <div className="mt-4 border-t border-border pt-3 space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Tickets</p>
                    {Object.entries(ticketQty).filter(([,q]) => q > 0).map(([id, qty]) => {
                      const t = ticketTypes.find((tt) => tt.id === id)!;
                      return (
                        <div key={id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t.name} ({t.category}) x{qty}</span>
                          <span className="text-foreground">{(t.price * qty).toLocaleString()}đ</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Seats */}
                <div className="mt-3 border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground font-medium">Seats</p>
                  <p className="text-sm text-foreground">{selected.length > 0 ? selected.sort().join(", ") : "None selected"}</p>
                  {totalTickets > 0 && selected.length < totalTickets && (
                    <p className="text-xs text-accent mt-1">Select {totalTickets - selected.length} more seat(s)</p>
                  )}
                </div>

                {/* Food */}
                {Object.entries(foodQty).filter(([,q]) => q > 0).length > 0 && (
                  <div className="mt-3 border-t border-border pt-3 space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Food & Drinks</p>
                    {Object.entries(foodQty).filter(([,q]) => q > 0).map(([id, qty]) => {
                      const f = foodItems.find((fi) => fi.id === id)!;
                      return (
                        <div key={id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{f.name} x{qty}</span>
                          <span className="text-foreground">{(f.price * qty).toLocaleString()}đ</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Member & Promo */}
                <div className="mt-3 border-t border-border pt-3 space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <CreditCard className="h-3 w-3" /> {isEmployeeMode ? "Member ID / Identity Card" : "Member Code"}
                    </Label>
                    <div className="mt-1 flex gap-2">
                      <Input value={memberCode} onChange={(e) => setMemberCode(e.target.value)} placeholder="Enter code" className="h-8 text-sm" />
                      <Button size="sm" variant="secondary" onClick={handleCheckMember} className="h-8 text-xs">Check</Button>
                    </div>
                    {checkedMember && (
                      <div className="mt-2 rounded-md bg-secondary/50 p-2 text-xs space-y-0.5">
                        <p><span className="text-muted-foreground">Name:</span> <span className="text-foreground">{checkedMember.fullName}</span></p>
                        <p><span className="text-muted-foreground">Score:</span> <span className="text-primary font-semibold">{checkedMember.score.toLocaleString()}</span></p>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <Tag className="h-3 w-3" /> Promo Code
                    </Label>
                    <div className="mt-1 flex gap-2">
                      <Input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="e.g. MEMBER30" className="h-8 text-sm" />
                      <Button size="sm" variant="secondary" onClick={handleApplyPromo} className="h-8 text-xs">Apply</Button>
                    </div>
                    {appliedPromo && (
                      <p className="mt-1 text-xs text-primary">✓ {appliedPromo} ({discountRate * 100}% off)</p>
                    )}
                  </div>
                </div>

                {/* Totals */}
                <div className="mt-3 border-t border-border pt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tickets</span>
                    <span className="text-foreground">{ticketSubtotal.toLocaleString()}đ</span>
                  </div>
                  {foodSubtotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Food & Drinks</span>
                      <span className="text-foreground">{foodSubtotal.toLocaleString()}đ</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-accent">-{discount.toLocaleString()}đ</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold border-t border-border pt-2 mt-2">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">{total.toLocaleString()}đ</span>
                  </div>
                </div>

                <Button onClick={handleContinue} className="mt-6 w-full font-semibold" size="lg" disabled={selected.length === 0}>
                  {isEmployeeMode ? "→ Continue" : "→ Continue"}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
