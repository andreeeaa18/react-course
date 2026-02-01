---
title: 'React Course'
theme: neversink
transition: slide-left
layout: cover
color: sky-light
info: 'React Course · Crudu Cristian · 2026'
lineNumbers: true
draw:
  enabled: true
favicon: '/react.svg'
---

## Introducere în Dezvoltarea Web Modernă

Fundamente, Ecosistem și Librării

<div class="absolute top-2 right-2 w-8 h-8">
<GithubLink repo="https://github.com/cristi-usm/react-native-course" />
</div>

<div class="abs-br mb-10 mr-4 opacity-50 text-sm">
  <a href="/">← Back to Hub</a>
</div>

---
layout: cover
align: c
color: sky-light
---


<SpeechBubble position="b" color="sky" shape="round" animation="float" textAlign="center" >

# Cum funcționează Web-ul?

Când introduci `google.com` și apeși Enter, ce se întâmplă de fapt în acele milisecunde?
</SpeechBubble>

---
layout: cover
---

![Arhitectura Web](/Components-of-Web-Application-Architecture.webp)

---
layout: top-title
align: c
color: sky-light
---

::title::
# Arhitectura Reală (Complexă)

::content::

Web-ul modern este un ecosistem vast de servicii interconectate.

<div class="grid grid-cols-2 gap-4 mt-4 ">
<div>

- **DNS Layers:** Rezolvarea numelor de domenii
- **Load Balancers:** Distribuirea traficului
- **CDNs:** Livrarea rapidă a conținutului static
- **Firewalls & Security:** Protecție împotriva atacurilor

</div>
<div>

- **Application Servers:** Logica de business
- **Microservicii:** Servicii modulare
- **Baze de Date:** SQL, NoSQL, Caching Layers
- **Workeri:** Procesare asincronă

</div>
</div>

<Admonition title="Important" color="sky-light" class="mt-4">

**Nu intrați în panică!** Pentru început, vom simplifica acest model drastic.

</Admonition>

---
layout: top-title-two-cols
columns: is-6
color: sky-light
align: c-lt-lt
---

:: title ::
# Modelul Simplificat: Client-Server

:: left ::

## 1. Clientul (Browser)

Dispozitivul care **cere** informația.

- **Actor:** Tu (utilizând Chrome, Firefox, Safari)
- **Acțiune:** Inițiază un **Request** (Cerere)
- **Rol:** Prezintă interfața utilizatorului


:: right ::

## 2. Serverul (Computer)

Computerul care **oferă** informația.

- **Actor:** Un computer puternic conectat 24/7
- **Acțiune:** Trimite un **Response** (Răspuns)
- **Content:** Fișiere HTML, CSS, JS, Imagini

:: default ::

<AdmonitionType type="tip" class="mt-4">
În esență, Web-ul este doar un set de computere care își trimit fișiere text între ele.
</AdmonitionType>

---
layout: top-title-two-cols
columns: is-6
color: sky-light
align: c-lt-lt
---

:: title ::

# HTTP: Limbajul Web-ului

Cum comunică Clientul cu Serverul? Prin **H**yper**T**ext **T**ransfer **P**rotocol.


:: left ::

### Request (Cerere)
Mesajul trimis de browser către server.
- **Metoda:** `GET` (dă-mi date), `POST` (ia datele astea)
- **URL:** Adresa resursei (`/index.html`)

:: right ::

### Response (Răspuns)
Ce primim înapoi.
- **Status Code:** - `200 OK` (Succes) ✅
  - `404 Not Found` (Lipsește) ❌
  - `500 Server Error` (Eroare) 🔥
- **Body:** Conținutul efectiv (HTML/JSON)

---
layout: cover
---

![Arhitectura Web](/http-request.webp)


---
layout: top-title
align: c
color: sky-light
---

::title::
# Frontend vs. Backend

::content::

<div class="grid grid-cols-2 gap-6 h-full items-stretch">

<InfoCard title="Frontend (Client-Side)">

