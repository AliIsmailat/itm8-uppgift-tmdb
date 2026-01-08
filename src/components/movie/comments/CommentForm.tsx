import type { FC } from "react";

interface CommentFormProps {
  text: string;
  setText: (value: string) => void;
  onPost: () => void;
}

const CommentForm: FC<CommentFormProps> = ({ text, setText, onPost }) => {
  return (
    <div className="mb-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border rounded bg-white text-black"
        placeholder="Write a comment..."
      />
      <button
        onClick={onPost}
        className="mt-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded"
      >
        Post Comment
      </button>
    </div>
  );
};

export default CommentForm;
