# Projekt - Kurslista
Akademiskolan är ett fiktivt lärosäte, och denna webbplats är skapad som en del av ett utbildningsprojekt. Applikationen är byggd med TypeScript och Angular och syftar till att visa ett kursutbud och ge användaren möjlighet att sätta ihop ett personligt ramschema. Webbplatsen består av tre sidor: en startsida som som introducerar webbplatsens funktioner med en hero-sektion och visuell presentation, en kurssida där användaren kan filtrera, sortera och bläddra bland alla tillgängliga kurser samt en ramschemasida med valda kurser presenteras, inklusive total poängberäkning och möjlighet att ta bort kurser.

---

## Komponent: Kurssidan (`course-page.component.ts`)
Kurssidan ansvarar för:
- Hämtning av kursdata via `CourseService`
- Filtrering (sökterm + ämne)
- Sortering (kurskod, namn, poäng, ämne)
- Pagination med sidstorlek 5–100
- Visuell effekt vid "Lägg till kurs"
- Statistikruta: antal valda kurser + total hp

Data skickas till en tabellstruktur och kontrolleras med inbyggd sortering, navigering och filtrering. Kurser kan läggas till ramschemat med knapptryck.

---

## Komponent: Ramschemasidan (`schema-page.component.ts`)
- Visar valda kurser från `localStorage` (via `SchemaService`)
- Sammanställer totalt antal kurser och högskolepoäng
- Möjlighet att ta bort enskilda kurser eller tömma allt
- Kurskort visas i ett grid-layout

Sidan innehåller ingen pagination eller filtrering, vilket var ett medvetet val.

---

## Komponent: Startsidan (`home-page.component.ts`)
En enkel men visuell introduktionssida:
- Hero-bildspel med rubrik och call-to-action-knapp
- Introduktionstext
- Funktionella ikoner med animation
- Kontaktinformation
- Helt responsiv

---

## Modell: Kurs (`course.ts`)
Definierar kursens struktur:
- courseCode
- subject
- courseName
- points
- syllabus (URL)
- etc.

---

## Service: `CourseService`
- Hämtar kurslistan från JSON-filen (lokalt i `assets`)
- Returnerar en Observable för prenumeration i komponenter

---

## Service: `SchemaService`
Hanterar allt kring användarens ramschema:
- `addCourse(course)`
- `removeCourse(code)`
- `getSchema()`
- Internt användande av `localStorage` för att spara/bibehålla ramschemat mellan sessioner

---

## Komponent: Filterpanel (`course-filter.component.ts`)
- Ger användaren möjlighet att:
  - Söka via fritext
  - Filtrera på ämne
  - Sortera efter olika kolumner
- Har visuell dropdown med pilikon
- Triggerar `filterChanged`-event till föräldrakomponent

---

## Komponent: Kurskort (`course-card.component.ts`)
Används i framtida designförbättringar. Förberett med struktur för att kunna visa varje kurs som ett separat kort.

---

## Extra funktionalitet
Följande valfria funktioner har implementerats utöver grundkraven:

**Paginering av kurser**
- Med valbara alternativ: 5, 10, 20, 30, 50, 100 kurser/sida.
- Användaren kan växla sidantal, se aktuell sida och navigera framåt/bakåt.

**Statistikruta i kurssidan**
- Visar: antal valda kurser i ramschemat och deras totala högskolepoäng i realtid ovanför tabellen.

**Startsida som separat undersida**
- Hero-bild, introtext, funktionsikoner, kontaktfält m.m.
- Detta är en **tredje** sida utöver de två som krävs (kurser + schema)

**Visuell animation vid "Lägg till" kurs**
- När en kurs läggs till i ramschemat visas och får knappen status “Tillagd” och ändrar utseende med en kort animationseffekt på knappen för att förstärka användarinteraktionen (en slags highlight blink-effekt används).

**Mörkt läge**
- Växla mellan ljust och mörkt tema med knapp i navigationsmenyn som sparar användarens val och även gäller för hela webbplatsen.

