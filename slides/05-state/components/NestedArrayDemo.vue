<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import BrokenQuests from './BrokenQuests';
import WorkingQuests from './WorkingQuests';

export default function App() {
  return (
    <div style={styles.container}>
      <BrokenQuests />
      <WorkingQuests />
    </div>
  );
}

const styles = {
  container: { display: 'flex', gap: '20px', padding: '12px', flexWrap: 'wrap' },
};`,
    active: false,
  },
  '/BrokenQuests.js': {
    code: `import { useState } from 'react';

const initial = [
  { id: 1, name: 'Ucide dragonul', done: false },
  { id: 2, name: 'Salvează regatul', done: false },
  { id: 3, name: 'Găsește comoara', done: false },
];

export default function BrokenQuests() {
  const [quests, setQuests] = useState(initial);

  function toggle(id) {
    const next = [...quests];               // array nou, ACELEAȘI obiecte
    const quest = next.find(q => q.id === id);
    quest.done = !quest.done;              // ❌ mutează objectul original!
    setQuests(next);
  }

  function reset() {
    setQuests(initial);  // initial este corupt — Reset nu funcționează!
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>❌ Shallow copy + mutație</h3>
      {quests.map(q => (
        <div key={q.id} style={styles.row} onClick={() => toggle(q.id)}>
          <span style={{ ...styles.check, background: q.done ? '#10b981' : '#e5e7eb' }}>
            {q.done ? '✓' : ''}
          </span>
          <span style={{ textDecoration: q.done ? 'line-through' : 'none', fontSize: '13px' }}>
            {q.name}
          </span>
        </div>
      ))}
      <button onClick={reset} style={styles.resetBtn}>↺ Reset</button>
      <p style={styles.hint}>Bifează ceva, apoi apasă Reset</p>
    </div>
  );
}

const styles = {
  card: { flex: 1, minWidth: '220px', border: '2px solid #fecaca', borderRadius: '12px', padding: '12px' },
  title: { margin: '0 0 10px', fontSize: '14px' },
  row: { display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 4px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' },
  check: { width: '18px', height: '18px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'white', flexShrink: 0 },
  resetBtn: { marginTop: '10px', width: '100%', padding: '6px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
  hint: { margin: '6px 0 0', fontSize: '11px', color: '#9ca3af', textAlign: 'center' },
};`,
    active: true,
  },
  '/WorkingQuests.js': {
    code: `import { useState } from 'react';

const initial = [
  { id: 1, name: 'Ucide dragonul', done: false },
  { id: 2, name: 'Salvează regatul', done: false },
  { id: 3, name: 'Găsește comoara', done: false },
];

export default function WorkingQuests() {
  const [quests, setQuests] = useState(initial);

  function toggle(id) {
    setQuests(quests.map(q =>
      q.id === id
        ? { ...q, done: !q.done }  // ✅ obiect nou
        : q
    ));
  }

  function reset() {
    setQuests(initial);  // initial intact — Reset funcționează!
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>✅ map() cu obiect nou</h3>
      {quests.map(q => (
        <div key={q.id} style={styles.row} onClick={() => toggle(q.id)}>
          <span style={{ ...styles.check, background: q.done ? '#10b981' : '#e5e7eb' }}>
            {q.done ? '✓' : ''}
          </span>
          <span style={{ textDecoration: q.done ? 'line-through' : 'none', fontSize: '13px' }}>
            {q.name}
          </span>
        </div>
      ))}
      <button onClick={reset} style={styles.resetBtn}>↺ Reset</button>
      <p style={styles.hint}>Bifează ceva, apoi apasă Reset</p>
    </div>
  );
}

const styles = {
  card: { flex: 1, minWidth: '220px', border: '2px solid #bbf7d0', borderRadius: '12px', padding: '12px' },
  title: { margin: '0 0 10px', fontSize: '14px' },
  row: { display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 4px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' },
  check: { width: '18px', height: '18px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'white', flexShrink: 0 },
  resetBtn: { marginTop: '10px', width: '100%', padding: '6px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
  hint: { margin: '6px 0 0', fontSize: '11px', color: '#9ca3af', textAlign: 'center' },
};`,
  },
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="400" />
</template>
