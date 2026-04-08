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

# Performanța în React
De la re-render la React Compiler

<div class="absolute top-2 right-2 w-8 h-8">
<GithubLink repo="https://github.com/cristi-usm/react-course" />
</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# De ce contează performanța?

:: content ::

<div class="grid grid-cols-2 gap-8 text-base">

<div class="space-y-4 ns-c-tight">

**React este rapid implicit** — dar la scară mare, codul naiv creează probleme.

- Un **todo app** cu 10 elemente → fără probleme
- Un **dashboard** cu 10.000 de puncte de date → potențial lag
- Un **formular complex** cu sute de câmpuri → input lent

<AdmonitionType type="info">

**Frame budget**: Browserul încearcă să randeze **60 FPS** → deci ai **16ms** per frame. Dacă un render durează 50ms, utilizatorul simte lag-ul.

</AdmonitionType>

</div>

<div class="flex flex-col items-center gap-4 text-sm">

<div class="w-full bg-green-50 border-2 border-green-300 rounded-xl p-4 text-center">
  <div class="font-bold text-green-800">✅ Render rapid (3ms)</div>
  <div class="bg-green-400 h-3 rounded mt-2" style="width: 18%"></div>
  <div class="text-green-600 text-xs mt-1">Încape în 16ms</div>
</div>

<div class="w-full bg-red-50 border-2 border-red-300 rounded-xl p-4 text-center">
  <div class="font-bold text-red-800">❌ Render lent (50ms)</div>
  <div class="bg-red-400 h-3 rounded mt-2" style="width: 100%"></div>
  <div class="text-red-600 text-xs mt-1">Depășește 16ms → lag!</div>
</div>

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Render vs. Commit: Cele două faze

:: content ::

<div class="grid grid-cols-2 gap-6 text-base">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-5">

### 🔵 Faza de Render

- React **apelează funcțiile** componentelor tale
- Produce un **arbore virtual** (Virtual DOM)
- Este **pură** — nu atinge DOM-ul real
- Poate fi **abandonată** (concurrent mode)

```jsx
// Această funcție SE APELEAZĂ la fiecare render
function App() {
  const data = expensiveCalc(); // rulează AICI
  return <div>{data}</div>;    // produce JSX
}
```

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-5">

### 🟡 Faza de Commit

- React **compară** arborele nou cu cel vechi
- Aplică **doar diferențele** în DOM-ul real
- Actualizează **refs** și rulează **effects**
- Este **optimizată** — modificări minime

```jsx
// Doar CE S-A SCHIMBAT ajunge în DOM
// Dacă <div> avea "5" și acum are "6",
// React actualizează DOAR textul nodului
```

</div>

</div>

<AdmonitionType type="caution">

**Re-render ≠ actualizare DOM!** Un component se poate re-randa de 100 de ori fără nicio modificare vizibilă în pagină.

</AdmonitionType>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Virtual DOM și Reconciliation

:: content ::

<div class="text-base space-y-4">

**Reconciliation** = procesul prin care React decide CE trebuie schimbat în DOM.

<div class="grid grid-cols-3 gap-4 text-sm">

<div class="bg-sky-50 border-2 border-sky-200 rounded-xl p-4 text-center">
  <div class="font-bold text-sky-800 mb-2">1. Arborele vechi</div>
  <div class="text-left font-mono text-xs bg-white rounded p-2">
    &lt;div&gt;<br/>
    &nbsp;&nbsp;&lt;h1&gt;Salut&lt;/h1&gt;<br/>
    &nbsp;&nbsp;&lt;p&gt;Count: <span class="text-sky-600 font-bold">5</span>&lt;/p&gt;<br/>
    &lt;/div&gt;
  </div>
</div>

<div class="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-center">
  <div class="font-bold text-amber-800 mb-2">2. Arborele nou</div>
  <div class="text-left font-mono text-xs bg-white rounded p-2">
    &lt;div&gt;<br/>
    &nbsp;&nbsp;&lt;h1&gt;Salut&lt;/h1&gt;<br/>
    &nbsp;&nbsp;&lt;p&gt;Count: <span class="text-red-600 font-bold">6</span>&lt;/p&gt;<br/>
    &lt;/div&gt;
  </div>
</div>

<div class="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
  <div class="font-bold text-green-800 mb-2">3. Diff → DOM</div>
  <div class="text-left text-xs bg-white rounded p-2 space-y-1">
    <div class="text-gray-400">h1 → nicio schimbare ✓</div>
    <div class="text-green-700 font-bold">p → text: "5" → "6" ✏️</div>
    <div class="text-gray-400 mt-2">Rezultat: 1 singură<br/>operație DOM</div>
  </div>
</div>

</div>

React este "rapid **implicit**" — dar procesul de diffing consumă CPU proporțional cu **dimensiunea arborelui**. Cu cât ai mai multe componente, cu atât diff-ul durează mai mult.

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce declanșează un re-render?

:: content ::

<div class="grid grid-cols-3 gap-5 text-sm">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4">
  <div class="font-bold text-sky-800 text-base mb-2">1. setState / dispatch</div>
  <p>Când apelezi <code>setState</code> sau <code>dispatch</code>, componentul respectiv se re-randează.</p>

