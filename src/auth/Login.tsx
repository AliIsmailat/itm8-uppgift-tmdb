import { useState } from "react";
import { findUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

// funktion för att logga in.
export default function Login() {
  // skapar tre states som börjar som tomma strängar
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // usenavigate för att byta sida när man har loggat in
  const navigate = useNavigate();
  // hämtar login funktionen från contexten (datan) genom
  // useauth, när användaren loggar in nu uppdateras
  // staten av contexten.
  const { login } = useAuth();

  // funktion för när man loggar in
  const handleLogin = (e: React.FormEvent) => {
    // gör att sidan inte laddas om.
    e.preventDefault();
    // kollar om det finns en användare med användarnamnet
    // som har skrivits in.
    const user = findUser(username);
    // om påståenden stämmer, uppdaterar login kontexten
    // med värdet av user och skickar användaren till
    // startsidan
    if (user && user.password === password) {
      login(user);
      navigate("/");
      // annars, visar felmeddelande.
    } else {
      setMessage("Invalid username or password");
    }
  };

  return (
    <div className="p-14 mt-20 max-w-md mx-auto bg-white/40 backdrop-blur-md rounded-2xl border border-black/10 shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-500 transition-all ease-in"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
