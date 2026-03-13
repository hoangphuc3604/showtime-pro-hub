import Navbar from "@/components/Navbar";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { promotions } from "@/data/promotions";

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const Promotions = () => {
  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-bebas text-4xl tracking-wide text-foreground">
          Pro<span className="text-primary">motions</span>
        </h1>
        <p className="mt-1 text-muted-foreground">Don't miss out on these exclusive deals</p>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {promotions.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/promotions/${promo.id}`}
                className="group block overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-gold"
              >
                <div className="relative aspect-[350/495] overflow-hidden">
                  <img
                    src={promo.poster}
                    alt={promo.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bebas text-lg tracking-wide text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {promo.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>{formatDate(promo.start_time)} - {formatDate(promo.end_time)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promotions;
