<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Salut');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      // "to" și "message" sunt din snapshot-ul momentului trimiterii!
      alert('Ai trimis "' + message + '" către ' + to);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>
        Către:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}
          style={styles.select}
        >
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Mesajul tău..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={styles.textarea}
      />
      <button type="submit" style={styles.button}>
        Trimite (alert după 5s)
      </button>
      <p style={styles.hint}>
        Trimite mesajul, apoi schimbă destinatarul înainte de 5 secunde!
      </p>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '380px',
    padding: '20px',
  },
  label: { fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' },
  select: {
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
  },
  textarea: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    minHeight: '80px',
    resize: 'vertical',
    fontSize: '15px',
  },
  button: {
    padding: '10px 20px',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  hint: {
    color: '#6b7280',
    fontSize: '13px',
    margin: 0,
  },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
