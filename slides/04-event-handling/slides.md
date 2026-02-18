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

## Gestionarea evenimentelor

Cum răspund aplicațiile la acțiunile utilizatorului

<div class="absolute top-2 right-2 w-8 h-8">
<GithubLink repo="https://github.com/cristi-usm/react-course" />
</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce sunt Evenimentele?

:: content ::

Un **eveniment** este un semnal că ceva s-a întâmplat în pagină. Browserul detectează acțiunile utilizatorului și le transformă în obiecte de tip `Event`, pe care le livrează codului JavaScript.

<div class="flex items-center justify-center gap-3 mt-6">


<div class="bg-amber-50 border-4 border-amber-400 rounded-2xl p-4 text-center w-40">
  <div class="text-3xl mb-2">👤</div>
  <div class="font-black text-sm text-amber-800">Acțiune</div>
  <div class="text-xs text-amber-600 mt-1">click, tastă, scroll</div>
</div>


<div class="text-3xl font-black text-amber-400">→</div>

<div class="bg-sky-50 border-4 border-sky-400 rounded-2xl p-4 text-center w-40">
  <div class="text-3xl mb-2">🌐</div>
  <div class="font-black text-sm text-sky-800">Browser</div>
  <div class="text-xs text-sky-600 mt-1">creează obiectul Event</div>
</div>


<div class="text-3xl font-black text-amber-400">→</div>

<div class="bg-emerald-50 border-4 border-emerald-400 rounded-2xl p-4 text-center w-40">
  <div class="text-3xl mb-2">⚡</div>
  <div class="font-black text-sm text-emerald-800">Handler</div>
  <div class="text-xs text-emerald-600 mt-1">funcția ta rulează</div>
</div>


<div class="text-3xl font-black text-amber-400">→</div>

<div class="bg-purple-50 border-4 border-purple-400 rounded-2xl p-4 text-center w-40">
  <div class="text-3xl mb-2">🖥️</div>
  <div class="font-black text-sm text-purple-800">Răspuns</div>
  <div class="text-xs text-purple-600 mt-1">UI se actualizează</div>
</div>


</div>


<div class="mt-6 grid grid-cols-3 gap-3 text-xs">

<div class="bg-slate-50 border border-slate-300 rounded-xl p-3">
  <div class="font-black text-slate-700 mb-1 text-center">🖱️ Mouse</div>
<div class="flex flex-col items-center gap-1">
  <code>click</code>
  <code>dblclick</code>
  <code>mouseenter</code>
  <code>mouseleave</code>
  <code>mousemove</code>
</div>
</div>


<div class="bg-slate-50 border border-slate-300 rounded-xl p-3">
  <div class="font-black text-slate-700 mb-1 text-center">⌨️ Tastatură</div>
  <div class="flex flex-col items-center gap-1">
    <code>keydown</code>
    <code>keyup</code>
    <code>keypress</code>
  </div>
</div>


<div class="bg-slate-50 border border-slate-300 rounded-xl p-3">
  <div class="font-black text-slate-700 mb-1 text-center">📝 Formular</div>
  <div class="flex flex-col items-center gap-1">
    <code>submit</code>
    <code>change</code>
    <code>input</code>
    <code>focus</code>
    <code>blur</code>
  </div>
</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Atribute HTML — Metoda Veche

:: content ::

Înainte de JavaScript modern, evenimentele se atașau direct în HTML prin **atribute inline**. Această metodă funcționează, dar este considerată o practică învechită.

<div class="flex items-center justify-center gap-6 mt-4">

<div class="bg-red-50 border-4 border-red-400 rounded-2xl p-4 flex-1 max-w-lg">
<h4 class="text-xs font-black mb-3 text-center text-red-700">❌ Metoda veche — atribute HTML</h4>

```html
<!-- Handler direct în atribut HTML -->
<button onclick="saluta()">Salută</button>

<input onchange="valida(this.value)"
       placeholder="Scrie ceva...">

<form onsubmit="trimite(); return false;">
  <button type="submit">Trimite</button>
</form>

<script>
  function saluta() {
    alert('Bună ziua!');
  }
  function valida(val) {
    console.log('Valoare:', val);
  }
</script>
```

