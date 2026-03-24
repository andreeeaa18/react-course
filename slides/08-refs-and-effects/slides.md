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

# Refs și efecte secundare
Ieșiri din fluxul React

<div class="absolute top-2 right-2 w-8 h-8">
<GithubLink repo="https://github.com/cristi-usm/react-course" />
</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Să construim un cronometru

:: content ::

<div class="text-lg space-y-4">

Vrem un cronometru simplu: **Start** pornește un `setInterval`, **Stop** îl oprește.

```jsx
function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);

  let intervalId = null;  // Stocăm ID-ul aici

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());
    intervalId = setInterval(() => setNow(Date.now()), 10);
  }

  function handleStop() {
    clearInterval(intervalId);  // Funcționează?
  }
}
```

<AdmonitionType type="warning" class="mt-2">

Ce se va întâmpla când apăsăm **Stop**? Se oprește cronometrul?

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Cronometru stricat

:: content ::

<div class="text-sm mb-2">

Apasă **Start**, apoi **Stop**. Cronometrul nu se oprește! Verifică consola pentru a înțelege de ce.

</div>

<BrokenStopwatchDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# De ce nu funcționează?

:: content ::

<div class="text-lg space-y-4">

La fiecare **re-render** (de 100 ori pe secundă!), funcția componentă se execută din nou:

```jsx
function Stopwatch() {
  let intervalId = null;  // ← Resetat la null la FIECARE render

  function handleStop() {
    clearInterval(intervalId);  // intervalId este null!
  }
}
```

`setNow()` declanșează un re-render → variabila `intervalId` se reinițializează → valoarea stocată la **Start** s-a pierdut.

<AdmonitionType type="info" class="mt-2">

Am putea folosi `useState` pentru `intervalId`, dar asta ar declanșa **încă un re-render inutil** — ID-ul intervalului nu e ceva ce afișăm pe ecran.

</AdmonitionType>

Avem nevoie de o valoare care **persistă** între randări, dar **nu declanșează** re-render.

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Soluția: useRef

:: content ::

<div class="text-lg space-y-4">

`useRef` este un hook care permite stocarea unei **valori persistente** care **nu declanșează re-randare** atunci când se schimbă.

```jsx
import { useRef } from 'react';

const ref = useRef(0);
// Returnează: { current: 0 }
```

<div class="grid grid-cols-3 gap-3 mt-4">

<div class="bg-sky-50 rounded-lg p-3 border border-sky-200 text-center">
<div class="font-semibold text-sm text-sky-700">Persistentă</div>
<div class="text-xs text-sky-500 mt-1">Valoarea supraviețuiește între randări</div>
</div>

<div class="bg-violet-50 rounded-lg p-3 border border-violet-200 text-center">
<div class="font-semibold text-sm text-violet-700">Silențioasă</div>
<div class="text-xs text-violet-500 mt-1">Modificarea nu cauzează re-render</div>
</div>

<div class="bg-emerald-50 rounded-lg p-3 border border-emerald-200 text-center">
<div class="font-semibold text-sm text-emerald-700">Mutabilă</div>
<div class="text-xs text-emerald-500 mt-1">Poți modifica ref.current direct</div>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# De ce avem nevoie de refs?

:: content ::

<div class="text-lg space-y-4">

Uneori un component trebuie să **rețină o valoare** care:

- **Nu afectează** ce se vede pe ecran (UI-ul)
- **Persistă** între randări (nu se pierde ca o variabilă locală)
- **Nu declanșează** o re-randare când se schimbă

**Exemple concrete:**
- ID-ul unui `setInterval` sau `setTimeout` — pentru a-l opri mai târziu
- Un element DOM — pentru `focus()`, `scrollIntoView()`, etc.
- Un contor intern care nu e afișat în UI

<AdmonitionType type="info" class="mt-4">

`useRef` este un **escape hatch** — o „ieșire de urgență" din fluxul normal al React.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# useRef — sintaxă

:: content ::

<div class="text-lg space-y-4">

```jsx
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef(0); // valoarea inițială

  // ref.current = 0    (acum)
  // ref.current = 42   (poți modifica direct!)
}
```

`useRef` returnează un **obiect** cu o singură proprietate: `current`

```jsx
// Ceea ce returnează useRef:
{ current: 0 }
```

<AdmonitionType type="warning" class="mt-2">

Spre deosebire de `useState`, **poți modifica** `ref.current` direct — este **mutabil**.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ref vs State

:: content ::

<div class="text-base">

|  | `useRef` | `useState` |
|---|---|---|
| **Returnează** | `{ current: valoare }` | `[valoare, setter]` |
| **Re-randare?** | NU | DA |
| **Mutabilitate** | Mutabil (`ref.current = x`) | Imutabil (folosești setter) |
| **Când citești** | Nu citi în timpul randării | Oricând |
| **Persistă între randări?** | DA | DA |

<br>

**Regula de aur:**

```
Valoarea afectează UI-ul?
├─ DA  → useState
└─ NU  → useRef (sau variabilă locală dacă nu persistă)
```

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Ref vs State

:: content ::

<RefVsStateDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Cum funcționează useRef intern?

:: content ::

<div class="text-lg space-y-4">

Conceptual, `useRef` este un `useState` **fără setter**:

```jsx
// Implementare simplificată din React
function useRef(initialValue) {
  const [ref, _] = useState({ current: initialValue });
  return ref;  // Același obiect la fiecare randare!
}
```