Ceea ce vede și interacționează utilizatorul.

<div class="ns-c-tight">

- **Locație:** Rulează în browserul tău
- **Tehnologii:** HTML, CSS, JavaScript (React)
- **Responsabilitate:** UI, UX, Animații, Interactivitate

</div>

</InfoCard>

<InfoCard title="Backend (Server-Side)">

Logica "din spatele cortinei".

<div class="ns-c-tight">

- **Locație:** Rulează pe server
- **Tehnologii:** Node.js, Python, Java, SQL
- **Responsabilitate:** Baze de date, Autentificare, API-uri, Securitate

</div>

</InfoCard>

</div>

---
layout: top-title
align: c
color: sky-light
margin: tight
---

::title::
# Procesul de Randare în Browser

::content::

<script setup>
const browserSteps = [
  {
    title: 'Parsing HTML',
    description: 'Browserul citește textul HTML și îl transformă în obiecte.'
  },
  {
    title: 'DOM Creation',
    description: 'Construiește o structură arborescentă (Tree) a paginii. Aceasta este structura pe care React o va manipula.'
  },
  {
    title: 'CSSOM',
    description: 'Parsează stilurile CSS și le aplică pe arborele DOM.'
  },
  {
    title: 'Layout & Paint',
    description: 'Calculează poziția exactă a fiecărui element și "pictează" pixelii pe ecran.'
  },
  {
    title: 'JavaScript Execution',
    description: 'JS poate modifica DOM-ul în timp real, repornind procesul (aici intervine React).'
  }
]
</script>

<ProcessFlow :steps="browserSteps" />

<v-click>

<AdmonitionType type="tip" >

React optimizează acest proces folosind un <strong>Virtual DOM</strong> pentru a minimiza actualizările costisitoare ale DOM-ului real.

</AdmonitionType>
</v-click>

---
layout: section
color: sky-light
---

# Evoluția Web-ului

De la pagini statice la aplicații complexe.

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# 1990-1995: Web 1.0 - Era Statică

:: content ::

La început (1989-1991), Tim Berners-Lee a inventat Web-ul la CERN.

<div class="ns-c-tight">

**Caracteristici:**
- **Read-Only:** Utilizatorii doar consumau informație.
- **Tehnologii:** HTML, HTTP, URL.
- **Design:** Text simplu, link-uri albastre, fără imagini inițial (până la Mosaic în 1993).

</div>

<AdmonitionType type="note" class="mt-4">

**Fun Fact:**
Primul server web rula pe un computer NeXT cu un bilet lipit pe el: *"This machine is a server. DO NOT POWER IT DOWN!!"*

</AdmonitionType>

<AdmonitionType type="note" class="mt-4">

Site-urile erau practic documente digitale legate între ele (Hypertext). Nu existau baze de date conectate live sau logare.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# 1995-2000: Războiul Browserelor & Interactivitatea

:: content ::

<div class="grid grid-cols-3 gap-4 mt-4 mb-4">

<InfoCard title="JavaScript (1995)">

Creat de Brendan Eich în doar 10 zile la Netscape.
A permis elementelor să reacționeze la click-uri și input-uri fără a reîncărca pagina.

</InfoCard>

<InfoCard title="CSS (1996)">

Separarea conținutului (HTML) de prezentare (Design).
Paginile au început să arate mai bine, nu doar text negru pe fundal gri.

</InfoCard>

<InfoCard title="PHP & ASP">

**Server-Side Scripting:** Serverul putea acum să genereze HTML dinamic pe baza unei baze de date.

</InfoCard>

</div>

<AdmonitionType type="tip" class="mt-6">

Aceasta a fost perioada "Browser Wars" (Netscape vs Internet Explorer). Dezvoltatorii trebuiau să scrie cod diferit pentru fiecare browser.

</AdmonitionType>

---
layout: cover
---

![Arhitectura Web](/web1.jpg)

---
layout: top-title-two-cols
columns: is-6
align: c-lt-lt
color: sky-light
---

