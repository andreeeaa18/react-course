<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import BrokenProcessor from './BrokenProcessor';
import WorkingProcessor from './WorkingProcessor';

export default function App() {
  return (
    <div style={styles.container}>
      <BrokenProcessor />
      <WorkingProcessor />
    </div>
  );
}

const styles = {
  container: { display: 'flex', gap: '20px', padding: '12px', flexWrap: 'wrap' },
};`,
    active: false,
  },
  '/BrokenProcessor.js': {
    code: `import { useState } from 'react';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function BrokenProcessor() {
  const [pending, setPending] = useState(0);
  const [done, setDone] = useState(0);

  async function handleAdd() {
    setPending(pending + 1); // snapshot! nu se acumulează corect
    await delay(1500);
    setPending(pending - 1); // tot din snapshot → poate deveni negativ!
    setDone(done + 1);       // tot din snapshot!
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>❌ Fără updater</h3>
      <div style={styles.stats}>
        <Stat label="În așteptare" value={pending} color="#f59e0b" />
        <Stat label="Finalizate" value={done} color="#ef4444" />
      </div>
      <button onClick={handleAdd} style={styles.button}>
        Adaugă task
      </button>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ ...statStyles.box, borderColor: color }}>
      <div style={{ ...statStyles.number, color }}>{value}</div>
      <div style={statStyles.label}>{label}</div>
    </div>
  );
}

const styles = {
  card: { border: '2px solid #fecaca', borderRadius: '12px', padding: '16px', minWidth: '180px' },
  title: { margin: '0 0 12px', fontSize: '15px', textAlign: 'center' },
  stats: { display: 'flex', gap: '12px', marginBottom: '12px' },
  button: { width: '100%', padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' },
};
const statStyles = {
  box: { flex: 1, border: '2px solid', borderRadius: '8px', padding: '8px', textAlign: 'center' },
  number: { fontSize: '32px', fontWeight: 'bold', lineHeight: 1 },
  label: { fontSize: '11px', color: '#6b7280', marginTop: '4px' },
};`,
    active: true,
  },
  '/WorkingProcessor.js': {
    code: `import { useState } from 'react';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function WorkingProcessor() {
  const [pending, setPending] = useState(0);
  const [done, setDone] = useState(0);

  async function handleAdd() {
    setPending(p => p + 1); // updater: mereu corect
    await delay(1500);
    setPending(p => p - 1); // updater: scade din ultimul pending
    setDone(d => d + 1);    // updater: adaugă la ultimul done
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>✅ Cu updater</h3>
      <div style={styles.stats}>
        <Stat label="În așteptare" value={pending} color="#f59e0b" />
        <Stat label="Finalizate" value={done} color="#10b981" />
      </div>
      <button onClick={handleAdd} style={styles.button}>
        Adaugă task
      </button>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ ...statStyles.box, borderColor: color }}>
      <div style={{ ...statStyles.number, color }}>{value}</div>
      <div style={statStyles.label}>{label}</div>
    </div>
  );
}

const styles = {
  card: { border: '2px solid #bbf7d0', borderRadius: '12px', padding: '16px', minWidth: '180px' },
  title: { margin: '0 0 12px', fontSize: '15px', textAlign: 'center' },
  stats: { display: 'flex', gap: '12px', marginBottom: '12px' },
  button: { width: '100%', padding: '10px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' },
};
const statStyles = {
  box: { flex: 1, border: '2px solid', borderRadius: '8px', padding: '8px', textAlign: 'center' },
  number: { fontSize: '32px', fontWeight: 'bold', lineHeight: 1 },
  label: { fontSize: '11px', color: '#6b7280', marginTop: '4px' },
};`,
  },
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="380" />
</template>
