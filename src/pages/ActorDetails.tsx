
//importerar useparams för att hämta parametrar från URL:en
//i detta fallet id för skådespelaren vi vill visa.
//link för att navigera utan att ladda omm hemsidan
//navigate för (navigate-1) för tillbaka knappen
import { useParams, Link, useNavigate } from "react-router-dom";

//övriga importer
import { useEffect, useState } from "react";
import { fetchActorDetails, fetchActorMovies } from "../api/tmdb";
import type { Actor, Movie } from "../types/types";
import BackButton from "../components/BackButton";



// funktion för att styra actordetails genom url parametrar
export default function ActorDetails() {
  const { id } = useParams<{ id: string }>();

  //navigate använder usenavigate för backbutton
  const navigate = useNavigate();

  //usestate för actor, börjar som null, kan vara actor eller null
  const [actor, setActor] = useState<Actor | null>(null);

//usestate för movies, börjar som en tom array
  const [movies, setMovies] = useState<Movie[]>([]);

  //används för loading text, börjar som true, 
  // sätts som false inom funktioner
  const [loading, setLoading] = useState(true);

//useeffect för att hämta data, har id som dependecy, alltså körs on mount
//och körs när id ändras
  useEffect(() => {

    //om id är false avrbtyer vi funktionen
    if (!id) return;

    //omvandlar id från URL:en till ett nr (vet ej varför?)
    const actorId = parseInt(id);

    //kör två async anrop parallelt, fetchactordetails och fetchactormovies
    Promise.all([fetchActorDetails(actorId), fetchActorMovies(actorId)]).then(
      // när det är klart, använder setactor, setmovies och setloading
      // för att uppdatera states.
      ([actorData, movieData]) => {
        setActor(actorData);
        setMovies(movieData);
        setLoading(false);
      }
    );
  }, [id]);

  //fallback + loading text
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!actor) return <p>Actor not found.</p>;



  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* knapp med onclick funktion, navigate(-1) går tillbaka */}
      <BackButton onClick={() => navigate(-1)} label="← Return to movie" />

      <div className="flex flex-col sm:flex-row gap-6 mb-6 mt-4">
        {actor.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            alt={actor.name}
            className="rounded"
          />
        ) : (
          <div className="w-48 h-72 bg-gray-300 flex items-center justify-center rounded">
            No Image
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{actor.name}</h1>
          {actor.birthday && <p className="mb-1">Birthday: {actor.birthday}</p>}
          {actor.place_of_birth && (
            <p className="mb-1">Place of Birth: {actor.place_of_birth}</p>
          )}
          {actor.biography && <p className="mt-2">{actor.biography}</p>}
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="text-center"
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-48 object-cover rounded"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded">
                No Image
              </div>
            )}
            <p className="mt-2 text-sm">{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
