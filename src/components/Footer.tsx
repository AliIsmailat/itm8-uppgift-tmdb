export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-md text-white mt-10 py-6">
      <div className="max-w-6xl mx-auto text-center font-mono text-sm">
        <p>© {new Date().getFullYear()} MovieDB App — ITM8 Uppgift</p>
        <p className="mt-1">Built with React + Tailwind + TMDB API</p>
      </div>
    </footer>
  );
}
