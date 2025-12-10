import { useParams } from "react-router-dom";
import BackButton from "../components/ui/BackButton";
import MovieInfo from "../components/movie/MovieInfo";
import MovieCast from "../components/movie/MovieCast";

export default function MovieDetails() {
  const { id } = useParams();
  if (!id) return <p>No movie ID.</p>;

  const movieId = parseInt(id);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <BackButton />

      <MovieInfo movieId={movieId} />

      <h2 className="text-2xl font-semibold mb-3">Cast</h2>

      <MovieCast movieId={movieId} />
    </div>
  );
}