```jsx
const [count, setCount] = useState(0);
// Apelul setCount declanșează re-render
setCount(count + 1);
```

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
  <div class="font-bold text-amber-800 text-base mb-2">2. Părintele se re-randează</div>
  <p>Când un părinte se re-randează, <strong>TOȚI copiii</strong> se re-randează — indiferent de props!</p>

```jsx
function Parent() {
  const [x, setX] = useState(0);
  // Când x se schimbă:
  return <Child />; // se re-randează!
}
```

</div>

<div class="bg-rose-50 border-2 border-rose-300 rounded-xl p-4">
  <div class="font-bold text-rose-800 text-base mb-2">3. Context se schimbă</div>
  <p>Când valoarea unui <code>Context</code> se schimbă, toți consumatorii se re-randează.</p>

```jsx
// Toți useContext(ThemeCtx)
// se re-randează când
// valoarea ThemeCtx se schimbă
```

</div>

</div>

<AdmonitionType type="warning">

**Mit**: „React re-randează doar componentele ale căror props s-au schimbat" — **FALS!** 
<br/>React re-randează **TOȚI copiii** unui component re-randat, chiar dacă props sunt identice.

</AdmonitionType>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Cascada de re-render-uri

:: content ::

<div class="grid grid-cols-2 gap-8 text-base">

<div class="space-y-4">

Când `App` se re-randează, **întregul arbore** este afectat:

1. `App` apelează `setState` → se re-randează
2. `Sidebar` și `Main` sunt copii → se re-randează
3. `List` este copilul lui `Main` → se re-randează
4. Fiecare `Item` (×100) → se re-randează

**Rezultat**: 103 componente re-randate pentru o singură schimbare de state!

<AdmonitionType type="info">

Majoritatea randărilor sunt **rapide** (< 1ms). Problema apare când ai componente **costisitoare** sau **foarte multe** în cascadă.

</AdmonitionType>

</div>

<div class="flex flex-col items-center text-sm">

<div class="bg-red-100 border-2 border-red-400 rounded-xl px-6 py-2 font-bold text-red-800 mb-1">
  App (setState!) 🔄
</div>
<div class="w-px h-3 bg-red-300"></div>
<div class="flex gap-4">
  <div class="flex flex-col items-center">
    <div class="bg-red-50 border-2 border-red-300 rounded-lg px-4 py-1 text-red-700 mb-1">Sidebar 🔄</div>
  </div>
  <div class="flex flex-col items-center">
    <div class="bg-red-50 border-2 border-red-300 rounded-lg px-4 py-1 text-red-700 mb-1">Main 🔄</div>
    <div class="w-px h-3 bg-red-300"></div>
    <div class="bg-red-50 border-2 border-red-300 rounded-lg px-4 py-1 text-red-700 mb-1">List 🔄</div>
    <div class="w-px h-3 bg-red-300"></div>
    <div class="flex gap-2">
      <div class="bg-red-50 border border-red-200 rounded px-2 py-0.5 text-red-600 text-xs">Item 🔄</div>
      <div class="bg-red-50 border border-red-200 rounded px-2 py-0.5 text-red-600 text-xs">Item 🔄</div>
      <div class="bg-red-50 border border-red-200 rounded px-2 py-0.5 text-red-600 text-xs">×100</div>
    </div>
  </div>
</div>

</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Demo: Vizualizarea re-render-urilor

:: content ::

Scrie în input și observă cum **toate** componentele își incrementează contorul de randări — chiar și cele care nu primesc niciun prop legat de text!

<RenderCounterDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Când este o problemă?

:: content ::

<div class="grid grid-cols-2 gap-8 text-base">

<div class="space-y-3 ns-c-tight">

### **NU** e o problemă când:
- Componentul este **simplu** (< 1ms render)
- Arborele are **puține** componente
- Re-render-urile sunt **rare** (click, submit)

### **ESTE** o problemă când:
- Un component face **calcule costisitoare** la fiecare render
- **Sute/mii** de componente se re-randează inutil
- Re-render-urile sunt **frecvente** (typing, drag, scroll)

</div>

<div class="bg-sky-50 border-2 border-sky-200 rounded-xl p-5 space-y-3">

### Regula de aur

<div class="text-xl font-bold text-center text-sky-800 py-4">
  Măsoară mai întâi,<br/>optimizează după!
</div>

**Nu ghici** ce e lent — folosește **React DevTools Profiler** pentru a identifica componentele problematice.

<div class="text-sm text-sky-600 mt-2">

"Optimizarea prematură este rădăcina tuturor relelor." <br/>
— Donald Knuth

</div>

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# React DevTools Profiler

:: content ::

<div class="text-base space-y-4">

**React DevTools Profiler** este instrumentul principal pentru diagnosticarea problemelor de performanță.

<div class="grid grid-cols-2 gap-6 text-sm">

<div class="space-y-3 ns-c-tight">

### Cum se folosește:

1. Instalează **React Developer Tools** (extensie browser)
2. Deschide tab-ul **Profiler** în DevTools
3. Apasă **Record** ⏺️
4. Interacționează cu aplicația
5. Apasă **Stop** ⏹️
6. Analizează **flame chart**-ul

