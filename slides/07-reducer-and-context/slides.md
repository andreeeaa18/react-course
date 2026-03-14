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
favicon: './react.svg'
---

# useReducer și Context
Gestionarea state-ului la scară

<div class="absolute top-2 right-2 w-8 h-8">
<GithubLink repo="https://github.com/cristi-usm/react-course" />
</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Problema cu useState complex

:: content ::

<div class="text-lg space-y-4">

Pe măsură ce o aplicație crește, logica de **state** devine tot mai complexă.

```jsx
// Trei handler-e separate pentru aceeași listă de task-uri
function handleAddTask(text) {
  setTasks([...tasks, { id: nextId++, text, done: false }]);
}
function handleChangeTask(task) {
  setTasks(tasks.map(t => t.id === task.id ? task : t));
}
function handleDeleteTask(taskId) {
  setTasks(tasks.filter(t => t.id !== taskId));
}
```

<AdmonitionType type="warning" class="mt-4">

Când avem **mulți handler-e** care modifică același state, codul devine greu de urmărit și de întreținut.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Todo list cu useState

:: content ::

<TodoListState />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Problema: logică răspândită

:: content ::

<div class="text-base space-y-3">

Fiecare interacțiune a utilizatorului apelează un **handler separat** care modifică direct state-ul:

<div class="grid grid-cols-3 gap-3 mt-2">

<div class="bg-red-50 rounded-lg p-3 border border-red-200 text-center">
<div class="text-2xl mb-1">➕</div>
<div class="font-semibold text-sm text-red-700">handleAddTask</div>
<div class="text-xs text-red-500 mt-1">setTasks([...tasks, newTask])</div>
</div>

<div class="bg-red-50 rounded-lg p-3 border border-red-200 text-center">
<div class="text-2xl mb-1">✏️</div>
<div class="font-semibold text-sm text-red-700">handleToggleTask</div>
<div class="text-xs text-red-500 mt-1">setTasks(tasks.map(...))</div>
</div>

<div class="bg-red-50 rounded-lg p-3 border border-red-200 text-center">
<div class="text-2xl mb-1">🗑️</div>
<div class="font-semibold text-sm text-red-700">handleDeleteTask</div>
<div class="text-xs text-red-500 mt-1">setTasks(tasks.filter(...))</div>
</div>

</div>

<AdmonitionType type="warning" class="mt-3">

Pe măsură ce aplicația crește: mai multe acțiuni → mai mulți handler-e → logica de state este **răspândită** în tot componenta, greu de testat și de urmărit.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Conceptul: State Centralizat cu Reducer

:: content ::

<div class="flex justify-center items-center mt-2">
<div class="grid items-center justify-items-center" style="grid-template-columns: 1fr 72px 1fr; grid-template-rows: auto 72px auto; width: 580px;">

  <!-- TL: UI + Interacțiunea -->
  <div class="bg-sky-50 rounded-2xl p-4 border-2 border-sky-300 text-center w-full">
    <div class="text-2xl">🖥️🖱️</div>
    <div class="font-bold text-sky-700 text-sm mt-1">UI & Interacțiunea</div>
    <div class="text-sky-400 text-xs mt-0.5">utilizatorul vede și acționează</div>
  </div>

  <!-- TC: → (UI → dispatch) -->
  <div class="flex flex-col items-center gap-0.5">
    <div class="text-xs text-slate-400 font-medium">acțiune</div>
    <div class="text-2xl text-violet-400 font-bold">→</div>
  </div>

  <!-- TR: dispatch -->
  <div class="bg-violet-50 rounded-2xl p-4 border-2 border-violet-300 text-center w-full">
    <div class="text-2xl">📨</div>
    <div class="font-bold text-violet-700 text-sm mt-1">dispatch(action)</div>
    <div class="text-violet-400 text-xs mt-0.5 font-mono">{ type: 'added' }</div>
  </div>

  <!-- ML: ↑ (State → UI) -->
  <div class="flex flex-col items-center gap-0.5">
    <div class="text-2xl text-orange-400 font-bold">↑</div>
    <div class="text-xs text-slate-400 font-medium">re-render</div>
  </div>

  <!-- MC: centru -->
  <div class="text-center text-xs text-slate-300 font-bold leading-tight">
    ↺<br/>ciclu
  </div>

  <!-- MR: ↓ (dispatch → reducer) -->
  <div class="flex flex-col items-center gap-0.5">
    <div class="text-2xl text-emerald-400 font-bold">↓</div>
    <div class="text-xs text-slate-400 font-medium">procesează</div>
  </div>

  <!-- BL: State -->
  <div class="bg-orange-50 rounded-2xl p-4 border-2 border-orange-400 text-center w-full">
    <div class="text-2xl">📦</div>
    <div class="font-bold text-orange-700 text-sm mt-1">State</div>
    <div class="text-orange-400 text-xs mt-0.5">memorat de React</div>
  </div>

  <!-- BC: ← (reducer → state) -->
  <div class="flex flex-col items-center gap-0.5">
    <div class="text-2xl text-emerald-400 font-bold">←</div>
    <div class="text-xs text-slate-400 font-medium">noul state</div>
  </div>

  <!-- BR: Reducer -->
  <div class="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-400 text-center w-full">
    <div class="text-2xl">⚙️</div>
    <div class="font-bold text-emerald-700 text-sm mt-1">Reducer</div>
    <div class="text-emerald-500 text-xs mt-0.5 font-mono">reducer(state, action)</div>
  </div>

