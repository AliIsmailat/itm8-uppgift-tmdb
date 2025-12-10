import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, isFavorite } from "../../utils/favorites";

interface Props {
  movieId: number;
}

export default function FavoriteButton({ movieId }: Props) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(movieId));
  }, [movieId]);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(movieId);
      setFavorite(false);
    } else {
      addFavorite(movieId);
      setFavorite(true);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`text-4xl p-1 rounded-full ${
        favorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
      }`}
    >
      {favorite ? "♥" : "♡"}
    </button>
  );
}
