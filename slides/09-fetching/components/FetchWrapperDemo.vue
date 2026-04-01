<script setup>
import LiveWeb from '../../../common/components/LiveWeb.vue'

const code = `// Helper reutilizabil — centralizează URL, headers, error handling
async function api(endpoint, options = {}) {
  const baseURL = 'https://jsonplaceholder.typicode.com';

  const res = await fetch(baseURL + endpoint, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  if (res.status === 204) return null;
  return res.json();
}

// Acum codul e mult mai curat:
async function demo() {
  // GET
  const user = await api('/users/1');
  console.log(\`GET: \${user.name}\`);

  // POST
  const post = await api('/posts', {
    method: 'POST',
    body: { title: 'Titlu nou', body: 'Conținut', userId: 1 },
  });
  console.log(\`POST: id = \${post.id}\`);

  // PATCH
  const updated = await api('/posts/1', {
    method: 'PATCH',
    body: { title: 'Titlu modificat' },
  });
  console.log(\`PATCH: \${updated.title}\`);

  // DELETE
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'DELETE',
  });
  console.log(\`DELETE: \${res.status} \${res.ok ? '(succes)' : '(eroare)'}\`);
}

demo();`
</script>

<template>
  <LiveWeb :code="code" consoleOnly :editorHeight="420" />
</template>