</div>
</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Soluția: useReducer

:: content ::

<div class="text-lg space-y-4">

**useReducer** consolidează toată logica de update a state-ului într-o singură funcție externă.

**Migrarea se face în 3 pași:**

<div class="grid grid-cols-3 gap-4 mt-4">

<div class="bg-sky-50 rounded-lg p-4 border border-sky-200">

**Pasul 1**

Înlocuiești `setState(...)` cu apeluri `dispatch(action)`

</div>

<div class="bg-sky-50 rounded-lg p-4 border border-sky-200">

**Pasul 2**

Scrii **funcția reducer** care primește state și action și returnează noul state

</div>

<div class="bg-sky-50 rounded-lg p-4 border border-sky-200">

**Pasul 3**

Folosești hook-ul `useReducer` în loc de `useState` în component

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Pasul 1: Dispatch în loc de setState

:: content ::

<div class="text-lg space-y-4">

În loc să apelezi direct setter-ul, **dispatch-uiești un action** — un obiect care descrie ce a făcut utilizatorul.

```jsx
// ❌ Înainte: setState direct
function handleAddTask(text) {
  setTasks([...tasks, { id: nextId++, text, done: false }]);
}

// ✅ După: dispatch cu un action object
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}
```

<AdmonitionType type="tip" class="mt-2">

Numele unui action descrie **ce a făcut utilizatorul**, nu ce trebuie să se schimbe în state. De exemplu: `'added'`, `'changed'`, `'deleted'`.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce este un Action?

:: content ::

<div class="text-lg space-y-4">

Un **action** este un obiect JavaScript simplu care descrie o intenție de modificare a state-ului.

```jsx
// Acțiunea de adăugare
dispatch({ type: 'added', id: 1, text: 'Cumpără lapte' });

// Acțiunea de modificare
dispatch({ type: 'changed', task: { id: 1, text: 'Cumpără lapte bio', done: false } });

// Acțiunea de ștergere
dispatch({ type: 'deleted', id: 1 });
```

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="bg-sky-50 rounded-lg p-4 border border-sky-200">

**Convenții:**
- Câmpul `type` este un string descriptiv
- Restul câmpurilor conțin datele necesare
- Convențional se numesc în format `'entitate/acțiune'` sau simplu `'acțiune'`

</div>

<div class="bg-amber-50 rounded-lg p-4 border border-amber-200">

**Principiu cheie:**

Un singur `dispatch` poate declanșa orice modificare complexă — reducerele știu ce să facă pe baza `type`-ului.

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Pasul 2: Funcția Reducer

:: content ::

<div class="text-base space-y-3">

Reducerele primesc **state-ul curent** și **action-ul** și returnează **noul state**. Toată logica trăiește într-un singur `switch`:

```jsx
function tasksReducer(tasks, action) {
  switch (action.type) {

    case 'added':
      return [...tasks, { id: action.id, text: action.text, done: false }];

    case 'toggled':
      return tasks.map(t =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );

    case 'deleted':
      return tasks.filter(t => t.id !== action.id);

    default:
      throw Error('Acțiune necunoscută: ' + action.type);
  }
}
```

<AdmonitionType type="warning" class="mt-2">

Reducerele **nu modifică** state-ul existent — returnează întotdeauna un **obiect nou** (`[...tasks]`, `tasks.map(...)`, `tasks.filter(...)`).

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Pasul 3: Hook-ul useReducer

:: content ::

<div class="text-base space-y-4">

Înlocuiești `useState` cu `useReducer`, transmițând ca argumente **funcția reducer** și **state-ul inițial**:

```jsx
import { useReducer } from 'react';

// În loc de: const [tasks, setTasks] = useState(initialTasks);
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
//     ↑ state   ↑ funcția dispatch   ↑ reducer        ↑ valoare inițială
```

Handler-ele devin simple apeluri `dispatch` — fără logică de state:

```jsx
// Adaugă
dispatch({ type: 'added', id: nextId++, text });

// Bifează / debifează
dispatch({ type: 'toggled', id: task.id });

// Șterge
dispatch({ type: 'deleted', id: task.id });
```

<AdmonitionType type="tip" class="mt-2">

`dispatch` nu se schimbă niciodată între render-uri — React îl garantează **stabil**, similar cu setter-ul de la `useState`.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Todo list cu useReducer

:: content ::

<TaskManagerReducer />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# useState vs useReducer

:: content ::

<div class="grid grid-cols-5 gap-2 text-xs">

