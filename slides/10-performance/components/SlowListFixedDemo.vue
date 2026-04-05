<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { useState, useMemo } from 'react';
import ExpensiveList from './ExpensiveList';

export default function App() {
  const [text, setText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // useMemo: referința rămâne stabilă dacă datele nu se schimbă
  const items = useMemo(() =>
    Array.from({ length: 200 }, (_, i) => ({
      id: i,
      name: 'Produs #' + (i + 1),
    })),
  []);

  return (
    <div style={{
      ...styles.container,
      background: darkMode ? '#1e293b' : '#ffffff',
      color: darkMode ? '#e2e8f0' : '#1e293b',
    }}>
      <h3 style={styles.title}>Acum scrie rapid — fără lag!</h3>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Scrie rapid aici..."
        style={styles.input}
      />
      <button onClick={() => setDarkMode(!darkMode)} style={styles.btn}>
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      {/* React.memo + referință stabilă = skip re-render */}
      <ExpensiveList items={items} />
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui', transition: 'all 0.2s' },
  title: { margin: '0 0 12px', fontSize: '15px', color: '#10b981' },
  input: {
    padding: '8px 12px', fontSize: '15px', border: '2px solid #10b981',
    borderRadius: '8px', width: '60%', boxSizing: 'border-box',
  },
  btn: {
    marginLeft: '8px', padding: '8px 16px', background: '#6366f1',
    color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer',
  },
};`

const listCode = `import { memo, useRef } from 'react';

// React.memo: nu re-renderează dacă props nu s-au schimbat
const ExpensiveList = memo(function ExpensiveList({ items }) {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <span>Lista de produse ({items.length})</span>
        <span style={styles.badge}>Randări: {renderCount.current}</span>
      </div>
      <ul style={styles.list}>
        {items.map(item => (
          <ExpensiveItem key={item.id} name={item.name} />
        ))}
      </ul>
    </div>
  );
});

export default ExpensiveList;

const ExpensiveItem = memo(function ExpensiveItem({ name }) {
  // Același calcul costisitor — dar acum se execută doar o dată!
  let total = 0;
  for (let i = 0; i < 50000; i++) {
    total += Math.sqrt(i);
  }

  return (
    <li style={styles.item}>{name} (calc: {Math.round(total)})</li>
  );
});

const styles = {
  wrapper: { marginTop: '12px' },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 0', borderBottom: '2px solid #10b981', marginBottom: '8px',
  },
  badge: {
    background: '#10b981', color: 'white', padding: '2px 10px',
    borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
  },
  list: { listStyle: 'none', padding: 0, maxHeight: '200px', overflow: 'auto' },
  item: {
    padding: '4px 8px', fontSize: '13px', borderBottom: '1px solid #f1f5f9',
  },
};`

const files = {
  '/App.js': { code: appCode, active: true },
  '/ExpensiveList.js': { code: listCode },
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="380" />
</template>
