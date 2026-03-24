<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useRef } from 'react';

export default function RefVsState() {
  // Ref - NU cauzează re-render
  const countRef = useRef(0);
  // State - cauzează re-render
  const [countState, setCountState] = useState(0);
  // Contor de renderizări
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div style={styles.container}>
      <p style={styles.renders}>
        Renderizări: <strong>{renderCount.current}</strong>
      </p>

      <div style={styles.row}>
        <div style={styles.card}>
          <h3 style={styles.title}>useRef</h3>
          <p style={styles.value}>{countRef.current}</p>
          <button
            onClick={() => {
              countRef.current++;
              console.log('Ref:', countRef.current);
            }}
            style={styles.btnRef}
          >
            +1 (ref)
          </button>
          <p style={styles.hint}>
            Verifică consola! UI-ul NU se actualizează.
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.title}>useState</h3>
          <p style={styles.value}>{countState}</p>
          <button
            onClick={() => setCountState(c => c + 1)}
            style={styles.btnState}
          >
            +1 (state)
          </button>
          <p style={styles.hint}>
            UI-ul se actualizează la fiecare click.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  renders: {
    textAlign: 'center', fontSize: '14px',
    color: '#6b7280', marginBottom: '16px'
  },
  row: { display: 'flex', gap: '16px', justifyContent: 'center' },
  card: {
    border: '1px solid #e5e7eb', borderRadius: '12px',
    padding: '20px', textAlign: 'center', width: '200px'
  },
  title: { margin: '0 0 8px', fontSize: '16px', color: '#374151' },
  value: { fontSize: '36px', fontWeight: 'bold', margin: '8px 0' },
  btnRef: {
    padding: '8px 20px', background: '#8b5cf6', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontSize: '14px'
  },
  btnState: {
    padding: '8px 20px', background: '#3b82f6', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontSize: '14px'
  },
  hint: { fontSize: '12px', color: '#9ca3af', marginTop: '8px' }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="420" />
</template>