<div class="font-bold text-slate-500 text-center pb-1"></div>
<div class="col-span-2 bg-sky-100 rounded-lg p-2 text-center font-bold text-sky-700">useState</div>
<div class="col-span-2 bg-emerald-100 rounded-lg p-2 text-center font-bold text-emerald-700">useReducer</div>

<div class="font-semibold text-slate-600 flex items-center">Cod</div>
<div class="col-span-2 bg-sky-50 rounded-lg p-2 border border-sky-200">Mai puțin cod inițial — setter direct</div>
<div class="col-span-2 bg-emerald-50 rounded-lg p-2 border border-emerald-200">Mai mult cod, dar reduce duplicarea când mulți handler-e modifică același state</div>

<div class="font-semibold text-slate-600 flex items-center">Lizibilitate</div>
<div class="col-span-2 bg-sky-50 rounded-lg p-2 border border-sky-200">Ușor de citit pentru updates simple</div>
<div class="col-span-2 bg-emerald-50 rounded-lg p-2 border border-emerald-200">Separă clar <em>ce s-a întâmplat</em> (handler) de <em>cum se schimbă</em> state-ul (reducer)</div>

<div class="font-semibold text-slate-600 flex items-center">Debugging</div>
<div class="col-span-2 bg-sky-50 rounded-lg p-2 border border-sky-200">Greu de urmărit unde și de ce s-a setat greșit state-ul</div>
<div class="col-span-2 bg-emerald-50 rounded-lg p-2 border border-emerald-200">Adaugi un <code>console.log</code> în reducer și vezi fiecare update cu action-ul care l-a cauzat</div>

<div class="font-semibold text-slate-600 flex items-center">Testare</div>
<div class="col-span-2 bg-sky-50 rounded-lg p-2 border border-sky-200">Logica e cuplată cu componenta — mai greu de testat izolat</div>
<div class="col-span-2 bg-emerald-50 rounded-lg p-2 border border-emerald-200">Funcție pură independentă — o poți exporta și testa separat, fără a monta componenta</div>

<div class="font-semibold text-slate-600 flex items-center">Preferință</div>
<div class="col-span-4 bg-amber-50 rounded-lg p-2 border border-amber-200 text-center">Ambele sunt echivalente — poți folosi chiar și <code>useState</code> și <code>useReducer</code> împreună în același component</div>

</div>

<AdmonitionType type="tip" class="mt-3">

Folosește `useReducer` dacă întâlnești frecvent buguri din cauza unor actualizări greșite de state și vrei să introduci mai multă structură în cod.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Reguli pentru Reducers

:: content ::

<div class="grid grid-cols-3 gap-4 text-sm">

<div class="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200">
<div class="text-2xl mb-2">✅</div>
<div class="font-bold text-emerald-700 mb-2">Funcții pure</div>

Același input produce **întotdeauna** același output. Reducerele nu au efecte secundare.

```jsx
// ✅ Corect
case 'added':
  return [...tasks, newTask];
```

</div>

<div class="bg-red-50 rounded-xl p-4 border-2 border-red-200">
<div class="text-2xl mb-2">❌</div>
<div class="font-bold text-red-700 mb-2">Fără mutații</div>

Nu modifica state-ul existent — returnează **obiecte noi**.

```jsx
// ❌ Greșit
case 'added':
  tasks.push(newTask);
  return tasks;
```

</div>

<div class="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
<div class="text-2xl mb-2">🚫</div>
<div class="font-bold text-amber-700 mb-2">Fără side effects</div>

Fără `fetch`, `setTimeout`, sau alte operații asincrone în reducer.

```jsx
// ❌ Greșit
case 'added':
  fetch('/api/tasks', ...);
  return [...tasks, newTask];
```

</div>

</div>

<AdmonitionType type="important" class="mt-4">

React rulează reducerele de **două ori în development** (Strict Mode) tocmai pentru a detecta mutații accidentale.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# 🔍 Deep Dive: De ce se numesc „Reducers"?

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div class="space-y-3">

Deși reducerele pot **reduce** cantitatea de cod din componentă, numele vine de la operația `reduce()` pe array-uri:

```js
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce(
  (result, number) => result + number
);
// acumulează: 1 → 3 → 6 → 10 → 15
```

Funcția transmisă ca argument lui `reduce` se numește tot **„reducer"**: primește **rezultatul de până acum** și **elementul curent**, returnând **următorul rezultat**.

<AdmonitionType type="tip">

Reducerele React funcționează identic: primesc **state-ul de până acum** și **action-ul curent**, returnând **noul state**.

</AdmonitionType>

</div>

<div class="space-y-3">

Poți chiar simula ce face React intern — aplici un array de actions cu `reduce()`:

```js
import tasksReducer from './tasksReducer.js';

const initialState = [];
const actions = [
  { type: 'added', id: 1, text: 'Vizitează muzeul' },
  { type: 'added', id: 2, text: 'Spectacol de păpuși' },
  { type: 'deleted', id: 1 },
  { type: 'added', id: 3, text: 'Zidul Lennon' },
];

// Fiecare action "acumulează" o nouă versiune a state-ului
const finalState = actions.reduce(tasksReducer, initialState);
// → [{ id: 2, ... }, { id: 3, ... }]
```

