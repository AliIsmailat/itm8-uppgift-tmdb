import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { LanguageContext } from "./LanguageContext";
import type { Language } from "./language.types";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // språk state
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      // letar språk i localstorage, om inget hittas,
      // default blir engelska
      const storedLang = localStorage.getItem("language") as Language | null;
      return storedLang ?? "en";
    }
    return "en";
  });

  // useeffect med dependency som är language variabeln
  // varje gång language ändras, sparas det i LS
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    // provider här, gör language variablen
    // och setlanguage funktionen tillgänglig för
    // child components
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
