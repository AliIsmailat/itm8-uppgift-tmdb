export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string; 
  birthday?: string;
  place_of_birth?: string;
  biography?: string;
}

export interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: () => void;
  onClear?: () => void;
}