De aceea funcționează:
- React returnează **același obiect** la fiecare render
- Modificarea lui `current` nu declanșează nimic — React nu știe că s-a schimbat
- Obiectul **supraviețuiește** între randări

<AdmonitionType type="info" class="mt-2">

Fiecare instanță a componentului primește propriul `ref` — nu sunt partajate.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Exemplu practic: Cronometru

:: content ::

<div class="text-sm mb-2">

Cronometrul folosește `useState` pentru valorile afișate și `useRef` pentru ID-ul intervalului:

</div>

<StopwatchDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Când folosim useRef?

:: content ::

<div class="text-base space-y-3">

<div class="grid grid-cols-2 gap-4">

<div class="bg-green-50 rounded-lg p-4 border border-green-200">
<div class="font-bold text-green-700 mb-2">Folosește useRef pentru:</div>

- ID-uri de `setTimeout` / `setInterval`
- Elemente DOM (focus, scroll, măsurători)
- Valori din randarea anterioară
- Obiecte care nu afectează UI-ul

</div>

<div class="bg-red-50 rounded-lg p-4 border border-red-200">
<div class="font-bold text-red-700 mb-2">NU folosi useRef pentru:</div>

- Valori care trebuie afișate în UI
- Date care, la schimbare, trebuie să actualizeze ecranul
- Orice valoare pe care componenta o **randează**

</div>

</div>

<AdmonitionType type="warning" class="mt-3">

**Nu citi și nu scrie** `ref.current` în timpul randării! Dacă ai nevoie de o valoare în JSX, folosește **state**.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Refs pe elemente JSX

:: content ::

<div class="text-lg space-y-4">

Cel mai comun caz de utilizare al refs: **accesarea unui element DOM**.

```jsx
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);  // Inițializăm cu null

  function handleClick() {
    // Accesăm nodul DOM real
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus!</button>
    </>
  );
}
```

React populează automat `ref.current` cu elementul DOM când acesta apare pe ecran.

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ciclul de viață al unui DOM Ref

:: content ::

<div class="text-base space-y-3">

React gestionează automat atribuirea ref-urilor în **faza de commit**:

<div class="flex justify-center mt-4">
<div class="grid grid-cols-3 gap-4 text-center" style="width: 600px;">

<div class="bg-sky-50 rounded-lg p-4 border-2 border-sky-300">
<div class="text-2xl mb-2">1</div>
<div class="font-bold text-sky-700">Render</div>
<div class="text-sm text-sky-500 mt-1">React calculează JSX-ul</div>
<div class="text-xs text-sky-400 mt-1 font-mono">ref.current = null</div>
</div>

<div class="bg-violet-50 rounded-lg p-4 border-2 border-violet-300">
<div class="text-2xl mb-2">2</div>
<div class="font-bold text-violet-700">Commit</div>
<div class="text-sm text-violet-500 mt-1">React actualizează DOM-ul</div>
<div class="text-xs text-violet-400 mt-1 font-mono">ref.current = &lt;div&gt;</div>
</div>

<div class="bg-emerald-50 rounded-lg p-4 border-2 border-emerald-300">
<div class="text-2xl mb-2">3</div>
<div class="font-bold text-emerald-700">Unmount</div>
<div class="text-sm text-emerald-500 mt-1">Componenta dispare</div>
<div class="text-xs text-emerald-400 mt-1 font-mono">ref.current = null</div>
</div>

</div>
</div>

<AdmonitionType type="info" class="mt-4">

De aceea e obligatoriu să accesăm refs din **event handler-e** sau **efecte secundare**, nu în timpul randării — elementul DOM poate să nu existe încă.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Focus și Select

:: content ::

<DomRefDemo />

---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Ref callback — funcție în loc de obiect

:: content ::

<div class="text-lg space-y-4">

Atributul `ref` acceptă **două forme**:

```jsx
// 1. Obiect ref (cel pe care îl cunoaștem deja)
const inputRef = useRef(null);
<input ref={inputRef} />

// 2. Funcție (ref callback) — primește nodul DOM ca argument
<input ref={(node) => {
  console.log('Nodul DOM:', node);
  // node = elementul DOM când apare
  // node = null când dispare (cleanup)
}} />
```

React apelează funcția cu **nodul DOM** la mount și cu **null** la unmount.

<div class="grid grid-cols-2 gap-4 mt-2">
<div>

**React 19+** — cleanup prin `return` 🆕

```jsx
<input ref={(node) => {
  console.log('Montat:', node);
  return () => console.log('Cleanup!');
}} />
```

</div>
<div>

**React 18** — verificare `null`

```jsx
<input ref={(node) => {
  if (node) {
    console.log('Montat:', node);
  } else {
    console.log('Cleanup!');
  }
}} />
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
# Refs pe liste de elemente

:: content ::

<div class="text-base space-y-3">

Când avem o **listă dinamică**, nu putem crea un `useRef` pentru fiecare element (nu avem voie să utilizăm hook-uri în bucle).

Dar cu **ref callbacks** putem stoca fiecare nod într-un **Map**:

```jsx
const itemsRef = useRef(null);
function getMap() {
  if (!itemsRef.current) itemsRef.current = new Map();
  return itemsRef.current;
}
```

<div class="grid grid-cols-2 gap-4 mt-1">
<div>

**React 19+** — cleanup prin `return` 🆕
```jsx
<li ref={node => {
  getMap().set(item.id, node);
  return () => getMap().delete(item.id);
}}>
```

</div>
<div>

**React 18** — verificare `null`
```jsx
<li ref={node => {
  if (node) {
    getMap().set(item.id, node);
  } else {
    getMap().delete(item.id);
  }
}}>
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
# Demo: Scroll la element

