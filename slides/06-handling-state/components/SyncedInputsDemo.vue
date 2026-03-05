<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useRef } from 'react';

// ── Uncontrolled: browser-ul gestionează valoarea ──
function UncontrolledInput() {
  const inputRef = useRef(null);
  const [submitted, setSubmitted] = useState('');

  function handleSubmit() {
    // Citim valoarea doar când avem nevoie
    setSubmitted(inputRef.current.value);
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Uncontrolled</h3>
      <p style={styles.desc}>Browser-ul gestionează valoarea. React nu "știe" ce scrii până nu citești ref-ul.</p>
      <input ref={inputRef} placeholder="Scrie ceva..." style={styles.input} />
      <button onClick={handleSubmit} style={styles.button}>Citește valoarea</button>
      <div style={styles.result}>
        Valoare: <strong>{submitted || '—'}</strong>
      </div>
    </div>
  );
}

// ── Controlled: React gestionează valoarea ──
function ControlledInput() {
  const [text, setText] = useState('');

  return (
    <div style={styles.card}>
      <h3 style={{...styles.title, color: '#2563eb'}}>Controlled</h3>
      <p style={styles.desc}>React gestionează valoarea. Avem acces la ea în timp real.</p>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Scrie ceva..."
        style={{...styles.input, borderColor: '#93c5fd'}}
      />
      <div style={styles.result}>
        Valoare: <strong>{text || '—'}</strong>
      </div>
      <div style={styles.result}>
        Caractere: <strong>{text.length}</strong>
      </div>
      <div style={styles.result}>
        UPPERCASE: <strong>{text.toUpperCase() || '—'}</strong>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={styles.container}>
      <UncontrolledInput />
      <ControlledInput />
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    padding: '12px'
  },
  card: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  title: {
    margin: 0,
    fontSize: '16px',
    color: '#6b7280'
  },
  desc: {
    margin: 0,
    fontSize: '12px',
    color: '#64748b'
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '2px solid #d1d5db',
    fontSize: '15px'
  },
  button: {
    padding: '8px 16px',
    background: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  result: {
    fontSize: '13px',
    padding: '6px 10px',
    background: '#f8fafc',
    borderRadius: '4px'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
