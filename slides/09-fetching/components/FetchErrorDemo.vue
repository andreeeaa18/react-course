<script setup>
import LiveWeb from '../../../common/components/LiveWeb.vue'

const code = `// ATENȚIE: fetch() NU aruncă eroare la 404 sau 500!
// Aruncă eroare doar la probleme de rețea

// ❌ Greșit — nu prinde erori HTTP
async function fetchGresit() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/9999');
    const data = await res.json();
    console.log(\`❌ Pare OK dar... status: \${res.status}\`);
    console.log(\`  Datele: \${JSON.stringify(data)}\`);
  } catch (err) {
    console.log('Nu ajunge aici pentru 404!');
  }
}

// ✅ Corect — verificăm response.ok
async function fetchCorect() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/9999');

    if (!res.ok) {
      throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
    }

    const data = await res.json();
    console.log(\`✅ Date primite: \${JSON.stringify(data)}\`);
  } catch (err) {
    console.log(\`✅ Eroare prinsă: \${err.message}\`);
  }
}

(async () => {
  console.log('--- Fără verificare ---');
  await fetchGresit();

  console.log('\\n--- Cu response.ok ---');
  await fetchCorect();
})();`
</script>

<template>
  <LiveWeb :code="code" consoleOnly :editorHeight="400" />
</template>
