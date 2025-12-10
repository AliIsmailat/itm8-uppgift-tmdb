import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchActorMovies } from "../../api/tmdb";
import type { Movie } from "../../types/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function ActorMovies({ actorId }: { actorId: number }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [canScroll, setCanScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchActorMovies(actorId).then((data) => {
      const unique = Array.from(new Map(data.map((m) => [m.id, m])).values());
      setMovies(unique);
    });
  }, [actorId]);

  useEffect(() => {
    const updateCanScroll = () => {
      if (scrollRef.current) {
        setCanScroll(
          scrollRef.current.scrollWidth > scrollRef.current.clientWidth
        );
      }
    };

    updateCanScroll();
    window.addEventListener("resize", updateCanScroll);
    return () => window.removeEventListener("resize", updateCanScroll);
  }, [movies]);

  if (movies.length === 0) return <p>No movies found.</p>;

  return (
    <div className="relative mt-6">
      <h2 className="text-2xl font-semibold mb-3">Known For</h2>

      <div
        ref={scrollRef}
        id="actor-movies-scroll"
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
      >
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="w-[150px] flex-shrink-0 text-center hover:scale-105 transition"
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

      {canScroll && <ScrollButtons targetRef={scrollRef} />}
    </div>
  );
}

function ScrollButtons({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  const scrollBy = (distance: number) => {
    if (targetRef.current) {
      targetRef.current.scrollBy({ left: distance, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="absolute inset-y-0 left-0 flex items-center -left-9">
        <button
          onClick={() => scrollBy(-300)}
          className="bg-black/90 hover:bg-black/50 text-white p-3 rounded-full shadow-lg transition"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center -right-9">
        <button
          onClick={() => scrollBy(300)}
          className="bg-black/90 hover:bg-black/50 text-white p-3 rounded-full shadow-lg transition"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
