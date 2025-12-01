// src/api/tmdb.ts
import type { Movie, Actor } from "../types/types";



const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  if (!res.ok) {
    console.error("TMDB fetchPopularMovies error:", res.status, res.statusText);
    return [];
  }
  const data = await res.json();
  return data.results || [];
};


export const searchMovies = async (query: string): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.results;
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data;
};

export const fetchMovieCast = async (id: number): Promise<Actor[]> => {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data.cast; 
};

export const fetchActorDetails = async (id: number): Promise<Actor> => {
  const res = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data;
};

export const fetchActorMovies = async (id: number): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data.cast;
};