### Flame Chart:
- Fiecare **bară** = un component randat
- **Lățimea** = timpul de randare
- **Culoarea**: gri = rapid, galben/roșu = lent

</div>

<div class="space-y-3">

### Setări utile:

<div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">

**"Highlight updates when components render"**

Activează această opțiune pentru a vedea **vizual** care componente se re-randează (contur verde/galben în jurul lor).

</div>

<div class="bg-sky-50 border border-sky-200 rounded-lg p-3 text-sm">

**"Record why each component rendered"**

Afișează **motivul** re-randării: state changed, props changed, parent rendered, hooks changed.

</div>

</div>

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce să cauți în Profiler

:: content ::

<div class="grid grid-cols-3 gap-4 text-sm">

<div class="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
  <div class="font-bold text-amber-800 mb-2">🔍 Re-render-uri inutile</div>
  <p>Componente care se randează dar <strong>nu produc schimbări vizibile</strong>. Profiler-ul le arată ca bare gri.</p>
  <p class="mt-2 text-amber-600">→ Soluție: <code>React.memo</code></p>
</div>

<div class="bg-red-50 border-2 border-red-200 rounded-xl p-4">
  <div class="font-bold text-red-800 mb-2">🐌 Self-time ridicat</div>
  <p>Componente cu <strong>timp propriu mare</strong> (> 5ms). Înseamnă că fac calcule costisitoare în render.</p>
  <p class="mt-2 text-red-600">→ Soluție: <code>useMemo</code></p>
</div>

<div class="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
  <div class="font-bold text-purple-800 mb-2">⚡ Commit-uri frecvente</div>
  <p>Multe commit-uri la <strong>input rapid</strong> (typing, drag). Fiecare tastă declanșează un ciclu complet.</p>
  <p class="mt-2 text-purple-600">→ Soluție: debounce / <code>useDeferredValue</code></p>
</div>

</div>



---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce este memoizarea?

:: content ::

**Memoizarea** este o tehnică de optimizare care **cache-uiește rezultatul** unei funcții — dacă primește aceleași argumente, returnează direct rezultatul salvat fără să recalculeze.

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="bg-red-50 border-2 border-red-200 rounded-xl p-4">
  <div class="font-bold text-red-700 mb-2">❌ Fără memoizare</div>

```
calcul(5) → ... lucrează ... → 25   (200ms)
calcul(5) → ... lucrează ... → 25   (200ms)
calcul(5) → ... lucrează ... → 25   (200ms)
```

<p class="text-red-600 text-sm mt-2">Recalculează de fiecare dată, chiar dacă argumentele sunt identice.</p>
</div>

<div class="bg-green-50 border-2 border-green-200 rounded-xl p-4">
  <div class="font-bold text-green-700 mb-2">✅ Cu memoizare</div>

```
calcul(5) → ... lucrează ... → 25   (200ms)
calcul(5) → cache hit! → 25         (0ms)
calcul(5) → cache hit! → 25         (0ms)
```

<p class="text-green-600 text-sm mt-2">Calculează o singură dată, apoi returnează din cache.</p>
</div>

</div>

<AdmonitionType type="info" title="Unde folosim memoizarea în React?">

- **`React.memo`** — memoizează un **component** întreg (dacă props nu s-au schimbat, sare peste re-render)
- **`useMemo`** — memoizează o **valoare** (recalculează doar când dependențele se schimbă)
- **`useCallback`** — memoizează o **funcție** (păstrează aceeași referință între randări)

</AdmonitionType>


---
layout: section
color: sky-light
---

# React.memo
#### Evitarea re-render-urilor inutile


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Exemplul "rău": Lista lentă

:: content ::

Scrie rapid în input — lista de 200 de produse se re-randează la **fiecare tastă**, deși nu depinde de text!

<SlowListBadDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# De ce este lent?

:: content ::

<div class="text-base space-y-4">

Iată ce se întâmplă la **fiecare tastă**:

<div class="flex items-center gap-3 text-sm">
  <div class="bg-sky-100 border border-sky-300 rounded-lg px-3 py-2 font-mono">setText("a")</div>
  <span>→</span>
  <div class="bg-amber-100 border border-amber-300 rounded-lg px-3 py-2">App re-render</div>
  <span>→</span>
  <div class="bg-red-100 border border-red-300 rounded-lg px-3 py-2">ExpensiveList re-render</div>
  <span>→</span>
  <div class="bg-red-100 border border-red-300 rounded-lg px-3 py-2 font-bold">×200 Items! 💥</div>
</div>

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-sm">

### ❌ Problema

- `App` se re-randează (din cauza `setText`)
- `ExpensiveList` este copilul lui `App` → se re-randează **automat**
- Fiecare `Item` face un calcul costisitor
- **Nimic** din listă nu s-a schimbat — degeaba am calculat!

</div>

<div class="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-sm">

### ✅ Ce am vrea

- Când `text` se schimbă, doar input-ul să se actualizeze
- `ExpensiveList` primește aceleași `items` → **nu trebuie re-randată**
- Avem nevoie de un mecanism care să **compare props** și să **sară peste** re-render

