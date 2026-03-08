import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, ArrowLeft, Ticket } from "lucide-react";

interface BookingData {
  movieTitle: string;
  poster: string;
  genre: string;
  date: string;
  time: string;
  screen?: string;
  seats: string[];
  pricePerSeat: number;
  promoCode?: string;
  memberCode?: string;
  discount: number;
  total: number;
  bookingId: string;
  isEmployeeMode?: boolean;
  memberInfo?: {
    memberId: string;
    fullName: string;
    phone: string;
    identityCard: string;
    email: string;
    score: number;
  };
}

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rawBooking = location.state as Partial<BookingData> | null;
  const booking: BookingData | null = rawBooking ? {
    movieTitle: rawBooking.movieTitle ?? "Unknown",
    poster: rawBooking.poster ?? "",
    genre: rawBooking.genre ?? "",
    date: rawBooking.date ?? "",
    time: rawBooking.time ?? "",
    screen: rawBooking.screen,
    seats: rawBooking.seats ?? [],
    pricePerSeat: rawBooking.pricePerSeat ?? 0,
    promoCode: rawBooking.promoCode,
    memberCode: rawBooking.memberCode,
    discount: rawBooking.discount ?? 0,
    total: rawBooking.total ?? 0,
    bookingId: rawBooking.bookingId ?? "",
    isEmployeeMode: rawBooking.isEmployeeMode,
    memberInfo: rawBooking.memberInfo,
  } : null;
  const [confirmed, setConfirmed] = useState(false);
  const [convertToTicket, setConvertToTicket] = useState("disagree");

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-cinema">
        <Navbar />
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">No booking data found.</p>
            <Link to="/">
              <Button variant="outline" className="mt-4">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const scoreForConverting = convertToTicket === "agree" && booking.memberInfo
    ? booking.total
    : 0;

  const finalTotal = booking.total - scoreForConverting;

  const handleConfirm = () => {
    if (convertToTicket === "agree" && booking.memberInfo && booking.memberInfo.score < scoreForConverting) {
      toast({ title: "Member score is not enough to convert into ticket", variant: "destructive" });
      return;
    }
    setConfirmed(true);
    toast({ title: confirmed ? "Already confirmed" : "Booking confirmed successfully!" });
  };

  if (confirmed) {
    // ─── Ticket Information Screen (post-confirm) ───
    return (
      <div className="min-h-screen bg-gradient-cinema">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl">
            <div className="mb-6 flex flex-col items-center text-center">
              <CheckCircle className="h-16 w-16 text-primary" />
              <h1 className="mt-4 font-bebas text-4xl tracking-wide text-foreground">TICKET INFORMATION</h1>
              <p className="text-sm text-muted-foreground">Booking ID: {booking.bookingId}</p>
            </div>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="p-6">
                <div className="flex gap-5">
                  <img src={booking.poster} alt={booking.movieTitle} className="h-40 w-28 rounded object-cover" />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bebas text-xl text-primary">{booking.movieTitle}</h3>
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                      <span className="font-medium text-muted-foreground">Screen:</span>
                      <span className="text-foreground">{booking.screen || "Scrn02"}</span>
                      <span className="font-medium text-muted-foreground">Date:</span>
                      <span className="text-foreground">{booking.date}</span>
                      <span className="font-medium text-muted-foreground">Time:</span>
                      <span className="text-foreground">{booking.time}</span>
                      <span className="font-medium text-muted-foreground">Seat:</span>
                      <span className="text-foreground">{booking.seats.join(" ")}</span>
                    </div>
                    <div className="mt-2 text-sm">
                      <p className="text-muted-foreground">Price:</p>
                      {booking.seats.map((seat) => (
                        <p key={seat} className="text-foreground ml-2">{seat}: {booking.pricePerSeat.toLocaleString()}</p>
                      ))}
                    </div>
                    {scoreForConverting > 0 && (
                      <p className="text-sm"><span className="text-muted-foreground">Score for ticket converting:</span> <span className="text-primary">{scoreForConverting.toLocaleString()}</span></p>
                    )}
                    <p className="text-lg font-semibold"><span className="text-muted-foreground">Total:</span> <span className="text-primary">{finalTotal.toLocaleString()}đ</span></p>
                  </div>
                </div>

                {booking.memberInfo && (
                  <div className="mt-4 border-t border-border pt-4">
                    <h4 className="font-bebas text-lg text-foreground">{booking.isEmployeeMode ? "Member" : "Booking ticket information"}</h4>
                    <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                      <span className="text-muted-foreground">Member ID:</span><span className="text-foreground">{booking.memberInfo.memberId}</span>
                      <span className="text-muted-foreground">Full name:</span><span className="text-foreground">{booking.memberInfo.fullName}</span>
                      <span className="text-muted-foreground">Identity card:</span><span className="text-foreground">{booking.memberInfo.identityCard}</span>
                      <span className="text-muted-foreground">Phone number:</span><span className="text-foreground">{booking.memberInfo.phone}</span>
                    </div>
                  </div>
                )}

                {!booking.isEmployeeMode && (
                  <div className="mt-4 rounded-md bg-accent/10 border border-accent/20 p-3 text-sm text-accent">
                    Please pick up the ticket 30 minutes before the show. After that time ticket will automatically cancel.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to Home
                </Button>
              </Link>
              <Link to="/my-tickets" className="flex-1">
                <Button className="w-full gap-2">
                  <Ticket className="h-4 w-4" /> View My Tickets
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── Confirm Booking Screen ───
  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl">
          <h1 className="text-center font-bebas text-3xl tracking-wide text-foreground mb-6">
            {booking.isEmployeeMode ? "CONFIRM BOOKING TICKET" : "CONFIRM BOOKING TICKET"}
          </h1>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex gap-5">
              <img src={booking.poster} alt={booking.movieTitle} className="h-40 w-28 rounded object-cover" />
              <div className="flex-1 space-y-2">
                <h3 className="font-bebas text-xl text-primary">{booking.movieTitle}</h3>
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                  <span className="font-medium text-muted-foreground">Screen:</span>
                  <span className="text-foreground">{booking.screen || "Scrn02"}</span>
                  <span className="font-medium text-muted-foreground">Date:</span>
                  <span className="text-foreground">{booking.date}</span>
                  <span className="font-medium text-muted-foreground">Time:</span>
                  <span className="text-foreground">{booking.time}</span>
                  <span className="font-medium text-muted-foreground">Seat:</span>
                  <span className="text-foreground">{booking.seats.join(" ")}</span>
                </div>
                <div className="mt-2 text-sm">
                  <p className="text-muted-foreground">Price:</p>
                  {booking.seats.map((seat) => (
                    <p key={seat} className="text-foreground ml-2">{seat}: {booking.pricePerSeat.toLocaleString()}</p>
                  ))}
                </div>
                <p className="text-lg font-semibold"><span className="text-muted-foreground">Total:</span> <span className="text-primary">{booking.total.toLocaleString()}đ</span></p>
              </div>
            </div>

            {/* Member Section */}
            {booking.memberInfo ? (
              <div className="mt-4 border-t border-border pt-4">
                <h4 className="font-bebas text-lg text-foreground">Member</h4>
                <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                  <span className="text-muted-foreground">Member ID:</span><span className="text-foreground">{booking.memberInfo.memberId}</span>
                  <span className="text-muted-foreground">Identity Card:</span><span className="text-foreground">{booking.memberInfo.identityCard}</span>
                  <span className="text-muted-foreground">Full name:</span><span className="text-foreground">{booking.memberInfo.fullName}</span>
                  <span className="text-muted-foreground">Phone number:</span><span className="text-foreground">{booking.memberInfo.phone}</span>
                  <span className="text-muted-foreground">Score:</span><span className="text-primary font-semibold">{booking.memberInfo.score.toLocaleString()}</span>
                </div>
                <div className="mt-3">
                  <Label className="text-sm">Convert to ticket:</Label>
                  <RadioGroup value={convertToTicket} onValueChange={setConvertToTicket} className="mt-1 flex gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="agree" id="cv-agree" />
                      <Label htmlFor="cv-agree" className="font-normal">Agree</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="disagree" id="cv-disagree" />
                      <Label htmlFor="cv-disagree" className="font-normal">Disagree</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            ) : !booking.isEmployeeMode ? (
              <div className="mt-4 border-t border-border pt-4">
                <h4 className="font-bebas text-lg text-foreground">Check your booking ticket information</h4>
                <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                  <span className="text-muted-foreground">Full name:</span><span className="text-foreground">Member User</span>
                  <span className="text-muted-foreground">Email:</span><span className="text-foreground">user@email.com</span>
                  <span className="text-muted-foreground">Identity card:</span><span className="text-foreground">—</span>
                  <span className="text-muted-foreground">Phone number:</span><span className="text-foreground">—</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="outline" className="flex-1 gap-2" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button className="flex-1 font-semibold" onClick={handleConfirm}>
              Confirm booking ticket
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
