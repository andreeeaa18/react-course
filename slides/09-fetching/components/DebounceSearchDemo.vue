<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reqCount, setReqCount] = useState(0);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Debounce: asteptam 400ms dupa ultimul keystroke
    const timer = setTimeout(() => {
      const controller = new AbortController();

      setLoading(true);
      setReqCount(c => c + 1);

      fetch("https://jsonplaceholder.typicode.com/users?q=" + query, {
        signal: controller.signal,
      })
        .then(res => res.json())
        .then(data => {
          // Filtram local (API-ul nu suporta search real)
          const filtered = data.filter(u =>
            u.name.toLowerCase().includes(query.toLowerCase())
          );
          setResults(filtered);
          setLoading(false);
        })
        .catch(err => {
          if (err.name !== 'AbortError') setLoading(false);
        });

      // Cleanup: anuleaza daca query se schimba inainte de raspuns
      return () => controller.abort();
    }, 400);

    // Cleanup: anuleaza timer-ul daca user-ul tasteaza din nou
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div style={styles.container}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Cauta un user..."
        style={styles.input}
      />
      <p style={styles.info}>
        Request-uri trimise: {reqCount}
        {loading && " (se incarca...)"}
      </p>
      <ul style={styles.list}>
        {results.map(u => (
          <li key={u.id} style={styles.item}>
            <strong>{u.name}</strong>
            <span style={styles.email}>{u.email}</span>
          </li>
        ))}
        {query && !loading && results.length === 0 && (
          <li style={styles.empty}>Niciun rezultat</li>
        )}
      </ul>
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  input: {
    width: '100%', padding: '10px 14px', fontSize: '16px',
    border: '2px solid #e2e8f0', borderRadius: '8px', outline: 'none',
    boxSizing: 'border-box',
  },
  info: { color: '#64748b', fontSize: '13px', margin: '8px 0' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  item: {
    padding: '8px 0', borderBottom: '1px solid #e2e8f0',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  email: { color: '#64748b', fontSize: '13px' },
  empty: { color: '#94a3b8', padding: '8px 0', fontStyle: 'italic' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="440" />
</template>
