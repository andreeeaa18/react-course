<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useTransition, useEffect, useRef } from 'react';

const TABS = ['Electronice', 'Îmbrăcăminte', 'Cărți'];

function ProductList({ category }) {
  const items = Array.from({ length: 300 }, (_, i) => \`\${category} — Produs \${i + 1}\`);
  return (
    <div style={styles.list}>
      {items.map(item => <div key={item} style={styles.item}>{item}</div>)}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('Electronice');
  const [isPending, startTransition] = useTransition();

  const [events, setEvents] = useState([]);
  const t0 = useRef(performance.now());
  const pendingTab = useRef(null);

  function addEvent(trigger, pending, currentTab) {
    const ms = Math.round(performance.now() - t0.current);
    setEvents(prev => [...prev.slice(-8), { trigger, pending, currentTab, ms, id: ms + Math.random() }]);
  }

  function handleTabChange(newTab) {
    pendingTab.current = newTab;
    addEvent('click', true, tab);        // înregistrăm: isPending=true, tab încă vechi
    startTransition(() => setTab(newTab));
  }

  // Când isPending se schimbă la false: tranziția s-a terminat
  useEffect(() => {
    if (!isPending && pendingTab.current) {
      addEvent('done', false, tab);      // înregistrăm: isPending=false, tab nou
    }
  }, [isPending, tab]);

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            style={{ ...styles.tab, ...(tab === t ? styles.activeTab : {}) }}
          >
            {t}{isPending && tab === t ? ' ⏳' : ''}
          </button>
        ))}
      </div>

      <div style={styles.cols}>
        <div style={{ flex: 1, opacity: isPending ? 0.4 : 1, transition: 'opacity 0.2s' }}>
          <ProductList category={tab} />
        </div>

        <div style={styles.log}>
          <div style={styles.logHeader}>
            <span style={{ color: '#a78bfa' }}>trigger</span>
            <span style={{ color: '#94a3b8' }}>/</span>
            <span style={{ color: '#f59e0b' }}>isPending</span>
            <span style={{ color: '#94a3b8' }}>/</span>
            <span style={{ color: '#38bdf8' }}>tab</span>
          </div>
          {events.length === 0 && (
            <p style={{ color: '#475569', fontSize: '12px' }}>Apasă un tab...</p>
          )}
          {events.map(e => (
            <div
              key={e.id}
              style={{ ...styles.row, background: e.pending ? '#78350f22' : '#14532d22' }}
            >
              <span style={styles.ms}>{e.ms}ms</span>
              <span style={{
                ...styles.tag,
                background: e.trigger === 'click' ? '#a78bfa20' : '#4ade8020',
                color: e.trigger === 'click' ? '#a78bfa' : '#4ade80',
              }}>
                {e.trigger === 'click' ? '🖱️ click' : '✅ done'}
              </span>
              <span style={{ color: e.pending ? '#f59e0b' : '#4ade80', fontSize: '12px' }}>
                {String(e.pending)}
              </span>
              <span style={{ color: '#475569', fontSize: '12px' }}>/</span>
              <span style={{ color: '#38bdf8', fontSize: '12px' }}>"{e.currentTab}"</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'monospace', padding: '14px' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '10px' },
  tab: {
    padding: '7px 14px', border: '2px solid #e2e8f0',
    borderRadius: '8px', cursor: 'pointer', background: 'white', fontSize: '13px',
  },
  activeTab: { borderColor: '#0ea5e9', background: '#e0f2fe', fontWeight: 'bold', color: '#0369a1' },
  cols: { display: 'flex', gap: '12px' },
  list: { maxHeight: '290px', overflowY: 'auto' },
  item: { padding: '5px 8px', borderBottom: '1px solid #f1f5f9', fontSize: '12px', color: '#334155' },
  log: {
    width: '240px', flexShrink: 0, background: '#0f172a',
    borderRadius: '8px', padding: '10px', maxHeight: '290px', overflowY: 'auto',
  },
  logHeader: {
    display: 'flex', gap: '5px', fontSize: '11px', fontWeight: 'bold',
    marginBottom: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '6px',
  },
  row: {
    display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap',
    padding: '4px 6px', borderRadius: '4px', marginBottom: '4px',
  },
  ms: { color: '#334155', fontSize: '10px', minWidth: '38px' },
  tag: { fontSize: '11px', padding: '1px 5px', borderRadius: '3px' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
