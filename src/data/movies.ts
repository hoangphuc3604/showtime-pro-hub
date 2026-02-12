import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/movie-4.jpg";
import movie5 from "@/assets/movie-5.jpg";

export interface Movie {
  id: string;
  title: string;
  subtitle: string;
  genre: string;
  duration: string;
  rating: string;
  poster: string;
  description: string;
  showtimes: string[];
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Stellar Odyssey",
    subtitle: "Beyond the Stars",
    genre: "Sci-Fi / Action",
    duration: "148 min",
    rating: "PG-13",
    poster: movie1,
    description: "An astronaut embarks on a perilous journey through uncharted space to save humanity from extinction.",
    showtimes: ["08:00", "10:30", "13:00", "15:30", "18:00", "20:30"],
  },
  {
    id: "2",
    title: "Midnight in Paris",
    subtitle: "Love Never Sleeps",
    genre: "Romance / Drama",
    duration: "126 min",
    rating: "PG-13",
    poster: movie2,
    description: "Two strangers meet under the glow of Paris and discover a love that transcends time itself.",
    showtimes: ["09:00", "11:30", "14:00", "16:30", "19:00", "21:30"],
  },
  {
    id: "3",
    title: "The Darkening",
    subtitle: "Fear Has a New Home",
    genre: "Horror / Thriller",
    duration: "112 min",
    rating: "R",
    poster: movie3,
    description: "A family moves into an ancient mansion only to discover the terrifying secrets lurking within its walls.",
    showtimes: ["10:00", "12:30", "15:00", "17:30", "20:00", "22:30"],
  },
  {
    id: "4",
    title: "Dragon Kingdom",
    subtitle: "The Adventure Begins",
    genre: "Animation / Family",
    duration: "98 min",
    rating: "PG",
    poster: movie4,
    description: "A young hero befriends a legendary dragon and together they must save a magical kingdom from darkness.",
    showtimes: ["08:30", "10:00", "12:00", "14:00", "16:00", "18:00"],
  },
  {
    id: "5",
    title: "Shadow Protocol",
    subtitle: "Trust No One",
    genre: "Action / Thriller",
    duration: "134 min",
    rating: "R",
    poster: movie5,
    description: "A rogue agent uncovers a global conspiracy and must fight to expose the truth before it's too late.",
    showtimes: ["09:30", "12:00", "14:30", "17:00", "19:30", "22:00"],
  },
];
