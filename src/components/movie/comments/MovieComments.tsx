import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../utils/auth";
import { loadComments, saveComments } from "./commentStorage";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: number;
  likes: number;
  dislikes: number;
  likedBy: string[];
  dislikedBy: string[];
}

export default function MovieComments({ movieId }: { movieId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [page, setPage] = useState(1);

  const COMMENTS_PER_PAGE = 5;
  const currentUser = getCurrentUser()?.username || "Guest";

  useEffect(() => {
    setComments(loadComments(movieId));
  }, [movieId]);

  function save(updated: Comment[]) {
    setComments(updated);
    saveComments(movieId, updated);
  }

  function addComment() {
    if (!text.trim()) return;

    const newComment: Comment = {
      id: crypto.randomUUID(),
      user: currentUser,
      text,
      timestamp: Date.now(),
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
    };

    save([...comments, newComment]);
    setText("");
  }

  function likeComment(id: string) {
    const updated = comments.map((c) => {
      if (c.id !== id) return c;
      if (c.likedBy.includes(currentUser)) return c;

      const dislikedBefore = c.dislikedBy.includes(currentUser);
      return {
        ...c,
        likes: c.likes + 1,
        dislikes: dislikedBefore ? c.dislikes - 1 : c.dislikes,
        likedBy: [...c.likedBy, currentUser],
        dislikedBy: dislikedBefore
          ? c.dislikedBy.filter((u) => u !== currentUser)
          : c.dislikedBy,
      };
    });
    save(updated);
  }

  function dislikeComment(id: string) {
    const updated = comments.map((c) => {
      if (c.id !== id) return c;
      if (c.dislikedBy.includes(currentUser)) return c;

      const likedBefore = c.likedBy.includes(currentUser);
      return {
        ...c,
        dislikes: c.dislikes + 1,
        likes: likedBefore ? c.likes - 1 : c.likes,
        dislikedBy: [...c.dislikedBy, currentUser],
        likedBy: likedBefore
          ? c.likedBy.filter((u) => u !== currentUser)
          : c.likedBy,
      };
    });
    save(updated);
  }

  function deleteComment(id: string) {
    const comment = comments.find((c) => c.id === id);
    if (!comment) return;

    const isGuest = !getCurrentUser();
    if (
      comment.user !== currentUser &&
      !(isGuest && comment.user === "Guest")
    ) {
      alert("You can only delete your own comments.");
      return;
    }

    save(comments.filter((c) => c.id !== id));
  }

  function startEdit(id: string | null, oldText: string) {
    setEditingId(id);
    setEditText(oldText);
  }

  function saveEdit(id: string) {
    const updated = comments.map((c) =>
      c.id === id ? { ...c, text: editText } : c
    );
    save(updated);
    setEditingId(null);
    setEditText("");
  }

  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const visibleComments = comments.slice(
    (page - 1) * COMMENTS_PER_PAGE,
    page * COMMENTS_PER_PAGE
  );

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-3">Comments</h2>

      <CommentForm text={text} setText={setText} onPost={addComment} />

      <div className="space-y-4">
        {visibleComments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          visibleComments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              currentUser={currentUser}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              startEdit={startEdit}
              saveEdit={saveEdit}
              onLike={likeComment}
              onDislike={dislikeComment}
              onDelete={deleteComment}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-40"
          >
            Prev
          </button>
          <span className="px-2 py-1">
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
