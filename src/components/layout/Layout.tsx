import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    // <div className="min-h-screen flex flex-col bg-gradient-to-r from-lime-400/90 to-teal-700/90">
    <div
      className="
      min-h-screen flex flex-col
      bg-gradient-to-r from-lime-400/90 to-teal-700/90
      dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-700
      text-slate-900 dark:text-slate-100
    "
    >
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
