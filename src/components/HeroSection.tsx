import { motion } from "framer-motion";
import { Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <img
        src={heroBanner}
        alt="Cinema hall"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-bebas text-6xl tracking-wider text-foreground md:text-8xl"
        >
          THE <span className="text-gradient-gold">CINEMA</span> EXPERIENCE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground"
        >
          Discover the latest blockbusters and book your tickets in seconds.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <Link to="/showtimes">
            <Button size="lg" className="gap-2 font-semibold">
              <Ticket className="h-5 w-5" />
              Book Tickets
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
