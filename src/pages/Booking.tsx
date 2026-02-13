import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { movies } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tag, CreditCard } from "lucide-react";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const seatsPerRow = 10;
const takenSeats = ["B3", "B4", "D5", "D6", "D7", "F2", "G8", "G9"];

const promoCodes: Record<string, number> = {
  MEMBER30: 0.3,
  STUDENT20: 0.2,
  WELCOME10: 0.1,
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
  const [memberCode, setMemberCode] = useState(initialMember);
  const [promoCode, setPromoCode] = useState(initialPromo);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(
    initialPromo && promoCodes[initialPromo.toUpperCase()] ? initialPromo.toUpperCase() : null
  );

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Movie not found.</p>
      </div>
    );
  }

  const toggleSeat = (seat: string) => {
    if (takenSeats.includes(seat)) return;
    setSelected((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const pricePerSeat = 45000;
  const subtotal = selected.length * pricePerSeat;
  const discountRate = appliedPromo ? promoCodes[appliedPromo] || 0 : 0;
  const discount = Math.round(subtotal * discountRate);
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

  const handleConfirm = () => {
    if (selected.length === 0) {
      toast({ title: "Please select at least one seat", variant: "destructive" });
      return;
    }
    const bookingData = {
      movieTitle: movie.title,
      poster: movie.poster,
      genre: movie.genre,
      date,
      time,
      seats: selected.sort(),
      pricePerSeat,
      promoCode: appliedPromo || undefined,
      memberCode: memberCode || undefined,
      discount,
      total,
      bookingId: `TK${Date.now().toString().slice(-6)}`,
      memberInfo: memberCode
        ? { memberId: memberCode, fullName: "Member User", phone: "0901234567" }
        : undefined,
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
          {/* Seat Map */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1"
          >
            <h1 className="font-bebas text-3xl tracking-wide text-foreground">Select Your Seats</h1>
            <p className="text-sm text-muted-foreground">{movie.title} · {date} · {time}</p>

            {/* Screen */}
            <div className="mx-auto mt-8 mb-6 h-2 w-3/4 rounded-full bg-primary/40" />
            <p className="mb-4 text-center text-xs uppercase tracking-widest text-muted-foreground">Screen</p>

            <div className="flex flex-col items-center gap-2">
              {rows.map((row) => (
                <div key={row} className="flex items-center gap-1">
                  <span className="w-5 text-xs text-muted-foreground">{row}</span>
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seat = `${row}${i + 1}`;
                    const isTaken = takenSeats.includes(seat);
                    const isSelected = selected.includes(seat);
                    return (
                      <button
                        key={seat}
                        onClick={() => toggleSeat(seat)}
                        disabled={isTaken}
                        className={`h-7 w-7 rounded-t-md text-[10px] font-medium transition-colors ${
                          isTaken
                            ? "cursor-not-allowed bg-muted text-muted-foreground/40"
                            : isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-primary/30"
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="inline-block h-4 w-4 rounded-t-md bg-secondary" /> Available</span>
              <span className="flex items-center gap-1"><span className="inline-block h-4 w-4 rounded-t-md bg-primary" /> Selected</span>
              <span className="flex items-center gap-1"><span className="inline-block h-4 w-4 rounded-t-md bg-muted" /> Taken</span>
            </div>
          </motion.div>

          {/* Booking Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full rounded-lg border border-border bg-card p-6 lg:max-w-sm"
          >
            <h2 className="font-bebas text-2xl tracking-wide text-foreground">Booking Summary</h2>
            <div className="mt-4 flex gap-4">
              <img src={movie.poster} alt={movie.title} className="h-28 w-20 rounded object-cover" />
              <div>
                <h3 className="font-bebas text-lg text-primary">{movie.title}</h3>
                <p className="text-xs text-muted-foreground">{movie.genre}</p>
                <p className="mt-2 text-sm text-foreground">📅 {date}</p>
                <p className="text-sm text-foreground">🕐 {time}</p>
              </div>
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">Seats</p>
              <p className="text-foreground">{selected.length > 0 ? selected.sort().join(", ") : "None selected"}</p>
            </div>

            {/* Promo / Member Code */}
            <div className="mt-4 border-t border-border pt-4 space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <CreditCard className="h-3 w-3" /> Member Code
                </Label>
                <Input
                  value={memberCode}
                  onChange={(e) => setMemberCode(e.target.value)}
                  placeholder="Enter member code"
                  className="mt-1 h-8 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Tag className="h-3 w-3" /> Promo Code
                </Label>
                <div className="mt-1 flex gap-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. MEMBER30"
                    className="h-8 text-sm"
                  />
                  <Button size="sm" variant="secondary" onClick={handleApplyPromo} className="h-8 text-xs">
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <p className="mt-1 text-xs text-primary">✓ {appliedPromo} ({discountRate * 100}% off)</p>
                )}
              </div>
            </div>

            <div className="mt-4 border-t border-border pt-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{selected.length} × {pricePerSeat.toLocaleString()}đ</span>
                <span className="text-foreground">{subtotal.toLocaleString()}đ</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-accent">-{discount.toLocaleString()}đ</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">{total.toLocaleString()}đ</span>
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              className="mt-6 w-full font-semibold"
              size="lg"
              disabled={selected.length === 0}
            >
              {isEmployeeMode ? "Sell Ticket" : "Confirm Booking"}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
