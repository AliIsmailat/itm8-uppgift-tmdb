# Introduktion

Välkommen till itm8s LIA uppdrag!

## Korta drag

Ditt uppdrag blir att skapa en webapplikation som hämtar ut data från IMDB (https://imdbapi.dev/)
eller TMDB (https://developer.themoviedb.org/docs/getting-started) öppna API och presenterar det snyggt och responsivt.
Det är utformat vagt för att du ska kunna visa din förmåga att förstå uppgiften och tänka ut dina egna lösningar,
men också för att visa din förståelse att det kanske finns fler saker i uppgiften som du kan leverera.

## Frontend uppdrag (React frontend)

### Uppgifter

1. Skapa en React.js applikation, föreslagsvis med TypesScript support.
2. Skapa en API-service som hämtar data från någon av ovan API.
3. Gör en startsida med där du listar de 10 "hetaste" filmerna just nu. Man ska kunna söka på filmtitel för att hitta en film.
   Gör en detaljsida där du presenterar information om filmen och vilka skådespelare som är med. Gör även en sida där man kan se detaljer om
   en skådespelare.
4. Presentera denna data på ett logiskt och användarvändligt sätt. Var kreativ med hur det kan presenteras och vilken funktionalitet du tycker borde finnas.
5. Se till så att webapplikationen är responsiv och fungerar bra på olika typer av enheter.

## Att tänka på

Utför uppgiften så gott du kan, skriv i INSTRUCTIONS.md filen hur man startar och kör ditt system samt vilka krav som finns för att köra det.
Ta gärna med i din About.md hur du hade satt upp ditt system, vad du eventuellt inte hann med som du hade implementerat om du hade haft mer tid.

## När du är klar

Skicka ditt färdiga uppdrag till jakel@itm8.com


```
itm8-uppgift-tmdb
├─ .DS_Store
├─ eslint.config.js
├─ Frontend
│  └─ about.md
├─ index.html
├─ INSTRUCTIONS.md
├─ package-lock.json
├─ package.json
├─ postcss.config.cjs
├─ public
├─ README.md
├─ src
│  ├─ api
│  │  └─ tmdb.ts
│  ├─ App.tsx
│  ├─ components
│  │  ├─ BackButton.tsx
│  │  ├─ MovieCard.tsx
│  │  └─ SearchBar.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ ActorDetails.tsx
│  │  ├─ Home.tsx
│  │  └─ MovieDetails.tsx
│  └─ types
│     └─ types.ts
├─ tailwind.config.cjs
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```