<AdmonitionType type="note">

Nu vei face asta în practică — dar exact **asta face React** intern la fiecare `dispatch`.

</AdmonitionType>

</div>

</div>

---
layout: section
color: sky-light
---

# Context
Transmite date în adâncime fără `prop drilling`

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Problema: Prop Drilling

:: content ::

<div class="flex gap-8 items-start justify-center">

<!-- Arborele vizual -->
<div class="flex flex-col items-center" style="min-width: 200px">

  <!-- App -->
  <div class="rounded-xl px-5 py-3 border-2 border-sky-400 bg-sky-50 text-center" style="width:180px">
    <div class="font-bold text-sky-700 text-sm">App</div>
    <div class="text-xs text-sky-500 font-mono mt-0.5">theme = "dark" </div>
  </div>

  <!-- linie + label -->
  <div class="flex flex-col items-center">
    <div class="w-px h-3 bg-red-300"></div>
    <div class="text-xs font-mono text-red-400 bg-red-50 border border-red-200 rounded px-1">theme={theme}</div>
    <div class="w-px h-3 bg-red-300"></div>
    <div class="text-red-400 text-sm">▼</div>
  </div>

  <!-- Section -->
  <div class="rounded-xl px-5 py-3 border-2 border-slate-300 bg-slate-50 text-center" style="width:180px">
    <div class="font-bold text-slate-500 text-sm">Section</div>
    <div class="text-xs text-slate-400 mt-0.5">nu folosește </div>
  </div>

  <div class="flex flex-col items-center">
    <div class="w-px h-3 bg-red-300"></div>
    <div class="text-xs font-mono text-red-400 bg-red-50 border border-red-200 rounded px-1">theme={theme}</div>
    <div class="w-px h-3 bg-red-300"></div>
    <div class="text-red-400 text-sm">▼</div>
  </div>

  <!-- Card -->
  <div class="rounded-xl px-5 py-3 border-2 border-slate-300 bg-slate-50 text-center" style="width:180px">
    <div class="font-bold text-slate-500 text-sm">Card</div>
    <div class="text-xs text-slate-400 mt-0.5">nu folosește </div>
  </div>

  <div class="flex flex-col items-center">
    <div class="w-px h-3 bg-red-300"></div>
    <div class="text-xs font-mono text-red-400 bg-red-50 border border-red-200 rounded px-1">theme={theme}</div>
    <div class="w-px h-3 bg-red-300"></div>
    <div class="text-red-400 text-sm">▼</div>
  </div>

  <!-- Button -->
  <div class="rounded-xl px-5 py-3 border-2 border-emerald-400 bg-emerald-50 text-center" style="width:180px">
    <div class="font-bold text-emerald-700 text-sm">Button </div>
    <div class="text-xs text-emerald-600 font-mono mt-0.5">folosește theme!</div>
  </div>

</div>

<!-- Explicatie -->
<div class="flex flex-col gap-3 text-sm pt-2" style="max-width: 320px">

  <div class="bg-sky-50 rounded-xl p-3 border border-sky-200">
    <span class="font-bold text-sky-700">App</span> deține data — <code>theme</code> trăiește aici.
  </div>

  <div class="bg-slate-50 rounded-xl p-3 border border-slate-200">
    <span class="font-bold text-slate-600">Section</span> și <span class="font-bold text-slate-600">Card</span> sunt <em>curieri</em> — primesc <code>theme</code> doar ca să îl transmită mai departe, fără să îl folosească.
  </div>

  <div class="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
    <span class="font-bold text-emerald-700">Button</span> este singurul care chiar are nevoie de <code>theme</code>.
  </div>

  <AdmonitionType type="warning">
  Cu cât arborele e mai adânc, cu atât mai multe componente devin „curieri" inutili. Orice redenumire a prop-ului necesită modificări în <strong>toate</strong> nivelurile.
  </AdmonitionType>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Prop Drilling — cum arată în cod

:: content ::

<div class="text-sm space-y-3">

`theme` există în `App` și este necesar doar în `Button` — dar trebuie declarat ca prop în **fiecare componentă intermediară**:

```jsx
// App deține data și o trimite în jos
function App() {
  const [theme, setTheme] = useState('dark');
  return <Section theme={theme} />;         // ← transmite mai departe
}

// Section nu folosește theme — îl primește doar ca să îl pase
function Section({ theme }) {
  return <Card theme={theme} />;            // ← transmite mai departe
}

// Card la fel — un simplu curier
function Card({ theme }) {
  return <Button theme={theme} />;          // ← transmite mai departe
}

// Button este singurul care chiar are nevoie de theme ✅
function Button({ theme }) {
  return (
    <button style={{ background: theme === 'dark' ? '#1e293b' : '#f1f5f9' }}>
      Click
    </button>
  );
}
```

<AdmonitionType type="warning" class="mt-2">

Dacă vrem să redenumim `theme` în `colorScheme`, trebuie să modificăm **toate** cele 4 componente. Există o soluție mai bună.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Înainte să folosești Context

