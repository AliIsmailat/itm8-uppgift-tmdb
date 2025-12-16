// usecontext är en hook som används för att hämta värden
// som har skapats med createcontext.
import { useContext } from "react";

import { AuthContext } from "./authContext";

// skapar en custom hook, vilket är en vanlig
// funktion som kan använda andra hooks.
// gör det enklare att komma åt context i komponenter utan
// att behöva skriva useContext(AuthContext) varje gång.
export function useAuth() {
    // hämtar värdet av context, context blir nu 
    // ett objekt med user, login och logout
  const context = useContext(AuthContext);

//ser till att custom hooken används inom AuthProvider
//så att den inte är undefined, om detta händer, felmeddelande
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}



// summan av kardemumman: 

// context gör att data är globalt och 
// att komponenter kan renderas om individuellt
// när datan uppdateras. 
// 
// authprovider förser komponenter med datan, 
// useAuth är en simplified funktion som 
// jag har skapat men som egentligen 
// använder useContext för att få data från authprovider
// och gör att man inte ständigt behöver skriva 
// useContext(AuthContext) varje gång.