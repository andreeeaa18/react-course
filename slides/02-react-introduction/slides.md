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

## Introducere în React

JSX & Componente

<div class="absolute top-2 right-2 w-8 h-8">
<GithubLink repo="https://github.com/cristi-usm/react-course" />
</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Context și Evoluție

:: content ::

React a apărut ca o soluție de la Facebook la o problemă de scalabilitate masivă a interfeței.

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

### Istoric & Origini
* **2011:** Jordan Walke creează [**FaxJS**](https://github.com/jordwalke/FaxJs) (prototipul React) pentru proiecte interne Facebook.
* **2012:** Implementat pe Instagram.
* **2013:** Devine Open Source. Lumea a fost sceptică la început din cauza mixului de HTML în JS. [Prezentare inițială](https://www.youtube.com/watch?v=XxVg_s8xAms)

</div>
<div>

### Evoluția Tehnologică
* **v0.x - v15:** Componente bazate pe clase și metode de ciclui de viață.
* **v16.8 (2019):** Revoluția **Hooks** (componentele bazate pe funcții devin standard).
* **v18/19+:** Concurrent Mode, Server Components și React Compiler.

</div>
</div>

<AdmonitionType type="info" class="mt-4">

[**State of JS Survey 2024:**](https://2024.stateofjs.com/en-US/libraries/) React rămâne alegerea standard, cu o rată de retenție ridicată datorită ecosistemului imens și a capacității de a rula pe Web.
</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Filozofia React: Declarativ vs Imperativ

:: content ::

<ComparisonCards />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Exemple din viața reală

:: content ::

<ComparisonExamples />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Exemple de cod: Dublare Array

:: content ::

<div class="bg-gray-100 border-l-4 border-sky-500 p-2 mb-4 rounded">
<p class="text-md">
<strong> 📝 Sarcină:</strong> Scrie o funcție numită <code class="bg-sky-100 px-2 py-1 rounded">double</code> care primește ca parametru un array de numere și returnează un array nou cu elementele dublate din primul array.
</p>
</div>

<div class="flex items-center justify-center gap-8 mt-8">

<div class="bg-orange-50 border-4 border-orange-400 rounded-2xl p-6 flex-1 max-w-lg">
<h3 class="text-3xl font-black mb-4 text-center">Imperativ</h3>
<div v-click>

```js
function double(numbers) {
  const result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(numbers[i] * 2);
  }
  return result;
}
```

</div>
</div>

<div class="text-5xl font-black text-sky-400 self-center">
VS
</div>

<div class="bg-sky-50 border-4 border-sky-400 rounded-2xl p-6 flex-1 max-w-lg">
<h3 class="text-3xl font-black mb-4 text-center">Declarativ</h3>
<div v-click>

```js
function double(numbers) {
  return numbers.map(num => num * 2);
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
# Exemple de cod: Suma

:: content ::

<div class="bg-gray-100 border-l-4 border-sky-500 p-2 mb-4 rounded">
<p class="text-md">
<strong> 📝 Sarcină:</strong> Scrie o funcție <code class="bg-sky-100 px-2 py-1 rounded">sum</code> care primește un array de numere și returnează suma tuturor elementelor.
</p>
</div>

<div class="flex items-center justify-center gap-8 mt-8">

<div class="bg-orange-50 border-4 border-orange-400 rounded-2xl p-6 flex-1 max-w-lg">
<h3 class="text-3xl font-black mb-4 text-center">Imperativ</h3>
<div v-click>

```js
function sum(nr) {
  let total = 0;
  for (let i = 0; i < nr.length; i++) {
    total += nr[i];
  }
  return total;
}
```

</div>
</div>

<div class="text-5xl font-black text-sky-400 self-center">
VS
</div>

<div class="bg-sky-50 border-4 border-sky-400 rounded-2xl p-6 flex-1 max-w-lg">
<h3 class="text-3xl font-black mb-4 text-center">Declarativ</h3>
<div v-click>

```js
function sum(numbers) {
  return numbers.reduce((acc, num) => 
    acc + num, 0
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
# Exemple de cod: Button

:: content ::

<div class="bg-gray-100 border-l-4 border-sky-500 p-2 mb-2 rounded">
<p class="text-md">
<strong> 📝 Sarcină:</strong> Creează un buton care la click schimbă între bold și normal, iar textul se actualizează între "Click me" și "Clicked!".
</p>
</div>

<div class="flex items-center justify-center gap-3 mt-4">

<div class="bg-orange-50 border-4 border-orange-400 rounded-2xl p-6 flex-1 max-w-lg">
<h3 class="text-3xl font-black mb-4 text-center">Imperativ</h3>
<div v-click>

```js
const btn = document.getElementById('btn');
let isBold = false;

btn.addEventListener('click', () => {
  isBold = !isBold;

  if (isBold) {
    btn.classList.add('bold');
    btn.textContent = 'Clicked!';
  } else {
    btn.classList.remove('bold');
    btn.textContent = 'Click me';
  }
});
```

</div>
</div>

<div class="text-5xl font-black text-sky-400 self-center">
VS
</div>

<div class="bg-sky-50 border-4 border-sky-400 rounded-2xl p-6 flex-1 max-w-lg">
<h3 class="text-3xl font-black mb-4 text-center">Declarativ</h3>
<div v-click>

```jsx
<ToggleButton />
```

</div>
</div>

</div>

<div v-click>

<AdmonitionType type="tip" class="mt-8">
În React descrii CUM ar trebui să arate UI-ul pentru fiecare stare, nu pașii de manipulare a DOM-ului.
</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Declarativitatea în alte tehnologii

:: content ::

Programarea declarativă nu e un concept nou. Ați utilizato deja în alte tehnologii:

<div class="grid grid-cols-3 gap-6 mt-8">

<div v-click class="bg-blue-50 border-4 border-blue-400 rounded-2xl p-6">
<h3 class="text-2xl font-black mb-3 text-center">SQL</h3>

```sql
SELECT name, age
FROM users
WHERE age > 18
```

<p class="text-sm mt-3">Descrii <strong>CE</strong> date vrei, nu <strong>CUM</strong> să le selectezi.</p>
</div>

<div v-click class="bg-orange-50 border-4 border-orange-400 rounded-2xl p-6">
<h3 class="text-2xl font-black mb-3 text-center">HTML</h3>

```html
<button>
  Click me
</button>
```

<p class="text-sm mt-3">Descrii <strong>CE</strong> elemente vrei să fie afișate, nu <strong>CUM</strong> browser-ul le creează.</p>
</div>

<div v-click class="bg-purple-50 border-4 border-purple-400 rounded-2xl p-6">
<h3 class="text-2xl font-black mb-3 text-center">CSS</h3>

```css
.button {
  color: red;
  font-size: 16px;
}
```

<p class="text-sm mt-3">Descrii <strong>CE</strong> stil vrei, nu <strong>CUM</strong> să îl aplici.</p>
</div>

</div>

<div v-click>

<AdmonitionType type="tip" class="mt-8">
React urmează aceeași filozofie: descrii CE vrei să vezi, iar React se ocupă de CUM să o facă.
</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Problema: DOM-ul ca Sursă de Adevăr

:: content ::

În primele zile ale aplicațiilor web, **DOM-ul era considerat sursa de adevăr** - starea aplicației era stocată direct în elemente.

<div class="flex gap-6 mt-6">

<div class="flex-1 ns-c-tight">

### Problemele acestei abordări:

* **Sincronizare dificilă:** Starea din JavaScript trebuia sincronizată manual cu DOM-ul
* **Cod fragil:** Orice modificare a structurii HTML putea rupe logica JavaScript
* **Bug-uri frecvente:** Uitai să actualizezi un element → stare inconsistentă
* **Dificil de testat:** Nu poți testa logica fără un DOM real
* **Spaghetti code:** Codul devine rapid imposibil de întreținut

</div>

<div v-click class="flex-1 bg-orange-50 border-4 border-orange-400 rounded-2xl p-6 self-center">

```js
const input = document.getElementById('name');
const display = document.getElementById('display');
const counter = document.getElementById('counter');

input.addEventListener('input', () => {
  const value = input.value;
  display.textContent = `Salut, ${value}!`;
  counter.textContent = value.length;
});
```
</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Separarea Tradițională a Responsabilităților

:: content ::

Dezvoltarea web a evoluat spre separarea responsabilităților pe **tehnologii**: HTML, CSS și JavaScript.

<div class="grid grid-cols-3 gap-4 mt-6">

<div v-click class="bg-blue-50 border-4 border-blue-400 rounded-2xl p-4">
<h3 class="text-xl font-black mb-2 text-center">HTML</h3>
<p class="text-center text-xs mb-2 font-bold text-blue-800">Structură</p>

```html
<div class="card">
  <h2>Titlu</h2>
  <p>Conținut...</p>
  <button id="btn">Click</button>
</div>
```

</div>

<div v-click class="bg-purple-50 border-4 border-purple-400 rounded-2xl p-4">
<h3 class="text-xl font-black mb-2 text-center">CSS</h3>
<p class="text-center text-xs mb-2 font-bold text-purple-800">Stil</p>

```css
.card {
  border: 1px solid #ccc;
  padding: 20px;
}
button {
  background: blue;
  color: white;
}
```

</div>

<div v-click class="bg-amber-50 border-4 border-amber-400 rounded-2xl p-4 mb-2">
<h3 class="text-xl font-black mb-2 text-center">JavaScript</h3>
<p class="text-center text-xs mb-2 font-bold text-amber-800">Comportament</p>

```js
const btn =
  document.getElementById('btn');

btn.addEventListener('click',
  () => {
    alert('Clicked!');
  }
);
```

</div>

</div>

<div v-click>

<AdmonitionType type="info" class="mt-8">

**Separare după tehnologie:** Această abordare funcționează bine pentru site-uri statice, dar devine problematică pentru aplicații complexe unde logica, stilurile și markup-ul unei funcționalități sunt împrăștiate în 3 fișiere diferite.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# React: O Nouă Paradigmă - Componentele

:: content ::

React propune un tip diferit de separare: **nu după tehnologie, ci după funcționalitate** (componente).

<div class="flex items-center justify-center gap-4 mt-4">

<div class="bg-orange-50 border-4 border-orange-400 rounded-2xl p-3 flex-1 max-w-[200px]">
<h3 class="text-lg font-black mb-2 text-center">Tradițional</h3>

<div class="text-center space-y-1.5">
<div class="bg-blue-100 border-2 border-blue-400 rounded-lg p-1.5">
<p class="font-bold text-xs">index.html</p>
</div>
<div class="bg-purple-100 border-2 border-purple-400 rounded-lg p-1.5">
<p class="font-bold text-xs">styles.css</p>
</div>
<div class="bg-amber-100 border-2 border-amber-400 rounded-lg p-1.5">
<p class="font-bold text-xs">app.js</p>
</div>
</div>

<p class="text-xs mt-2 text-center text-orange-900">Separare pe <strong>tehnologii</strong></p>
</div>

<div class="text-3xl font-black text-sky-400 self-center">
→
</div>

<div class="bg-sky-50 border-4 border-sky-400 rounded-2xl p-3 flex-1 max-w-[200px]">
<h3 class="text-lg font-black mb-2 text-center">React</h3>

<div class="text-center space-y-1.5">
<div class="bg-emerald-100 border-2 border-emerald-500 rounded-lg p-1.5">
<p class="font-bold text-xs">Header.jsx</p>
</div>
<div class="bg-emerald-100 border-2 border-emerald-500 rounded-lg p-1.5">
<p class="font-bold text-xs">TodoList.jsx</p>
</div>
<div class="bg-emerald-100 border-2 border-emerald-500 rounded-lg p-1.5">
<p class="font-bold text-xs">Footer.jsx</p>
</div>
</div>

<p class="text-xs mt-2 text-center text-sky-900">Separare pe <strong>funcționalități</strong></p>
</div>

</div>

<div v-click>

<AdmonitionType type="info" class="mt-8">

**Schimbare de paradigmă:** Fiecare componentă este o unitate independentă care conține tot ce are nevoie: structură (HTML), stil (CSS) și logică (JS). Codul pentru o funcționalitate este colocalizat, nu împrăștiat.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce Este o Componentă?

:: content ::

O **componentă React** este o bucată de UI independentă și reutilizabilă care se poate combina cu alte componente.

<div class="flex gap-6 mt-6">

<div class="flex-1 ns-c-tight">

### Caracteristici cheie:

* **Reutilizabilă:** Poate fi folosită în mai multe locuri
* **Independentă:** Funcționează de sine stătătoare
* **Compozabilă:** Se combină cu alte componente
* **Încapsulată:** Logica și starea ei sunt izolate


</div>

<div v-click class="flex-1">

### Exemplu: Structură pagină

<div class="border-4 border-gray-300 rounded-lg p-3 bg-white">

<div class="bg-blue-100 border-2 border-blue-500 rounded p-2 mb-2">
<p class="text-xs font-bold text-center">NavBar</p>
</div>

<div class="flex gap-2 mb-2">
<div class="flex-1 bg-purple-100 border-2 border-purple-500 rounded p-2">
<p class="text-xs font-bold text-center">Sidebar</p>
</div>
<div class="flex-[2] bg-emerald-100 border-2 border-emerald-500 rounded p-2">
<p class="text-xs font-bold text-center">Content</p>
<div class="mt-2 space-y-1">
<div class="bg-amber-100 border border-amber-500 rounded p-1">
<p class="text-xs text-center">Card</p>
</div>
<div class="bg-amber-100 border border-amber-500 rounded p-1">
<p class="text-xs text-center">Card</p>
</div>
</div>
</div>
</div>

<div class="bg-pink-100 border-2 border-pink-500 rounded p-2">
<p class="text-xs font-bold text-center">Footer</p>
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
# Două Tipuri de Componente

:: content ::

<div class="flex items-center justify-center gap-3">

<div class="bg-orange-50 border-3 border-orange-400 rounded-2xl p-2 flex-1 max-w-sm">
<h3 class="text-lg font-black mb-1 text-center">Componente de Clasă</h3>

```jsx
class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <button onClick={this.increment}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

</div>

<div class="text-2xl font-black text-sky-400 self-center">
VS
</div>

<div class="bg-sky-50 border-3 border-sky-400 rounded-2xl p-2 flex-1 max-w-sm">
<h3 class="text-lg font-black mb-1 text-center">Componente Funcționale</h3>

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

</div>

</div>

<div v-click>

<AdmonitionType type="tip" class="mt-3">

Din 2019, componentele funcționale sunt standardul recomandat.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Definirea unei Componente

:: content ::

O componentă React este o **funcție JavaScript** care returnează **JSX**.

```jsx
export default function Greeting() {
  return (
    <div>
      <h1>Bun venit!</h1>
      <p>Aceasta este prima ta componentă.</p>
    </div>
  );
}
```

<div class="my-6">
<p class="text-lg mb-2">Cum se folosește:</p>

```jsx
<Greeting />
```
</div>

<AdmonitionType type="warning" class="mt-6">

Numele componentelor trebuie să înceapă cu **literă mare** (ex: `Button`, nu `button`). Altfel React le tratează ca elemente HTML normale.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Folosirea Componentelor

:: content ::

Componentele pot fi **reutilizate** și **imbricate**.

<div class="flex gap-6 mt-6">

<div class="flex-1">

```jsx
function App() {
  return (
    <div>
      <Button text="Click 1" />
      <Button text="Click 2" />
      <Button text="Click 3" />
    </div>
  );
}
```

<p class="text-sm mt-3">Aceeași componentă folosită de mai multe ori cu date diferite.</p>

</div>

<div class="flex-1">

```jsx
function App() {
  return (
    <Card>
      <h2>Titlu</h2>
      <Button text="Click me" />
    </Card>
  );
}
```

<p class="text-sm mt-3">Componente plasate una în alta pentru a construi structuri complexe.</p>

</div>

</div>

---
layout: cover
color: sky-light
---

<AdmonitionType type="important" class="mt-6">

Nu defini niciodată componente una în alta! Definește-le separat la nivel superior.

```jsx
// ❌ GREȘIT
function Parent() {
  function Child() { return <p>Child</p>; }
  return <Child />;
}

// ✅ CORECT
function Child() { return <p>Child</p>; }
function Parent() { return <Child />; }
```

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Arborele de Componente

:: content ::

O aplicație React este un **arbore de componente** - pornind de la o componentă rădăcină (root).

<div class="flex gap-8 mt-6 items-center justify-center">

<div class="flex-1 max-w-md">

```jsx
function App() {
  return (
    <div>
      <Header />
      <Main>
        <Sidebar />
        <Content />
      </Main>
      <Footer />
    </div>
  );
}
```

</div>

<div class="flex-1 max-w-sm">

<div class="border-4 border-sky-500 rounded-xl p-4 bg-sky-50">
<p class="text-center font-bold mb-4">App (Root)</p>

<div class="space-y-2">
<div class="bg-blue-100 border-2 border-blue-500 rounded p-2 text-center text-sm">Header</div>

<div class="bg-purple-100 border-2 border-purple-500 rounded p-3">
<p class="text-center text-sm font-bold mb-2">Main</p>
<div class="flex gap-2">
<div class="flex-1 bg-emerald-100 border border-emerald-500 rounded p-1 text-xs text-center">Sidebar</div>
<div class="flex-1 bg-emerald-100 border border-emerald-500 rounded p-1 text-xs text-center">Content</div>
</div>
</div>

<div class="bg-pink-100 border-2 border-pink-500 rounded p-2 text-center text-sm">Footer</div>
</div>

</div>

</div>

</div>

<AdmonitionType type="info" class="mt-6">

React începe randarea de la componenta **root** și coboară recursiv prin arbore, randând fiecare componentă.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Import și Export de Componente

:: content ::

Pentru a folosi componente în fișiere diferite, trebuie să le **exportăm** și **importăm**.

<div class="flex gap-6 mt-6 mb-3">

<div class="flex-1">

### Default Export:

```jsx
// Button.jsx
export default function Button() {
  return <button>Click</button>;
}

// App.jsx
import Button from './Button';
```

<p class="text-sm mt-3"><strong>Caracteristici:</strong></p>
<ul class="text-xs space-y-1 ns-c-tight">
<li>Un singur export default per fișier</li>
<li>Poți redenumi la import</li>
</ul>

</div>

<div class="flex-1">

### Named Export:

```jsx
// utils.jsx
export function Button() {
  return <button>Click</button>;
}

// App.jsx
import { Button } from './utils';
```

<p class="text-sm mt-3"><strong>Caracteristici:</strong></p>
<ul class="text-xs space-y-1 ns-c-tight">
<li>Multe exports named per fișier</li>
<li>Nume trebuie să corespundă</li>
</ul>

</div>

</div>

<AdmonitionType type="tip" class="mt-6">

**Când să folosești?** Default pentru componenta principală a fișierului, Named pentru funcții utilitare sau când ai mai multe exporturi într-un fișier.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce Este JSX?

:: content ::

**JSX** (JavaScript XML) este o extensie de sintaxă pentru JavaScript care permite scrierea de markup în cod JavaScript.

<div class="flex gap-6 mt-6">

<div class="flex-1">

### Sintaxă JSX:

```jsx
function Greeting({ name }) {
  const time = new Date().getHours();
  const greeting = time < 12 ? 'Bună dimineața' : 'Bună';

  return (
    <div className="card">
      <h1>{greeting}, {name}!</h1>
      <p>Ora curentă: {time}:00</p>
      {time > 18 && <p>E seara!</p>}
    </div>
  );
}
```

</div>

<div class="flex-1">

### Caracteristici:

<div class="space-y-3 mt-2">

<div class="bg-emerald-50 border-2 border-emerald-500 rounded-lg p-3">
<p class="font-bold text-sm mb-1">Expresii JavaScript</p>
<p class="text-xs">Folosește <code>{}</code> pentru expresii JS</p>
</div>

<div class="bg-sky-50 border-2 border-sky-400 rounded-lg p-3">
<p class="font-bold text-sm mb-1">Render Condițional</p>
<p class="text-xs">Folosește <code>&&</code>, <code>? :</code> pentru logică</p>
</div>

<div class="bg-purple-50 border-2 border-purple-400 rounded-lg p-3">
<p class="font-bold text-sm mb-1">Arată ca HTML</p>
<p class="text-xs">Sintaxă familiară, dar e JavaScript</p>
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
# JSX: Sub Capotă

:: content ::

JSX este **zahăr sintactic** - se transformă în apeluri `React.createElement()`.

<div class="flex items-center justify-center gap-6 my-6">

<div class="bg-sky-50 border-4 border-sky-400 rounded-2xl p-4 flex-1 max-w-lg">
<h3 class="text-xl font-black mb-3 text-center">Scrii (JSX)</h3>

```jsx
function Greeting() {
  return (
    <div className="card">
      <h1>Salut!</h1>
      <p>Bine ai venit.</p>
    </div>
  );
}
```

</div>

<div class="text-3xl font-black text-sky-400 self-center">
→
</div>

<div class="bg-orange-50 border-4 border-orange-400 rounded-2xl p-4 flex-1 max-w-lg">
<h3 class="text-xl font-black mb-3 text-center">Browser Primește</h3>

```js
function Greeting() {
  return React.createElement(
    'div',
    { className: 'card' },
    React.createElement('h1', null, 'Salut!'),
    React.createElement('p', null, 'Bine ai venit.')
  );
}
```

</div>

</div>

<AdmonitionType type="info" class="mt-6">

JSX face codul mai ușor de citit și scris. Babel/compilatorul transformă JSX în JavaScript valid înainte ca browser-ul să îl ruleze.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Regulile JSX

:: content ::

JSX urmează 3 reguli importante:

<div class="grid grid-cols-3 gap-4 mt-6">

<div class="bg-emerald-50 border-4 border-emerald-500 rounded-2xl p-4">
<h3 class="text-lg font-black mb-2 text-center">1. Un singur element root</h3>
<p class="text-sm">Returnează întotdeauna un singur element părinte. Poți folosi <code>&lt;&gt; &lt;/&gt;</code> (Fragment) dacă nu vrei un element extra în DOM.</p>
</div>

<div class="bg-sky-50 border-4 border-sky-400 rounded-2xl p-4">
<h3 class="text-lg font-black mb-2 text-center">2. Închide toate tag-urile</h3>
<p class="text-sm">Toate tag-urile trebuie închise explicit, inclusiv cele self-closing: <code>&lt;img /&gt;</code>, <code>&lt;br /&gt;</code>, <code>&lt;input /&gt;</code>.</p>
</div>

<div class="bg-purple-50 border-4 border-purple-400 rounded-2xl p-4 ">
<h3 class="text-lg font-black mb-2 text-center">3. Majoritatea atributelor sunt camelCase</h3>
<div class="text-sm text-center space-y-2 mt-2">
<p><code>class</code> → <code>className</code></p>
<p><code>onclick</code> → <code>onClick</code></p>
<p><code>tabindex</code> → <code>tabIndex</code></p>
</div>
</div>

</div>

<AdmonitionType type="note" class="mt-6">

**Excepție:** Atributele `aria-*` și `data-*` se scriu cu cratimă (dash) ca în HTML, din motive istorice.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Regulile JSX: Exemple

:: content ::

<div class="flex gap-6 mt-4">

<div class="flex-1">

### ❌ Greșit:

```jsx
// Mai multe elemente root
return (
  <h1>Titlu</h1>
  <p>Text</p>
);

// Tag-uri neînchise
<img src="photo.jpg">
<br>

// class și onclick
<div class="box" onclick={fn}>
```

</div>

<div class="flex-1">

### ✅ Corect:

```jsx
// Un singur element root
return (
  <div>
    <h1>Titlu</h1>
    <p>Text</p>
  </div>
);

// Tag-uri închise
<img src="photo.jpg" />
<br />

// className și camelCase
<div className="box" onClick={fn}>
```

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Crearea unui Proiect React

:: content ::

Cel mai rapid mod de a crea un proiect React modern este cu **Vite**.

```bash
# 1. Creează proiectul
npm create vite@latest my-app -- --template react

# 2. Intră în folder
cd my-app

# 3. Instalează dependențele
npm install

# 4. Pornește serverul de dezvoltare
npm run dev
```

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# React vs ReactDOM

:: content ::

React este de fapt format din **două pachete separate**, fiecare cu un rol distinct.

<div class="flex items-center justify-center gap-6 mt-6">

<div class="bg-sky-50 border-4 border-sky-400 rounded-2xl p-4 flex-1 max-w-md">
<h3 class="text-xl font-black mb-3 text-center">react</h3>

<p class="text-sm mb-3">Librăria de bază care știe <strong>ce</strong> sunt componentele și cum funcționează.</p>

<ul class="text-xs space-y-1">
<li>Definirea componentelor</li>
<li>Hooks (<code>useState</code>, <code>useEffect</code>...)</li>
<li>JSX, props, state</li>
<li>Nu știe nimic despre DOM</li>
</ul>

</div>

<div class="text-3xl font-black text-sky-400 self-center">
+
</div>

<div class="bg-purple-50 border-4 border-purple-400 rounded-2xl p-4 flex-1 max-w-md">
<h3 class="text-xl font-black mb-3 text-center">react-dom</h3>

<p class="text-sm mb-3">Librăria care știe <strong>cum</strong> să afișeze componentele în browser.</p>

<ul class="text-xs space-y-1">
<li>Randarea în DOM-ul browserului</li>
<li>Gestionarea evenimentelor (click, input...)</li>
<li>Metoda <code>createRoot().render()</code></li>
<li>Specific pentru web</li>
</ul>

</div>

</div>

<AdmonitionType type="info" class="mt-6">

**De ce separarea?** Aceeași librărie `react` este folosită și cu React Native (mobile), React Three Fiber (3D), sau alte randatoare. Doar partea de randare diferă.

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Versionarea Pachetelor (SemVer)

:: content ::

<p class="text-center text-sm mb-3">Pachetele npm folosesc <strong>Semantic Versioning</strong> — un sistem cu 3 numere care comunică tipul schimbărilor.</p>

<div class="flex justify-center gap-4 mb-3">

<div class="bg-red-50 border-3 border-red-400 rounded-xl p-2 text-center flex-1 max-w-[160px]">
<h3 class="text-sm font-black">MAJOR</h3>
<p class="text-3xl font-black text-red-500">18</p>
<p class="text-xs">Schimbări incompatibile</p>
</div>

<div class="text-2xl font-black self-center">.</div>

<div class="bg-amber-50 border-3 border-amber-400 rounded-xl p-2 text-center flex-1 max-w-[160px]">
<h3 class="text-sm font-black">MINOR</h3>
<p class="text-3xl font-black text-amber-500">3</p>
<p class="text-xs">Funcționalități noi</p>
</div>

<div class="text-2xl font-black self-center">.</div>

<div class="bg-emerald-50 border-3 border-emerald-400 rounded-xl p-2 text-center flex-1 max-w-[160px]">
<h3 class="text-sm font-black">PATCH</h3>
<p class="text-3xl font-black text-emerald-500">1</p>
<p class="text-xs">Corecturi de bug-uri</p>
</div>

</div>

<div class="flex justify-center gap-4 mb-2">

<div class="bg-sky-50 border-3 border-sky-400 rounded-xl p-2 flex-1 max-w-xs text-center">
<h3 class="text-sm font-black mb-1">^18.3.1 (caret)</h3>
<p class="text-xs">Acceptă MINOR + PATCH noi</p>
<p class="text-xs text-gray-500">≥18.3.1 și &lt;19.0.0</p>
</div>

<div class="bg-purple-50 border-3 border-purple-400 rounded-xl p-2 flex-1 max-w-xs text-center">
<h3 class="text-sm font-black mb-1">~18.3.1 (tildă)</h3>
<p class="text-xs">Acceptă doar PATCH noi</p>
<p class="text-xs text-gray-500">≥18.3.1 și &lt;18.4.0</p>
</div>

</div>

<AdmonitionType type="tip" class="mt-2">

**`^` (caret)** este implicit în `npm install` — permite actualizări sigure fără schimbări incompatibile.

</AdmonitionType>

