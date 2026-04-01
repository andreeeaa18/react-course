<script setup>
import LiveWeb from '../../../common/components/LiveWeb.vue'

const code = `// POST request — trimitem date la server
async function createUser() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      name: 'Ana Popescu',
      email: 'ana@example.com',
      phone: '0721-123-456',
    }),
  });

  console.log(\`Status: \${response.status}\`); // 201 Created
  console.log(\`OK? \${response.ok}\`);

  const newUser = await response.json();
  console.log(\`User creat: \${JSON.stringify(newUser, null, 2)}\`);
  console.log(\`ID primit: \${newUser.id}\`);
}

createUser();`
</script>

<template>
  <LiveWeb :code="code" consoleOnly :editorHeight="380" />
</template>