:: content ::

<div class="text-sm space-y-3">

Context este puternic, dar **nu este întotdeauna soluția potrivită**. Încearcă mai întâi aceste alternative:

<div class="grid grid-cols-2 gap-4 mt-2">

<div class="bg-sky-50 rounded-xl p-4 border-2 border-sky-200">
<div class="font-bold text-sky-700 mb-2">1. Transmite propurile explicit</div>

Dacă datele trec prin câteva componente, propurile explicite fac fluxul de date **vizibil și ușor de urmărit**.

```jsx
// Chiar și 3-4 niveluri sunt ok
<Section>
  <Card theme={theme} />
</Section>
```

</div>

<div class="bg-violet-50 rounded-xl p-4 border-2 border-violet-200">
<div class="font-bold text-violet-700 mb-2">2. Compune cu <code>children</code></div>

Dacă `Layout` nu folosește `posts`, de ce îl primește? Treci direct `<Posts>` ca `children` — `Layout` nu mai știe nimic despre date:

```jsx
// ❌ Layout e curier — primește posts doar ca să le dea mai departe
function Layout({ posts }) {
  return <div><Posts posts={posts} /></div>;
}
<Layout posts={posts} />

// ✅ Layout afișează orice îi dai ca children — nu știe de posts
function Layout({ children }) {
  return <div>{children}</div>;
}
<Layout>
  <Posts posts={posts} />
</Layout>
```

</div>

</div>

<AdmonitionType type="tip" class="mt-3">

Folosește Context **doar dacă** niciuna din variantele de mai sus nu funcționează bine pentru cazul tău.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
margin: none
---

:: title ::
# Soluția: Context în 3 Pași

:: content ::

```jsx
import { createContext, useContext, useState } from 'react';

// ─── 1️⃣ CREEAZĂ contextul ────────────────────────────────────────────────────
const ThemeContext = createContext('light');

// ─── 2️⃣ FURNIZEAZĂ contextul sus în arbore ───────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Section />  {/* nu primește niciun prop */}
    </ThemeContext.Provider>
  );
}
// Componentele intermediare nu știu nimic despre context (nu transmite niciun prop)
function Section() { return <Card />; }
function Card() { return <Button />; }

// ─── 3️⃣ CONSUMĂ contextul oriunde în arbore ──────────────────────────────────
function Button() {
  const theme = useContext(ThemeContext);  // ← accesează direct valoarea din context
  return <button className={theme}>Click</button>;
}
```

<AdmonitionType type="tip" class="mt-3">

Față de prop drilling, `Section` și `Card` **nu mai știu nimic** despre `theme` — contextul sare direct de la `App` la `Button`.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Pasul 1: createContext

:: content ::

<div class="text-sm space-y-4">

Creezi contextul apelând `createContext` cu o **valoare implicită** — folosită doar când nu există niciun provider deasupra:

```jsx
import { createContext } from 'react';

// Valoarea implicită e folosită doar fără Provider
export const ThemeContext = createContext('light');
export const UserContext  = createContext(null);
export const LevelContext = createContext(1);
```

<div class="grid grid-cols-2 gap-4 mt-2">

<div class="bg-sky-50 rounded-xl p-4 border border-sky-200">

**Convenții:**
- Definit de obicei într-un **fișier separat** (`ThemeContext.js`)
- Exportat ca named export pentru a putea fi importat de oricine
- Numele convențional: `XxxContext`

</div>

<div class="bg-amber-50 rounded-xl p-4 border border-amber-200">

**Valoarea implicită:**
- Activă **doar** când componenta nu are niciun provider părinte
- Utilă pentru testarea componentelor în izolare
- Nu înlocuiește un provider — e doar un fallback

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Pasul 2: Furnizează Contextul

:: content ::

<div class="text-sm space-y-4">

Înfășori componenta (sau întreaga aplicație) cu contextul ca tag JSX și furnizezi valoarea prin prop-ul `value`:

```jsx
import { useState } from 'react';
import { ThemeContext } from './ThemeContext';

export default function App() {
  const [theme, setTheme] = useState('light');

  return (
    // Toate componentele din interior pot citi `theme`
    <ThemeContext.Provider value={theme}>
      <Header />
      <Main />
      <Footer />
    </ThemeContext.Provider>
  );
}
```

<div class="grid grid-cols-2 gap-4">

<div class="bg-emerald-50 rounded-xl p-3 border border-emerald-200">

**Provider-ul poate fi oriunde** — la nivel de aplicație, de pagină, sau doar pentru o secțiune din UI.

</div>

<div class="bg-violet-50 rounded-xl p-3 border border-violet-200">

**Valoarea e dinamică** — când `theme` se schimbă, toate componentele care consumă contextul se re-renderizează automat.

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# 🔍 React 18 vs React 19 — Sintaxa Provider

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div class="bg-slate-50 rounded-xl p-5 border-2 border-slate-300">
<div class="font-bold text-slate-600 mb-3 text-base">React 18 și mai vechi</div>

Provider-ul necesită sufixul `.Provider`:

```jsx
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>
```

</div>

<div class="bg-sky-50 rounded-xl p-5 border-2 border-sky-400">
<div class="font-bold text-sky-700 mb-3 text-base">React 19+ ✨</div>

Contextul funcționează direct ca tag JSX:

```jsx
<ThemeContext value={theme}>
  <App />
</ThemeContext>
```

</div>

</div>

<AdmonitionType type="warning" class="mt-5">

Sandpack (editorul interactiv din aceste slide-uri) rulează **React 18** — folosește sintaxa cu `.Provider`. În proiectele nou create cu sintaxa React 19 utilizați noua metodă.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Pasul 3: Consumă Contextul

:: content ::

<div class="text-sm space-y-4">

Orice component descendent poate citi valoarea cu `useContext`, **indiferent cât de adânc** se află în arbore:

```jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Button({ children }) {
  // Citește tema din contextul cel mai apropiat deasupra
  const theme = useContext(ThemeContext);

  return (
    <button className={theme === 'dark' ? 'btn-dark' : 'btn-light'}>
      {children}
    </button>
  );
}
```

<AdmonitionType type="tip" class="mt-2">

`useContext` caută întotdeauna **cel mai apropiat provider** din arbore — dacă ai providere imbricate, câștigă cel mai din interior. Exact ca moștenirea în CSS.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Theme cu Context

:: content ::

<ThemeContextDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Cazuri de utilizare pentru Context

:: content ::

<div class="grid grid-cols-2 gap-4 text-sm">

<div class="space-y-3">

<div class="bg-sky-50 rounded-xl p-3 border border-sky-200">
<div class="font-bold text-sky-700 mb-1">🎨 Personalizare (theming)</div>
Tema vizuală (dark/light mode) furnizată la nivel de aplicație și consumată de orice component UI.
</div>

<div class="bg-violet-50 rounded-xl p-3 border border-violet-200">
<div class="font-bold text-violet-700 mb-1">👤 Utilizatorul curent</div>
Datele utilizatorului autentificat disponibile peste tot fără a le transmite manual prin fiecare componentă.
</div>

</div>

<div class="space-y-3">

<div class="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
<div class="font-bold text-emerald-700 mb-1">🔗 Routing</div>
Rutele și navigarea (React Router folosește context intern pentru a transmite locația curentă).
</div>

<div class="bg-amber-50 rounded-xl p-3 border border-amber-200">
<div class="font-bold text-amber-700 mb-1">⚙️ State management complex</div>
Un reducer combinat cu context înlocuiește soluții externe precum Redux pentru aplicații medii.
</div>

</div>

</div>

<div class="mt-4">

<AdmonitionType type="important" >

Context **nu este** un înlocuitor pentru toate propurile. Dacă datele sunt folosite doar de 2–3 componente apropiate, propurile explicite sunt mai clare.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Context și Re-renderizarea

:: content ::

<div class="text-sm space-y-3">

Când valoarea unui context se schimbă, **toate componentele care consumă acel context se re-renderizează** — chiar dacă ele nu folosesc partea care s-a schimbat.
Dacă ești abonat la un newsletter, primești tot e-mailul chiar dacă te interesează doar o secțiune. React nu știe ce anume dintr-un context folosești — dacă valoarea contextului s-a schimbat, ești notificat.

```jsx
const AppContext = createContext();

// Ambele componente sunt consumatori — ambele se re-renderizează
// când valoarea contextului se schimbă, chiar dacă Sidebar
// nu folosește deloc `theme`
function Header() {
  const { theme } = useContext(AppContext); // ← folosește theme
  return <header className={theme}>...</header>;
}

function Sidebar() {
  const { openModal } = useContext(AppContext); // ← nu îi pasă de theme
  return <button onClick={openModal}>Menu</button>; // ← dar tot se re-renderizează!
}
```

<AdmonitionType type="warning">

Context-ul este simplu de folosit, dar **greșelile de performanță sunt invizibile** — aplicația funcționează corect, dar face muncă inutilă la fiecare update.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Greșeala comună: Obiect ca valoare

:: content ::

<div class="text-sm space-y-3">

Cel mai frecvent anti-pattern: furnizezi direct un **obiect** ca valoare de context.

<div class="grid grid-cols-2 gap-4">

<div class="bg-red-50 rounded-xl p-4 border-2 border-red-300">
<div class="font-bold text-red-700 mb-2">❌ Problemă</div>

```jsx
function App() {
  const [user, setUser] = useState(null);

  return (
    // La fiecare render al lui App se creează
    // un obiect NOU → toți consumatorii se
    // re-renderizează, chiar dacă user
    // nu s-a schimbat deloc!
    <UserContext.Provider value={{ user, setUser }}>
      <Page />
    </UserContext.Provider>
  );
}
```

</div>

<div class="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-300">
<div class="font-bold text-emerald-700 mb-2">✅ Soluție: două contexte</div>