:: title ::
# 2000-2010: Web 2.0 & Era Dinamică

:: left ::

## Revoluția AJAX (2004-2005)
A permis paginilor să ceară date de la server în background, **fără refresh**.
- **Exemplu:** Google Maps, Gmail.

:: right ::

## jQuery (2006)
A salvat dezvoltatorii de incompatibilitățile dintre browsere, oferind o sintaxă simplă pentru manipularea DOM.

<div class="mt-4">

**Stack-ul Dominant (LAMP):**
Linux, Apache, MySQL, PHP.

Logica aplicației era 90% pe **Server** (Backend). Frontend-ul era doar "glazura" de pe tort.

</div>

:: default ::

Web-ul a devenit **Read-Write**. Utilizatorii nu doar citeau, ci creau conținut (Social Media, Bloguri, Wiki).

---
layout: cover
---

![Arhitectura Web](/web2.png)

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# 2010-Prezent: Era Modernă & SPAs

:: content ::

Odată cu lansarea iPhone (2007) și Node.js (2009), paradigma s-a schimbat complet.


<div class="grid grid-cols-2 gap-8 mt-6 text-left">

<div>

### Single Page Applications (SPA)
Nu mai cerem un HTML nou la fiecare click. Încărcăm o singură pagină, iar JavaScript (React/Angular/Vue) redesenează interfața instantaneu.

</div>

<div>

### Ecosistemul Modern
- **Node.js:** JavaScript rulează și pe server.
- **React (2013):** UI bazat pe Componente.
- **PWA:** Site-uri care se comportă ca aplicații native (offline, notificări).

</div>

</div>

<AdmonitionType type="tip" >

Astăzi, Frontend-ul nu mai este doar "design". Este o aplicație software complexă care rulează în browser. De aceea avem nevoie de **React**.

</AdmonitionType>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# De ce avem nevoie de un "Build Tool"?

:: content ::

Browserul este o mașinărie care înțelege doar **HTML, CSS și JavaScript (vanilla)**. React, însă, folosește concepte pe care browserul nu le poate rula direct.

<div class="grid grid-cols-2 gap-6 mt-4 mb-4">

<InfoCard title="Problema JSX">

JSX arată ca HTML, dar este JavaScript. Browserul va arunca o eroare de tip `SyntaxError` dacă încerci să-l rulezi direct.

</InfoCard>

<InfoCard title="Module NPM">

React și alte librării vin din `node_modules`. Browserul nu știe singur cum să găsească și să combine mii de fișiere mici într-o aplicație coerentă.

</InfoCard>

</div>

<v-click>

<AdmonitionType type="important" class="mt-6">
<strong>Transpilation & Bundling:</strong> Avem nevoie de o unealtă care să "traducă" codul nostru modern (JSX, TypeScript) în cod pe care orice browser îl poate înțelege.
</AdmonitionType>

</v-click>

---
layout: two-cols-title
columns: is-6
align: l-lt-lt
color: sky-light
---

:: title ::
# Webpack: Standardul care a definit Dezvoltarea Web

:: left ::

Timp de peste un deceniu, **Webpack** a fost motorul din spatele aproape fiecărei aplicații React (prin *Create React App*).

### Cum funcționa:
1. Analiza tot codul sursă.
2. Construia un grafic de dependențe.
3. **Bundling:** Comprimă totul într-un singur fișier gigant (`bundle.js`).
4. Trimitea fișierul către browser.

:: right ::

### Dezavantajul "Bottleneck"
Pe măsură ce aplicațiile au devenit complexe:
- **Pornirea serverului:** Putea dura minute (trebuia să proceseze totul *înainte* de start).
- Orice schimbare mică declanșa o re-procesare costisitoare.

<div class="mt-4 opacity-70 italic text-sm">
🐢 "Așteptăm să se termine build-ul..." era o frază comună în workflow-ul de zi cu zi.
</div>

