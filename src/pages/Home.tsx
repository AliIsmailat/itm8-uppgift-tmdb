// importerar stuff
import { useEffect, useState } from "react";
import { fetchPopularMovies, searchMovies } from "../api/tmdb";
import type { Movie } from "../types/types";
import MovieCard from "../components/movie/MovieCard";
import SearchBar from "../components/ui/SearchBar";

//funktion för home sidan
export default function Home() {
  //state variabler
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // funktion för att ladda top 10 filmer
  const loadTopMovies = async () => {
    //setloading till true för att visa texten
    setLoading(true);
    try {
      //api anrop
      const data = await fetchPopularMovies();
      //använder setter för att visa data (plockar 0 till 10 av dem)
      setMovies(data.slice(0, 10));
      //error hantering, sätter movies till en tom array och loggar error
    } catch (err) {
      console.error("Failed to fetch popular movies:", err);
      setMovies([]);

      //finally körs alltid, sätter loading till false
    } finally {
      setLoading(false);
    }
  };

  //en use effect som alltid kör loadtopmovies on mount
  useEffect(() => {
    loadTopMovies();
  }, []);

  //funktion för att handla search,
  const handleSearch = async () => {
    //om sökfältet är tom, avbryt
    if (!query) return;
    //om den inte är tom, setloading till true
    setLoading(true);
    try {
      //anropar searchmovies och skickar till query som parameter
      const results = await searchMovies(query);
      // använder setter för att sätta movies state till (results)
      setMovies(results);
      //när det är error, logga errorn och sätt movies till en tom array
    } catch (err) {
      console.error("Search failed:", err);
      setMovies([]);
      //körs alltid, sätter loading till false
    } finally {
      setLoading(false);
    }
  };

  //handlereset funktion för en knapp, tömmer query och
  //sätter top10 movies i home
  const handleReset = () => {
    setQuery("");
    loadTopMovies();
  };

  //om loading är true, skriver texten "Loading..."
  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    // html layouten
    <div className="p-4 max-w-6xl mx-auto ">
      <h1 className="text-4xl font-bold mb-6 text-center text-white font-mono">
        Top 10 Movies
      </h1>
      <div className="flex items-center gap-2 mb-4">
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
