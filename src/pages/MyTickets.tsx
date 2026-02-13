import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { movies } from "@/data/movies";
import { Search, Ticket, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BookedTicket {
  id: string;
  movieId: string;
  date: string;
  time: string;
  seats: string[];
  total: number;
  status: "confirmed" | "cancelled" | "used";
  memberCode?: string;
  promoCode?: string;
  bookedBy: "customer" | "employee";
}

// Mock data
const mockTickets: BookedTicket[] = [
  {
    id: "TK001",
    movieId: "1",
    date: "2026-02-14",
    time: "18:00",
    seats: ["D5", "D6"],
    total: 90000,
    status: "confirmed",
    bookedBy: "customer",
  },
  {
    id: "TK002",
    movieId: "3",
    date: "2026-02-13",
    time: "20:00",
    seats: ["B3", "B4", "B5"],
    total: 135000,
    status: "used",
    promoCode: "MEMBER30",
    bookedBy: "employee",
  },
  {
    id: "TK003",
    movieId: "2",
    date: "2026-02-15",
    time: "14:00",
    seats: ["F7"],
    total: 45000,
    status: "cancelled",
    bookedBy: "customer",
  },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-primary/20 text-primary",
  used: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/20 text-destructive",
};

const MyTickets = () => {
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<BookedTicket | null>(null);

  const filtered = mockTickets.filter((t) => {
    const movie = movies.find((m) => m.id === t.movieId);
    const q = search.toLowerCase();
    return (
      t.id.toLowerCase().includes(q) ||
      movie?.title.toLowerCase().includes(q) ||
      t.date.includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-bebas text-4xl tracking-wide text-foreground">
          My <span className="text-primary">Tickets</span>
        </h1>
        <p className="mt-1 text-muted-foreground">View and manage your booked tickets</p>

        {/* Search */}
        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by ticket ID, movie, or date…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Ticket List */}
        <div className="mt-6 space-y-4">
          {filtered.length === 0 && (
            <p className="text-muted-foreground">No tickets found.</p>
          )}
          {filtered.map((ticket, i) => {
            const movie = movies.find((m) => m.id === ticket.movieId);
            if (!movie) return null;
            return (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 cursor-pointer hover:border-primary/30 transition-colors"
                onClick={() => setSelectedTicket(ticket)}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-20 w-14 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bebas text-lg text-foreground truncate">{movie.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${statusColors[ticket.status]}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {ticket.date} · {ticket.time} · Seats: {ticket.seats.join(", ")}
                  </p>
                  <p className="text-xs text-muted-foreground">ID: {ticket.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{ticket.total.toLocaleString()}đ</p>
                  <p className="text-xs text-muted-foreground">
                    {ticket.bookedBy === "employee" ? "Sold by staff" : "Online booking"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ticket Detail Dialog */}
        <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-bebas text-2xl tracking-wide">Ticket Details</DialogTitle>
              <DialogDescription>Ticket ID: {selectedTicket?.id}</DialogDescription>
            </DialogHeader>
            {selectedTicket && (() => {
              const movie = movies.find((m) => m.id === selectedTicket.movieId);
              if (!movie) return null;
              return (
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <img src={movie.poster} alt={movie.title} className="h-32 w-22 rounded object-cover" />
                    <div className="space-y-1">
                      <h3 className="font-bebas text-xl text-primary">{movie.title}</h3>
                      <p className="text-sm text-muted-foreground">{movie.genre}</p>
                      <p className="text-sm">📅 {selectedTicket.date}</p>
                      <p className="text-sm">🕐 {selectedTicket.time}</p>
                      <p className="text-sm">💺 {selectedTicket.seats.sort().join(", ")}</p>
                    </div>
                  </div>
                  <div className="border-t border-border pt-3">
                    {selectedTicket.promoCode && (
                      <p className="text-sm"><span className="text-muted-foreground">Promo:</span> {selectedTicket.promoCode}</p>
                    )}
                    <div className="flex justify-between text-lg font-semibold mt-2">
                      <span>Total:</span>
                      <span className="text-primary">{selectedTicket.total.toLocaleString()}đ</span>
                    </div>
                  </div>
                  {selectedTicket.status === "confirmed" && (
                    <Button variant="destructive" className="w-full gap-2">
                      <X className="h-4 w-4" /> Cancel Ticket
                    </Button>
                  )}
                </div>
              );
            })()}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyTickets;
