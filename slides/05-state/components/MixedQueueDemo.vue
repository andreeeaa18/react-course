<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

export default function MixedQueue() {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{count}</h2>

      <div style={styles.buttons}>
        <div style={styles.group}>
          <button
            onClick={() => {
              // Înlocuiește cu count+5, apoi adaugă 1
              setCount(count + 5);
              setCount(c => c + 1);
            }}
            style={{ ...styles.button, background: '#3b82f6' }}
          >
            +5 → +1
          </button>
          <code style={styles.result}>= count + 6</code>
        </div>

        <div style={styles.group}>
          <button
            onClick={() => {
              // Înlocuiește cu count+5, adaugă 1, apoi forțează 42
              setCount(count + 5);
              setCount(c => c + 1);
              setCount(42);
            }}
            style={{ ...styles.button, background: '#8b5cf6' }}
          >
            +5 → +1 → =42
          </button>
          <code style={styles.result}>= 42 mereu</code>
        </div>

        <div style={styles.group}>
          <button
            onClick={() => setCount(0)}
            style={{ ...styles.button, background: '#6b7280' }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  title: {
    fontSize: '80px',
    fontWeight: 'bold',
    color: '#3b82f6',
    margin: 0,
    lineHeight: 1,
  },
  buttons: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  button: {
    padding: '12px 18px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  result: {
    fontSize: '12px',
    color: '#6b7280',
    background: '#f3f4f6',
    padding: '2px 8px',
    borderRadius: '4px',
  },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
