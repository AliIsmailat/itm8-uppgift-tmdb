import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/types";
import FavoriteButton from "../ui/FavoriteButton";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative bg-white rounded shadow overflow-hidden hover:scale-105 transition-transform cursor-pointer"
    >
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 356.859 356.859"
            className="w-16 h-16 text-gray-400"
            fill="currentColor"
          >
            <path
              d="M9.849,130.711l341.726-60.257l-1.203-6.856l-8.612-48.845L0,75.016l1.347,7.629l7.265,41.216l1.208,6.856v188.596
c0,12.534,10.255,22.794,22.794,22.794h301.445c12.534,0,22.794-10.255,22.794-22.794v-188.6H9.849z M336.174,23.606
l6.077,34.468l-40.09-28.472L336.174,23.606z M287.36,32.212l47.939,34.043l-41.216,7.265l-47.939-34.043L287.36,32.212z
M230.252,42.283l47.939,34.043l-41.211,7.265l-47.939-34.043L230.252,42.283z M173.153,52.349l47.939,34.043l-41.216,7.265
l-47.939-34.043L173.153,52.349z M116.045,62.42l47.939,34.043l-41.216,7.265L74.829,69.686L116.045,62.42z
M58.941,72.492l47.939,34.043L65.664,113.8L17.725,79.757L58.941,72.492z M8.904,87.944L49.772,116.6l-34.877,6.149
L8.904,87.944z"
            />
            <rect x="221.834" y="216.829" width="101.192" height="30.346" />
          </svg>
        </div>
      )}

      <div className="p-2">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-500">{movie.release_date}</p>
      </div>

      <div className="absolute bottom-2 right-2">
        <FavoriteButton movieId={movie.id} />
      </div>
    </div>
  );
}
