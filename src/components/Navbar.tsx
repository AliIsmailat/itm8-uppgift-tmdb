import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black backdrop-blur-md text-white px-6 py-7 shadow-2xl mb-5">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold font-mono -ml-4">
          MovieDB
        </Link>

        <div className="flex gap-6 text-lg">
          <Link to="/" className="hover:text-lime-300 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-lime-300 transition">
            About
          </Link>
          <Link to="/login" className="hover:text-lime-300 transition">
            Log in
          </Link>
        </div>
      </div>
    </nav>
  );
}