```jsx
// Context separat pentru date (se poate schimba)
const UserContext = createContext();
// Context separat pentru acțiuni (stabil)
const UserActionsContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserActionsContext.Provider value={setUser}>
      <UserContext.Provider value={user}>
        <Page />
      </UserContext.Provider>
    </UserActionsContext.Provider>
  );
}
```

</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Soluția: Separă State de Acțiuni

:: content ::

<div class="text-sm space-y-4">

Regula de bază: **un context pentru date, un context pentru funcții**.

<div class="grid grid-cols-2 gap-4">

<div class="bg-sky-50 rounded-xl p-4 border border-sky-200">
<div class="font-bold text-sky-700 mb-2">Context pentru state</div>

Conține **datele** — se schimbă când state-ul se actualizează. Componentele care citesc date se re-renderizează când datele se schimbă. Comportament normal și așteptat.

```jsx
const UserContext = createContext();
// consumator: orice component care afișează date
const user = useContext(UserContext);
```

</div>

<div class="bg-violet-50 rounded-xl p-4 border border-violet-200">
<div class="font-bold text-violet-700 mb-2">Context pentru acțiuni</div>

Conține **dispatch / callbacks** — referințe **stabile**, nu se schimbă între render-uri. Componentele care doar declanșează acțiuni **nu se re-renderizează** când datele se schimbă.

```jsx
const UserActionsContext = createContext();
// consumator: butoane, formulare — nu afișează date
const dispatch = useContext(UserActionsContext);
```

</div>

</div>

<AdmonitionType type="tip">

`useReducer` este partenerul perfect: `dispatch` este **întotdeauna stabil** (nu se schimbă între render-uri). Dacă pui `dispatch` într-un context separat, componentele care doar trimit acțiuni nu se re-renderizează niciodată inutil.

</AdmonitionType>

</div>
---
layout: section
color: sky-light
---

# useReducer + Context

State management complet și complex pentru aplicații web

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# De ce le combinăm?

:: content ::

<div class="text-sm space-y-3">

`useReducer` și Context rezolvă două probleme diferite — combinate, acoperă tot ce ai nevoie pentru state management la nivel de aplicație.

<div class="grid grid-cols-2 gap-4 mt-2">

<div class="bg-sky-50 rounded-xl p-4 border-2 border-sky-200">
<div class="font-bold text-sky-700 mb-2">useReducer — logica</div>

Centralizează toată logica de state într-o funcție pură. Handleri complexi devin acțiuni simple: `dispatch({ type: 'added', text })`.

**Problemă rămasă**: `tasks` și `dispatch` trebuie transmise ca props prin fiecare componentă intermediară.

</div>

<div class="bg-violet-50 rounded-xl p-4 border-2 border-violet-200">
<div class="font-bold text-violet-700 mb-2">Context — distribuția</div>

Elimină prop drilling — orice componentă din arbore poate citi `tasks` sau apela `dispatch` direct, fără să primească props de la părintele său.

**Problemă rămasă**: logica de state e răspândită prin mai multe fișiere.

</div>

</div>

<AdmonitionType type="tip">

**Combinate**: reducer-ul gestionează logica într-un singur loc, iar context-ul o distribuie în tot arborele — fără prop drilling, fără biblioteci externe.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Pasul 1: Două Contexte Separate

:: content ::

<div class="text-sm space-y-3">

Creezi două contexte: unul pentru **date** (state), unul pentru **acțiuni** (dispatch).

```jsx
import { createContext } from 'react';

// Contextul pentru lista de task-uri (date)
export const TasksContext = createContext(null);

// Contextul pentru dispatch (acțiuni)
export const TasksDispatchContext = createContext(null);
```

<div class="grid grid-cols-2 gap-4 mt-1">

<div class="bg-sky-50 rounded-xl p-3 border border-sky-200">

**`TasksContext`** — consumat de componentele care **afișează** date. Se re-renderizează când lista se schimbă.

</div>

<div class="bg-violet-50 rounded-xl p-3 border border-violet-200">

**`TasksDispatchContext`** — consumat de componentele care **trimit acțiuni**. `dispatch` este stabil → nu cauzează re-renderizări inutile.

</div>

</div>

<AdmonitionType type="tip">

De obicei ambele contexte se exportă din același fișier (ex. `TasksContext.js`) împreună cu reducer-ul și provider-ul — tot state management-ul într-un singur loc.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Pasul 2: Provider Component

:: content ::

<div class="text-sm space-y-2">

Înfășori reducer-ul și ambele contexte într-un singur component `TasksProvider`:

<div class="grid grid-cols-2 gap-4">

```jsx
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer, initialTasks
  );
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```

```jsx
// App devine extrem de simplu:
export default function App() {
  return (
    <TasksProvider>
      <h1>Lista de task-uri</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```

</div>

<AdmonitionType type="tip">

`TasksProvider` ascunde complet detaliile de implementare — `App` nu știe nimic despre `useReducer`, contexte sau date inițiale.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Ce este un Custom Hook?

:: content ::

<div class="text-sm space-y-3 ns-c-tight">

