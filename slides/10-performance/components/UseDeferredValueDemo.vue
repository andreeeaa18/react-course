<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useDeferredValue, useEffect, useRef } from 'react';

const ITEMS = Array.from({ length: 5000 }, (_, i) => \`Produs nr. \${i + 1}\`);

function SlowList({ query }) {
  const filtered = ITEMS.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div style={styles.list}>
      <p style={styles.count}>{filtered.length} rezultate</p>
      {filtered.slice(0, 30).map(item => (
        <div key={item} style={styles.item}>{item}</div>
      ))}
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const [events, setEvents] = useState([]);
  const t0 = useRef(performance.now());

  function addEvent(trigger, q, dq) {
    const ms = Math.round(performance.now() - t0.current);
    setEvents(prev => [...prev.slice(-8), { trigger, q, dq, ms, id: ms + Math.random() }]);
  }

  // La fiecare schimbare de input: înregistrăm AMBELE valori în acel moment
  useEffect(() => {
    if (query === '') return;
    addEvent('input', query, deferredQuery);
  }, [query]);

  // La fiecare actualizare deferred: înregistrăm AMBELE valori în acel moment
  useEffect(() => {
    if (deferredQuery === '') return;
    addEvent('deferred', query, deferredQuery);
  }, [deferredQuery]);

  return (
    <div style={styles.container}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Scrie rapid: 1, 12, 123..."
        style={styles.input}
      />
      <div style={styles.cols}>
        <div style={{ flex: 1, opacity: isStale ? 0.4 : 1, transition: 'opacity 0.15s' }}>
          <SlowList query={deferredQuery} />
        </div>

        <div style={styles.log}>
          <div style={styles.logHeader}>
            <span style={{ color: '#0ea5e9' }}>query</span>
            <span style={{ color: '#94a3b8' }}>/</span>
            <span style={{ color: '#f59e0b' }}>deferred</span>
          </div>
          {events.length === 0 && (
            <p style={{ color: '#475569', fontSize: '12px' }}>Scrie în input...</p>
          )}
          {events.map(e => {
            const synced = e.q === e.dq;
            return (
              <div key={e.id} style={{ ...styles.row, background: synced ? '#14532d22' : '#78350f22' }}>
                <span style={styles.ms}>{e.ms}ms</span>
                <span style={{ ...styles.tag, background: e.trigger === 'input' ? '#0ea5e920' : '#f59e0b20', color: e.trigger === 'input' ? '#38bdf8' : '#fbbf24' }}>
                  {e.trigger === 'input' ? '✏️ input' : '⏳ deferred'}
                </span>
                <span style={{ color: '#0ea5e9', fontSize: '12px' }}>"{e.q}"</span>
                <span style={{ color: '#475569', fontSize: '12px' }}>/</span>
                <span style={{ color: synced ? '#4ade80' : '#f59e0b', fontSize: '12px' }}>"{e.dq}"</span>
                {synced && <span style={{ color: '#4ade80', fontSize: '11px' }}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'monospace', padding: '14px' },
  input: {
    width: '100%', padding: '9px 13px', fontSize: '15px',
    border: '2px solid #0ea5e9', borderRadius: '8px',
    outline: 'none', boxSizing: 'border-box', marginBottom: '10px',
  },
  cols: { display: 'flex', gap: '12px' },
  list: { maxHeight: '310px', overflowY: 'auto' },
  count: { fontSize: '12px', fontWeight: 'bold', color: '#0ea5e9', margin: '0 0 4px 0' },
  item: { padding: '4px 6px', borderBottom: '1px solid #f1f5f9', fontSize: '12px' },
  log: {
    width: '230px', flexShrink: 0, background: '#0f172a',
    borderRadius: '8px', padding: '10px', maxHeight: '310px', overflowY: 'auto',
  },
  logHeader: {
    display: 'flex', gap: '6px', fontSize: '12px', fontWeight: 'bold',
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
