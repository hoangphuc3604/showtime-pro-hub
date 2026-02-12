import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { movies } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const seatsPerRow = 10;
const takenSeats = ["B3", "B4", "D5", "D6", "D7", "F2", "G8", "G9"];

const Booking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "18:00";
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const movie = movies.find((m) => m.id === id);
  const [selected, setSelected] = useState<string[]>([]);

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

  const handleConfirm = () => {
    if (selected.length === 0) {
      toast({ title: "Please select at least one seat", variant: "destructive" });
      return;
    }
    toast({
      title: "Booking Confirmed!",
      description: `${movie.title} — ${date} at ${time} — Seats: ${selected.sort().join(", ")}`,
    });
    setSelected([]);
  };

  const pricePerSeat = 45000;

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
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

            <div className="mt-4 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{selected.length} × {pricePerSeat.toLocaleString()}đ</span>
                <span className="font-semibold text-primary">
                  {(selected.length * pricePerSeat).toLocaleString()}đ
                </span>
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              className="mt-6 w-full font-semibold"
              size="lg"
              disabled={selected.length === 0}
            >
              Confirm Booking
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
