<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useMemo } from 'react';

function filterAndSort(items, query) {
  console.time('filterAndSort');
  let result = [...items];
  for (let i = 0; i < 200; i++) {
    result = [...items].sort(() => Math.random() - 0.5);
    result.forEach(s => s.split('').reverse().join(''));
  }
  result = result
    .filter(item => item.toLowerCase().includes(query.toLowerCase()))
    .sort();
  console.timeEnd('filterAndSort');
  return result;
}

const allItems = Array.from({ length: 500 }, (_, i) =>
  'Element ' + String.fromCharCode(65 + (i % 26)) + '-' + (i + 1)
);

export default function App() {
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // SOLUȚIA: useMemo recalculează DOAR când query sau allItems se schimbă
  const filtered = useMemo(
    () => filterAndSort(allItems, query),
    [query]
  );

  return (
    <div style={{
      ...styles.container,
      background: darkMode ? '#1e293b' : '#fff',
      color: darkMode ? '#e2e8f0' : '#1e293b',
    }}>
      <div style={styles.controls}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Caută..."
          style={styles.input}
        />
        <button onClick={() => setDarkMode(!darkMode)} style={styles.btn}>
          {darkMode ? '☀️' : '🌙'} Toggle tema
        </button>
      </div>
      <p style={styles.hint}>
        Apasă "Toggle tema" — acum e instant! (verifică Console)
      </p>
      <p style={{ fontSize: '13px' }}>Rezultate: {filtered.length}</p>
      <ul style={styles.list}>
        {filtered.slice(0, 20).map(item => (
          <li key={item} style={styles.item}>{item}</li>
        ))}
        {filtered.length > 20 && (
          <li style={styles.more}>...și încă {filtered.length - 20}</li>
        )}
      </ul>
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  controls: { display: 'flex', gap: '8px', marginBottom: '8px' },
  input: {
    padding: '8px 12px', fontSize: '14px', border: '2px solid #10b981',
    borderRadius: '8px', flex: 1,
  },
  btn: {
    padding: '8px 16px', background: '#6366f1', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
  },
  hint: { color: '#10b981', fontSize: '13px', fontWeight: 'bold', margin: '4px 0' },
  list: { listStyle: 'none', padding: 0, maxHeight: '180px', overflow: 'auto' },
  item: { padding: '3px 8px', fontSize: '13px', borderBottom: '1px solid #f1f5f9' },
  more: { padding: '3px 8px', fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
