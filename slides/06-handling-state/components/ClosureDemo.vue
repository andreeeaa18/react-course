<script setup>
import LiveWeb from '../../../common/components/LiveWeb.vue'

const code = `// === Ce este un Closure? ===

// Un closure = o funcție care "își amintește"
// variabilele din scope-ul în care a fost creată

function createCounter() {
  let count = 0; // variabilă locală

  // Funcția returnată "captează" count
  return function increment() {
    count++;
    console.log(\`Count: \${ count }\`);
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1(); // Count: 1
counter1(); // Count: 2
counter1(); // Count: 3

counter2(); // Count: 1 — counter2 are propriul "count"!
counter2(); // Count: 2

// === Closure cu valori "înghețate" ===

function createGreetings(names) {
  const greeters = [];

  for (const name of names) {
    // Fiecare funcție captează propria valoare "name"
    greeters.push(() => console.log('Salut, ' + name + '!'));
  }

  return greeters;
}

const greetAll = createGreetings(['Ana', 'Bob', 'Clara']);
greetAll[0](); // Salut, Ana!
greetAll[1](); // Salut, Bob!
greetAll[2](); // Salut, Clara!`
</script>

<template>
  <LiveWeb :code="code" consoleOnly :editorHeight="420" />
</template>