</div>

<div class="flex flex-col gap-3 flex-1 max-w-sm">

<div class="bg-orange-50 border-2 border-orange-300 rounded-xl p-3 text-xs">
  <div class="font-black text-orange-700 mb-1">⚠️ Probleme</div>
  <ul class="list-disc list-inside text-orange-600 space-y-1 ns-c-tight">
    <li>HTML și JS amestecate</li>
    <li>Greu de testat și de întreținut</li>
    <li>Funcțiile trebuie să fie globale</li>
    <li>Poți atașa un singur handler per eveniment</li>
  </ul>
</div>

<AdmonitionType type="warning">

  `onclick="handler()"` apelează funcția **imediat** la parsare dacă uiți ghilimelele — un bug clasic!
</AdmonitionType>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
margin: tighter
---

:: title ::
# `addEventListener` — Metoda Corectă

:: content ::

`element.addEventListener(event-name, handler)` este API-ul modern pentru ascultarea evenimentelor. Separă HTML de logica JavaScript și permite **mai mulți listeneri** pe același element.

<div class="flex items-center justify-center gap-6 mt-4">

<div class="bg-emerald-50 border-4 border-emerald-400 rounded-2xl p-4 flex-1 max-w-lg">

```js
const buton = document.getElementById('buton');
const input = document.querySelector('.camp');
// Handler definit separat
function handleClick(event) {
  console.log('Apăsat!', event.target);
}

// Atașăm listeneri
buton.addEventListener('click', handleClick);
// Mai mulți listeneri pe același element
buton.addEventListener('click', () => {
  console.log('Al doilea listener!');
});
// Cleanup — important pentru scurgeri de memorie
buton.removeEventListener('click', handleClick);
// Listener cu opțiuni
input.addEventListener('input', handleInput, {
  once: true,   // rulează o singură dată
  passive: true // nu apelează preventDefault
});
```

</div>

<div class="flex flex-col gap-3 flex-1 max-w-xs">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-3 text-xs">
  <div class="font-black text-sky-700 mb-1">✅ Avantaje</div>
  <ul class="list-disc list-inside text-sky-600 space-y-1 ns-c-tight">
    <li>HTML și JS separate</li>
    <li>Mai mulți listeneri per element</li>
    <li>Poți elimina listeneri</li>
    <li>Opțiuni avansate (once, passive)</li>
  </ul>
</div>

<AdmonitionType type="tip">

  Primul parametru este **tipul evenimentului** fără prefixul `on`: `'click'` nu `'onclick'`.
</AdmonitionType>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Referință vs. Apel de Funcție

:: content ::

Aceasta este una dintre cele mai frecvente greșeli la lucrul cu evenimente. Înțelegerea diferenței este **esențială** — situația se repetă și în React!

<div class="flex items-center justify-center gap-6 mt-4">

<div class="bg-red-50 border-4 border-red-400 rounded-2xl p-4 flex-1 max-w-md">
<h4 class="text-xs font-black mb-3 text-center text-red-700">❌ Apel imediat — greșit</h4>

```js
function handleClick() {
  alert('Ai dat click!');
}

// ❌ handler() — funcția se apelează ACUM
// returnează undefined, nu funcția în sine
buton.addEventListener('click', handleClick());

// ❌ La fel — apelezi funcția în loc să o transmiți ca parametru
buton.addEventListener('click', alert('Greșit!'));
```

<p class="text-xs text-red-700 mt-2 font-semibold">Funcția rulează o dată la înregistrare, nu la click. Listener-ul primește <code>undefined</code>.</p>
</div>

<div class="bg-emerald-50 border-4 border-emerald-400 rounded-2xl p-4 flex-1 max-w-md">
<h4 class="text-xs font-black mb-3 text-center text-emerald-700">✅ Referință — corect</h4>

