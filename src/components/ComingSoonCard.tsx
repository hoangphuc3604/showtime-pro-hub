import { Link } from "react-router-dom";
import { Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import type { ComingSoonMovie } from "@/data/movies";

interface ComingSoonCardProps {
  movie: ComingSoonMovie;
  index: number;
}

const ComingSoonCard = ({ movie, index }: ComingSoonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/movie/${movie.id}`}
        className="group block overflow-hidden rounded-lg bg-gradient-card transition-all hover:shadow-gold"
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

          {/* Release date ribbon */}
          <div className="absolute top-0 right-0">
            <div className="relative bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-lg">
              <Calendar className="mr-1 inline-block h-3 w-3" />
              {movie.releaseDate}
              <div className="absolute bottom-0 left-0 h-0 w-0 border-t-[6px] border-l-[6px] border-t-transparent border-l-accent opacity-60" />
            </div>
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="rounded bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              {movie.rating}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bebas text-xl tracking-wide text-foreground">{movie.title}</h3>
          <p className="text-sm text-muted-foreground">{movie.genre}</p>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {movie.duration}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ComingSoonCard;