---
layout: cover
---
![Webpack Bundling](/webpack.png)

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Vite: Paradigma Modernă

:: content ::

**Vite** (cuvântul francez pentru "rapid") a schimbat regulile jocului, profitând de capabilitățile browserelor moderne din 2026.

<CardContainer layout="grid-3" gap="20px">

<InfoCard title="Start Instant">

Vite nu face "bundle" în timpul dezvoltării. Folosește **Native ES Modules (ESM)**, permițând browserului să ceară doar fișierele necesare, exact când are nevoie de ele.

</InfoCard>

<InfoCard title="esbuild">

Partea de "pre-bundling" pentru dependențe este scrisă în **Go** (folosind *esbuild*), fiind de **10-100x** mai rapidă decât orice unealtă bazată pe JS.

</InfoCard>

<InfoCard title="Zero Lag">

Modificările de cod sunt reflectate **instantaneu** prin HMR, indiferent dacă ai 10 fișiere sau 10.000 în proiect.

</InfoCard>

</CardContainer>

<v-click>

<div class="mt-8 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded">
<strong>De ce este esențial azi?</strong> Vite elimină timpul mort dintre "am scris cod" și "văd rezultatul", transformând experiența de dezvoltare dintr-una frustrantă în una fluidă.
</div>

</v-click>

---
layout: default
---

# Comparație: Fluxul de Lucru

<div class="grid grid-cols-2 gap-10 h-64 items-center">

<div class="text-center">
  <div class="text-sm font-bold mb-2">Webpack (Legacy)</div>
  <div class="p-4 bg-gray-100 rounded border-2 border-dashed border-gray-400">
    Entry → Resolve → <strong>Transform & Bundle</strong> → Server Ready
  </div>
  <div class="mt-2 text-xs text-orange-600">Procesare liniară, greoaie</div>
</div>

<div class="text-center">
  <div class="text-sm font-bold mb-2">Vite (Modern)</div>
  <div class="p-4 bg-sky-100 rounded border-2 border-sky-400">
    Server Ready → <strong>Dynamic Imports (on-demand)</strong>
  </div>
  <div class="mt-2 text-xs text-emerald-600">Procesare la cerere, instantă</div>
</div>

</div>

<AdmonitionType type="tip" class="mt-10">
În proiectele noastre vom folosi <strong>Vite</strong> pentru a rula aplicațiile React, beneficiind de cea mai rapidă experiență de dezvoltare disponibilă în prezent.
</AdmonitionType>

---
layout: section
color: sky-light
---

# Aplicație Practică: Todo List

De la Vanilla JavaScript la React

---
layout: top-title
align: c
color: sky-light
margin: tighter
---

:: title ::
# Pas 1: Structura HTML de Bază

:: content ::

Să construim o aplicație Todo List pas cu pas. Începem cu structura HTML.

<TodoStep1 />

<AdmonitionType type="note" class="mt-4">
Avem un input pentru task-uri noi, un buton de adăugare și o listă goală unde vor apărea todo-urile.
</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
margin: tighter
---

:: title ::
# Pas 2: Adăugarea de Todo-uri

:: content ::

Acum adăugăm funcționalitatea de a crea todo-uri noi cu JavaScript vanilla.

<TodoStep2 />

<AdmonitionType type="important" class="mt-4">
<strong>Observație:</strong> Trebuie să selectăm manual elementele DOM, să creăm noduri noi cu <code>createElement</code>, să le modificăm și să le adăugăm în arbore.
</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
margin: tighter
---

:: title ::
# Pas 3: Marchează ca Finalizat

:: content ::

Adăugăm funcționalitatea de a marca todo-urile ca finalizate.

<TodoStep3 />

<AdmonitionType type="note" class="mt-4">
Fiecare todo primește un event listener pentru click. Trebuie să gestionăm manual clasa CSS.
</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
margin: tighter
---

:: title ::
# Pas 4: Ștergerea Todo-urilor

:: content ::

Versiunea completă cu funcționalitatea de ștergere.