```js
function handleClick() {
  alert('Ai dat click!');
}

// ✅ handleClick — transmiți referința funcției
// browserul o va apela la momentul click-ului
buton.addEventListener('click', handleClick);

// ✅ Arrow function — creezi o funcție nouă
// care va fi apelată la click
buton.addEventListener('click', () => {
  alert('Corect!');
});
```

<p class="text-xs text-emerald-700 mt-2 font-semibold">Funcția rulează <strong>mai târziu</strong>, abia când utilizatorul dă click.</p>
</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tighter
---

:: title ::
# Obiectul `Event`

:: content ::

Browserul creează automat un obiect `Event` și îl trimite ca prim parametru handler-ului.

<div class="grid grid-cols-2 gap-3 mt-3 text-xs">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-3">
<div class="font-black text-sky-700 mb-2">🖱️ Mouse / Click</div>

```js
el.addEventListener('click', (e) => {
  e.type        // "click"
  e.target      // elementul apăsat
  e.currentTarget // cel cu listener-ul
  e.clientX     // 245  (față de viewport)
  e.clientY     // 380
  e.button      // 0=stânga, 2=dreapta
})
```

</div>

<div class="bg-violet-50 border-2 border-violet-300 rounded-xl p-3">
<div class="font-black text-violet-700 mb-2">⌨️ Tastatură</div>

```js
el.addEventListener('keydown', (e) => {
  e.key       // "a", "Enter", "ArrowUp"
  e.code      // "KeyA", "Enter"
  e.shiftKey  // true / false
  e.ctrlKey   // true / false
  e.altKey    // true / false
})
```

</div>

<div class="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3">
<div class="font-black text-emerald-700 mb-2">📝 Input / Formular</div>

```js
el.addEventListener('input', (e) => {
  e.target.value    // "text scris de user"
  e.target.checked  // true/false (checkbox)
})
el.addEventListener('submit', (e) => {
  e.preventDefault() // oprește reload-ul
})
```

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-3">
<div class="font-black text-amber-700 mb-2">🎯 target vs currentTarget</div>
<p class="text-amber-600 mb-1"><code>target</code> — elementul pe care s-a produs evenimentul</p>
<p class="text-amber-600 mb-2"><code>currentTarget</code> — cel cu listener-ul atașat</p>
<p class="text-amber-500 italic">Diferă când evenimentele face <em>bubbling</em> spre părinți (slide următor!)</p>
</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo — Obiectul Event în Acțiune

:: content ::

<EventObjectDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo — Mai Mulți Listeneri

:: content ::

<AddEventListenerDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Recapitulare — Fundamente Evenimente

:: content ::

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="flex flex-col gap-3">

<div class="bg-emerald-50 border-2 border-emerald-400 rounded-xl p-3 text-sm ns-c-tight">
  <div class="font-black text-emerald-700 mb-2">✅ Dosr</div>
  <ul class="list-disc list-inside text-emerald-600 space-y-1 text-xs">
    <li>Folosește <code>addEventListener</code> în loc de atribute HTML</li>
    <li>Transmite <strong>referința</strong> funcției, nu apelul ei</li>
    <li>Elimină listenerii cu <code>removeEventListener</code> când nu mai ai nevoie</li>
    <li>Folosește <code>event.target</code> pentru a identifica sursa</li>
    <li>Numește parametrul eveniment <code>e</code> sau <code>event</code></li>
  </ul>
</div>

<div class="bg-red-50 border-2 border-red-400 rounded-xl p-3 text-sm ns-c-tight">
  <div class="font-black text-red-700 mb-2">❌ Don'ts</div>
  <ul class="list-disc list-inside text-red-600 space-y-1 text-xs">
    <li>Nu folosi <code>onclick="..."</code> în HTML</li>
    <li>Nu apela funcția când o transmiți: <code>handler()</code></li>
    <li>Nu uita că <code>event.key</code> e case-sensitive (<code>"Enter"</code> nu <code>"enter"</code>)</li>
    <li>Nu confunda <code>target</code> cu <code>currentTarget</code></li>
  </ul>
</div>

</div>

