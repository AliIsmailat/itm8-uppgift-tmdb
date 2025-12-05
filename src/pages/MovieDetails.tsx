//importing stuff
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieCast } from "../api/tmdb";
import type { Movie, Actor } from "../types/types";
import BackButton from "../components/BackButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

//moviedetails funktion
export default function MovieDetails() {
  // id ä en sträng (?)
  const { id } = useParams<{ id: string }>();

  //navigate är för att styra navigation
  const navigate = useNavigate();

  //state variabler, movie är null i början
  const [movie, setMovie] = useState<Movie | null>(null);
  //cast är en tom array i början
  const [cast, setCast] = useState<Actor[]>([]);
  //loading är true i början, blir false inom funktioner
  const [loading, setLoading] = useState(true);

  //en useeffect som körs on mount och varje gång id state ändras
  useEffect(() => {
    //om id är false, avbryt funktionen
    if (!id) return;
    //omvandlar id till string
    const movieId = parseInt(id);
    //kör två async funktioner samtidigt, hämtar moviedetails och moviecast
    Promise.all([fetchMovieDetails(movieId), fetchMovieCast(movieId)]).then(
      //när der är färdigt uppdaterar vi state på Movie, Cast och Loading.
      ([movieData, castData]) => {
        setMovie(movieData);
        setCast(castData);
        setLoading(false);
      }
    );
  }, [id]);

  //om loading är true, displaya loading texten
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  //om movie är false, displaya fallback text
  if (!movie) return <p>Movie not found.</p>;

  //html layout
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <BackButton onClick={() => navigate("/")} label="← Back to Home" />

      {/* fyller html med egenskaper från movie objektet */}
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <p className="mb-2 bg-white/80 p-4 rounded-tr-lg rounded-bl-lg">
        {movie.overview}
      </p>
      <p className="mb-4">Release date: {movie.release_date}</p>

      <h2 className="text-2xl font-semibold mb-3">Cast</h2>

      <div className="relative">
        {/* scroll-thing */}
        {/* fungerar genom overflow, hela är en flex container */}
        {/* om allting inte passar finns overflow-x-auto som gör det skrollbart*/}

        {/* knappen för att scrolla (cast-scroll) */}
        <div
          id="cast-scroll"
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
        >
          {/* loopar igenom cast objectet och skapar en link för varje actor */}
          {cast.map((actor) => (
            <Link
              key={actor.id}
              to={`/actor/${actor.id}`}
              className="min-w-[150px] flex-shrink-0 text-center hover:scale-105 transition transform-duration-300"
            >
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="w-[150px] h-48 object-cover rounded"
                />
              ) : (
                <div className="w-[150px] h-48 flex items-center justify-center rounded overflow-hidden bg-gray-300">
                  <div className="w-[150px] h-48 bg-gray-300 flex items-center justify-center rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-16 h-16 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>
              )}
              <p className="mt-2 text-sm">{actor.name}</p>
            </Link>
          ))}
        </div>

        {/* hämtar skroll knappen från DOM och gör att den skrollar -300px onclick */}
        <div className="absolute inset-y-0 left-0 flex items-center -left-9">
          <button
            className="bg-black/90 hover:bg-black/50 text-white p-3 rounded-full shadow-lg transition "
            onClick={() => {
              const el = document.getElementById("cast-scroll");
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
              const el = document.getElementById("cast-scroll");
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
