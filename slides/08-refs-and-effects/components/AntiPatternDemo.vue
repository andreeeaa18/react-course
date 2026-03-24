<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useEffect } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('Ana');
  const [lastName, setLastName] = useState('Popescu');

  // ❌ Anti-pattern: Effect inutil
  // Acest Effect se poate elimina complet!
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);

  // ✅ Corect: calculat direct în renderizare
  // const fullName = firstName + ' ' + lastName;

  return (
    <div style={styles.container}>
      <label style={styles.label}>
        Prenume:
        <input
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Nume:
        <input
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          style={styles.input}
        />
      </label>

      <div style={styles.result}>
        Nume complet: <strong>{fullName}</strong>
      </div>

      <p style={styles.hint}>
        Încearcă să elimini useEffect și fullName state.
        Înlocuiește cu: const fullName = firstName + ' ' + lastName;
      </p>
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  label: {
    display: 'block', marginBottom: '10px',
    fontSize: '14px', fontWeight: '600', color: '#374151'
  },
  input: {
    display: 'block', width: '100%', padding: '8px 12px',
    border: '2px solid #e2e8f0', borderRadius: '8px',
    fontSize: '14px', marginTop: '4px', boxSizing: 'border-box'
  },
  result: {
    padding: '12px 16px', background: '#f0fdf4',
    borderRadius: '8px', border: '1px solid #bbf7d0',
    marginTop: '12px', fontSize: '16px'
  },
  hint: {
    fontSize: '12px', color: '#9ca3af', marginTop: '12px',
    fontStyle: 'italic'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="420" />
</template>