<div class="flex flex-col gap-3">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-3 text-xs ">
  <div class="font-black text-sky-700 mb-2">📋 Proprietăți Event frecvente</div>
  <table class="w-full text-xs">
    <tbody>
      <tr class="border-b border-sky-200"><td class="py-1 font-mono font-bold">event.type</td><td class="py-1 text-sky-600">"click", "keydown"...</td></tr>
      <tr class="border-b border-sky-200"><td class="py-1 font-mono font-bold">event.target</td><td class="py-1 text-sky-600">elementul sursă</td></tr>
      <tr class="border-b border-sky-200"><td class="py-1 font-mono font-bold">event.key</td><td class="py-1 text-sky-600">"Enter", "a", "ArrowUp"</td></tr>
      <tr class="border-b border-sky-200"><td class="py-1 font-mono font-bold">event.clientX/Y</td><td class="py-1 text-sky-600">poziția mouse-ului</td></tr>
      <tr><td class="py-1 font-mono font-bold">event.target.value</td><td class="py-1 text-sky-600">valoarea unui input</td></tr>
    </tbody>
  </table>
</div>

</div>

</div>

<div class="mt-6">
<AdmonitionType type="tip">

  Tot ce ai învățat aici — referință vs apel, obiectul event — se aplică **identic** în React. React doar schimbă sintaxa!
</AdmonitionType>
</div>

---
layout: section
color: sky-light
---

# Propagarea Evenimentelor
## Bubbling, Capturing & Control

---
layout: top-title
align: c
color: sky-light
margin: tighter
---

:: title ::
# Event Bubbling — Evenimentele Urcă

:: content ::

Când dai click pe un element, evenimentul nu se oprește acolo. El **urcă** prin toți părinții din DOM, declanșând handler-ele fiecăruia pe drum.

<div class="flex items-start justify-center gap-8 mt-4">

<div class="flex flex-col items-center gap-1">

<div class="bg-slate-100 border-2 border-slate-400 rounded-xl px-6 py-3 text-xs font-mono w-48 text-center">
  <div class="text-slate-500 mb-1">document</div>
  <div class="bg-slate-200 rounded-lg px-4 py-2">
    <div class="text-slate-600 mb-1">div.pagina</div>
    <div class="bg-sky-100 border border-sky-300 rounded-lg px-3 py-2">
      <div class="text-sky-700 mb-1">div.sectiune</div>
      <div class="bg-amber-100 border-2 border-amber-400 rounded-lg px-2 py-1 text-amber-800 font-black">
        button ← click!
      </div>
    </div>
  </div>
  
</div>

<div class="text-emerald-500 font-black text-lg mt-2">↑ bubbling în sus</div>

<AdmonitionType type="tip">

  Ordinea este întotdeauna **de la cel mai specific** (elementul apăsat) **spre cel mai general** (document).

</AdmonitionType>


</div>

<div class="flex flex-col gap-3 flex-1 max-w-md">

```js
document.querySelector('.pagina')
  .addEventListener('click', () => {
    console.log('3. div.pagina');     // al treilea
  });

document.querySelector('.sectiune')
  .addEventListener('click', () => {
    console.log('2. div.sectiune');   // al doilea
  });

document.querySelector('button')
  .addEventListener('click', () => {
    console.log('1. button');         // primul
  });

// Click pe button → log:
// 1. button
// 2. div.sectiune
// 3. div.pagina
```


</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# `stopPropagation()` — Oprește Bubbling-ul

:: content ::

`e.stopPropagation()` spune browserului: **oprește-te aici, nu mai urca**.

<div class="flex items-start justify-center gap-6 mt-4">

<div class="bg-red-50 border-4 border-red-400 rounded-2xl p-4 flex-1 max-w-md">
<h4 class="text-xs font-black mb-3 text-center text-red-700">❌ Fără stopPropagation</h4>

```js
div.addEventListener('click', () => {
  console.log('Div apăsat!');
});

button.addEventListener('click', () => {
  console.log('Buton apăsat!');
  // evenimentul urcă la div
});

// Click pe button → ambele se declanșează:
// "Buton apăsat!"
// "Div apăsat!"
```

