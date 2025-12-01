import React from "react";
import type { BackButtonProps } from "../types/types";

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  label = "← Back",
}) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
    >
      {label}
    </button>
  );
};

export default BackButton;
