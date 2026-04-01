<script setup>
import LiveWeb from '../../../common/components/LiveWeb.vue'

const code = `// GET request simplu cu fetch()
// fetch() returnează un Promise cu un obiect Response

async function getUser() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

  // Response conține metadata, nu datele direct
  console.log(\`Status: \${response.status}\`);
  console.log(\`OK? \${response.ok}\`);
  console.log(\`Content-Type: \${response.headers.get('content-type')}\`);

  // .json() parsează body-ul — returnează tot un Promise!
  const user = await response.json();
  console.log(\`User: \${user.name} - \${user.email}\`);
}

getUser();`
</script>

<template>
  <LiveWeb :code="code" consoleOnly :editorHeight="380" />
</template>
