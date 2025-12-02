

//importerar typen för movie och actor.
import type { Movie, Actor } from "../types/types";



//api key och base url:en här
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";


//skapar funktionen fetchPopularMovies och exporterar den så att den kan
//användas utanför filen.

//fetchar popular movies, returneras som json och omvandlas till 
//javascript objekt
export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  if (!res.ok) {
    console.error("TMDB fetchPopularMovies error:", res.status, res.statusText);
    return [];
  }
  const data = await res.json();
  return data.results || [];
};


//funktion för att söka filmer, tar in en query sträng och
//försöker matcha query med filmerna, returnerar som data.results
export const searchMovies = async (query: string): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.results;
};


//funktion för att hämta fetchmoviedetails, hämtar detaljer om filmen
//med hjälp av ID på filmen, t.ex. 550
export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data;
};


//funktion för att hämta skådespelare (data.cast) för en viss film, sker också
//med ID
export const fetchMovieCast = async (id: number): Promise<Actor[]> => {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data.cast; 
};


//funktion för att hämta detaljer om skådespelare för en film,
//skådespelare har egna ID
export const fetchActorDetails = async (id: number): Promise<Actor> => {
  const res = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data;
};


//hämta en skådespelares filmer, cast och crew returneras egentligen
//dock tar vi bara emot cast.
export const fetchActorMovies = async (id: number): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data.cast;
};
