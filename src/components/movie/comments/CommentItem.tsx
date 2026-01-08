import type { FC } from "react";
import type { Comment } from "./MovieComments";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

interface CommentItemProps {
  comment: Comment;
  currentUser: string;
  editingId: string | null;
  editText: string;
  setEditText: (value: string) => void;
  startEdit: (id: string | null, text: string) => void;
  saveEdit: (id: string) => void;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onDelete: (id: string) => void;
}

const CommentItem: FC<CommentItemProps> = ({
  comment,
  currentUser,
  editingId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  onLike,
  onDislike,
  onDelete,
}) => {
  const isAuthor = currentUser === comment.user;

  return (
    <div className="p-4 bg-white/70 rounded shadow">
      <div className="flex justify-between">
        <p className="font-semibold dark:text-black">{comment.user}</p>
        <p className="text-xs text-gray-500">
          {new Date(comment.timestamp).toLocaleString()}
        </p>
      </div>

      {editingId === comment.id ? (
        <div className="mt-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border rounded bg-white text-black"
          />
          <button
            onClick={() => saveEdit(comment.id)}
            className="mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={() => startEdit(null, "")}
            className="mt-2 ml-2 px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <p className="mt-5 dark:text-black">{comment.text}</p>
      )}

      <div className="flex gap-4 mt-3 text-sm">
        <button
          onClick={() => onLike(comment.id)}
          className={`flex items-center gap-1 ${
            comment.likedBy.includes(currentUser)
              ? "text-green-800"
              : "text-green-600"
          } hover:text-green-800`}
        >
          <HandThumbUpIcon className="w-5 h-5" /> {comment.likes}
        </button>

        <button
          onClick={() => onDislike(comment.id)}
          className={`flex items-center gap-1 ${
            comment.dislikedBy.includes(currentUser)
              ? "text-red-800"
              : "text-red-600"
          } hover:text-red-800`}
        >
          <HandThumbDownIcon className="w-5 h-5" /> {comment.dislikes}
        </button>

        {isAuthor && (
          <button
            onClick={() => startEdit(comment.id, comment.text)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <PencilIcon className="w-5 h-5" /> Edit
          </button>
        )}

        {(isAuthor || (!currentUser && comment.user === "Guest")) && (
          <button
            onClick={() => onDelete(comment.id)}
            className="flex items-center gap-1 text-gray-600 hover:text-black"
          >
            <TrashIcon className="w-5 h-5" /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
