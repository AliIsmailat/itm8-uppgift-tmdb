import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMovieCast } from "../../api/tmdb";
import type { Actor } from "../../types/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function MovieCast({ movieId }: { movieId: number }) {
  const [cast, setCast] = useState<Actor[]>([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold mb-3">Cast</h2>

      <div
        id="cast-scroll"
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
      >
        {cast.map((actor) => (
          <Link
            key={actor.id}
            to={`/actor/${actor.id}`}
            className="w-[150px] flex-shrink-0 text-center hover:scale-105 transition transform-duration-300"
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
            <p className="mt-2 text-sm break-words whitespace-normal w-full block">
              {actor.name}
            </p>
          </Link>
        ))}
      </div>

      <ScrollButtons targetId="cast-scroll" />
    </div>
  );
}

function ScrollButtons({ targetId }: { targetId: string }) {
  return (
    <>
      <div className="absolute inset-y-0 flex items-center -left-9">
        <button
          onClick={() =>
            document
              .getElementById(targetId)
              ?.scrollBy({ left: -300, behavior: "smooth" })
          }
          className="bg-black/90 hover:bg-black/50 text-white p-3 rounded-full shadow-lg transition"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0  flex items-center -right-9">
        <button
          onClick={() =>
            document
              .getElementById(targetId)
              ?.scrollBy({ left: 300, behavior: "smooth" })
          }
          className="bg-black/90 hover:bg-black/50 text-white p-3 rounded-full shadow-lg transition"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
