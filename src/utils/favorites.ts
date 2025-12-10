import { getCurrentUser } from "./auth";

const getKey = () => {
  const user = getCurrentUser();
  return user ? `favorites_${user.username}` : "favorites_guest";
};

export function getFavorites(): number[] {
  return JSON.parse(localStorage.getItem(getKey()) || "[]");
}

export function addFavorite(movieId: number) {
  const favorites = getFavorites();
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem(getKey(), JSON.stringify(favorites));
  }
}

export function removeFavorite(movieId: number) {
  const favorites = getFavorites().filter((id) => id !== movieId);
  localStorage.setItem(getKey(), JSON.stringify(favorites));
}

export function isFavorite(movieId: number) {
  return getFavorites().includes(movieId);
}