Un **custom hook** este o funcție JavaScript care:
- începe cu prefixul **`use`** (obligatoriu)
- poate apela alți hooks (`useState`, `useContext`, etc.)
- extrage logică repetitivă sau complexă din componente

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  function increment() { setCount(c => c + 1); }
  function decrement() { setCount(c => c - 1); }
  function reset()     { setCount(initialValue); }

  return { count, increment, decrement, reset };
}

// Folosit în orice componentă:
function ScoreBoard() {
  const { count, increment, reset } = useCounter(0);
  return (
    <>
      <p>Scor: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}
```

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# De ce folosim Custom Hooks?

:: content ::

<div class="text-sm space-y-3">

<div class="grid grid-cols-2 gap-4">

<div class="bg-red-50 rounded-xl p-4 border-2 border-red-200">
<div class="font-bold text-red-700 mb-2">❌ Fără custom hook</div>

Fiecare componentă repetă aceeași logică de `useContext`:

```jsx
function AddTask() {
  const dispatch = useContext(TasksDispatchContext);
  // ...
}

function TaskList() {
  const tasks = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  // ...
}
```

Componenta cunoaște detaliul de implementare (`TasksContext`).

</div>

<div class="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200">
<div class="font-bold text-emerald-700 mb-2">✅ Cu custom hook</div>

Logica de acces e ascunsă în hook:

```jsx
function AddTask() {
  const dispatch = useTasksDispatch();
  // ...
}

function TaskList() {
  const tasks = useTasks();
  const dispatch = useTasksDispatch();
  // ...
}
```

Componenta nu știe că datele vin din Context.

</div>

</div>

<AdmonitionType type="important">

Custom hooks permit **schimbarea implementării** (ex. înlocuiești Context cu un alt sistem) fără a modifica nicio componentă UI.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Pasul 3: Custom Hooks

:: content ::

<div class="text-sm space-y-3">

Adaugă custom hooks în același fișier pentru un API curat:

```jsx
// Hook pentru citirea datelor
export function useTasks() {
  return useContext(TasksContext);
}

// Hook pentru trimiterea acțiunilor
export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
```

Componentele devin extrem de curate:

```jsx
function TaskList() {
  const tasks = useTasks();             // ← citește datele
  return <ul>{tasks.map(t => <Task key={t.id} task={t} />)}</ul>;
}

function AddTask() {
  const dispatch = useTasksDispatch();  // ← trimite acțiuni
  return (
    <button onClick={() => dispatch({ type: 'added', text: 'Task nou' })}>
      Adaugă
    </button>
  );
}
```

<AdmonitionType type="tip">

Custom hooks sunt opționale dar recomandate: simplifică importurile și ascund detaliile de implementare ale contextului.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Arhitectura finală

:: content ::

<div class="text-sm">

<div class="grid grid-cols-3 gap-3">

<div class="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
<div class="font-bold text-slate-600 mb-3 text-center">📁 TasksContext.js</div>
<div class="text-xs space-y-2">

<div class="text-slate-400 font-semibold uppercase tracking-wide text-[10px] mb-1">Contexte</div>
<div class="bg-white rounded p-2 border border-slate-200 font-mono">TasksContext</div>
<div class="bg-white rounded p-2 border border-slate-200 font-mono">TasksDispatchContext</div>

<div class="text-slate-400 font-semibold uppercase tracking-wide text-[10px] mt-2 mb-1">Reducer + Provider</div>
<div class="bg-white rounded p-2 border border-slate-200 font-mono">tasksReducer()</div>
<div class="bg-white rounded p-2 border border-slate-200 font-mono">TasksProvider</div>

<div class="text-slate-400 font-semibold uppercase tracking-wide text-[10px] mt-2 mb-1">Custom Hooks</div>
<div class="bg-white rounded p-2 border border-slate-200 font-mono">useTasks()</div>
<div class="bg-white rounded p-2 border border-slate-200 font-mono">useTasksDispatch()</div>

</div>
</div>

<div class="bg-sky-50 rounded-xl p-4 border-2 border-sky-200">
<div class="font-bold text-sky-700 mb-2 text-center">📱 App.js</div>
<div class="text-xs space-y-2">

```jsx
<TasksProvider>
  <AddTask />
  <TaskList />
</TasksProvider>
```

<div class="text-slate-500 mt-2">App nu știe nimic despre state sau reducer — doar compune UI-ul.</div>
</div>
</div>

<div class="bg-violet-50 rounded-xl p-4 border-2 border-violet-200">
<div class="font-bold text-violet-700 mb-2 text-center">🧩 Componente UI</div>
<div class="text-xs space-y-2">

```jsx
// Citesc date
const tasks = useTasks();

// Trimit acțiuni
const dispatch =
  useTasksDispatch();
```

<div class="text-slate-500 mt-2">Fiecare componentă cere exact ce are nevoie — nimic mai mult.</div>
</div>
</div>

</div>

<AdmonitionType type="important" class="mt-3">

Toată complexitatea state management-ului trăiește în **un singur fișier**. Restul aplicației consumă o interfață simplă prin custom hooks.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: useReducer + Context

:: content ::

<TaskAppCombined />