</div>

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Soluția: React.memo

:: content ::

<div class="grid grid-cols-2 gap-6 text-base">

<div class="space-y-4">

`React.memo` învelește un component și îi spune lui React: **"Compară props — dacă nu s-au schimbat, sari peste re-render."**

```jsx
import { memo } from 'react';

// Fără memo: se re-randează la FIECARE render al părintelui
function ExpensiveList({ items }) {
  return items.map(item => /* ... */);
}

// Cu memo: se re-randează DOAR dacă items se schimbă
const ExpensiveList = memo(function ExpensiveList({ items }) {
  return items.map(item => /* ... */);
});
```

</div>

<div class="bg-sky-50 border-2 border-sky-200 rounded-xl p-4 text-sm space-y-3">

### Cum funcționează?

1. La fiecare render al părintelui, React verifică:
   **props noi === props vechi ?**

2. Comparație **shallow** (superficială):
   - Primitive: `5 === 5` ✅
   - Același obiect: `obj === obj` ✅
   - Obiect nou: `{a:1} === {a:1}` ❌

3. Dacă **toate** props sunt egale → **skip render**

<AdmonitionType type="warning">

Comparația `===` pentru obiecte verifică **referința**, nu conținutul!

</AdmonitionType>

</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Demo: Lista optimizată cu memo

:: content ::

Aceeași listă, dar acum `ExpensiveList` și `ExpensiveItem` sunt învelite în `React.memo`. Scrie rapid — **fără lag**!

<SlowListFixedDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Când folosim React.memo?

:: content ::

<div class="grid grid-cols-2 gap-6 text-base">

<div class="bg-green-50 border-2 border-green-200 rounded-xl p-5">

### ✅ Folosește memo când:

- Componentul se re-randează **des** cu **aceleași props**
- Randarea componentului este **costisitoare** (calcule, liste mari)
- Componentul este **adânc** în arborele de componente

```jsx
// Exemplu bun: listă de 500 elemente
const ProductList = memo(function ProductList({ products }) {
  return products.map(p => <ProductCard key={p.id} {...p} />);
});
```

</div>

<div class="bg-red-50 border-2 border-red-200 rounded-xl p-5">

### ❌ NU folosi memo când:

- Componentul este **simplu** și rapid
- Props se schimbă **mereu** (memo e inutil)
- Transmiți **obiecte/funcții noi** la fiecare render

```jsx
// Exemplu inutil: obiect nou la fiecare render!
<MemoizedChild config={{ theme: 'dark' }} />
// {theme:'dark'} !== {theme:'dark'} ← referință nouă!
// memo compară === și eșuează MEREU
```

</div>

</div>

<AdmonitionType type="caution">

**memo nu ajută** dacă transmiți obiecte sau funcții create inline! Pentru asta avem nevoie de `useMemo` și `useCallback`.

</AdmonitionType>


---
layout: section
color: sky-light
---

# useMemo
#### Memoizarea valorilor costisitoare


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Exemplul "rău": Calculul costisitor

:: content ::

Apasă **"Toggle tema"** și observă delay-ul — filtrul se recalculează deși nu s-a schimbat nimic în date! (Deschide Console pentru a vedea timpul.)

<ExpensiveCalcBadDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Problema: Recalculare la fiecare render

:: content ::

<div class="text-base space-y-4">

Funcțiile componentelor rulează **de la cap la coadă** la fiecare render. Orice calcul din interior se re-execută:

```jsx
function App() {
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Acest calcul rulează la FIECARE render — inclusiv la toggle dark mode!
  const filtered = expensiveFilter(items, query);
  //               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //               darkMode s-a schimbat, dar query NU — calcul pierdut!

  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle</button>
      <List items={filtered} />
    </div>
  );
}
```

- La calcule **ieftine** (< 1ms): nu contează
- La calcule **costisitoare** (filtrare 10.000 elemente, sortare complexă): pierdere vizibilă

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Soluția: useMemo

:: content ::

`useMemo` **cache-uiește rezultatul** unui calcul și îl recalculează **doar** când dependențele se schimbă.

```jsx
import { useMemo } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Recalculează DOAR când query se schimbă
  const filtered = useMemo(
    () => expensiveFilter(items, query),
    [query]  // dependențe
  );

  return <List items={filtered} />;
}
```


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# useMemo — sintaxă și reguli

:: content ::

<div class="grid grid-cols-3 gap-6 text-sm">

<div class="bg-sky-50 border-2 border-sky-200 rounded-xl p-4">
  <div class="font-bold text-sky-800 mb-2"> Sintaxa</div>

```jsx
const result = useMemo(
  () => computeValue(a, b),
  [a, b]
);
```
</div>

<div class="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 ns-c-tight">
  <div class="font-bold text-amber-800 mb-2"> Reguli</div>

- `[]` = calculează **o singură dată**
- `[a, b]` = recalculează la schimbare
- Fără array = **fără memoizare**
</div>

<div class="bg-green-50 border-2 border-green-200 rounded-xl p-4 ns-c-tight">
  <div class="font-bold text-green-800 mb-2"> Când folosești</div>

