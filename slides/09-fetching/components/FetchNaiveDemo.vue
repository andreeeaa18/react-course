<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useEffect } from 'react';

export default function UserCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!res.ok) throw new Error("HTTP " + res.status);

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p style={styles.loading}>Se încarcă...</p>;
  if (error) return <p style={styles.error}>Eroare: {error}</p>;

  return (
    <div style={styles.card}>
      <h2 style={styles.name}>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p style={styles.company}>{user.company.name}</p>
    </div>
  );
}

const styles = {
  card: {
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    maxWidth: '320px',
  },
  name: { margin: '0 0 8px', color: '#0369a1' },
  company: { color: '#64748b', fontStyle: 'italic', marginTop: '8px' },
  loading: { color: '#0ea5e9' },
  error: { color: '#ef4444' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="450" />
</template>
