

//importing stuff
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieCast } from "../api/tmdb";
import type { Movie, Actor } from "../types/types";
import BackButton from "../components/BackButton";

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
      <p className="mb-2">{movie.overview}</p>
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
        className="min-w-[150px] flex-shrink-0 text-center"
      >
        {actor.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
            className="w-[150px] h-48 object-cover rounded"
          />
        ) : (
          <div className="w-[150px] h-48 bg-gray-300 flex items-center justify-center rounded">
            No Image
          </div>
        )}
        <p className="mt-2 text-sm">{actor.name}</p>
      </Link>
    ))}
  </div>


{/* hämtar skroll knappen från DOM och gör att den skrollar -300px onclick */}
  <div className="absolute inset-y-0 -left-10  flex items-center">
    <button
      className="bg-black text-white p-2 rounded-full flex items-center justify-center w-15 h-10 z-10 text-4xl"
      onClick={() => {
        const el = document.getElementById("cast-scroll");
        el?.scrollBy({ left: -300, behavior: "smooth" });
      }}
    >
      ←
    </button>
  </div>

{/* hämtar skroll knappen från DOM och gör att den skrollar 300px onclick */}

  <div className="absolute inset-y-0 -right-10 flex items-center">
    <button
      className="bg-black text-white p-2 rounded-full flex items-center justify-center w-15 h-10 z-10 text-4xl"
      onClick={() => {
        const el = document.getElementById("cast-scroll");
        el?.scrollBy({ left: 300, behavior: "smooth" });
      }}
    >
      →
    </button>
  </div>
</div>
    </div>
  );
}
