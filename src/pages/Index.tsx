import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MovieCard from "@/components/MovieCard";
import ComingSoonCard from "@/components/ComingSoonCard";
import { movies, comingSoonMovies } from "@/data/movies";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <HeroSection />

      <section className="container mx-auto px-4 py-16">
        <h2 className="font-bebas text-4xl tracking-wide text-foreground">
          Now <span className="text-primary">Showing</span>
        </h2>
        <p className="mt-1 text-muted-foreground">Grab your seat for the hottest films</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="font-bebas text-4xl tracking-wide text-foreground">
          Coming <span className="text-accent">Soon</span>
        </h2>
        <p className="mt-1 text-muted-foreground">Get ready for the next blockbusters</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {comingSoonMovies.map((movie, i) => (
            <ComingSoonCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 CineGold. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