:: content ::

<ScrollToDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ref-uri pe componente proprii

:: content ::

<div class="text-lg space-y-4">

Ce se întâmplă dacă vrem să facem `focus()` pe un `<MyInput>` din componenta părinte?

```jsx
function MyInput() {
  return <input />;
}

function Form() {
  const inputRef = useRef(null);
  return <MyInput ref={inputRef} />;  // ⚠️ Nu funcționează!
}
```

React **nu permite** implicit accesul la elementele DOM ale unei componente copil — este o măsură de **encapsulare**. Componenta trebuie să **opteze explicit** să-și expună DOM-ul.

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Metoda veche: forwardRef

:: content ::

<div class="text-lg space-y-4">

Înainte de React 19, trebuia să folosim **forwardRef** — un wrapper special:

```jsx
import { forwardRef } from 'react';

// Componenta este înfășurată cu forwardRef
// ref vine ca al doilea argument, NU în props
const MyInput = forwardRef(function MyInput(props, ref) {
  return <input ref={ref} {...props} />;
});
```
<br/>
```jsx
// Acum funcționează
function Form() {
  const inputRef = useRef(null);
  return <MyInput ref={inputRef} />;
}
```

<AdmonitionType type="warning" class="mt-2">

`forwardRef` complică codul — `ref` vine separat de props, iar sintaxa este mai greu de citit.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Metoda nouă: ref ca prop (React 19+)

:: content ::

<div class="text-lg space-y-4">

Din React 19, `ref` este un **prop normal** — nu mai ai nevoie de `forwardRef`:

```jsx
// ✅ Simplu și clar — ref vine direct în props
function MyInput({ placeholder, ref }) {
  return <input ref={ref} placeholder={placeholder} />;
}

function Form() {
  const inputRef = useRef(null);

  return (
    <>
      <MyInput ref={inputRef} placeholder="Scrie aici..." />
      <button onClick={() => inputRef.current.focus()}>
        Focus
      </button>
    </>
  );
}
```

<AdmonitionType type="info" class="mt-2">

`forwardRef` încă funcționează, dar nu mai este necesar. Dacă vezi `forwardRef` în cod mai vechi, acum știi de ce exista.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# useImperativeHandle

:: content ::

<div class="text-lg space-y-4">

Uneori nu vrei să expui **tot** elementul DOM, ci doar **anumite metode**:

```jsx
import { useRef, useImperativeHandle } from 'react';

function MyInput({ ref }) {
  const realInputRef = useRef(null);

  // Expunem doar ce vrem — nu întregul <input>
  useImperativeHandle(ref, () => ({
    focus() { realInputRef.current.focus(); },
    clear() { realInputRef.current.value = ''; }
  }));

  return <input ref={realInputRef} />;
}
```

```jsx
// Părintele poate apela doar focus() și clear()
inputRef.current.focus();  // ✅
inputRef.current.clear();  // ✅
inputRef.current.style;    // ❌ undefined — nu e expus
```

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# flushSync — Actualizare sincronă

:: content ::

<div class="text-base space-y-4">

React face actualizările de state **asincron** (batched). Uneori, un API extern al browser-ului are nevoie ca DOM-ul să fie actualizat **imediat**. `flushSync` forțează React să facă flush la actualizări sincron:

```jsx
import { flushSync } from 'react-dom';

flushSync(() => {
  setState(newValue);
});
// Aici DOM-ul este deja actualizat!
```

**Exemplu real:** dialogul de print necesită DOM-ul actualizat înainte de `window.print()`:

```jsx
function handleBeforePrint() {
  // Fără flushSync, browser-ul ar printa versiunea veche a paginii
  flushSync(() => {
    setIsPrinting(true);  // Afișează versiunea printabilă
  });
  // DOM-ul reflectă deja isPrinting = true
}
window.addEventListener('beforeprint', handleBeforePrint);
```

<AdmonitionType type="warning" class="mt-2">

`flushSync` este **rar necesar** și poate afecta performanța. Folosește-l doar când un API extern al browser-ului cere DOM-ul actualizat sincron.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Reguli pentru DOM Refs

:: content ::

<div class="text-base space-y-3">

<div class="grid grid-cols-2 gap-4">

<div class="bg-green-50 rounded-lg p-4 border border-green-200">
<div class="font-bold text-green-700 mb-2">Sigur de folosit:</div>

- `element.focus()` / `element.blur()`
- `element.scrollIntoView()`
- `element.getBoundingClientRect()`
- `element.play()` / `element.pause()` (video/audio)
- Animații via API-uri browser

</div>

<div class="bg-red-50 rounded-lg p-4 border border-red-200">
<div class="font-bold text-red-700 mb-2">Periculos — evită:</div>

- `element.remove()` — React nu mai știe de el
- `element.appendChild()` — conflicte cu React
- Modificarea directă a conținutului HTML
- Orice **modificare destructivă** a DOM-ului gestionat de React

</div>

</div>

<AdmonitionType type="warning" class="mt-3">

