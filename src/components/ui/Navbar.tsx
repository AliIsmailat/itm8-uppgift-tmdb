import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <nav className="bg-black dark:bg-black text-white backdrop-blur-md px-6 py-7 shadow-2xl mb-5">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold font-mono -ml-4 hover:text-lime-300 transition"
        >
          MovieDB
        </Link>

        <div className="flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-lime-300 transition">
            Home
          </Link>
          <Link to="/favorites" className="hover:text-lime-300 transition">
            Favorites
          </Link>

          {!user && (
            <>
              <Link to="/register" className="hover:text-lime-300 transition">
                Register
              </Link>
              <Link to="/login" className="hover:text-lime-300 transition">
                Log in
              </Link>
            </>
          )}

          {user && (
            <>
              <span className="text-lime-300">Hello, {user.username}</span>
              <button
                onClick={logout}
                className="hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          )}

          <div className="ml-6">
            <button
              onClick={toggleDarkMode}
              className="w-14 h-7 flex items-center rounded-full p-1 relative
                   bg-gray-300 dark:bg-gray-700 transition-colors duration-300"
            >
              <div
                className={`w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out flex items-center justify-center
            ${darkMode ? "translate-x-7" : "translate-x-0"}`}
              >
                {darkMode ? (
                  <MoonIcon className="w-10 h-10 text-white" />
                ) : (
                  <SunIcon className="w-10 h-10 text-black" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
