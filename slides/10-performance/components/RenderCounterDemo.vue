<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { useState } from 'react';
import ChildA from './ChildA';
import ChildB from './ChildB';

export default function App() {
  const [text, setText] = useState('');

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Parent (App)</h3>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Scrie ceva aici..."
        style={styles.input}
      />
      <p style={styles.hint}>Observă cum TOATE componentele se re-renderează!</p>
      <div style={styles.children}>
        <ChildA />
        <ChildB label="Copil B" />
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  title: { margin: '0 0 8px', color: '#0369a1' },
  input: {
    padding: '8px 12px', fontSize: '15px', border: '2px solid #0ea5e9',
    borderRadius: '8px', width: '100%', boxSizing: 'border-box',
  },
  hint: { color: '#94a3b8', fontSize: '13px', margin: '8px 0' },
  children: { display: 'flex', gap: '12px', marginTop: '8px' },
};`

const childACode = `import { useRef } from 'react';
import Grandchild from './Grandchild';

export default function ChildA() {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div style={styles.card}>
      <h4 style={styles.title}>Copil A</h4>
      <span style={styles.badge}>Randări: {renderCount.current}</span>
      <Grandchild />
    </div>
  );
}

const styles = {
  card: {
    padding: '12px', background: '#f0f9ff', border: '2px solid #bae6fd',
    borderRadius: '8px', flex: 1,
  },
  title: { margin: '0 0 4px', color: '#0369a1', fontSize: '14px' },
  badge: {
    display: 'inline-block', background: '#ef4444', color: 'white',
    padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
  },
};`

const childBCode = `import { useRef } from 'react';

export default function ChildB({ label }) {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div style={styles.card}>
      <h4 style={styles.title}>{label}</h4>
      <span style={styles.badge}>Randări: {renderCount.current}</span>
      <p style={styles.note}>Nu primesc niciun prop care se schimbă!</p>
    </div>
  );
}

const styles = {
  card: {
    padding: '12px', background: '#fefce8', border: '2px solid #fde68a',
    borderRadius: '8px', flex: 1,
  },
  title: { margin: '0 0 4px', color: '#92400e', fontSize: '14px' },
  badge: {
    display: 'inline-block', background: '#ef4444', color: 'white',
    padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
  },
  note: { color: '#a16207', fontSize: '12px', margin: '8px 0 0' },
};`

const grandchildCode = `import { useRef } from 'react';

export default function Grandchild() {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div style={styles.card}>
      <span style={styles.label}>Nepot</span>
      <span style={styles.badge}>Randări: {renderCount.current}</span>
    </div>
  );
}

const styles = {
  card: {
    marginTop: '8px', padding: '8px', background: '#ecfdf5',
    border: '2px solid #a7f3d0', borderRadius: '6px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  label: { fontSize: '13px', color: '#065f46', fontWeight: 'bold' },
  badge: {
    display: 'inline-block', background: '#ef4444', color: 'white',
    padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
  },
};`

const files = {
  '/App.js': { code: appCode, active: true },
  '/ChildA.js': { code: childACode },
  '/ChildB.js': { code: childBCode },
  '/Grandchild.js': { code: grandchildCode },
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="380" />
</template>