</div>

<div class="bg-emerald-50 border-4 border-emerald-400 rounded-2xl p-4 flex-1 max-w-md">
<h4 class="text-xs font-black mb-3 text-center text-emerald-700">✅ Cu stopPropagation</h4>

```js
div.addEventListener('click', () => {
  console.log('Div apăsat!');
});

button.addEventListener('click', (e) => {
  e.stopPropagation(); // ← oprește urcarea
  console.log('Buton apăsat!');
});

// Click pe button → doar:
// "Buton apăsat!"
// div nu se mai declanșează
```

</div>

</div>

<AdmonitionType type="warning" class="mt-4">

  Folosește `stopPropagation()` cu grijă — poate ascunde bug-uri sau rupe componente care depind de bubbling (ex: librării de tooltip, închiderea modalelor pe click în exterior...).
</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
margin: tighter
---

:: title ::
# Faza de Captură — `capture: true`

:: content ::

Evenimentele au de fapt **3 faze**: coborâre (capture) → țintă → urcare (bubble). De obicei lucrăm cu bubble, dar putem asculta și în faza de captură.

<div class="flex items-start justify-center gap-8 mt-4">

<div class="flex flex-col gap-2 text-xs flex-1 max-w-xs">

<div class="bg-purple-50 border-2 border-purple-300 rounded-xl p-3">
<div class="font-black text-purple-700 mb-2">Faza 1 — Capture</div>
<p class="text-purple-600">Evenimentul coboară de la <code>document</code> spre elementul țintă. Listenerii cu <code>capture: true</code> rulează acum.</p>
</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-3">
<div class="font-black text-amber-700 mb-2">Faza 2 — Target</div>
<p class="text-amber-600">Evenimentul ajunge la elementul pe care s-a dat click. Handler-ele sale rulează.</p>
</div>

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-3">
<div class="font-black text-sky-700 mb-2">Faza 3 — Bubble</div>
<p class="text-sky-600">Evenimentul urcă înapoi. Handler-ele normale (fără capture) rulează acum.</p>
</div>

</div>

<div class="flex-1 max-w-md">

```js
// Listener normal — rulează în faza bubble (default)
div.addEventListener('click', (e) => {
  console.log('bubble: div');
});

// Listener în faza capture — rulează primul
div.addEventListener('click', (e) => {
  console.log('capture: div');
}, { capture: true }); // sau: true ca al 3-lea argument

button.addEventListener('click', (e) => {
  console.log('target: button');
});

// Click pe button → ordinea:
// "capture: div"     ← coboară
// "target: button"   ← țintă
// "bubble: div"      ← urcă
```

<AdmonitionType type="tip">

  `capture: true` este rar folosit. Cazuri de utilizare: analitici globale, blocarea evenimentelor înainte să ajungă la copii.
</AdmonitionType>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
margin: tighter
---

:: title ::
# `preventDefault()` — Oprește Comportamentul Implicit

:: content ::

Browserul are comportamente implicite pentru unele elemente: link-urile navighează, formularele reîncarcă pagina, checkbox-urile se bifează. `e.preventDefault()` le oprește.

<div class="flex items-start justify-center gap-6 mt-4">

<div class="bg-slate-50 border-4 border-slate-300 rounded-2xl p-4 flex-1 max-w-lg">

```js
// ❌ Fără preventDefault — pagina se reîncarcă
form.addEventListener('submit', function(e) {
  console.log('Trimis!');
  // browser navighează / reîncarcă pagina
});
// ✅ Cu preventDefault — controlăm noi
form.addEventListener('submit', function(e) {
  e.preventDefault();           // oprește reload-ul
  const data = new FormData(e.target);
  console.log('Nume:', data.get('name'));
  // procesăm cu fetch / validare proprie
});
// ✅ Link care nu navighează
link.addEventListener('click', function(e) {
  e.preventDefault();
  console.log('Click interceptat, nu navighăm');
});
// ✅ Drag & drop — oprește comportamentul implicit
zona.addEventListener('dragover', function(e) {
  e.preventDefault(); // necesar pentru a permite drop
});
```