<TodoStep4 />

---
layout: top-title
align: c
color: sky-light
margin: tighter
---

:: title ::
# Aceeași Aplicație în React

:: content ::

Să vedem cum arată același Todo List în React.

<TodoReact />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Comparație: Vanilla JS vs React

:: content ::

<div class="grid grid-cols-2 gap-8 mt-4">

<div class="space-y-4">

### Vanilla JavaScript

<div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">

**Cod Scris:** ~45 linii JavaScript

**Complexitate:**
- Manipulare manuală DOM
- `createElement` pentru fiecare element
- Event listeners individuali
- Gestionare imperativă a stării

**Probleme:**
- Cod verbos și repetitiv
- Dificil de întreținut
- Ușor de introdus bug-uri
- Nu scalează bine

</div>

</div>

<div class="space-y-4">

### React

<div class="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">

**Cod Scris:** ~30 linii JavaScript

**Simplitate:**
- Date = UI (declarativ)
- Un singur `useState`
- Fără manipulare DOM
- Actualizare automată

**Avantaje:**
- Cod concis și clar
- Ușor de înțeles
- Mentenabilitate ridicată
- Scalabil natural

</div>

</div>

</div>

<v-click>

<div class="mt-8 p-6 bg-sky-50 border-l-4 border-sky-500 rounded">

### De ce React?

În **Vanilla JS**, trebuie să gestionezi manual fiecare detaliu: crearea elementelor, adăugarea lor în DOM, actualizarea lor, ștergerea lor.

În **React**, tu doar declari **cum ar trebui să arate UI-ul bazat pe date**, iar React se ocupă automat de tot restul.

**Formulă:** `UI = f(state)` - Interfața este o funcție pură a stării aplicației.

</div>

</v-click>

---
transition: slide-left
layout: cover
color: sky-light
---

## Recapitulare Fundamente JavaScript

---
layout: top-title
align: c
color: sky-light
---
:: title ::

# Ce este JavaScript?

:: content ::

JavaScript (JS) este un limbaj de programare **interpretat**, **multi-paradigmă** (suportă programare imperativă, orientată pe obiecte și funcțională) și cu **tipizare dinamică**. Este "limbajul web-ului", dar popularitatea sa a explodat, fiind acum utilizat pe scară largă în diverse domenii.

<div class="grid grid-cols-3 gap-4 mt-8">
<div class="neversink-sky-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
<h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Front-End Web</h3>
<p class="text-sm">Cu librării precum React, Angular, Vue.</p>
</div>
<div class="neversink-sky-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
<h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Back-End</h3>
<p class="text-sm">Cu runtime-uri ca Node.js și Deno.</p>
</div>
<div class="neversink-sky-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
<h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Mobile (React Native)</h3>
<p class="text-sm">Scrii o singură bază de cod pentru iOS și Android.</p>
</div>
</div>

<br/>

<AdmonitionType type="info">

Conform sondajului Stack Overflow 2025, JavaScript este cel mai utilizat limbaj de programare pentru al 13-lea an consecutiv.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---
:: title ::

# Caracteristici Cheie

:: content ::

<div class="ns-c-tight">

- **Single-Threaded, Non-Blocking**: JavaScript execută codul pe un singur fir de execuție principal. Pentru a nu bloca acest fir cu operațiuni lente (ex: cereri de rețea), folosește un model asincron, non-blocant, bazat pe un "Event Loop".

- **Tipizare Dinamică**: Tipurile de date ale variabilelor nu sunt declarate explicit și se pot schimba pe parcursul execuției. `let x = 10;` (Number), apoi `x = 'salut';` (String) este valid.

- **Orientat pe Obiecte (bazat pe prototipuri)**: Aproape totul în JavaScript este un obiect. Moștenirea se realizează prin prototipuri, un mecanism flexibil, deși clasele (`class`) introduse în ES6 oferă o sintaxă mai familiară.

