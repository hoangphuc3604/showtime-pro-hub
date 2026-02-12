import { useState } from "react";
import { format, addDays } from "date-fns";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { movies } from "@/data/movies";
import { Button } from "@/components/ui/button";

const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

const Showtimes = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-bebas text-4xl tracking-wide text-foreground">
          Show<span className="text-primary">times</span>
        </h1>

        {/* Day selector */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`flex min-w-[64px] flex-col items-center rounded-lg px-4 py-3 text-sm transition-colors ${
                selectedDay === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <span className="text-xs font-medium uppercase">{format(day, "EEE")}</span>
              <span className="text-lg font-bold">{format(day, "dd")}</span>
              <span className="text-xs">{format(day, "MMM")}</span>
            </button>
          ))}
        </div>

        {/* Movie list with showtimes */}
        <div className="mt-8 space-y-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex gap-4 rounded-lg border border-border bg-card p-4"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-32 w-20 flex-shrink-0 rounded object-cover"
                />
              </Link>
              <div className="flex-1">
                <Link to={`/movie/${movie.id}`} className="font-bebas text-xl tracking-wide text-primary hover:underline">
                  {movie.title}
                </Link>
                <p className="text-xs text-muted-foreground">{movie.subtitle}</p>
                <p className="mt-1 text-xs text-muted-foreground">{movie.genre} · {movie.duration}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {movie.showtimes.map((time) => (
                    <Link key={time} to={`/booking/${movie.id}?time=${time}&date=${format(days[selectedDay], "yyyy-MM-dd")}`}>
                      <Button variant="outline" size="sm" className="min-w-[68px] text-foreground border-border hover:bg-primary hover:text-primary-foreground hover:border-primary">
                        {time}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Showtimes;
