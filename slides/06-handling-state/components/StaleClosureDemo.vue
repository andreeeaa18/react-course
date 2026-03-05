<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import BrokenCounter from './BrokenCounter';
import FixedCounter from './FixedCounter';

export default function App() {
  return (
    <div style={styles.container}>
      <BrokenCounter />
      <FixedCounter />
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
  '/BrokenCounter.js': {
    code: `import { useState } from 'react';

export default function BrokenCounter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setTimeout(() => {
      setCount(count + 1);
    }, 500);
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.badTitle}>❌ Stale closure</h3>
      <p style={styles.hint}>Apasă rapid de 5 ori</p>
      <div style={styles.count}>{count}</div>
      <button onClick={handleClick} style={styles.btn}>
        +1 (cu delay 500ms)
      </button>
      <button onClick={() => setCount(0)} style={styles.resetBtn}>
        Reset
      </button>
    </div>
  );
}

const styles = {
  card: {
    padding: '16px',
    border: '2px solid #fca5a5',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  badTitle: { margin: 0, fontSize: '14px', color: '#dc2626' },
  hint: { margin: 0, fontSize: '12px', color: '#64748b' },
  count: { fontSize: '48px', fontWeight: 'bold', color: '#dc2626' },
  btn: {
    padding: '10px 20px',
    background: '#fecaca',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  resetBtn: {
    padding: '6px 12px',
    background: '#f1f5f9',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  }
};`
  },
  '/FixedCounter.js': {
    code: `import { useState } from 'react';

export default function FixedCounter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setTimeout(() => {
      setCount(prev => prev + 1);
    }, 500);
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.goodTitle}>✅ Updater function</h3>
      <p style={styles.hint}>Apasă rapid de 5 ori</p>
      <div style={styles.count}>{count}</div>
      <button onClick={handleClick} style={styles.btn}>
        +1 (cu delay 500ms)
      </button>
      <button onClick={() => setCount(0)} style={styles.resetBtn}>
        Reset
      </button>
    </div>
  );
}

const styles = {
  card: {
    padding: '16px',
    border: '2px solid #86efac',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  goodTitle: { margin: 0, fontSize: '14px', color: '#16a34a' },
  hint: { margin: 0, fontSize: '12px', color: '#64748b' },
  count: { fontSize: '48px', fontWeight: 'bold', color: '#16a34a' },
  btn: {
    padding: '10px 20px',
    background: '#bbf7d0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  resetBtn: {
    padding: '6px 12px',
    background: '#f1f5f9',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  }
};`
  }
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="420" />
</template>
