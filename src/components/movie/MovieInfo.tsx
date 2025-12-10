import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../api/tmdb";
import type { Movie } from "../../types/types";

export default function MovieInfo({ movieId }: { movieId: number }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails(movieId).then((data) => {
      setMovie(data);
      setLoading(false);
    });
  }, [movieId]);

  if (loading) return <p>Loading movie...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-60 h-auto rounded shadow"
          />
        ) : (
          <div className="w-60 h-80 bg-gray-300 rounded flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

          {movie.release_date && (
            <p className="text-gray-700 mb-2">
              Release date: {movie.release_date}
            </p>
          )}

          <p className="bg-white/80 p-4 rounded-tr-lg rounded-bl-lg leading-relaxed">
            {movie.overview || "No overview available."}
          </p>
        </div>
      </div>
    </div>
  );
}
