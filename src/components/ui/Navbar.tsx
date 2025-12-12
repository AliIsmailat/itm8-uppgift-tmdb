// Navbar.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black backdrop-blur-md text-white px-6 py-7 shadow-2xl mb-5">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold font-mono -ml-4 hover:text-lime-300 transition"
        >
          MovieDB
        </Link>

        <div className="flex gap-6 text-lg">
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
        </div>
      </div>
    </nav>
  );
}
