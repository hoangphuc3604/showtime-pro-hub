import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle, Printer, ArrowLeft } from "lucide-react";

interface BookingData {
  movieTitle: string;
  poster: string;
  genre: string;
  date: string;
  time: string;
  seats: string[];
  pricePerSeat: number;
  promoCode?: string;
  memberCode?: string;
  discount: number;
  total: number;
  bookingId: string;
  memberInfo?: {
    memberId: string;
    fullName: string;
    phone: string;
  };
}

const BookingConfirmation = () => {
  const location = useLocation();
  const booking = location.state as BookingData | null;

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

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl"
        >
          {/* Success Header */}
          <div className="mb-6 flex flex-col items-center text-center">
            <CheckCircle className="h-16 w-16 text-primary" />
            <h1 className="mt-4 font-bebas text-4xl tracking-wide text-foreground">
              Booking Confirmed!
            </h1>
            <p className="text-sm text-muted-foreground">Booking ID: {booking.bookingId}</p>
          </div>

          {/* Ticket Information Card */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="border-b border-border bg-secondary/50 px-6 py-3">
              <h2 className="font-bebas text-xl tracking-wide text-foreground text-center">
                TICKET INFORMATION
              </h2>
            </div>

            <div className="p-6">
              <div className="flex gap-5">
                <img
                  src={booking.poster}
                  alt={booking.movieTitle}
                  className="h-40 w-28 rounded object-cover"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="font-bebas text-xl text-primary">{booking.movieTitle}</h3>
                  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                    <span className="font-medium text-muted-foreground">Date:</span>
                    <span className="text-foreground">{booking.date}</span>
                    <span className="font-medium text-muted-foreground">Time:</span>
                    <span className="text-foreground">{booking.time}</span>
                    <span className="font-medium text-muted-foreground">Seats:</span>
                    <span className="text-foreground">{booking.seats.sort().join(", ")}</span>
                    <span className="font-medium text-muted-foreground">Price:</span>
                    <div className="text-foreground">
                      {booking.seats.map((seat) => (
                        <div key={seat}>
                          {seat}: {booking.pricePerSeat.toLocaleString()}đ
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Discount & Total */}
              <div className="mt-4 space-y-2 border-t border-border pt-4">
                {booking.promoCode && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Promo Code:</span>
                    <span className="text-primary">{booking.promoCode}</span>
                  </div>
                )}
                {booking.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="text-accent">-{booking.discount.toLocaleString()}đ</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total:</span>
                  <span className="text-primary">{booking.total.toLocaleString()}đ</span>
                </div>
              </div>

              {/* Member Info */}
              {booking.memberInfo && (
                <div className="mt-4 border-t border-border pt-4">
                  <h4 className="font-bebas text-lg text-primary">Member</h4>
                  <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                    <span className="font-medium text-muted-foreground">Member ID:</span>
                    <span className="text-foreground">{booking.memberInfo.memberId}</span>
                    <span className="font-medium text-muted-foreground">Full Name:</span>
                    <span className="text-foreground">{booking.memberInfo.fullName}</span>
                    <span className="font-medium text-muted-foreground">Phone:</span>
                    <span className="text-foreground">{booking.memberInfo.phone}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Button>
            </Link>
            <Link to="/my-tickets" className="flex-1">
              <Button className="w-full gap-2">
                <Printer className="h-4 w-4" /> View My Tickets
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
