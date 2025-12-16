// importerar createcontext, används för att 
// globalt dela data för att undvika prop drilling.
// i detta fall är context info om inloggad användare.
import { createContext } from "react";

// importerar typen för user och nämner till authuser
import type { User as AuthUser } from "../utils/auth";


// interface om hur min authcontext ser ut,
export interface AuthContextType {
// user = usern som är inloggad eller null
  user: AuthUser | null;
// en funktion som tar emot authuser och returnerar inget
  login: (user: AuthUser) => void;
// en funktion som loggar ut användaren och returnerar inget
  logout: () => void;
}

// skapar contexten med createContext, anger att typen
// antingen är authcontexttype, som jag definierade ovan
// eller undefined.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
