import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { movies } from "@/data/movies";
import { toast } from "@/hooks/use-toast";
import { Search, Ticket, Users, ShoppingCart, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

// Mock members
const mockMembers = [
  { id: "MEM001", name: "Tran Van Tien", phone: "0775335515", email: "tien@email.com", idCard: "123456789" },
  { id: "MEM002", name: "Nguyen Minh", phone: "0901234567", email: "minh@email.com", idCard: "987654321" },
  { id: "MEM003", name: "Le Hoang", phone: "0912345678", email: "hoang@email.com", idCard: "456789123" },
];

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [memberSearch, setMemberSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [memberCode, setMemberCode] = useState("");
  const [promoCode, setPromoCode] = useState("");

  const filteredMembers = mockMembers.filter((m) => {
    const q = memberSearch.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.phone.includes(q) ||
      m.id.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q)
    );
  });

  const movie = movies.find((m) => m.id === selectedMovie);

  const handleSellTicket = () => {
    if (!selectedMovie || !selectedTime) {
      toast({ title: "Please select a movie and time", variant: "destructive" });
      return;
    }
    navigate(`/booking/${selectedMovie}?time=${selectedTime}&mode=employee&member=${memberCode}&promo=${promoCode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-bebas text-4xl tracking-wide text-foreground">
          Employee <span className="text-primary">Dashboard</span>
        </h1>
        <p className="mt-1 text-muted-foreground">Manage ticket sales, bookings, and members</p>

        <Tabs defaultValue="sell" className="mt-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="sell" className="gap-2">
              <ShoppingCart className="h-4 w-4" /> Sell Tickets
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2">
              <Ticket className="h-4 w-4" /> Manage Bookings
            </TabsTrigger>
            <TabsTrigger value="members" className="gap-2">
              <Users className="h-4 w-4" /> Search Members
            </TabsTrigger>
          </TabsList>

          {/* Sell Tickets Tab */}
          <TabsContent value="sell">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 grid gap-6 lg:grid-cols-2"
            >
              <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h2 className="font-bebas text-xl tracking-wide text-foreground">Ticket Sale</h2>

                <div>
                  <Label>Movie</Label>
                  <Select value={selectedMovie} onValueChange={setSelectedMovie}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a movie" />
                    </SelectTrigger>
                    <SelectContent>
                      {movies.map((m) => (
                        <SelectItem key={m.id} value={m.id}>{m.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {movie && (
                  <div>
                    <Label>Showtime</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {movie.showtimes.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Customer Name</Label>
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Walk-in customer"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Optional"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Member Code</Label>
                    <Input
                      value={memberCode}
                      onChange={(e) => setMemberCode(e.target.value)}
                      placeholder="e.g. MEM001"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Promo Code</Label>
                    <Input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. MEMBER30"
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button onClick={handleSellTicket} className="w-full gap-2 font-semibold" size="lg">
                  <Plus className="h-4 w-4" /> Proceed to Seat Selection
                </Button>
              </div>

              {/* Quick Info */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="font-bebas text-xl tracking-wide text-foreground">Quick Stats</h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[
                    { label: "Today's Sales", value: "32", sub: "tickets" },
                    { label: "Revenue", value: "1,440,000đ", sub: "today" },
                    { label: "Upcoming Shows", value: "8", sub: "next 3 hours" },
                    { label: "Active Members", value: "156", sub: "total" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-md bg-secondary/50 p-4">
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="font-bebas text-2xl text-primary">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Manage Bookings Tab */}
          <TabsContent value="bookings">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-bebas text-xl tracking-wide text-foreground">Recent Bookings</h2>
                  <Input placeholder="Search bookings…" className="max-w-xs" />
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="pb-2 pr-4">ID</th>
                        <th className="pb-2 pr-4">Movie</th>
                        <th className="pb-2 pr-4">Date/Time</th>
                        <th className="pb-2 pr-4">Seats</th>
                        <th className="pb-2 pr-4">Total</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: "TK001", movie: "Stellar Odyssey", dt: "2026-02-14 18:00", seats: "D5, D6", total: "90,000đ", status: "confirmed" },
                        { id: "TK002", movie: "The Darkening", dt: "2026-02-13 20:00", seats: "B3, B4, B5", total: "135,000đ", status: "used" },
                        { id: "TK003", movie: "Midnight in Paris", dt: "2026-02-15 14:00", seats: "F7", total: "45,000đ", status: "cancelled" },
                      ].map((b) => (
                        <tr key={b.id} className="border-b border-border/50">
                          <td className="py-3 pr-4 text-foreground">{b.id}</td>
                          <td className="py-3 pr-4 text-foreground">{b.movie}</td>
                          <td className="py-3 pr-4 text-muted-foreground">{b.dt}</td>
                          <td className="py-3 pr-4 text-foreground">{b.seats}</td>
                          <td className="py-3 pr-4 text-primary font-semibold">{b.total}</td>
                          <td className="py-3">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${
                              b.status === "confirmed" ? "bg-primary/20 text-primary" :
                              b.status === "used" ? "bg-muted text-muted-foreground" :
                              "bg-destructive/20 text-destructive"
                            }`}>{b.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Search Members Tab */}
          <TabsContent value="members">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="font-bebas text-xl tracking-wide text-foreground">Member Search</h2>
                <div className="relative mt-4 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, phone, ID, or email…"
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="mt-4 space-y-3">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between rounded-md border border-border/50 bg-secondary/30 p-4"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.id} · {member.phone} · {member.email}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setMemberCode(member.id);
                          toast({ title: `Member ${member.id} selected` });
                        }}
                      >
                        Use for Sale
                      </Button>
                    </div>
                  ))}
                  {filteredMembers.length === 0 && (
                    <p className="text-muted-foreground">No members found.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
