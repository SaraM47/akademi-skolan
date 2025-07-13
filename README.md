# Projekt - Kurslista
Akademiskolan är ett fiktivt lärosäte, och denna webbplats är skapad som en del av ett utbildningsprojekt. Applikationen är byggd med TypeScript och Angular och syftar till att visa ett kursutbud och ge användaren möjlighet att sätta ihop ett personligt ramschema. Webbplatsen består av tre sidor: en startsida som som introducerar webbplatsens funktioner med en hero-sektion och visuell presentation, en kurssida där användaren kan filtrera, sortera och bläddra bland alla tillgängliga kurser samt en ramschemasida med valda kurser presenteras, inklusive total poängberäkning och möjlighet att ta bort kurser.

---

## Komponent: Kurssidan (`course-page.component.ts`)
Kurssidan har som ansvar att hämta kursdata från CourseService och presentera det i en strukturerad tabell. Här erbjuds användaren funktioner för att filtrera kurser baserat på fritext och ämne, samt möjlighet att sortera listan efter kurskod, kursnamn, antal poäng eller ämne. Dessutom hanteras paginering med ett valbart antal kurser per sida, från 5 upp till 100. När användaren klickar på "Lägg till" för att inkludera en kurs i sitt ramschema, visas en visuell animation som förstärker interaktionen. En realtidsuppdaterad statistikruta visar samtidigt antalet valda kurser samt den sammanlagda poängsumman. All interaktion sker utan sidomladdning och med fokus på användarupplevelse.

---

## Komponent: Ramschemasidan (`schema-page.component.ts`)
Ramschemasidan visar användarens valda kurser som hämtas från localStorage via SchemaService. Informationen presenteras i form av kort inom en grid-layout, där varje kort innehåller kursinformation samt en knapp för att ta bort kursen. Användaren kan även välja att rensa hela sitt ramschema med ett enda klick. Totalt antal kurser och summan av högskolepoängen summeras automatiskt. Sidan innehåller varken filtrering eller pagination, vilket är ett medvetet val för att hålla gränssnittet enkelt.

---

## Komponent: Startsidan (`home-page.component.ts`)
Startsidan fungerar som en visuell introduktion till webbplatsen. Den innehåller ett hero-segment med bildspel, rubrik och en tydlig call-to-action-knapp. Under detta följer en introduktionstext, sektioner med ikoner och animationer som beskriver funktionaliteten, samt kontaktinformation. Sidan är helt responsiv och fungerar sömlöst både på mobil och desktop, vilket skapar ett välkomnande första intryck för användaren.

---

## Modell: Kurs (`course.ts`)
Denna modell beskriver kursobjektets struktur och används i hela applikationen för typning. Den innehåller bland annat fälten courseCode, subject, courseName, points och syllabus. Dessa egenskaper möjliggör en enhetlig och typad hantering av kursdata i hela Angular-applikationen.

---

## Service: `CourseService`
CourseService ansvarar för att läsa in kurslistan från en lokal JSON-fil placerad i projektets assets-mapp. Tjänsten returnerar en Observable<Course[]> som kan användas av komponenter för att prenumerera på och hantera kursdatan på ett reaktivt sätt.

---

## Service: `SchemaService`
Denna service ansvarar för att hantera användarens ramschema. Genom metoder som addCourse(course), removeCourse(code) och getSchema() kan komponenter manipulera innehållet i schemat. All data lagras i localStorage för att bevaras mellan sessioner, och uppdateras i realtid vid varje ändring. Servicen säkerställer även att inga dubbletter kan läggas till.

---

## Komponent: Filterpanel (`course-filter.component.ts`)
Filterpanelen ger användaren kontroll över hur kurslistan visas. Den innehåller ett fritextfält för sökning, en ämnesdropdown för filtrering samt ett sorteringsval. En visuell dropdown pilikon visar tydligt att elementen är interaktiva. Varje gång användaren gör en ändring skickas en filterChanged-händelse till föräldrakomponenten, vilket uppdaterar kurslistan i realtid.

---

## Komponent: Kurskort (`course-card.component.ts`)
Kurskortskomponenten är framtagen för att kunna erbjuda ett alternativt grafiskt läge för kursvisning i framtida versioner. Den är förberedd med struktur och grundläggande styling för att kunna visa kursinformation som separata kort snarare än i tabellform.

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

**Mer utvecklat användargränssnitt och mer tilltalande grafisk design**
- Skulle nog kunna säga layout har bland annat interaktiva element, tydlig navigering, dropdown-menyer och realtidsuppdatering. Här gäller även slående visuellt intryck med enhetliga färger med åtanvänder en bestämd färgpalett, skuggor, ikoner, hero-bilder, responsiva layouter och smidig typografi.