Tratează DOM-ul gestionat de React ca **read-only**. Poți citi informații și apela metode, dar **nu modifica** structura!

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Recapitulare: Refs

:: content ::

<div class="text-base space-y-3">

<div class="grid grid-cols-2 gap-4">

<div class="bg-sky-50 rounded-lg p-4 border border-sky-200">
<div class="font-bold text-sky-700 mb-2">useRef pentru valori</div>

- Returnează `{ current: valoare }`
- **Mutabil** — modifici direct `ref.current`
- **Nu cauzează** re-randare
- Util pentru: timer IDs, valori anterioare, contoare interne

</div>

<div class="bg-violet-50 rounded-lg p-4 border border-violet-200">
<div class="font-bold text-violet-700 mb-2">useRef pentru DOM</div>

- Pasezi `ref={myRef}` pe un element JSX
- React populează `ref.current` cu nodul DOM
- Accesezi din event handler-e sau Effects
- Util pentru: focus, scroll, măsurători

</div>

</div>

**Principiu cheie:** Refs sunt un **escape hatch**. Dacă poți rezolva problema cu props și state, fă asta mai întâi.

</div>

---
layout: section
color: sky-light
---

# useEffect

Sincronizarea cu sisteme externe

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce sunt efectele secundare?

:: content ::

<div class="text-base space-y-4">

În React, codul se împarte în **trei categorii**:

<div class="grid grid-cols-3 gap-3">

<div class="bg-sky-50 rounded-lg p-4 border border-sky-200">
<div class="font-bold text-sky-700 mb-2">Cod de randare</div>
<div class="text-sm text-sky-600">

Calculează JSX-ul. Trebuie să fie **pur** — fără efecte secundare.

```jsx
// În corpul componentei
const fullName = first + ' ' + last;
return <h1>{fullName}</h1>;
```

</div>
</div>

<div class="bg-violet-50 rounded-lg p-4 border border-violet-200">
<div class="font-bold text-violet-700 mb-2">Event handler-e</div>
<div class="text-sm text-violet-600">

Reacționează la **acțiuni specifice** ale utilizatorului.

```jsx
function handleClick() {
  alert('Ai apăsat!');
  sendMessage(text);
}
```

</div>
</div>

<div class="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
<div class="font-bold text-emerald-700 mb-2">Efecte (Effects)</div>
<div class="text-sm text-emerald-600">

Rulează **după randare**. Sincronizează cu sisteme externe.

```jsx
useEffect(() => {
  connection.connect();
}, [roomId]);
```

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
# Când folosim Effects?

:: content ::

<div class="text-lg space-y-4">

Effects sunt pentru **sincronizare cu sisteme din afara React**:

- Conexiuni la servere (WebSocket, chat, baze de date)
- Event listener-e pe `window` / `document`
- Timere (`setInterval`, `setTimeout`)
- Fetch de date de la un API
- Integrări cu librării non-React (hărți, grafice, playere video)

<AdmonitionType type="warning" class="mt-3">

**Pune-ți întrebarea:** De ce rulează acest cod?
- **Utilizatorul a apăsat un buton / a completat un formular** → pune codul într-un **event handler**
- **Componenta a apărut pe ecran** (indiferent de acțiunea utilizatorului) → pune codul într-un **Effect**

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce este useEffect?

:: content ::

<div class="text-lg space-y-4">

`useEffect` este un hook care îți permite să **rulezi cod după ce React a terminat de randat** componenta pe ecran.

```jsx
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Acest cod rulează DUPĂ ce componenta apare pe ecran
    console.log('Componenta a fost randată!');
  });
}
```

<div class="grid grid-cols-2 gap-3 mt-3">
<div class="bg-red-50 rounded-lg p-3 border border-red-200 text-sm">

**Fără `useEffect`** — codul din corpul componentei rulează **în timpul** randării. Nu ai voie să faci operații cu efecte secundare aici (fetch, timere, DOM).

</div>
<div class="bg-green-50 rounded-lg p-3 border border-green-200 text-sm">

**Cu `useEffect`** — codul rulează **după** ce browser-ul a afișat pagina. E momentul potrivit pentru conectări, fetch...

</div>
</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Anatomia unui Effect

:: content ::

<div class="text-lg space-y-4">

Un Effect are **trei părți**:

```jsx
import { useEffect } from 'react';

function ChatRoom({ roomId }) {
  useEffect(() => {
    // 1. SETUP — rulează după randare
    const connection = createConnection(roomId);
    connection.connect();

    // 2. CLEANUP — rulează înainte de următorul effect
    //    și la unmount
    return () => {
      connection.disconnect();
    };
  }, [roomId]); // 3. DEPENDENȚE — când să re-ruleze
}
```

<div class="grid grid-cols-3 gap-3 mt-2">
<div class="bg-emerald-50 rounded-lg p-2 border border-emerald-200 text-center text-sm">
<div class="font-bold text-emerald-700">Setup</div>
<div class="text-xs text-emerald-500">Ce să facă</div>
</div>
<div class="bg-amber-50 rounded-lg p-2 border border-amber-200 text-center text-sm">
<div class="font-bold text-amber-700">Cleanup</div>
<div class="text-xs text-amber-500">Cum să „desfacă"</div>
</div>
<div class="bg-sky-50 rounded-lg p-2 border border-sky-200 text-center text-sm">
<div class="font-bold text-sky-700">Dependențe</div>
<div class="text-xs text-sky-500">Când să re-ruleze</div>
</div>
</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Array-ul de dependențe