- Filtrare/sortare liste mari
- Calcule matematice complexe
- Obiecte stabile pentru `memo`
</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Demo: Calculul optimizat cu useMemo

:: content ::

Același exemplu, dar cu `useMemo`. Toggle-ul temei este **instant** — filtrul se recalculează doar când textul de căutare se schimbă.

<ExpensiveCalcFixedDemo />


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# useMemo pentru referințe stabile

:: content ::

<div class="text-base space-y-4">

Al doilea caz de utilizare: **stabilizarea referințelor** obiectelor transmise ca props.

<div class="grid grid-cols-2 gap-6 text-sm">

<div class="bg-red-50 border-2 border-red-200 rounded-xl p-4">

### ❌ Fără useMemo

```jsx
function App() {
  const [count, setCount] = useState(0);

  // Obiect NOU la fiecare render!
  const config = { theme: 'dark', size: 'lg' };

  // memo pe Chart e INUTIL — config e mereu nou
  return <Chart config={config} />;
}

const Chart = memo(function Chart({ config }) {
  // Se re-randează MEREU
  // config nou !== config vechi (referință!)
});
```

</div>

<div class="bg-green-50 border-2 border-green-200 rounded-xl p-4">

### ✅ Cu useMemo

```jsx
function App() {
  const [count, setCount] = useState(0);

  // Aceeași referință dacă theme și size nu se schimbă
  const config = useMemo(
    () => ({ theme: 'dark', size: 'lg' }),
    []  // nu depinde de nimic
  );

  // memo pe Chart FUNCȚIONEAZĂ acum!
  return <Chart config={config} />;
}

const Chart = memo(function Chart({ config }) {
  // Se re-randează DOAR dacă config se schimbă
});
```

</div>

</div>

</div>


---
layout: section
color: sky-light
---

# useCallback
#### Memoizarea funcțiilor


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Exemplul "rău": Funcția care "strică" memo

:: content ::

`TodoList` este învelit în `React.memo` — dar se re-randează la fiecare click pe **+1**! De ce?

<CallbackBadDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# De ce memo nu funcționează?

:: content ::

<div class="text-base space-y-4">

La **fiecare render**, toate funcțiile definite în component sunt **recreate** ca obiecte noi:

```jsx
function App() {
  // La FIECARE render, JavaScript creează o funcție NOUĂ
  const handleDelete = (id) => console.log('Șterg:', id);
  //    ^^^^^^^^^^^^^ referință nouă la fiecare render!

  // memo compară: handleDelete_nou === handleDelete_vechi → FALSE!
  return <TodoList onDelete={handleDelete} />;
}
```

<div class="grid grid-cols-2 gap-6 text-sm mt-4">

<div class="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
  <div class="font-bold text-red-800 mb-2">Render 1</div>
  <code class="text-xs">handleDelete = fn@0x001</code>
</div>

<div class="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
  <div class="font-bold text-red-800 mb-2">Render 2</div>
  <code class="text-xs">handleDelete = fn@0x002</code>
  <div class="text-red-600 text-xs mt-1">Referință diferită! memo eșuează.</div>
</div>

</div>

Chiar dacă **codul funcției** este identic, `() => {} !== () => {}` — sunt **obiecte diferite** în memorie.

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Soluția: useCallback

:: content ::

<div class="grid grid-cols-2 gap-6 text-base">

<div class="space-y-4">

`useCallback` returnează **aceeași referință** a funcției atâta timp cât dependențele nu se schimbă.

```jsx
import { useCallback } from 'react';

function App() {
  // Aceeași referință la fiecare render!
  const handleDelete = useCallback((id) => {
    console.log('Șterg:', id);
  }, []); // [] = funcția nu depinde de nimic

  // Acum memo funcționează!
  return <TodoList onDelete={handleDelete} />;
}
```

</div>

<div class="bg-sky-50 border-2 border-sky-200 rounded-xl p-4 text-sm space-y-3">

### Sintaxa

```jsx
const memoizedFn = useCallback(
  (args) => { /* logica */ },
  [dep1, dep2]  // recreează doar când deps se schimbă
);
```

### Echivalență

```jsx
// useCallback este un shortcut pentru:
useCallback(fn, deps)
// echivalent cu:
useMemo(() => fn, deps)
```

### Când să folosești:
- Funcții transmise ca **props** la componente `memo`
- Funcții folosite ca **dependențe** în `useEffect`
- Funcții transmise la **liste mari** de componente

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Funcția stabilizată cu useCallback

:: content ::

Acum `handleDelete` este stabilizat cu `useCallback`. Contorul TodoList **rămâne la 1** când apeși +1!

<CallbackFixedDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Relația memo + useMemo + useCallback

:: content ::

<div class="text-base space-y-4">

Cele trei instrumente formează un **sistem** — fiecare rezolvă o parte din puzzle:

<div class="grid grid-cols-3 gap-4 text-sm">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4">
  <div class="font-bold text-sky-800 text-base mb-2">React.memo</div>
  <p><strong>Ce face:</strong> Sare peste re-randarea unui <strong>component</strong> dacă props nu s-au schimbat.</p>
  <p class="mt-2"><strong>Aplică pe:</strong> component-ul copil</p>

