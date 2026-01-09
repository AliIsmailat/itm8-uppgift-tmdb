import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";

export function useLanguage() {
// hämtar värdet från languageprovider contexten
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
