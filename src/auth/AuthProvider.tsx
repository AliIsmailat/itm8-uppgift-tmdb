// imports
import { useState } from "react";
// personlig anteckning: reactnode är en typ
// som beskriver alla typer som kan renderas.
import type { ReactNode } from "react";
import type { User as AuthUser } from "../utils/auth";

// importerar tre funktioner från auth.ts för att
// hämta nuvarande användare, spara användare och logga ut
import {
  getCurrentUser,
  setCurrentUser as saveUserInStorage,
  logout as logoutStorage,
} from "../utils/auth";

import { AuthContext } from "./authContext";

// funktion som tar emot children som props
export function AuthProvider({ children }: { children: ReactNode }) {
  // state variabel med typen som antingen är authuser eller null
  // initial värdet är funktionen getCurrentUser
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());

  // login funktionen
  const login = (user: AuthUser) => {
    // saveuserinstorage sparar användaren
    saveUserInStorage(user);
    setUser(user);
    // anropar setuser, alla komponenter som använder contexten
    // uppdateras med det nya värdet.
  };

  //   logout funktionen
  const logout = () => {
    // logoutstorage heter logout i auth.ts och tar bort
    // currentuser från localstorage.
    logoutStorage();
    // sätter user till null
    setUser(null);
  };

  //  returnerar authcontext och ger ut values av
  // user login och logout till allt som är mellan taggarna,
  // alltså children.

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
