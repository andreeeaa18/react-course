<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import { useState } from 'react';

export default function App() {
  return (
    <div style={styles.container}>
      <BrokenCounter />
      <WorkingCounter />
    </div>
  );
}

function BrokenCounter() {
  const [count, setCount] = useState(0);
  return (
    <div style={styles.card}>
      <h3 style={styles.label}>❌ Fără updater</h3>
      <div style={styles.count}>{count}</div>
      <code style={styles.code}>setCount(count + 1)</code>
      <button
        onClick={() => {
          setCount(count + 1); // snapshot: count = ?
          setCount(count + 1); // snapshot: count = același!
          setCount(count + 1); // snapshot: count = același!
        }}
        style={{ ...styles.button, background: '#ef4444' }}
      >
        +3 → merge +1
      </button>
    </div>
  );
}

function WorkingCounter() {
  const [count, setCount] = useState(0);
  return (
    <div style={styles.card}>
      <h3 style={styles.label}>✅ Cu updater</h3>
      <div style={styles.count}>{count}</div>
      <code style={styles.code}>setCount(c =&gt; c + 1)</code>
      <button
        onClick={() => {
          setCount(c => c + 1); // coadă: 0 → 1
          setCount(c => c + 1); // coadă: 1 → 2
          setCount(c => c + 1); // coadă: 2 → 3
        }}
        style={{ ...styles.button, background: '#10b981' }}
      >
        +3 → merge corect!
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    padding: '16px',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    minWidth: '170px',
    gap: '10px',
  },
  label: { margin: 0, fontSize: '14px' },
  count: {
    fontSize: '56px',
    fontWeight: 'bold',
    color: '#3b82f6',
    lineHeight: 1,
  },
  code: {
    fontSize: '11px',
    background: '#f3f4f6',
    padding: '4px 8px',
    borderRadius: '4px',
    color: '#374151',
  },
  button: {
    padding: '10px 16px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    marginTop: '4px',
  },
};`,
    active: true,
  },
}
</script>

<template>
  <LiveReact :files="files" :editorHeight="380" />
</template>
