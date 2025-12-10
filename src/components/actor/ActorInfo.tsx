import { useEffect, useState } from "react";
import { fetchActorDetails } from "../../api/tmdb";
import type { Actor } from "../../types/types";

export default function ActorInfo({ actorId }: { actorId: number }) {
  const [actor, setActor] = useState<Actor | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchActorDetails(actorId).then((data) => {
      setActor(data);
      setLoading(false);
    });
  }, [actorId]);

  if (loading) return <p>Loading actor...</p>;
  if (!actor) return <p>Actor not found.</p>;

  // Safe handling for undefined biography
  const bio = actor.biography ?? "";
  const hasBio = bio.trim().length > 0;
  const isLongBio = hasBio && bio.length > 300;

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {actor.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            alt={actor.name}
            className="w-60 h-80 object-cover rounded shadow flex-shrink-0"
          />
        ) : (
          <div className="w-60 h-80 bg-gray-300 rounded flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}

        <div className="relative flex-1">
          <h1 className="text-3xl font-bold mb-2">{actor.name}</h1>

          {actor.birthday && (
            <p className="text-gray-700 mb-2">
              Year of birth: {actor.birthday}
            </p>
          )}
          {actor.place_of_birth && (
            <p className="text-gray-700 mb-4">
              Place of birth: {actor.place_of_birth}
            </p>
          )}

          <div
            className={`relative bg-white/80 p-4 rounded-tr-lg rounded-bl-lg overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              !expanded ? "max-h-[12.7rem]" : "max-h-[2000px]"
            }`}
          >
            <p className="leading-relaxed mb-4">
              {hasBio ? bio : "No biography available."}
            </p>

            {!expanded && isLongBio && (
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            )}
          </div>

          {isLongBio && (
            <div className="relative flex justify-center -mt-6 z-10">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-white bg-black px-3 py-1 rounded-lg hover:bg-black/80 transition-colors duration-200"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
