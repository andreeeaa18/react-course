<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useRef } from 'react';

export default function FocusForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  function handleFocusName() {
    nameRef.current.focus();
  }

  function handleFocusEmail() {
    emailRef.current.focus();
  }

  function handleSelectAll() {
    // Selectăm tot textul din câmpul Nume
    nameRef.current.select();
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Formular cu Refs DOM</h3>

      <label style={styles.label}>
        Nume:
        <input
          ref={nameRef}
          placeholder="Introdu numele"
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Email:
        <input
          ref={emailRef}
          type="email"
          placeholder="Introdu email-ul"
          style={styles.input}
        />
      </label>

      <div style={styles.buttons}>
        <button onClick={handleFocusName} style={styles.btn}>
          Focus Nume
        </button>
        <button onClick={handleFocusEmail} style={styles.btn}>
          Focus Email
        </button>
        <button onClick={handleSelectAll} style={styles.btnAlt}>
          Selectează Nume
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px', fontFamily: 'system-ui',
    maxWidth: '400px'
  },
  heading: { margin: '0 0 16px', color: '#1e293b' },
  label: {
    display: 'block', marginBottom: '12px',
    fontSize: '14px', color: '#475569', fontWeight: '600'
  },
  input: {
    display: 'block', width: '100%', padding: '10px 12px',
    border: '2px solid #e2e8f0', borderRadius: '8px',
    fontSize: '14px', marginTop: '4px', outline: 'none',
    boxSizing: 'border-box'
  },
  buttons: {
    display: 'flex', gap: '8px', marginTop: '16px',
    flexWrap: 'wrap'
  },
  btn: {
    padding: '8px 16px', background: '#3b82f6', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontSize: '13px'
  },
  btnAlt: {
    padding: '8px 16px', background: '#8b5cf6', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontSize: '13px'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="450" />
</template>