:: content ::

<div class="text-lg space-y-4">

Dependențele controlează **când** se re-execută Effect-ul:

```jsx
// Rulează după FIECARE randare
useEffect(() => { ... });

// Rulează doar la MOUNT (o singură dată)
useEffect(() => { ... }, []);

// Rulează la mount ȘI când roomId se schimbă
useEffect(() => { ... }, [roomId]);

// Rulează când oricare dintre ele se schimbă
useEffect(() => { ... }, [roomId, serverUrl]);
```

<AdmonitionType type="warning" class="mt-2">

Nu poți „alege" dependențele — ele sunt **dictate** de ce valori reactive folosești în Effect. Linter-ul React te va avertiza dacă lipsește o dependență.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce sunt valorile reactive?

:: content ::

<div class="text-lg space-y-4">

**Valori reactive** = valori declarate în corpul componentei care se pot schimba între randări:

```jsx
function ChatRoom({ roomId }) {           // prop → reactiv
  const [serverUrl, setServerUrl] = useState('...'); // state → reactiv
  const fullUrl = serverUrl + '/' + roomId;          // derivat → reactiv

  useEffect(() => {
    const conn = createConnection(fullUrl);
    conn.connect();
    return () => conn.disconnect();
  }, [fullUrl]); // Trebuie inclus — este reactiv!
}
```

```jsx
// NU sunt reactive (nu trebuie în dependențe):
const API_URL = 'https://api.example.com';  // constantă la nivel de modul
// ref.current — mutabil, dar React nu știe când se schimbă
```

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Chat Room cu Effects

:: content ::

<div class="text-sm mb-2">

Schimbă camera din dropdown și urmărește **consola** — vezi cum React deconectează de la camera veche și conectează la cea nouă.

</div>

<ChatRoomDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ciclul de viață al unui Effect

:: content ::

<div class="text-base space-y-3">

Gândește Effect-urile ca cicluri independente de **start/stop**, nu prin prisma componentei:

<div class="flex justify-center mt-2">
<div class="text-sm font-mono space-y-2" style="width: 550px;">

<div class="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
<span class="text-emerald-700 font-bold">1. Mount</span> → roomId = "general"
<br/><span class="ml-4">✅ Conectat la "general"</span>
</div>

<div class="bg-amber-50 rounded-lg p-3 border border-amber-200">
<span class="text-amber-700 font-bold">2. roomId → "react"</span>
<br/><span class="ml-4">❌ Deconectat de la "general" <span class="text-xs text-amber-400">(cleanup)</span></span>
<br/><span class="ml-4">✅ Conectat la "react" <span class="text-xs text-emerald-400">(setup nou)</span></span>
</div>

<div class="bg-amber-50 rounded-lg p-3 border border-amber-200">
<span class="text-amber-700 font-bold">3. roomId → "random"</span>
<br/><span class="ml-4">❌ Deconectat de la "react" <span class="text-xs text-amber-400">(cleanup)</span></span>
<br/><span class="ml-4">✅ Conectat la "random" <span class="text-xs text-emerald-400">(setup nou)</span></span>
</div>

<div class="bg-red-50 rounded-lg p-3 border border-red-200">
<span class="text-red-700 font-bold">4. Unmount</span>
<br/><span class="ml-4">❌ Deconectat de la "random" <span class="text-xs text-red-400">(cleanup final)</span></span>
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
# Cleanup: de ce este important?

:: content ::

<div class="text-lg space-y-4">

Fără cleanup, acumulăm resurse la fiecare re-randare:

```jsx
// ❌ FĂRĂ cleanup — memory leak!
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []); // Listener-ul rămâne activ chiar dacă componenta dispare

// ✅ CU cleanup — corect
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

| Setup | Cleanup |
|---|---|
| `addEventListener` | `removeEventListener` |
| `setInterval` | `clearInterval` |
| `connection.connect()` | `connection.disconnect()` |
| `fetch` (cu flag) | `ignore = true` |

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Event Listener cu Cleanup

:: content ::

<WindowListenerDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Timer cu Effect

:: content ::

<div class="text-sm mb-2">

Observă cum Effect-ul pornește/oprește `setInterval` în funcție de `isRunning`. Cleanup-ul previne acumularea de intervale.

</div>

<EffectCounterDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Strict Mode: dubla execuție

:: content ::

<div class="text-lg space-y-4">

În **development**, React montează fiecare component de **două ori** pentru a testa cleanup-ul:

```
Dezvoltare:
  1. Mount    → Setup rulează         ✅ Conectat la "general"
  2. Unmount  → Cleanup rulează       ❌ Deconectat de la "general"
  3. Mount    → Setup rulează din nou ✅ Conectat la "general"

Producție:
  1. Mount    → Setup rulează         ✅ Conectat la "general"
