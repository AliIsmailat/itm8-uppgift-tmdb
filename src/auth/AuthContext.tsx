import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User as AuthUser } from "../utils/auth";
import {
  getCurrentUser,
  setCurrentUser as saveUserInStorage,
  logout as logoutStorage,
} from "../utils/auth";

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const login = (user: AuthUser) => {
    saveUserInStorage(user);
    setUser(user);
  };

  const logout = () => {
    logoutStorage();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