</div>

<div class="flex flex-col gap-3 flex-1 max-w-xs">

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 text-xs">
  <div class="font-black text-amber-700 mb-2">⚠️ Diferența față de stopPropagation</div>
  <p class="text-amber-600 mb-1"><code>stopPropagation()</code> — oprește urcarea evenimentului prin DOM</p>
  <p class="text-amber-600">  <code>preventDefault()</code> — oprește acțiunea implicită a browserului</p>
  <p class="text-amber-500 italic mt-1">Se pot folosi împreună sau separat!</p>
</div>

<div class="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3 text-xs">
  <div class="font-black text-emerald-700 mb-2">Elemente cu comportament implicit</div>
  <ul class="list-disc list-inside text-emerald-600 space-y-1 ns-c-tight">
    <li><code>form</code> → trimite și reîncarcă</li>
    <li><code>a</code> → navighează la href</li>
    <li><code>input[type=submit]</code> → trimite form</li>
    <li><code>dragover</code> → refuză drop</li>
    <li><code>contextmenu</code> → meniu click dreapta</li>
  </ul>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo — Bubbling în Acțiune

:: content ::

<BubblingDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo — preventDefault pe Formular

:: content ::

<PreventDefaultDemo />

---
layout: section
color: sky-light
---

# Evenimente în React

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Adăugarea unui Event Handler

:: content ::

<div class="flex items-start gap-6 mt-2">

<div class="flex-1">

```jsx
// 1️⃣ Definește funcția în interiorul componentei
function Buton() {
  function handleClick() {
    alert('Ai apăsat butonul!');
  }

  // 2️⃣ Transmite funcția ca prop onClick
  return (
    <button onClick={handleClick}>
      Apasă-mă
    </button>
  );
}
```

</div>

<div class="flex flex-col gap-3 flex-1 max-w-xs text-sm">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-3">
  <div class="font-black text-sky-700 mb-2">Cei 3 pași</div>
  <ol class="list-decimal list-inside text-sky-600 space-y-1 ns-c-tight">
    <li>Definește o funcție în componentă</li>
    <li>Transmite-o ca prop la elementul JSX</li>
    <li>Browserul o apelează la interacțiune</li>
  </ol>
</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-3">
  <div class="font-black text-amber-700 mb-1">Diferența față de HTML</div>
  <div class="text-amber-600 text-xs space-y-1 ns-c-tight">
    <p>❌ HTML: <code>onclick="handleClick()"</code></p>
    <p>✅ React: <code>onClick={handleClick}</code></p>
    <p class="italic text-amber-500">React primește funcția, nu un string!</p>
  </div>
</div>

<div class="bg-slate-50 border-2 border-slate-300 rounded-xl p-3">
  <div class="font-black text-slate-600 mb-1">Handler-ele pot fi și inline</div>
  <div class="text-xs text-slate-500 ns-c-tight">
    <code>onClick={() => alert('Salut!')}</code>
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
# Convenții de Denumire

:: content ::

<div class="flex items-start gap-6 mt-4">

<div class="flex-1">

```jsx
// Funcțiile handler → prefixul "handle"
function Formular() {
  function handleSubmit(e) { ... }
  function handleSchimbareNume(e) { ... }
  function handleSelectareOptiune(e) { ... }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleSchimbareNume} />
      <select onChange={handleSelectareOptiune} />
    </form>
  );
}
```

</div>

<div class="flex flex-col gap-3 flex-1 max-w-xs">

