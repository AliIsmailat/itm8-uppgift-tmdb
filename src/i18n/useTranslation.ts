import { useLanguage } from "../context/useLanguage";
import { translations } from "./translations";

export function useTranslation() {
  const { language } = useLanguage();

// custom hook, hämtar värdet från useLanguage
// returnerar funktion som översätter
// beroende på key, baserat på t.ex. language === "en",
// tar t("key") ett värde från antingen engelska
// eller svenska översättningarna
  const t = (key: keyof typeof translations.en) => {
    return translations[language][key];
  };

  return { t };
}
