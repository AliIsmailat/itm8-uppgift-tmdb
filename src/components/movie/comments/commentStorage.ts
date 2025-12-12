import type { Comment } from "./MovieComments";

export function loadComments(movieId: number): Comment[] {
  const key = `comments_${movieId}`;
  const saved = localStorage.getItem(key);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return parsed.map((c: any) => ({
      ...c,
      likedBy: c.likedBy || [],
      dislikedBy: c.dislikedBy || [],
    }));
  } catch {
    return [];
  }
}

export function saveComments(movieId: number, comments: Comment[]) {
  const key = `comments_${movieId}`;
  localStorage.setItem(key, JSON.stringify(comments));
}
