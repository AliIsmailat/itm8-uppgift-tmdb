import { useState } from "react";
import { saveUser, findUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (findUser(username)) {
      setMessage("Username already exists");
      return;
    }
    const newUser = { username, password };
    saveUser(newUser);
    login(newUser);
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
