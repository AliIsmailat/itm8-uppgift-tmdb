import { useEffect, useState } from "react";
import { fetchPopularMovies, searchMovies } from "../api/tmdb";
import type { Movie } from "../types/types";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const loadTopMovies = async () => {
    setLoading(true);
    try {
      const data = await fetchPopularMovies();
      setMovies(data.slice(0, 10));
    } catch (err) {
      console.error("Failed to fetch popular movies:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopMovies();
  }, []);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      console.error("Search failed:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuery("");
    loadTopMovies();
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Top 10 Movies</h1>

      <div className="flex items-center gap-2 mb-4">
        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
