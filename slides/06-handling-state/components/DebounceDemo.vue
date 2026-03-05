<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import NaiveSearch from './NaiveSearch';
import DebouncedSearch from './DebouncedSearch';

export default function App() {
  return (
    <div style={styles.container}>
      <NaiveSearch />
      <DebouncedSearch />
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    padding: '8px'
  }
};`,
    active: true
  },
  '/NaiveSearch.js': {
    code: `import { useState } from 'react';

// ❌ "Apel API" la fiecare tastă
export default function NaiveSearch() {
  const [query, setQuery] = useState('');
  const [apiCalls, setApiCalls] = useState(0);

  function handleChange(e) {
    setQuery(e.target.value);
    // Simulăm un apel API la fiecare tastă
    setApiCalls(prev => prev + 1);
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.badTitle}>❌ Fără debounce</h3>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Caută..."
        style={styles.input}
      />
      <div style={styles.counter}>
        Apeluri API: <strong>{apiCalls}</strong>
      </div>
      <p style={styles.hint}>Scrie "react hooks" și numără</p>
    </div>
  );
}

const styles = {
  card: {
    padding: '12px',
    border: '2px solid #fca5a5',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  badTitle: { margin: 0, fontSize: '14px', color: '#dc2626' },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px'
  },
  counter: {
    padding: '8px',
    background: '#fef2f2',
    borderRadius: '4px',
    fontSize: '14px',
    textAlign: 'center'
  },
  hint: { margin: 0, fontSize: '11px', color: '#64748b' }
};`
  },
  '/DebouncedSearch.js': {
    code: `import { useState, useRef } from 'react';

// ✅ "Apel API" doar după ce utilizatorul se oprește
export default function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [apiCalls, setApiCalls] = useState(0);
  const timerRef = useRef(null);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value); // UI se actualizează instant

    // Anulăm timer-ul anterior
    clearTimeout(timerRef.current);

    // Setăm un nou timer — 500ms pauză
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(value);
      setApiCalls(prev => prev + 1);
    }, 500);
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.goodTitle}>✅ Cu debounce (500ms)</h3>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Caută..."
        style={styles.input}
      />
      <div style={styles.counter}>
        Apeluri API: <strong>{apiCalls}</strong>
      </div>
      {debouncedQuery && (
        <div style={styles.result}>
          Căutare: "{debouncedQuery}"
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    padding: '12px',
    border: '2px solid #86efac',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  goodTitle: { margin: 0, fontSize: '14px', color: '#16a34a' },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px'
  },
  counter: {
    padding: '8px',
    background: '#f0fdf4',
    borderRadius: '4px',
    fontSize: '14px',
    textAlign: 'center'
  },
  result: {
    padding: '6px 10px',
    background: '#ecfdf5',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#065f46'
  }
};`
  }
}
</script>

<template>
  <LiveReact
    :files="files"
    :showTabs="true"
    :editorHeight="400"
  />
</template>
