import { useParams, Link } from "react-router-dom";
import { Clock, Calendar, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { movies } from "@/data/movies";
import { Button } from "@/components/ui/button";

const MovieDetail = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Movie not found.</p>
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
          className="flex flex-col gap-8 md:flex-row"
        >
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-auto w-full max-w-xs rounded-lg shadow-cinema self-start"
          />
          <div className="flex-1">
            <h1 className="font-bebas text-5xl tracking-wide text-foreground">{movie.title}</h1>
            <p className="text-lg text-primary">{movie.subtitle}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="rounded bg-primary px-2 py-0.5 font-semibold text-primary-foreground">{movie.rating}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {movie.duration}</span>
              <span>{movie.genre}</span>
            </div>
            <p className="mt-6 leading-relaxed text-secondary-foreground">{movie.description}</p>

            <div className="mt-8">
              <h3 className="font-bebas text-xl tracking-wide text-foreground">Available Times Today</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {movie.showtimes.map((time) => (
                  <Link key={time} to={`/booking/${movie.id}?time=${time}`}>
                    <Button variant="outline" size="sm" className="min-w-[68px] text-foreground border-border hover:bg-primary hover:text-primary-foreground hover:border-primary">
                      {time}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/showtimes" className="mt-8 inline-block">
              <Button size="lg" className="gap-2 font-semibold">
                <Ticket className="h-5 w-5" />
                View All Showtimes
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MovieDetail;
