import { useParams } from "react-router-dom";
import BackButton from "../components/ui/BackButton";
import MovieInfo from "../components/movie/MovieInfo";
import MovieCast from "../components/movie/MovieCast";
import MovieComments from "../components/movie/comments/MovieComments";

export default function MovieDetails() {
  const { id } = useParams();
  if (!id) return <p>No movie ID.</p>;

  const movieId = parseInt(id);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <BackButton />

      <MovieInfo movieId={movieId} />

      <MovieCast movieId={movieId} />

      <MovieComments movieId={movieId} />
    </div>
  );
}