<div class="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3 text-sm">
  <div class="font-black text-emerald-700 mb-2">Convenția din React</div>
  <div class="space-y-2 ns-c-tight">
    <div>
      <div class="text-xs font-bold text-emerald-600 uppercase mb-1">Funcțiile handler</div>
      <div class="flex flex-col gap-1">
        <code class="text-xs bg-emerald-100 px-2 py-0.5 rounded">handleClick</code>
        <code class="text-xs bg-emerald-100 px-2 py-0.5 rounded">handleChange</code>
        <code class="text-xs bg-emerald-100 px-2 py-0.5 rounded">handleMouseEnter</code>
      </div>
    </div>
    <div>
      <div class="text-xs font-bold text-emerald-600 uppercase mb-1">Prop-urile event</div>
      <div class="flex flex-col gap-1">
        <code class="text-xs bg-emerald-100 px-2 py-0.5 rounded">onClick</code>
        <code class="text-xs bg-emerald-100 px-2 py-0.5 rounded">onChange</code>
        <code class="text-xs bg-emerald-100 px-2 py-0.5 rounded">onMouseEnter</code>
      </div>
    </div>
  </div>
</div>

<div class="bg-sky-50 border-2 border-sky-200 rounded-xl p-3 text-xs text-sky-600">
  <b class="text-sky-700">Regulă simplă:</b><br>
  Funcția → <code>handle[Eveniment]</code><br>
  Prop-ul → <code>on[Eveniment]</code><br>
  <span class="italic text-sky-400 mt-1 block">Ex: handleClick ↔ onClick</span>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Apelarea funcției — Greșeala Clasică

:: content ::

<div class="flex items-start gap-5 mt-2">

<div class="bg-red-50 border-4 border-red-400 rounded-2xl p-4 flex-1">
<div class="font-black text-red-600 mb-2 text-sm">❌ GREȘIT — apel imediat</div>

```jsx
<button onClick={handleClick()}>
  Apasă
</button>
```

<div class="mt-3 text-xs text-red-600 bg-red-100 rounded-lg p-2 ns-c-tight">
  <b>Ce se întâmplă:</b> <code>handleClick()</code> este apelat <b>imediat la render</b>, nu la click. Orice efect secundar (API call, alert, log) se declanșează la fiecare randare!
</div>
</div>

<div class="bg-emerald-50 border-4 border-emerald-400 rounded-2xl p-4 flex-1">
<div class="font-black text-emerald-600 mb-2 text-sm">✅ CORECT — transmitere referință</div>

```jsx
<button onClick={handleClick}>
  Apasă
</button>

// sau inline cu arrow:
<button onClick={() => handleClick()}>
  Apasă
</button>
```

<div class="mt-3 text-xs text-emerald-600 bg-emerald-100 rounded-lg p-2 ns-c-tight">
  <b>Ce se întâmplă:</b> React primește funcția ca referință și o apelează <b>doar la click</b>.
</div>
</div>

</div>

<div class="mt-3 bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-xs text-slate-600">
<b>Regula de aur:</b> Dacă după numele funcției există <code>()</code> direct în JSX (fără să fie înăuntrul unei funcții săgeată <code>{() =>}</code>), funcția se apelează la randare, nu la eveniment.
</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Handler-ele citesc Props-urile componentei

:: content ::

<div class="flex items-start gap-6 mt-2">

<div class="flex-1">

```jsx
function ButonCumparare({ produs, pret, onAdauga }) {
  // Handler-ul are acces la toate props-urile
  function handleClick() {
    alert(`${produs} adăugat — ${pret} lei`);
    onAdauga(produs); // apelează handler-ul din părinte
  }

  return (
    <button onClick={handleClick}>
      Cumpără {produs}
    </button>
  );
}

// Utilizare:
<ButonCumparare
  produs="Cafea Arabica"
  pret={45}
  onAdauga={handleAdaugaInCos}
/>
```

</div>

<div class="flex flex-col gap-3 flex-1 max-w-xs text-sm">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-3">
  <div class="font-black text-sky-700 mb-2">De ce funcționează?</div>
  <p class="text-sky-600 text-xs ns-c-tight">Handler-ele sunt definite <b>în interiorul componentei</b>, deci formează o <b>închidere (closure)</b> peste props și state. Au acces la toate valorile din scope-ul componentei.</p>
</div>

