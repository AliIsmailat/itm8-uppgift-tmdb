import type { SearchBarProps } from "../types/types";

export default function SearchBar({
  query,
  setQuery,
  onSearch,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSearch();
        }
      }}
      className="w-full max-w-md p-2 border rounded"
    />
  );
}
