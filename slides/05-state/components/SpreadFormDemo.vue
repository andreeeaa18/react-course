<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

const initialContact = {
  name: 'Ana Popescu',
  role: 'Frontend Developer',
  email: 'ana@example.com',
};

export default function ContactForm() {
  const [contact, setContact] = useState(initialContact);

  // Un singur handler pentru toate câmpurile!
  function handleChange(e) {
    setContact({
      ...contact,           // copiază câmpurile existente
      [e.target.name]: e.target.value, // suprascrie câmpul modificat
    });
  }

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <Field label="Nume" name="name" value={contact.name} onChange={handleChange} />
        <Field label="Rol" name="role" value={contact.role} onChange={handleChange} />
        <Field label="Email" name="email" value={contact.email} onChange={handleChange} />
      </div>
      <div style={styles.preview}>
        <h4 style={styles.previewTitle}>Preview:</h4>
        <p style={styles.previewLine}><strong>{contact.name}</strong></p>
        <p style={styles.previewLine}>{contact.role}</p>
        <p style={styles.previewLine}>{contact.email}</p>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange }) {
  return (
    <label style={styles.label}>
      {label}
      <input
        name={name}
        value={value}
        onChange={onChange}
        style={styles.input}
      />
    </label>
  );
}

const styles = {
  container: { display: 'flex', gap: '20px', padding: '16px', flexWrap: 'wrap' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: '200px' },
  label: { display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px', fontWeight: 'bold' },
  input: { padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', fontWeight: 'normal' },
  preview: { flex: 1, minWidth: '160px', background: '#f0fdf4', borderRadius: '8px', padding: '12px', border: '1px solid #86efac' },
  previewTitle: { margin: '0 0 8px', fontSize: '13px', color: '#15803d' },
  previewLine: { margin: '4px 0', fontSize: '14px' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="430" />
</template>