<div class="bg-violet-50 border-2 border-violet-300 rounded-xl p-3">
  <div class="font-black text-violet-700 mb-2">Bune practici</div>
  <ul class="list-disc list-inside text-violet-600 text-xs space-y-1 ns-c-tight">
    <li>Handler-ele sunt locul ideal pentru <b>efecte secundare</b></li>
    <li>Pot trimite date la un API</li>
    <li>Pot afișa notificări / alerte</li>
    <li>Pot apela handler-e primite ca props</li>
  </ul>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Transmiterea Handler-elor ca Props

:: content ::

<div class="flex items-start gap-6 mt-2">

<div class="flex-1">

```jsx
// Componenta copil acceptă handler-ul ca prop
function Buton({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

// Componenta părinte definește și transmite handler-ul ca prop
function BaraDeUnelte() {
  function handleRedare() { alert('▶ Se redă filmul!'); }
  function handleIncarcare() { alert('⬆ Se încarcă clipul!'); }

  return (
    <div>
      <Buton onClick={handleRedare}>▶ Redă</Buton>
      <Buton onClick={handleIncarcare}>⬆ Încarcă</Buton>
    </div>
  );
}
```

</div>

<div class="flex flex-col gap-3 flex-1 max-w-xs text-sm">

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-3">
  <div class="font-black text-amber-700 mb-2">Principiu cheie</div>
  <p class="text-amber-600 text-xs ns-c-tight">Componenta <b>copil</b> știe <em>că</em> s-a întâmplat ceva. Componenta <b>părinte</b> decide <em>ce</em> se face. Comportamentul se definește sus și se livrează jos.</p>
</div>

<div class="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3">
  <div class="font-black text-emerald-700 mb-2">Același <code>Buton</code>, comportament diferit</div>
  <p class="text-emerald-600 text-xs ns-c-tight">Componenta <code>Buton</code> nu știe nimic despre redare sau încărcare — ea doar propagă click-ul. Părintele controlează logica.</p>
</div>

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-3">
  <div class="font-black text-sky-700 mb-1">Toate evenimentele propagă</div>
  <p class="text-sky-600 text-xs ns-c-tight">În React, toate evenimentele urcă prin arborele de componente — <b>cu o singură excepție</b>: <code>onScroll</code> funcționează doar pe elementul JSX la care este atașat, fără să propagate.</p>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Nume Personalizat pentru Props de Eveniment

:: content ::

<div class="flex items-start gap-6 mt-2">

<div class="flex-1">

```jsx
// Componenta proprie poate expune orice prop on*
function PlayerVideo({ onRedare, onPauza, onVolum }) {
  return (
    <div>
      <button onClick={onRedare}>▶ Play</button>
      <button onClick={onPauza}>⏸ Pause</button>
      <input
        type="range"
        onChange={e => onVolum(e.target.value)}
      />
    </div>
  );
}

// Utilizare — părintele decide comportamentul
<PlayerVideo
  onRedare={() => setStare('redare')}
  onPauza={() => setStare('pauza')}
  onVolum={(val) => setVolum(val)}
/>
```

</div>

<div class="flex flex-col gap-3 flex-1 max-w-xs text-sm">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-3">
  <div class="font-black text-sky-700 mb-2">Reguli de denumire</div>
  <ul class="list-disc list-inside text-sky-600 text-xs space-y-1 ns-c-tight">
    <li>Prop-urile de eveniment trebuie să înceapă cu <code>on</code></li>
    <li>Urmat de o literă mare: <code>onRedare</code>, <code>onVolum</code></li>
    <li>Elementele HTML native acceptă doar <b>event-uri browser</b></li>
    <li>Componentele <b>proprii</b> pot expune orice prop <code>on*</code></li>
  </ul>
</div>

<div class="bg-violet-50 border-2 border-violet-300 rounded-xl p-3 text-xs text-violet-600">
  <b class="text-violet-700">Bună practică:</b> Numește prop-ul după <em>ce face componenta</em>, nu după evenimentul browser.<br><br>
  <code>onRedare</code> (domeniu) e mai clar decât <code>onButtonClick</code> (tehnic).
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo — Handler-e în React

:: content ::

<HandlerBasicsDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Demo — Transmiterea Handler-elor ca Props

:: content ::

<PassHandlerDemo />