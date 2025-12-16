import type { Comment } from "./MovieComments";

export function loadComments(movieId: number): Comment[] {
  const key = `comments_${movieId}`;
  const saved = localStorage.getItem(key);
  if (!saved) return [];

  try {
    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.map((c): Comment => {
      const comment = c as Partial<Comment>;

      return {
        ...comment,
        likedBy: comment.likedBy ?? [],
        dislikedBy: comment.dislikedBy ?? [],
      } as Comment;
    });
  } catch {
    return [];
  }
}

export function saveComments(movieId: number, comments: Comment[]) {
  const key = `comments_${movieId}`;
  localStorage.setItem(key, JSON.stringify(comments));
}
