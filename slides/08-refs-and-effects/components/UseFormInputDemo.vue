<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import { useFormInput } from './useFormInput';

export default function SignupForm() {
  const nameProps = useFormInput('');
  const emailProps = useFormInput('');
  const passwordProps = useFormInput('');

  function handleSubmit(e) {
    e.preventDefault();
    alert(
      'Nume: ' + nameProps.value +
      '\\nEmail: ' + emailProps.value
    );
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>Formular cu useFormInput</h3>

      <label style={styles.label}>
        Nume:
        <input {...nameProps} style={styles.input} />
      </label>

      <label style={styles.label}>
        Email:
        <input {...emailProps} type="email" style={styles.input} />
      </label>

      <label style={styles.label}>
        Parolă:
        <input {...passwordProps} type="password" style={styles.input} />
      </label>

      <button type="submit" style={styles.btn}>
        Înregistrare
      </button>
    </form>
  );
}

const styles = {
  form: { padding: '16px', fontFamily: 'system-ui' },
  title: { margin: '0 0 16px', color: '#1e293b' },
  label: {
    display: 'block', marginBottom: '12px',
    fontSize: '14px', fontWeight: '600', color: '#475569'
  },
  input: {
    display: 'block', width: '100%', padding: '8px 12px',
    border: '2px solid #e2e8f0', borderRadius: '8px',
    fontSize: '14px', marginTop: '4px', boxSizing: 'border-box'
  },
  btn: {
    padding: '10px 24px', background: '#3b82f6', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontSize: '15px', fontWeight: '600', marginTop: '8px'
  }
};`,
    active: true
  },
  '/useFormInput.js': {
    code: `import { useState } from 'react';

// Custom Hook pentru gestionarea unui input
export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  // Returnăm un obiect compatibil cu spread pe <input>
  return {
    value,
    onChange: handleChange
  };
}

// Utilizare:
// const nameProps = useFormInput('');
// <input {...nameProps} />
//
// Echivalent cu:
// <input value={nameProps.value} onChange={nameProps.onChange} />`
  }
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="400" />
</template>