```

<AdmonitionType type="info" class="mt-2">

Dacă dubla execuție cauzează probleme, înseamnă că **cleanup-ul lipsește** sau este **incomplet**. Aceasta nu e un bug în React — e React care te ajută să găsești buguri!

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Fetch de date cu Effects

:: content ::

<div class="text-base space-y-3">

Problema principală la fetch: **race condition** — dacă utilizatorul schimbă selecția rapid, răspunsuri vechi pot suprascrie cele noi.

```jsx
useEffect(() => {
  let ignore = false;  // Flag de anulare

  async function fetchData() {
    const response = await fetch('/api/user/' + userId);
    const data = await response.json();
    if (!ignore) {       // Verificăm dacă e încă relevant
      setUser(data);
    }
  }
  fetchData();

  return () => { ignore = true; };  // Invalidăm la cleanup
}, [userId]);
```

<AdmonitionType type="info" class="mt-2">

Flag-ul `ignore` asigură că **doar cel mai recent** fetch actualizează state-ul. Cleanup-ul marchează toate fetch-urile anterioare ca invalide.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Fetch cu Race Condition Fix

:: content ::

<div class="text-sm mb-2">

Schimbă rapid între utilizatori și observă consola — doar ultimul fetch actualizează UI-ul.

</div>

<FetchDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Efecte separate pentru logică separată

:: content ::

<div class="text-lg space-y-4">

Fiecare Effect trebuie să facă **un singur lucru**:

```jsx
// ❌ Două lucruri diferite în același Effect
useEffect(() => {
  logVisit(roomId);
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);

// ✅ Separate — fiecare Effect are un scop clar
useEffect(() => {
  logVisit(roomId);
}, [roomId]);

useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

<AdmonitionType type="info" class="mt-2">

Dacă două Effecte au **aceleași dependențe**, nu înseamnă că trebuie combinate. Logica lor este **independentă**.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Recapitulare: useEffect

:: content ::

<div class="text-base space-y-3">

<div class="grid grid-cols-2 gap-4">

<div class="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
<div class="font-bold text-emerald-700 mb-2">Structura unui Effect</div>

```jsx
useEffect(() => {
  // Setup: sincronizează
  // Cleanup: desincronizează
  return () => { ... };
}, [dependențe]);
```

- Setup rulează **după render**
- Cleanup rulează **înainte de re-run** și la **unmount**

</div>

<div class="bg-sky-50 rounded-lg p-4 border border-sky-200">
<div class="font-bold text-sky-700 mb-2">Dependențe</div>

- `[]` → doar la mount
- `[a, b]` → când a sau b se schimbă
- fără array → după fiecare render
- Includ **toate** valorile reactive folosite
- Linter-ul React verifică automat

</div>

</div>

**Principiu cheie:** Effects sincronizează cu **sisteme externe**. Dacă nu ai un sistem extern, probabil nu ai nevoie de un Effect.

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# useLayoutEffect

:: content ::

<div class="text-lg space-y-4">

Există o variantă a `useEffect` care rulează **înainte ca browser-ul să afișeze** pe ecran:

```jsx
import { useLayoutEffect } from 'react';

useLayoutEffect(() => {
  // Rulează DUPĂ ce DOM-ul e actualizat,
  // dar ÎNAINTE ca browser-ul să picteze pe ecran
  const { height } = ref.current.getBoundingClientRect();
  setTooltipHeight(height);
}, []);
```

<div class="grid grid-cols-2 gap-3 mt-3">
<div class="bg-emerald-50 rounded-lg p-3 border border-emerald-200 text-sm">

**useEffect** — rulează **după** ce browser-ul a afișat pagina. Utilizatorul vede deja rezultatul.

</div>
<div class="bg-violet-50 rounded-lg p-3 border border-violet-200 text-sm">

**useLayoutEffect** — rulează **înainte** de afișare. Util pentru **măsurători DOM** care afectează layout-ul (tooltip-uri, poziționare).

</div>
</div>

<AdmonitionType type="warning" class="mt-2">

`useLayoutEffect` **blochează** afișarea paginii — folosește-l doar când trebuie să **măsori sau repoziționezi** ceva înainte ca utilizatorul să vadă rezultatul. În 99% din cazuri, `useEffect` este suficient.

</AdmonitionType>

</div>

---
layout: section
color: sky-light
---

# Poate nu ai nevoie de un Effect

Greșeli frecvente și cum să le eviți

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Anti-pattern #1: Date derivate

:: content ::

<div class="text-lg space-y-4">

Cea mai frecventă greșeală: folosirea unui Effect pentru a calcula o valoare care **derivă din state sau props**.

```jsx
// ❌ Inutil — Effect + state redundant
const [firstName, setFirstName] = useState('Ana');
const [lastName, setLastName] = useState('Popescu');
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(firstName + ' ' + lastName);
}, [firstName, lastName]);
```

```jsx
// ✅ Corect — calculat direct în randare
const [firstName, setFirstName] = useState('Ana');
const [lastName, setLastName] = useState('Popescu');

const fullName = firstName + ' ' + lastName; // Gata!
```

<AdmonitionType type="info" class="mt-2">

Dacă o valoare poate fi **calculată** din state sau props existente, nu o pune în state — calculează-o în timpul randării.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: Elimină Effect-ul inutil

:: content ::

<div class="text-sm mb-2">

Acest cod funcționează, dar are un Effect inutil. Încearcă să-l elimini — înlocuiește `useState` + `useEffect` cu un simplu `const`.

</div>

<AntiPatternDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Anti-pattern #2: Calcule costisitoare

:: content ::

<div class="text-lg space-y-4">

Dacă calculul este **costisitor** (ex: filtrarea unei liste mari), nu folosi Effect — folosește `useMemo`:

```jsx
// ❌ Effect + state redundant — cauzează randare în plus
const [visibleItems, setVisibleItems] = useState([]);
useEffect(() => {
  setVisibleItems(items.filter(i => i.name.includes(query)));
}, [items, query]);

// ✅ useMemo — recalculează doar când dependențele se schimbă
const visibleItems = useMemo(
  () => items.filter(i => i.name.includes(query)),
  [items, query]
);

// ✅ Și mai simplu — dacă filtrarea NU e costisitoare
const visibleItems = items.filter(i => i.name.includes(query));
```

<AdmonitionType type="warning" class="mt-2">

`useMemo` este o **optimizare**, nu o necesitate. Începe fără el — adaugă-l doar dacă observi probleme de performanță.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Anti-pattern #3: Reset state la schimbare de props

:: content ::

<div class="text-lg space-y-4">

Uneori vrem să resetăm state-ul când un prop se schimbă:

```jsx
// ❌ Effect — randare cu state vechi, apoi re-render
function ProfilePage({ userId }) {
  const [comment, setComment] = useState('');

  useEffect(() => {
    setComment('');  // Resetăm comentariul
  }, [userId]);
}
```

```jsx
// ✅ key — React recreează componenta de la zero
function ProfilePage({ userId }) {
  return <Profile userId={userId} key={userId} />;
}

function Profile({ userId }) {
  const [comment, setComment] = useState(''); // Resetat automat!
}
```

<AdmonitionType type="info" class="mt-2">

Când `key` se schimbă, React **distruge** componenta veche și **creează** una nouă — tot state-ul se resetează automat.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Anti-pattern #4: Logică de event în Effect

:: content ::

<div class="text-lg space-y-4">

Cel mai periculos anti-pattern — cod care trebuie să ruleze ca **răspuns la o acțiune** pus într-un Effect:

```jsx
// ❌ Notificarea apare și la refresh-ul paginii!
useEffect(() => {
  if (product.isInCart) {
    showNotification('Adăugat în coș!');
  }
}, [product]);
```

```jsx
// ✅ Notificarea apare doar când utilizatorul apasă butonul
function handleBuy() {
  addToCart(product);
  showNotification('Adăugat în coș!');
}
```

<AdmonitionType type="warning" class="mt-2">

**Testul:** dacă utilizatorul ar da refresh la pagină, ar trebui să se întâmple din nou? Dacă **nu** → pune-l într-un **event handler**, nu într-un Effect.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Anti-pattern #5: Lanțuri de Effects

:: content ::

<div class="grid grid-cols-2 gap-3">

<div>

```jsx
// ❌ Lanț de Effects — re-randări inutile
useEffect(() => {
  if (card?.gold) setGoldCount(c => c + 1);
}, [card]);

useEffect(() => {
  if (goldCount > 3) {
    setRound(r => r + 1);
    setGoldCount(0);
  }
}, [goldCount]);

useEffect(() => {
  if (round > 5) setIsGameOver(true);
}, [round]);
```

</div>
<div>

```jsx
// ✅ Toată logica într-un singur handler
function handlePlaceCard(nextCard) {
  setCard(nextCard);
  if (nextCard.gold) {
    const cnt = goldCount + 1;
    if (cnt > 3) {
      setRound(r => r + 1);
      setGoldCount(0);
    } else {
      setGoldCount(cnt);
    }
  }
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
# Când CHIAR ai nevoie de Effect?

:: content ::

<div class="text-base space-y-3">

<div class="grid grid-cols-2 gap-4">

<div class="bg-red-50 rounded-lg p-4 border border-red-200">
<div class="font-bold text-red-700 mb-2">NU ai nevoie de Effect</div>

- **Transformarea datelor** pentru render → calculează direct
- **Calcule costisitoare** → `useMemo`
- **Resetarea state-ului** la schimbare de prop → `key`
- **Logica de event handler** → pune-o în handler
- **Lanțuri de actualizări** → consolidează în handler
- **Notificarea părintelui** → apelează callback din handler

</div>

<div class="bg-green-50 rounded-lg p-4 border border-green-200">
<div class="font-bold text-green-700 mb-2">AI nevoie de Effect</div>

- **Sincronizare cu sisteme externe** (WebSocket, API)
- **Event listener-e** pe window/document
- **Timere** și intervale
- **Integrări** cu librării non-React
- **Analytics** la afișarea paginii
- **Fetch de date** (cu cleanup!)

</div>

</div>

<AdmonitionType type="info" class="mt-3">

**Regula:** dacă nu există un **sistem extern** cu care te sincronizezi, probabil nu ai nevoie de Effect.

</AdmonitionType>

</div>

---
layout: section
color: sky-light
---

# Custom Hooks

Reutilizarea logicii între componente

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce sunt Custom Hooks?

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

Un Custom Hook este o **funcție JavaScript** care:
- Începe cu **`use`** (convenție obligatorie)
- Poate apela alte hooks (`useState`, `useEffect`, etc.)
- **Extrage logica reutilizabilă** din componente

```jsx
// Logica de online status — scrisă O SINGURĂ DATĂ
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
```

</div>

---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# De ce Custom Hooks?

:: content ::

<div class="text-lg space-y-4">

Fără Custom Hooks, **duplicăm** aceeași logică în fiecare componentă:

```jsx
// ❌ Aceeași logică copy-paste în StatusBar, SaveButton, ChatRoom...
function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => { /* ... 10 linii identice ... */ }, []);
  return <span>{isOnline ? 'Online' : 'Offline'}</span>;
}