```jsx
const Child = memo(function Child({ data }) {
  /* ... */
});
```

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
  <div class="font-bold text-amber-800 text-base mb-2">useMemo</div>
  <p><strong>Ce face:</strong> Cache-uiește o <strong>valoare</strong> și o recalculează doar când deps se schimbă.</p>
  <p class="mt-2"><strong>Aplică pe:</strong> date costisitoare / obiecte stabile</p>

```jsx
const data = useMemo(
  () => expensiveCalc(x),
  [x]
);
```

</div>

<div class="bg-green-50 border-2 border-green-300 rounded-xl p-4">
  <div class="font-bold text-green-800 text-base mb-2">useCallback</div>
  <p><strong>Ce face:</strong> Păstrează aceeași <strong>referință</strong> a funcției între randări.</p>
  <p class="mt-2"><strong>Aplică pe:</strong> funcții transmise ca props</p>

```jsx
const fn = useCallback(
  (id) => handleDelete(id),
  []
);
```

</div>

</div>

<AdmonitionType type="caution">

**Fără toate piesele, lanțul se rupe:** `memo` pe copil + obiect nou ca prop = memo inutil. Ai nevoie de `useMemo`/`useCallback` pe props **ȘI** `memo` pe copil.

</AdmonitionType>

</div>


---
layout: section
color: sky-light
---

# Alte pattern-uri de optimizare
#### Structură > Memoizare


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Pattern: State jos, nu sus

:: content ::

<div class="text-sm mb-3">

Cel mai simplu mod de a evita re-render-uri inutile: **mută state-ul mai jos în arbore**, lângă componentele care îl folosesc. Schimbă culoarea în ambele variante și compară contorul de randări!

</div>

<StateDownDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Pattern: children ca props

:: content ::

<div class="text-sm mb-3">

Când transmiți componente ca `children`, ele sunt **create de părinte** — nu de wrapper. Scroll-ează și observă: `ScrollTracker` se re-randează des, dar `HeavyContent` rămâne la **1 randare**!

</div>

<ChildrenPatternDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Virtualizarea listelor

:: content ::

<div class="grid grid-cols-2 gap-6 text-base">

<div class="space-y-4">

Pentru liste **foarte lungi** (1.000+ elemente), nu randa ce nu e vizibil!

**Conceptul**: Randează doar elementele din **viewport** + un buffer mic. În loc de 10.000 noduri DOM, ai ~20-30.

**Librării populare**:
- `react-window` — simplu, lightweight
- `@tanstack/virtual` — flexibil, modern
- `react-virtuoso` — autosize, grupare

</div>

<div class="space-y-3">

```jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  return (
    <List
      height={400}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].name}
        </div>
      )}
    </List>
  );
}
```

<div class="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">

**10.000 elemente** → doar **~15 noduri DOM** vizibile în orice moment. Performanță constantă indiferent de mărimea listei!

</div>

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# useDeferredValue

:: content ::

`useDeferredValue` spune lui React: **"Acest calcul poate aștepta — prioritizează input-ul utilizatorului!"** E alternativă nativă a Reactului la debounce — fără timere sau librării externe.

```jsx
import { useState, useDeferredValue, useMemo } from 'react';

function SearchResults({ items }) {
  const [query, setQuery] = useState('');

  // React prioritizează input-ul
  const deferredQuery = useDeferredValue(query);

  // Lista se actualizează cu delay
  const filtered = useMemo(
    () => items.filter(i => i.includes(deferredQuery)),
    [items, deferredQuery]
  );

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <List items={filtered} />
    </>
  );
}
```


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# useDeferredValue — cum funcționează?

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div>

**Cum funcționează:**
1. Utilizatorul scrie → `query` se actualizează **instant**
2. `deferredQuery` rămâne la valoarea **veche** temporar
3. React randează input-ul **imediat** (responsive)
4. Când are timp, actualizează `deferredQuery` → lista se filtrează

**Concurrent mode-aware** — React decide automat cât să amâne în funcție de cât de ocupat este.

</div>

<div>

**vs. Debounce:**

| | `useDeferredValue` | `debounce` |
|--|--|--|
| Timer fix | ❌ | ✅ (300ms) |
| Se adaptează | ✅ la CPU | ❌ |
| Cancellable | ✅ automat | Manual |
| React-aware | ✅ | ❌ |

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# useTransition

:: content ::

`useTransition` marchează anumite actualizări de state ca **non-urgente** — React le procesează în fundal, fără a bloca input-ul.

```jsx
import { useState, useTransition } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setQuery(e.target.value);           // Urgent: input imediat
    startTransition(() => {             // Non-urgent: rezultate în fundal
      setResults(searchItems(e.target.value));
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <p>Se caută...</p>}
      <List items={results} />
    </>
  );
}
```


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# useTransition — sintaxă și comparație

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div>

**Sintaxa:**

```jsx
const [isPending, startTransition] = useTransition();
```

- **`isPending`** — `true` cât timp tranziția e în curs (loading state)
- **`startTransition(fn)`** — marchează state updates din `fn` ca non-urgente

