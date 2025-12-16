import { useEffect, useState } from "react";
import { getFavorites } from "../utils/favorites";
import type { Movie } from "../types/types";
import MovieCard from "../components/movie/MovieCard";
import { fetchMovieDetails } from "../api/tmdb";
import { getCurrentUser } from "../utils/auth";

export default function Favorites() {
  const favoriteIds = getFavorites();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(favoriteIds.length > 0);

  useEffect(() => {
    if (favoriteIds.length === 0) return;

    Promise.all(favoriteIds.map((id) => fetchMovieDetails(id)))
      .then(setFavoriteMovies)
      .catch((err) => console.error("Failed to load favorites:", err))
      .finally(() => setLoading(false));
  }, [favoriteIds]);

  const user = getCurrentUser();

  const title = user
    ? `${user.username}'s favorite movies`
    : "Your favorite movies";

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-white font-mono">
        {title}
      </h1>

      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : favoriteMovies.length === 0 ? (
        <p className="text-center mt-10">No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
