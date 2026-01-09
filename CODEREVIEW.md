# Codereview

Slänger in lite kommentarer här som är värt att ha i åtanke

## Att tänka på
- Testa din design i mobilt läge och se över vilka förbättringar du kan göra. Din navbar bland annat blir inte optimal
- Kolla din Output och ESLint och se om du har några errors där som gör att din linting inte fungerar. Bra att få igång den så den fångar saker man lätt glömmer.

## Favorites.tsx
- se över din useEffect och vad den gör. jag får varning på setFavoriteMovies([]); 
(Error: Calling setState synchronously within an effect can trigger cascading renders) 
React 19.2 har introducerat useEffectEvent() som kan användas här för att avhjälpa felet.

## ActorMovies.tsx
- din scroll borde du kunna göra som en egen komponent och återanvända i MovieCast.tsx
- ScrollButtons komponenten borde du oxå kunna göra generisk och återanvända.

## AuthContext.tsx
- När du fått rätt på din eslint så bör du få varning på din usEffect och anropet till setUser(). Se över hur du kan refaktorisera.
- Nu sätter du din user här vilket är bra. Se till så att din app bara använder denna och inte getCurrentUser() i dina komponenter.

## MovieComments.tsx
- likeComment och dislikeComment gör liknande logik. se om du kan dela denna logik lite smartare.
- deleteComment bör ha en "Är du säker..." confirm innan den tas bort. Anses som "good practice" vid delete funktioner.

## CommentItem.tsx
- denna komponent har väldigt många props. behövs alla? kan nån logik flyttas in i komponenten istället?

## commentStorage.tsx
- ser en c: any deklaration. försök undvik att ange any som typ. det orsakar oftast problem i förlängningen.

## Navbar.tsx
- i funktion handleLanguageChange bör du använda din Language typ när du gör din type assertion
- darkMode styrs härifrån vilket är korrekt. men logiken kring att styra det borde ligga i en egen hook så blir den mer generisk och du separerar koden på ett mer logiskt sätt.

## useTranslation.ts
- behövs denna? ser att den inte används än, men vet inte hur du tänkt.


## TODO:
- Lägg in hantering av språk
- Lägg till hantering av "dark mode", dvs så man kan byta mellan ljust/mörkt tema.
- Lägg in en meny i din header som en s.k. drawer (framförallt i mobilt läge)
- Lägg till filter på sökning. T.ex. filtrera på genre.
- Lägg till funktion för att byta vy (rutnät/lista) på sökresultat.
- Lägg gärna in en utility funktion (förslagsvis en hook) som hanterar läsa/skriva till local storage

- Kika på React Routers Data Mode hantering https://reactrouter.com/start/data/installation och framförallt hur du kan applicera Data Loading via loader.
  Ett smidigt sätt att läsa in data till din route utan att behöva göra det i din view komponent.
- Kika på React hooks och se om du har nån del av din applikation som du skulle kunna göra om till hooks.