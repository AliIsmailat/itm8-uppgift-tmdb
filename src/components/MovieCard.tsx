import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/types";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="bg-white rounded shadow overflow-hidden hover:scale-105 transition-transform cursor-pointer"
    >
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
          No Image
        </div>
      )}
      <div className="p-2">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-500">{movie.release_date}</p>
      </div>
    </div>
  );
}
