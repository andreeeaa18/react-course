<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState({
    name: 'Mihai Ionescu',
    job: 'Inginer Software',
    address: {
      city: 'Cluj-Napoca',
      street: 'Str. Memorandumului 10',
    },
  });

  function handleNameChange(e) {
    setUser({ ...user, name: e.target.value });
  }

  function handleCityChange(e) {
    setUser({
      ...user,          // copiază nivelul exterior
      address: {
        ...user.address, // copiază obiectul imbricat
        city: e.target.value,
      },
    });
  }

  function handleStreetChange(e) {
    setUser({
      ...user,
      address: {
        ...user.address,
        street: e.target.value,
      },
    });
  }

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h4 style={styles.section}>Date personale</h4>
        <Field label="Nume" value={user.name} onChange={handleNameChange} />

        <h4 style={styles.section}>Adresă (obiect imbricat)</h4>
        <Field label="Oraș" value={user.address.city} onChange={handleCityChange} />
        <Field label="Stradă" value={user.address.street} onChange={handleStreetChange} />
      </div>

      <div style={styles.card}>
        <h4 style={styles.cardTitle}>State curent:</h4>
        <pre style={styles.json}>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label style={styles.label}>
      {label}
      <input value={value} onChange={onChange} style={styles.input} />
    </label>
  );
}

const styles = {
  container: { display: 'flex', gap: '16px', padding: '12px', flexWrap: 'wrap' },
  form: { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: '200px' },
  section: { margin: '8px 0 4px', fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' },
  label: { display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '14px' },
  input: { padding: '7px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px' },
  card: { flex: 1, minWidth: '180px', background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px' },
  cardTitle: { margin: '0 0 8px', fontSize: '13px', color: '#374151' },
  json: { margin: 0, fontSize: '12px', color: '#1e40af', lineHeight: 1.6 },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="460" />
</template>