function SaveButton() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => { /* ... aceleași 10 linii ... */ }, []);
  return <button disabled={!isOnline}>Save</button>;
}
```

```jsx
// ✅ Cu Custom Hook — o singură sursă de adevăr
function StatusBar() {
  const isOnline = useOnlineStatus();
  return <span>{isOnline ? 'Online' : 'Offline'}</span>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();
  return <button disabled={!isOnline}>Save</button>;
}
```

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Logica partajată, state-ul NU

:: content ::

<div class="text-lg space-y-4">

Fiecare apel la un Custom Hook primește **propria instanță** de state:

```jsx
function App() {
  const firstInput = useFormInput('');   // state independent #1
  const secondInput = useFormInput('');  // state independent #2
  // Modificarea unuia NU afectează pe celălalt!
}
```

Este ca și cum ai scrie:

```jsx
function App() {
  const [first, setFirst] = useState('');   // state #1
  const [second, setSecond] = useState(''); // state #2
}
```

<AdmonitionType type="info" class="mt-2">

Custom Hooks partajează **logica** (codul), nu **state-ul** (datele). Fiecare componentă care apelează hook-ul primește un state complet separat.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: useOnlineStatus

:: content ::

<div class="text-sm mb-2">

Două componente diferite folosesc **același hook**. Deschide DevTools → Network → toggle "Offline" pentru a testa.

</div>

<CustomHookDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo: useFormInput

:: content ::

<div class="text-sm mb-2">

Hook-ul `useFormInput` returnează `{ value, onChange }` — exact ce are nevoie un `<input>`. Folosim **spread** (`{...props}`) pentru a le transmite.

</div>

<UseFormInputDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Convenții pentru Custom Hooks

:: content ::

<div class="text-base space-y-3">

<div class="grid grid-cols-2 gap-4">

<div class="bg-green-50 rounded-lg p-4 border border-green-200">
<div class="font-bold text-green-700 mb-2">Reguli</div>

- Numele **trebuie** să înceapă cu `use` + literă mare
- Poate apela orice hook (useState, useEffect, alte custom hooks)
- Se apelează doar din **componente** sau din **alte hooks**
- Linter-ul React aplică regulile hooks automat

</div>

<div class="bg-sky-50 rounded-lg p-4 border border-sky-200">
<div class="font-bold text-sky-700 mb-2">Exemple bune de nume</div>

- `useOnlineStatus()` — starea conexiunii
- `useFormInput(initial)` — gestionare input
- `useLocalStorage(key)` — citit/scris localStorage
- `useDebounce(value, delay)` — debounce o valoare
- `useWindowSize()` — dimensiunea ferestrei

</div>

</div>

<AdmonitionType type="warning" class="mt-3">

**Nu crea** hooks generice de tip `useMount` sau `useEffectOnce` — acestea ascund intențiile și fac codul mai greu de înțeles. Hook-urile bune au **nume descriptive** legate de ce fac.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Când creezi un Custom Hook?

:: content ::

<div class="text-lg space-y-4">

<div class="grid grid-cols-2 gap-4">

<div class="bg-green-50 rounded-lg p-4 border border-green-200">
<div class="font-bold text-green-700 mb-2">Creează hook când:</div>

- Aceeași logică cu Effects apare în **mai multe componente**
- Un Effect este **complex** și vrei să-l izolezi
- Vrei să exprimi clar **ce face** componenta, nu cum

</div>

<div class="bg-red-50 rounded-lg p-4 border border-red-200">
<div class="font-bold text-red-700 mb-2">NU crea hook pentru:</div>

- Un simplu `useState` — nu adaugă valoare
- Logica folosită într-un **singur loc**
- Funcții fără hooks în interior (nu ai nevoie de prefix `use`)

</div>

</div>

```jsx
// ✅ Bun: ascunde complexitatea, nume descriptiv
const isOnline = useOnlineStatus();
const { data, loading } = useFetch('/api/users');

