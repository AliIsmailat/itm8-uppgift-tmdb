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
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

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
          {actor.biography && (
            <p className="mt-2 bg-white/80 p-4 rounded-tr-lg rounded-bl-lg ">
              {actor.biography}
            </p>
          )}
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Movies</h2>
      {/* scroll-thing */}
      {/* fungerar genom overflow, hela är en flex container */}
      {/* om allting inte passar finns overflow-x-auto som gör det skrollbart*/}
      <div className="relative">
        {/* knappen för att scrolla (cast-scroll) */}
        <div
          id="movies-scroll"
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
        >
          {/* loopar igenom movies objectet och skapar en link för varje actor */}
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="min-w-[150px] flex-shrink-0 text-center hover:scale-105 transition transform duration-300"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[150px] h-48 object-cover rounded"
                />
              ) : (
                <div className="w-[150px] h-48 bg-gray-300 flex items-center justify-center rounded overflow-hidden">
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
                    <rect
                      x="221.834"
                      y="216.829"
                      width="101.192"
                      height="30.346"
                    />
                  </svg>
                </div>
              )}
              <p className="mt-2 text-sm">{movie.title}</p>
            </Link>
          ))}
        </div>

        {/* hämtar skroll knappen från DOM och gör att den skrollar -300px onclick */}
        <div className="absolute inset-y-0 left-0 flex items-center -left-9">
          <button
            className="bg-black/90 hover:bg-black/50 text-white p-3 rounded-full shadow-lg transition"
            onClick={() => {
              const el = document.getElementById("movies-scroll");
              el?.scrollBy({ left: -300, behavior: "smooth" });
            }}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        </div>

        {/* hämtar skroll knappen från DOM och gör att den skrollar 300px onclick */}

        <div className="absolute inset-y-0 right-0 flex items-center -right-9">
          <button
            className="bg-black/90 hover:bg-black/50 text-white p-3 rounded-full shadow-lg transition"
            onClick={() => {
              const el = document.getElementById("movies-scroll");
              el?.scrollBy({ left: 300, behavior: "smooth" });
            }}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
