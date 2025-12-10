# Codereview

Slänger in lite kommentarer här som är värt att ha i åtanke

## Att tänka på
- Testa din design i mobilt läge och se över vilka förbättringar du kan göra. Din navbar bland annat blir inte optimal

## Navbar.tsx
- useEffect behövs inte. om du vill använda user i din lokala state så sätt den direkt i din useState(getCurrentUser())
- fundera oxå på om din lokala state behövs här? vad gör du med din user i komponenten.
- se till så att användarens namn visas direkt när man loggat in (nu måste man ladda om sidan)

## Favorites.tsx
- se över din useEffect och vad den gör. jag får varning (Error: Calling setState synchronously within an effect can trigger cascading renders) 
på dina setState() anrop. React 19.2 har introducerat useEffectEvent() som kan användas här för att avhjälpa felet.

## MovieDetails.tsx
- flytta in Cast headern in i din MovieCast komponent.

## ActorMovies.tsx
- din scroll borde du kunna göra som en egen komponent och återanvända i MovieCast.tsx
- ScrollButtons komponenten borde du oxå kunna göra generisk och återanvända.



## TODO:
- Lägg in hantering av språk
- Lägg till hantering av "dark mode", dvs så man kan byta mellan ljust/mörkt tema.

- Fundera tills nästa avstämning hur du kan implementera Reacts createContext och vad det skulle kunna användas till.