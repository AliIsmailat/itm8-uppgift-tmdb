import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieCast } from "../api/tmdb";
import type { Movie, Actor } from "../types/types";
import BackButton from "../components/BackButton";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const movieId = parseInt(id);
    Promise.all([fetchMovieDetails(movieId), fetchMovieCast(movieId)]).then(
      ([movieData, castData]) => {
        setMovie(movieData);
        setCast(castData);
        setLoading(false);
      }
    );
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <BackButton onClick={() => navigate("/")} label="← Back to Home" />

      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <p className="mb-2">{movie.overview}</p>
      <p className="mb-4">Release date: {movie.release_date}</p>

      <h2 className="text-2xl font-semibold mb-2">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {cast.map((actor) => (
          <Link
            key={actor.id}
            to={`/actor/${actor.id}`}
            className="text-center"
          >
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-48 object-cover rounded"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded">
                No Image
              </div>
            )}
            <p className="mt-2 text-sm">{actor.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