`useTransition` e ideal când **tu** controlezi setState-ul. `useDeferredValue` e ideal când primești valoarea ca **prop**.

</div>

<div>

**vs. useDeferredValue:**

| | `useTransition` | `useDeferredValue` |
|--|--|--|
| Controlează | **când** se face setState | **ce valoare** se folosește |
| Oferă | `isPending` flag | valoare deferred |
| Folosește când | ai acces la **setState** | primești valoarea ca **prop** |

</div>

</div>


---
layout: section
color: sky-light
---

# Suspense & React.lazy
#### Încărcare progresivă și code splitting


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce este Suspense?

:: content ::

`Suspense` permite unui component să **"aștepte"** ceva înainte de randare — arătând un fallback (loading) între timp.

```jsx
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<p>Se încarcă...</p>}>
      <ComponentCareSeFetchuieste />
    </Suspense>
  );
}
```

<div class="grid grid-cols-3 gap-4 mt-4 text-sm">

<div class="bg-sky-50 border-2 border-sky-200 rounded-xl p-3">
  <div class="font-bold text-sky-800 mb-1">📦 Code splitting</div>

Împarte bundle-ul în bucăți mai mici — componente încărcate **la cerere** cu `React.lazy`
</div>

<div class="bg-amber-50 border-2 border-amber-200 rounded-xl p-3">
  <div class="font-bold text-amber-800 mb-1">📡 Data fetching</div>

Componente care **așteaptă date** de la server înainte de randare (React 19+)
</div>

<div class="bg-green-50 border-2 border-green-200 rounded-xl p-3">
  <div class="font-bold text-green-800 mb-1">🎯 UX mai bun</div>

Utilizatorul vede un **loading state** clar, nu o pagină goală sau un flash de conținut
</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# React.lazy — Code Splitting

:: content ::

`React.lazy` încarcă un component **doar când e nevoie** — reduce dimensiunea bundle-ului inițial.

<div class="grid grid-cols-2 gap-6 text-sm">

<div>

**Fără lazy** — totul într-un singur bundle:

```jsx
import Dashboard from './Dashboard';
import Settings from './Settings';
import Analytics from './Analytics';

// Toate se încarcă la start, chiar dacă
// utilizatorul nu vizitează Settings niciodată
```

</div>

<div>

**Cu lazy** — încărcare la cerere:

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
const Analytics = lazy(() => import('./Analytics'));

function App() {
  return (
    <Suspense fallback={<p>Se încarcă...</p>}>
      {page === 'dashboard' && <Dashboard />}
      {page === 'settings' && <Settings />}
    </Suspense>
  );
}
```

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Suspense — pattern-uri utile

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div>

**Suspense imbricat** — loading granular:

```jsx
function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />
      <Suspense fallback={<ListSkeleton />}>
        <ProductList />
      </Suspense>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </Suspense>
  );
}
```

Fiecare secțiune se încarcă **independent** — header-ul apare primul, apoi lista, apoi sidebar-ul.

</div>

<div>

**Când folosești Suspense:**

- **Route-based splitting** — fiecare pagină e un `lazy()` component
- **Componente grele** — editor de text, grafice, hărți
- **Below the fold** — conținut care nu e vizibil inițial
- **Condiționat** — tab-uri, modale, dropdown-uri complexe

**Când NU folosești:**

- Componente mici sau ușoare
- Conținut critic care trebuie vizibil instant (above the fold)
- Componente folosite pe fiecare pagină (se încarcă oricum)

</div>

</div>


---
layout: section
color: sky-light
---

# React Compiler
#### Memoizare automată


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce este React Compiler?

:: content ::

<div class="grid grid-cols-2 gap-6 text-base">

<div class="space-y-4">

**React Compiler** (fost "React Forget") este un **plugin de build** care adaugă memoizare automat în codul tău.

- Analizează codul la **build time** (nu runtime!)
- Inserează automat echivalentul `React.memo`, `useMemo`, `useCallback`
- **Production-ready** — folosit de Meta pe Facebook și Instagram
- Plugin Babel / SWC — se integrează în toolchain-ul existent

</div>

<div class="bg-sky-50 border-2 border-sky-200 rounded-xl p-4 text-sm space-y-3">

### Cum se activează?

```bash
# Instalare
npm install react-compiler-runtime
npm install -D babel-plugin-react-compiler
```

```js
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {}],
  ],
};
```

<AdmonitionType type="info">

React Compiler nu este un runtime — este o **transformare de cod** la build time. Nu adaugă overhead în producție.

</AdmonitionType>

</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Cod manual vs. cod compilat

:: content ::

**✍️ Cod scris manual** — cu `memo`, `useMemo`, `useCallback`:

```jsx
import { useState, useMemo, useCallback, memo } from 'react';

const TodoList = memo(function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}
          <button onClick={() => onDelete(todo.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
});

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('');
  const filtered = useMemo(() => todos.filter(t => t.text.includes(filter)), [todos, filter]);
  const handleDelete = useCallback((id) => setTodos(prev => prev.filter(t => t.id !== id)), []);
  return <TodoList todos={filtered} onDelete={handleDelete} />;
}
```


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Cod compilat — fără memoizare manuală

:: content ::

**🤖 Același cod, fără `memo` / `useMemo` / `useCallback`** — compilatorul le adaugă automat:

```jsx
import { useState } from 'react';