- **Funcțiile sunt "First-Class Citizens"**: Funcțiile sunt tratate ca orice altă valoare. Ele pot fi stocate în variabile, pasate ca argumente altor funcții și returnate din alte funcții.

</div>

---
layout: two-cols-title
left: 5
right: 7
color: sky-light
---

:: title ::

# Tipuri de Date

:: left ::

### Tipuri Primitive

Valorile primitive sunt **imutabile** (nu pot fi modificate direct).

<div class="ns-c-tight">

-   **`string`**: Pentru text.
-   **`number`**: Pentru numere (întregi sau cu virgulă mobilă).
-   **`boolean`**: `true` sau `false`.
-   **`null`**: Reprezintă intenționat absența unei valori.
-   **`undefined`**: O variabilă care a fost declarată, dar nu i s-a atribuit o valoare.
-   **`symbol`**: O valoare unică și imutabilă, adesea folosită ca și cheie pentru proprietățile obiectelor.
-   **`bigint`**: Pentru numere întregi de dimensiuni foarte mari.

</div>

:: right ::

### Tipuri de Referință (Obiecte)

Valorile de referință sunt **mutabile**.

<div class="ns-c-tight">

-   **`Object`**: Tipul fundamental, o colecție de perechi cheie-valoare.
    -   **`Array`**: Un tip special de obiect, folosit pentru liste ordonate.
    -   **`Function`**: Un obiect special care poate fi executat.
    -   Alte obiecte încorporate: `Date`, `RegExp`, `Map`, `Set`, etc.

</div>

---
layout: default
---

<JsTypesDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Structuri de Control

:: content ::