// ❌ Rău: wrapper inutil peste un singur hook
function useCount(initial) {
  return useState(initial); // Nu adaugă nimic!
}
```

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Recapitulare finală

:: content ::

<div class="text-base space-y-3">

<div class="grid grid-cols-3 gap-3">

<div class="bg-violet-50 rounded-lg p-4 border border-violet-200">
<div class="font-bold text-violet-700 mb-2">useRef</div>

- Valori care **persistă** fără re-render
- Acces la **elemente DOM**
- Escape hatch — folosește rar

</div>

<div class="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
<div class="font-bold text-emerald-700 mb-2">useEffect</div>

- Sincronizare cu **sisteme externe**
- Setup + Cleanup + Dependențe
- Nu folosi pentru date derivate sau logică de event

</div>

<div class="bg-sky-50 rounded-lg p-4 border border-sky-200">
<div class="font-bold text-sky-700 mb-2">Custom Hooks</div>

- Extrag logica **reutilizabilă**
- Partajează **logica**, nu state-ul
- Nume descriptive cu prefix `use`

</div>

</div>

<AdmonitionType type="info" class="mt-3">

Toate cele trei sunt **escape hatches** — instrumente puternice, dar care trebuie folosite cu intenție. Dacă poți rezolva problema cu props și state, fă asta mai întâi.

</AdmonitionType>

</div>
