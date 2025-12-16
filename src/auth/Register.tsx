import { useState } from "react";
// funktioner för att checka om en användare redan finns
// och för att spara en ny användare i LS
import { saveUser, findUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

// funktion för att registrera en användare
export default function Register() {
  // tre state variabler som börjar som tomma strängar
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // importerar login funktionen från contexten (datan),
  // används för att logga in användaren direkt efter reg
  const { login } = useAuth();
  const navigate = useNavigate();

  // funktion för att hantera registrering.
  const handleRegister = (e: React.FormEvent) => {
    // gör att hemsidan inte laddas om
    e.preventDefault();
    // använder funktionen finduser och kollar om
    // username redan finns, om det finns, felmeddelande
    // och return
    if (findUser(username)) {
      setMessage("Username already exists");
      return;
    }
    // skapar en ny användare med värdet av username
    // och password
    const newUser = { username, password };
    // sparar nya användaren i LS
    saveUser(newUser);
    // loggar in användaren genom att uppdatera state i
    // context
    login(newUser);
    // skickar användaren till startsidan
    navigate("/");
  };

  return (
    <div className="p-14 mt-20 max-w-md mx-auto bg-white/40 backdrop-blur-md rounded-2xl border border-black/10 shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