Sintaxa structurilor de control în JavaScript este foarte similară cu cea din limbajele familiei C (C++, Java, C#), ceea ce face tranziția mai ușoară pentru programatori.

<div class="grid grid-cols-2 gap-4 mt-4">
<div>

**Condiționale**
<div class="ns-c-tight">

- `if / else if / else`
- `switch`
- Operatorul ternar: `conditie ? valAdevarat : valFals`

</div>
</div>
<div>

**Bucle (Iterații)**
<div class="ns-c-tight">

- `for` (clasic, cu contor)
- `while` / `do...while`
- `for...of` (pentru iterabile: Array, String, Map)
- `for...in` (pentru proprietățile unui obiect)

</div>
</div>
</div>

<JsControlFlowDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Tablouri (Arrays)

:: content ::

Un `Array` este un obiect global folosit pentru a stoca o listă ordonată de date. Elementele pot fi de orice tip și pot fi accesate printr-un index numeric (începând de la 0).

Arrays-urile în JavaScript vin cu o multitudine de metode extrem de utile, în special cele funcționale care permit scrierea unui cod mai curat și declarativ.

**Metode esențiale în dezvoltarea cu React/React Native:**

<div class="ns-c-tight">

-   **`map()`**: Creează un nou array prin aplicarea unei funcții pe fiecare element al array-ului original. (Fundamental pentru a randa liste în JSX).
-   **`filter()`**: Creează un nou array cu toate elementele care trec un test (o funcție care returnează `true`).
-   **`reduce()`**: Aplică o funcție "acumulator" pe fiecare element pentru a reduce array-ul la o singură valoare.
-   **`forEach()`**: Execută o funcție pentru fiecare element, dar nu returnează un array nou.
-   **`find()`**: Returnează primul element care satisface o condiție.
-   **`includes()`**: Verifică dacă un array conține un anumit element.

</div>

---
layout: center
---

<JsArraysDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Obiecte

:: content ::

Obiectele sunt colecții de perechi **cheie-valoare**, unde cheile sunt `string`-uri (sau `Symbol`-uri), iar valorile pot fi de orice tip, inclusiv alte obiecte sau funcții. Obiectele sunt fundamentale pentru structurarea datelor în JavaScript.

Proprietățile pot fi accesate în două moduri:
<div class="ns-c-tight">

-   **Dot Notation** (Notația cu punct): `obiect.proprietate` - simplu și lizibil.
-   **Bracket Notation** (Notația cu paranteze dreptunghiulare): `obiect['proprietate']` - necesară când cheia este o variabilă sau conține caractere speciale.

</div>

<JsObjectsDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Funcții

:: content ::

Funcțiile sunt blocuri de cod reutilizabile. În JavaScript, ele sunt obiecte de primă clasă, ceea ce le conferă o flexibilitate deosebită.

Există mai multe moduri de a le declara:

<div class="grid grid-cols-3 gap-4 mt-4 ">
<div>
<h3 class="font-bold text-center">Declarație de Funcție</h3>
<p class="text-sm text-center">Disponibilă în tot scope-ul (hoisted).</p>

```js
function suma(a, b) {
  return a + b;
}
```

</div>
<div>
<h3 class="font-bold text-center">Expresie de Funcție</h3>
<p class="text-sm text-center">Atribuită unei variabile, nu este "hoisted".</p>

```js
const suma = function(a, b) {
  return a + b;
};
```

</div>
<div>
<h3 class="font-bold text-center">Funcție Săgeată (Arrow)</h3>
<p class="text-sm text-center">Sintaxă concisă, nu are propriul `this`.</p>

```js
const suma = (a, b) => a + b;
```

</div>
</div>
<br/>

<AdmonitionType type="tip">

Funcțiile săgeată (`arrow functions`) sunt extins utilizate în codul modern de React și React Native datorită sintaxei lor scurte și a modului în care gestionează contextul (`this`).

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Programare Asincronă

:: content ::

JavaScript este **single-threaded**, ceea ce înseamnă că poate face un singur lucru la un moment dat. Dacă o operațiune durează mult (ex: o cerere la un server), ar bloca întregul fir de execuție, iar interfața ar "îngheța".

Pentru a rezolva asta, JavaScript folosește un model **asincron**: inițiază operațiunea, continuă cu alte sarcini și execută o funcție (un "callback") atunci când operațiunea s-a finalizat. Acest proces este gestionat de **Event Loop**.

Trei modele principale sunt folosite pentru a gestiona asincronicitatea:

<div class="ns-c-tight">

-   **Callbacks**: Modelul original, dar poate duce la cod greu de citit ("Callback Hell") la operațiuni multiple.
-   **Promises**: Un obiect care reprezintă starea (pending, fulfilled, rejected) unei operațiuni asincrone. Permite înlănțuirea operațiunilor cu `.then()` și gestionarea erorilor cu `.catch()`.
-   **Async/Await**: "Zahăr sintactic" peste Promises, care permite scrierea codului asincron într-un stil care arată sincron, fiind mult mai lizibil.

</div>
---
layout: center
---

<JsAsyncDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Module ES6

:: content ::

Modulele permit împărțirea codului în fișiere separate și reutilizabile. Acest lucru ajută la organizare, mentenanță și evită poluarea scope-ului global. React Native folosește extensiv sistemul de module ES6.

Există două tipuri principale de exporturi:

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

### Exporturi Nume (`named exports`)

Poți exporta mai multe valori (funcții, variabile, clase) dintr-un singur fișier. La import, trebuie să folosești numele exacte, între acolade.

```js
// --- utils.js ---
export const PI = 3.14;

export function suma(a, b) {
  return a + b;
}

// --- app.js ---
import { PI, suma } from './utils.js';
console.log(suma(5, 10) * PI);
```

</div>
<div>

### Export Implicit (`default export`)

Poți exporta o singură valoare ca fiind "principalul" export al fișierului. La import, îi poți da orice nume dorești, fără acolade.

```js
// --- User.js ---
export default class User {
  constructor(nume) {
    this.nume = nume;
  }
}

// --- app.js ---
import Persoana from './User.js'; // Putem redenumi
const user = new Persoana('Mihai');
```
</div>
</div>
---
layout: top-title
align: c
color: sky-light
---
:: title ::

# Bunătăți ES6+ 

:: content ::

Versiunile moderne de JavaScript (începând cu ES6/2015) au adus multe îmbunătățiri sintactice care fac codul mai concis și mai expresiv.

<div class="ns-c-tight">

- **Destructurarea**: Extrage valori din array-uri sau proprietăți din obiecte direct în variabile. Esențial pentru lucrul cu props și state în React.

- **Operatori Spread (`...`) și Rest (`...`)**:
  - **Spread**: "Împrăștie" elementele unui array sau proprietățile unui obiect în altul (ex: pentru a face copii sau a combina).
  - **Rest**: "Adună" elementele rămase (ex: argumentele unei funcții) într-un array.

- **Scurtcircuitarea Logică (`&&`, `||`, `??`)**: Folosirea operatorilor logici pentru a controla fluxul. `&&` este des folosit pentru randare condiționată în JSX, iar `||` și `??` (nullish coalescing) pentru valori implicite.

</div>

---
layout: center
---

<JsES6Demo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Clase în JavaScript (ES6)

:: content ::

Introdusă în ECMAScript 2015 (ES6), sintaxa `class` este o modalitate mai clară și mai familiară de a crea obiecte și de a gestiona moștenirea în JavaScript.

<AdmonitionType type="info">

Este important de înțeles că clasele în JavaScript sunt în principal **"zahăr sintactic"** (`syntactic sugar`) peste sistemul existent de moștenire bazat pe prototipuri. Ele nu introduc un nou model de moștenire orientat pe obiecte, ci oferă o sintaxă mai simplă pentru a lucra cu prototipuri.

</AdmonitionType>

**Concepte Cheie:**

<div class="ns-c-tight">

- **`class`**: Cuvântul cheie pentru a declara o clasă.
- **`constructor`**: O metodă specială pentru crearea și inițializarea unui obiect creat cu o clasă.
- **`extends`**: Cuvântul cheie pentru a crea o subclasă (moștenire).
- **`super`**: Cuvântul cheie pentru a apela constructorul clasei părinte.
- **`static`**: Cuvântul cheie pentru a defini metode statice, care sunt apelate pe clasă, nu pe instanțe.

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Definirea unei Clase

:: content ::

O clasă este un șablon pentru crearea de obiecte. Ea încapsulează datele (proprietăți) și comportamentul (metode) specific obiectelor respective.

Metoda `constructor` este apelată automat atunci când se creează o nouă instanță a clasei folosind cuvântul cheie `new`. Aici se setează de obicei proprietățile inițiale ale obiectului.

---
layout: center
---

<div class="text-sm">

<JsClassesDemo />

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Moștenirea (`extends` și `super`)

:: content ::

Moștenirea permite unei clase (subclasă sau clasă derivată) să preia proprietățile și metodele unei alte clase (superclasă sau clasă de bază). Acest lucru promovează reutilizarea codului.

-   Cuvântul cheie **`extends`** este folosit în declarația clasei pentru a stabili relația de moștenire.
-   În interiorul `constructor`-ului subclasei, **`super()`** trebuie apelat *înainte* de a folosi `this`. `super()` apelează constructorul clasei părinte și leagă `this` corect.

---
layout: center
---

<JsInheritanceDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Metode Statice, Getters și Setters

:: content ::

Pe lângă metodele de instanță, clasele pot avea și membri speciali.

<div class="grid grid-cols-2 gap-8">
<div>

### Metode Statice (`static`)

O metodă statică este apelată direct pe clasă, nu pe o instanță a clasei. Este utilă pentru funcții utilitare care sunt legate de clasă, dar nu depind de o instanță specifică.

</div>
<div>

### Getters (`get`) și Setters (`set`)

Permit definirea unor proprietăți "calculate". Un `getter` este o funcție care returnează valoarea unei proprietăți, iar un `setter` este o funcție care actualizează valoarea unei proprietăți.

</div>
</div>

<div class="w-fit mx-auto">

<JsStaticDemo />

</div>
