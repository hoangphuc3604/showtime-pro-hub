import Navbar from "@/components/Navbar";
import { Tag, Percent, Gift } from "lucide-react";
import { motion } from "framer-motion";

const promos = [
  {
    title: "Member Monday",
    description: "All members get 30% off tickets every Monday.",
    icon: Percent,
  },
  {
    title: "Student Discount",
    description: "Show your student ID and enjoy 20% off any showtime.",
    icon: Tag,
  },
  {
    title: "Birthday Special",
    description: "Free popcorn combo on your birthday month with membership.",
    icon: Gift,
  },
];

const Promotions = () => {
  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-bebas text-4xl tracking-wide text-foreground">
          Pro<span className="text-primary">motions</span>
        </h1>
        <p className="mt-1 text-muted-foreground">Don't miss out on these exclusive deals</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {promos.map((promo, i) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <promo.icon className="h-10 w-10 text-primary" />
              <h3 className="mt-4 font-bebas text-2xl tracking-wide text-foreground">{promo.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{promo.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promotions;
