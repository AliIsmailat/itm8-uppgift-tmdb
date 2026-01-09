import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "../../context/useLanguage";
import { useTranslation } from "../../i18n/useTranslation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as "en" | "sv");
  };

  return (
    <nav className="bg-black dark:bg-black text-white backdrop-blur-md px-6 py-5 shadow-2xl mb-5">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold font-mono -ml-4 hover:text-lime-300 transition"
        >
          MovieDB
        </Link>

        <div className="flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-lime-300 transition">
            {t("home")}
          </Link>

          <Link to="/favorites" className="hover:text-lime-300 transition">
            {t("favorites")}
          </Link>

          {!user && (
            <>
              <Link to="/register" className="hover:text-lime-300 transition">
                {t("register")}
              </Link>
              <Link to="/login" className="hover:text-lime-300 transition">
                {t("login")}
              </Link>
            </>
          )}

          {user && (
            <>
              <span className="text-lime-300">
                {t("hello")}, {user.username}
              </span>
              <button
                onClick={logout}
                className="hover:text-red-500 transition"
              >
                {t("logout")}
              </button>
            </>
          )}

          <select
            value={language}
            onChange={handleLanguageChange}
            className="px-2 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white text-sm hover:bg-gray-200 transition"
            title="Select language"
          >
            <option value="en">English</option>
            <option value="sv">Swedish</option>
          </select>

          <div className="ml-2">
            <button
              onClick={toggleDarkMode}
              className="w-14 h-7 flex items-center rounded-full p-1 relative
                         bg-gray-300 dark:bg-gray-700 transition-colors duration-300"
            >
              <div
                className={`w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out
                            flex items-center justify-center
                            ${darkMode ? "translate-x-7" : "translate-x-0"}`}
              >
                {darkMode ? (
                  <MoonIcon className="w-4 h-4 text-white" />
                ) : (
                  <SunIcon className="w-4 h-4 text-black" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
