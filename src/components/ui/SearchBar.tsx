interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

export default function SearchBar({
  query,
  setQuery,
  onSearch,
  onReset,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 w-full">
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

      <button
        onClick={onSearch}
        className="px-4 py-2 bg-black text-white rounded hover:bg-blue-600"
      >
        Search
      </button>

      <button
        onClick={onReset}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:text-black"
      >
        Reset
      </button>
    </div>
  );
}
