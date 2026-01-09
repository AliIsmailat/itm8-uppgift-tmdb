//kontext för språk
import { createContext } from "react";
import type { Language } from "./language.types";

export type LanguageContextType = {
  // själva språket
  language: Language;
  //   funktion för att ändra språk
  setLanguage: (lang: Language) => void;
};

// initiala värdet är null, ersätts sedan av
// languageprovider
export const LanguageContext = createContext<LanguageContextType | null>(null);
