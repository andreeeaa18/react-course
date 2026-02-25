<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import BrokenDot from './BrokenDot';
import WorkingDot from './WorkingDot';

export default function App() {
  return (
    <div style={styles.container}>
      <BrokenDot />
      <WorkingDot />
    </div>
  );
}

const styles = {
  container: { display: 'flex', gap: '20px', padding: '12px', flexWrap: 'wrap' },
};`,
    active: false,
  },
  '/BrokenDot.js': {
    code: `import { useState } from 'react';

export default function BrokenDot() {
  const [pos, setPos] = useState({ x: 60, y: 60 });

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>❌ Mutație directă</h3>
      <div style={styles.stage}>
        <div style={{ ...styles.dot, left: pos.x, top: pos.y }} />
      </div>
      <div style={styles.btns}>
        <button style={styles.btn} onClick={() => { pos.x += 30; }}>→</button>
        <button style={styles.btn} onClick={() => { pos.y += 30; }}>↓</button>
      </div>
      <code style={styles.code}>pos.x += 30 {'// fără setter!'}</code>
    </div>
  );
}

const styles = {
  card: { border: '2px solid #fecaca', borderRadius: '12px', padding: '12px', width: '200px' },
  title: { margin: '0 0 8px', fontSize: '14px', textAlign: 'center' },
  stage: { position: 'relative', height: '160px', background: '#f9fafb', borderRadius: '8px', overflow: 'hidden' },
  dot: { position: 'absolute', width: '20px', height: '20px', background: '#ef4444', borderRadius: '50%', transform: 'translate(-50%, -50%)' },
  btns: { display: 'flex', gap: '8px', justifyContent: 'center', margin: '10px 0 6px' },
  btn: { padding: '6px 14px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' },
  code: { display: 'block', fontSize: '11px', background: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' },
};`,
    active: true,
  },
  '/WorkingDot.js': {
    code: `import { useState } from 'react';

export default function WorkingDot() {
  const [pos, setPos] = useState({ x: 60, y: 60 });

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>✅ Obiect nou</h3>
      <div style={styles.stage}>
        <div style={{ ...styles.dot, left: pos.x, top: pos.y }} />
      </div>
      <div style={styles.btns}>
        <button style={styles.btn} onClick={() => setPos({ ...pos, x: pos.x + 30 })}>→</button>
        <button style={styles.btn} onClick={() => setPos({ ...pos, y: pos.y + 30 })}>↓</button>
      </div>
      <code style={styles.code}>setPos({'{ ...pos, x: pos.x + 30 }'})</code>
    </div>
  );
}

const styles = {
  card: { border: '2px solid #bbf7d0', borderRadius: '12px', padding: '12px', width: '200px' },
  title: { margin: '0 0 8px', fontSize: '14px', textAlign: 'center' },
  stage: { position: 'relative', height: '160px', background: '#f9fafb', borderRadius: '8px', overflow: 'hidden' },
  dot: { position: 'absolute', width: '20px', height: '20px', background: '#10b981', borderRadius: '50%', transform: 'translate(-50%, -50%)' },
  btns: { display: 'flex', gap: '8px', justifyContent: 'center', margin: '10px 0 6px' },
  btn: { padding: '6px 14px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' },
  code: { display: 'block', fontSize: '11px', background: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' },
};`,
  },
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="400" />
</template>
