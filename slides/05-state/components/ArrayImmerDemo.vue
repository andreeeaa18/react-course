<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import SpreadVersion from './SpreadVersion';
import ImmerVersion from './ImmerVersion';

export default function App() {
  return (
    <div style={styles.container}>
      <SpreadVersion />
      <ImmerVersion />
    </div>
  );
}

const styles = {
  container: { display: 'flex', gap: '20px', padding: '12px', flexWrap: 'wrap' },
};`,
    active: false,
  },
  '/SpreadVersion.js': {
    code: `import { useState } from 'react';

const initial = [
  { id: 1, name: 'Ucide dragonul', done: false },
  { id: 2, name: 'Salvează regatul', done: false },
  { id: 3, name: 'Găsește comoara', done: false },
];

export default function SpreadVersion() {
  const [quests, setQuests] = useState(initial);

  function toggle(id) {
    setQuests(quests.map(q =>   // map + spread
      q.id === id ? { ...q, done: !q.done } : q
    ));
  }

  function reset() {
    setQuests(initial);
  }

  return (
    <QuestList
      title="map + spread"
      color="#3b82f6"
      quests={quests}
      onToggle={toggle}
      onReset={reset}
    />
  );
}

function QuestList({ title, color, quests, onToggle, onReset }) {
  return (
    <div style={{ ...styles.card, borderColor: color }}>
      <h3 style={styles.title}>{title}</h3>
      {quests.map(q => (
        <div key={q.id} style={styles.row} onClick={() => onToggle(q.id)}>
          <span style={{ ...styles.check, background: q.done ? '#10b981' : '#e5e7eb' }}>
            {q.done ? '✓' : ''}
          </span>
          <span style={{ textDecoration: q.done ? 'line-through' : 'none', fontSize: '13px' }}>
            {q.name}
          </span>
        </div>
      ))}
      <button onClick={onReset} style={{ ...styles.resetBtn, background: color }}>↺ Reset</button>
    </div>
  );
}

const styles = {
  card: { flex: 1, minWidth: '200px', border: '2px solid', borderRadius: '12px', padding: '12px' },
  title: { margin: '0 0 10px', fontSize: '13px', fontWeight: 'bold' },
  row: { display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 4px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' },
  check: { width: '18px', height: '18px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'white', flexShrink: 0 },
  resetBtn: { marginTop: '10px', width: '100%', padding: '6px', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
};`,
    active: true,
  },
  '/ImmerVersion.js': {
    code: `import { useImmer } from 'use-immer';

const initial = [
  { id: 1, name: 'Ucide dragonul', done: false },
  { id: 2, name: 'Salvează regatul', done: false },
  { id: 3, name: 'Găsește comoara', done: false },
];

export default function ImmerVersion() {
  const [quests, updateQuests] = useImmer(initial);

  function toggle(id) {
    updateQuests(draft => {          // draft — sintaxă de mutație
      const quest = draft.find(q => q.id === id);
      quest.done = !quest.done;      // direct, fără spread!
    });
  }

  function reset() {
    updateQuests(() => initial);
  }

  return (
    <QuestList
      title="useImmer"
      color="#8b5cf6"
      quests={quests}
      onToggle={toggle}
      onReset={reset}
    />
  );
}

function QuestList({ title, color, quests, onToggle, onReset }) {
  return (
    <div style={{ ...styles.card, borderColor: color }}>
      <h3 style={styles.title}>{title}</h3>
      {quests.map(q => (
        <div key={q.id} style={styles.row} onClick={() => onToggle(q.id)}>
          <span style={{ ...styles.check, background: q.done ? '#10b981' : '#e5e7eb' }}>
            {q.done ? '✓' : ''}
          </span>
          <span style={{ textDecoration: q.done ? 'line-through' : 'none', fontSize: '13px' }}>
            {q.name}
          </span>
        </div>
      ))}
      <button onClick={onReset} style={{ ...styles.resetBtn, background: color }}>↺ Reset</button>
    </div>
  );
}

const styles = {
  card: { flex: 1, minWidth: '200px', border: '2px solid', borderRadius: '12px', padding: '12px' },
  title: { margin: '0 0 10px', fontSize: '13px', fontWeight: 'bold' },
  row: { display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 4px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' },
  check: { width: '18px', height: '18px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'white', flexShrink: 0 },
  resetBtn: { marginTop: '10px', width: '100%', padding: '6px', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
};`,
  },
}

const dependencies = {
  'immer': '^10.0.0',
  'use-immer': '^0.9.0',
}
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showTabs="true" :editorHeight="420" />
</template>
