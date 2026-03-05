<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

function Counter({ isFancy }) {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      ...styles.counter,
      ...(isFancy ? styles.fancy : styles.normal)
    }}>
      <h3 style={styles.title}>
        {isFancy ? '✨ Counter Fancy' : 'Counter Simplu'}
      </h3>
      <p style={styles.count}>{count}</p>
      <button onClick={() => setCount(count + 1)} style={styles.button}>
        +1
      </button>
    </div>
  );
}

export default function App() {
  const [isFancy, setIsFancy] = useState(false);

  return (
    <div style={styles.container}>
      <label style={styles.label}>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => setIsFancy(e.target.checked)}
        />
        Folosește stilul fancy
      </label>

      {/* Aceeași componentă, aceeași poziție → state PĂSTRAT! */}
      {isFancy ? (
        <Counter isFancy={true} />
      ) : (
        <Counter isFancy={false} />
      )}

      <p style={styles.hint}>
        Incrementează contorul, apoi schimbă checkbox-ul.
        Contorul NU se resetează — e aceeași componentă la aceeași poziție!
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  label: {
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  counter: {
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center'
  },
  normal: {
    background: '#f1f5f9',
    border: '2px solid #cbd5e1'
  },
  fancy: {
    background: '#fdf4ff',
    border: '2px solid #d946ef'
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '16px'
  },
  count: {
    margin: '0 0 12px 0',
    fontSize: '36px',
    fontWeight: 'bold'
  },
  button: {
    padding: '8px 24px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  hint: {
    margin: 0,
    padding: '8px 12px',
    background: '#fef3c7',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#92400e'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="450" />
</template>
