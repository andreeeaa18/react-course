<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import GoodForm from './GoodForm';
import BadForm from './BadForm';

export default function App() {
  return (
    <div style={styles.container}>
      <BadForm />
      <GoodForm />
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    padding: '8px'
  }
};`,
    active: true
  },
  '/BadForm.js': {
    code: `import { useState } from 'react';

// ❌ State redundant — fullName stocat separat
export default function BadForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  function handleFirstChange(e) {
    setFirstName(e.target.value);
    setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastChange(e) {
    setLastName(e.target.value);
    // Oops! Am uitat să actualizăm fullName aici!
    // Acesta e bug-ul clasic al state-ului redundant
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.badTitle}>❌ Cu state redundant</h3>
      <input
        placeholder="Prenume"
        value={firstName}
        onChange={handleFirstChange}
        style={styles.input}
      />
      <input
        placeholder="Nume"
        value={lastName}
        onChange={handleLastChange}
        style={styles.input}
      />
      <p style={styles.result}>
        Rezultat: <strong>{fullName || '...'}</strong>
      </p>
    </div>
  );
}

const styles = {
  card: {
    padding: '12px',
    border: '2px solid #fca5a5',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  badTitle: { margin: 0, fontSize: '14px', color: '#dc2626' },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #cbd5e1',
    fontSize: '14px'
  },
  result: { margin: 0, fontSize: '14px' }
};`
  },
  '/GoodForm.js': {
    code: `import { useState } from 'react';

// ✅ fullName calculat la render — mereu corect
export default function GoodForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Derivat — nu e nevoie de state separat!
  const fullName = firstName + ' ' + lastName;

  return (
    <div style={styles.card}>
      <h3 style={styles.goodTitle}>✅ Calculat la render</h3>
      <input
        placeholder="Prenume"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Nume"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        style={styles.input}
      />
      <p style={styles.result}>
        Rezultat: <strong>{fullName.trim() || '...'}</strong>
      </p>
    </div>
  );
}

const styles = {
  card: {
    padding: '12px',
    border: '2px solid #86efac',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  goodTitle: { margin: 0, fontSize: '14px', color: '#16a34a' },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #cbd5e1',
    fontSize: '14px'
  },
  result: { margin: 0, fontSize: '14px' }
};`
  }
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="380" />
</template>
