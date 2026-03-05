<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

function FeedbackForm({ status }) {
  if (status === 'success') {
    return <p style={styles.success}>Mulțumim pentru feedback!</p>;
  }

  return (
    <form style={styles.form}>
      <textarea
        placeholder="Scrie feedback-ul tău..."
        disabled={status === 'submitting'}
        style={styles.textarea}
      />
      <button
        disabled={status === 'empty' || status === 'submitting'}
        style={{
          ...styles.button,
          opacity: (status === 'empty' || status === 'submitting') ? 0.5 : 1
        }}
      >
        {status === 'submitting' ? 'Se trimite...' : 'Trimite'}
      </button>
      {status === 'error' && (
        <p style={styles.error}>Eroare la trimitere! Încearcă din nou.</p>
      )}
    </form>
  );
}

export default function App() {
  const allStatuses = ['empty', 'typing', 'submitting', 'success', 'error'];

  return (
    <div style={styles.container}>
      {allStatuses.map(status => (
        <div key={status} style={styles.card}>
          <div style={styles.label}>{status}</div>
          <FeedbackForm status={status} />
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '8px',
    padding: '8px'
  },
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '8px',
    background: '#f8fafc'
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '8px',
    padding: '4px',
    background: '#e2e8f0',
    borderRadius: '4px',
    fontSize: '11px',
    textTransform: 'uppercase'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '6px' },
  textarea: {
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #cbd5e1',
    resize: 'none',
    fontSize: '11px',
    minHeight: '40px'
  },
  button: {
    padding: '6px 12px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '11px'
  },
  success: {
    color: '#16a34a',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '12px',
    fontSize: '12px'
  },
  error: {
    color: '#dc2626',
    fontSize: '11px',
    margin: 0
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
