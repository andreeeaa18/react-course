<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

// Un singur component Counter
function Counter({ color, label }) {
  const [count, setCount] = useState(0);

  return (
    <div style={{ ...styles.counter, background: color }}>
      <h3 style={styles.label}>{label}</h3>
      <div style={styles.count}>{count}</div>
      <button onClick={() => setCount(count + 1)} style={styles.button}>
        Incrementează
      </button>
    </div>
  );
}

// Renderizăm Counter de DOUĂ ori
export default function App() {
  return (
    <div style={styles.container}>
      <Counter color="#3b82f6" label="Counter 1" />
      <Counter color="#ef4444" label="Counter 2" />
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    padding: '20px'
  },
  counter: {
    padding: '20px',
    borderRadius: '8px',
    color: 'white',
    textAlign: 'center'
  },
  label: { marginBottom: '10px' },
  count: { fontSize: '36px', fontWeight: 'bold', marginBottom: '15px' },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    background: 'white',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