function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}
          <button onClick={() => onDelete(todo.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('');
  const filtered = todos.filter(t => t.text.includes(filter));
  const handleDelete = (id) => setTodos(prev => prev.filter(t => t.id !== id));
  return <TodoList todos={filtered} onDelete={handleDelete} />;
}
```

<div class="text-green-700 font-bold mt-2">Cod mai curat, aceeași performanță!</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Regulile React Compiler

:: content ::

Compilatorul funcționează **doar** dacă codul respectă regulile React:

**✅ Cod compatibil:**

```jsx
// Componente PURE — same input, same output
function Greeting({ name }) { return <h1>Salut, {name}!</h1>; }

// State imutabil
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Hooks la top-level
function App() {
  const [x, setX] = useState(0);
  const y = useMemo(() => x * 2, [x]);
  return <div>{y}</div>;
}
```


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Cod incompatibil cu React Compiler

:: content ::

**❌ Compilatorul ignoră aceste componente** (fără optimizare):

```jsx
// Mutare directă a props/state
function Bad({ items }) {
  items.sort(); // MUTEAZĂ prop-ul!
  return <ul>{items.map(/* ... */)}</ul>;
}

// Side effects în render
function Bad2() {
  document.title = 'Hello'; // side effect!
  return <div>Hello</div>;
}

// Reguli hooks încălcate
function Bad3({ show }) {
  if (show) {
    const [x] = useState(0); // hook condițional!
  }
  return <div />;
}
```

<AdmonitionType type="warning">

Compilatorul **nu dă eroare** — pur și simplu **sare peste** componentul respectiv. Folosește `eslint-plugin-react-compiler` pentru a detecta problemele!

</AdmonitionType>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# De ce am învățat optimizarea manuală?

:: content ::

<div class="grid grid-cols-2 gap-6 text-base">

<div class="space-y-4">

### Înțelegerea > Automatizarea

1. **Debuggingul necesită înțelegere** — când ceva e lent, trebuie să știi CE face React sub capotă, nu doar să te bazezi pe compilator

2. **Nu toate proiectele folosesc compilatorul** — proiecte legacy, configurații complexe, librării incompatibile

3. **Pattern-urile structurale rămân manuale** — "state jos", "children ca props", virtualizare — compilatorul NU le face automat

4. **Interviuri și code reviews** — se așteaptă să înțelegi conceptele, nu doar să te bazezi pe tooling

</div>

<div class="bg-sky-50 border-2 border-sky-200 rounded-xl p-5 space-y-3">

### Evoluția workflow-ului

<div class="space-y-2 text-sm">

<div class="bg-white rounded-lg p-3 border border-sky-200">
  <span class="font-bold text-sky-800">2019-2024:</span> Memo manual peste tot
  <div class="text-sky-600">memo + useMemo + useCallback — developer-ul decide</div>
</div>

<div class="text-center text-sky-400">↓</div>

<div class="bg-white rounded-lg p-3 border border-sky-200">
  <span class="font-bold text-sky-800">2025+:</span> React Compiler
  <div class="text-sky-600">Compilatorul decide automat — cod mai curat</div>
</div>

<div class="text-center text-sky-400">↓</div>

<div class="bg-white rounded-lg p-3 border border-green-200">
  <span class="font-bold text-green-800">Tu:</span> Înțelegi ambele abordări
  <div class="text-green-600">Știi CE face compilatorul și DE CE funcționează</div>
</div>

</div>

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Recapitulare: Performanța în React

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div class="space-y-3">

### Fundamente
- React re-randează **toți copiii** unui component re-randat
- **Re-render ≠ DOM update** — faza de render e separată de commit
- **Măsoară mai întâi** cu React DevTools Profiler!

### Instrumente de memoizare
- **`React.memo`** — sari peste re-render dacă props nu s-au schimbat
- **`useMemo`** — cache-uiește valori costisitoare
- **`useCallback`** — stabilizează referințele funcțiilor
- Cele trei formează un **sistem** — fără toate piesele, lanțul se rupe

</div>

<div class="space-y-3">

### Pattern-uri structurale
- **State jos** — mută state-ul aproape de unde e folosit
- **Children ca props** — copiii nu se re-randează cu wrapper-ul
- **Virtualizare** — randează doar ce e vizibil
- **`useDeferredValue`** — amână valori non-urgente
- **`useTransition`** — marchează state updates ca non-urgente

### React Compiler
- Plugin de **build time** — memoizare automată
- Funcționează doar cu cod care **respectă regulile** React
- **Nu înlocuiește** înțelegerea conceptelor
- **Nu automatizează** pattern-urile structurale

</div>

</div>

<div class="mt-4 bg-sky-50 border-2 border-sky-200 rounded-xl p-3 text-center text-base font-bold text-sky-800">
  Structură bună > Memoizare peste tot. Măsoară, nu ghici!
</div>
