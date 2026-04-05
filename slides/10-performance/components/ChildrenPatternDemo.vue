<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { useState, useRef } from 'react';

// Wrapper cu state intern — se re-renderează des
function ScrollTracker({ children }) {
  const [scrollY, setScrollY] = useState(0);
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div
      onScroll={(e) => setScrollY(e.target.scrollTop)}
      style={styles.scrollArea}
    >
      <div style={styles.scrollInfo}>
        <span>ScrollTracker — scroll: {Math.round(scrollY)}px</span>
        <span style={styles.badge}>Randări: {renderCount.current}</span>
      </div>
      <div style={styles.scrollContent}>
        {children}
      </div>
    </div>
  );
}

// Component "greu" care NU trebuie re-randat
function HeavyContent() {
  const renderCount = useRef(0);
  renderCount.current++;

  // Simulăm render costisitor (delay artificial)
  for (let i = 0; i < 100; i++) {
    Array.from({ length: 2000 }, (_, j) => Math.sqrt(j * i) * Math.log(j + 1));
  }

  const items = Array.from({ length: 50 }, (_, i) => (
    <div key={i} style={styles.item}>
      Element #{i + 1} — conținut complex
    </div>
  ));

  return (
    <div>
      <div style={styles.heavyHeader}>
        <span style={{ fontWeight: 'bold' }}>HeavyContent</span>
        <span style={styles.badgeGreen}>Randări: {renderCount.current}</span>
      </div>
      {items}
    </div>
  );
}

// Pattern: children ca props — HeavyContent e creat de App, nu de ScrollTracker
export default function App() {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Pattern: children ca props</h3>
      <p style={styles.hint}>
        Scroll-ează și observă: ScrollTracker se re-renderează,
        dar HeavyContent NU (are mereu 1 randare)!
      </p>
      <ScrollTracker>
        <HeavyContent />
      </ScrollTracker>
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  title: { margin: '0 0 4px', color: '#0369a1', fontSize: '15px' },
  hint: { color: '#64748b', fontSize: '13px', margin: '0 0 12px' },
  scrollArea: {
    height: '250px', overflow: 'auto', border: '2px solid #0ea5e9',
    borderRadius: '8px',
  },
  scrollInfo: {
    position: 'sticky', top: 0, background: '#f0f9ff', padding: '8px 12px',
    borderBottom: '1px solid #bae6fd', display: 'flex',
    justifyContent: 'space-between', fontSize: '13px', zIndex: 1,
  },
  scrollContent: { padding: '8px' },
  badge: {
    background: '#f59e0b', color: 'white', padding: '2px 8px',
    borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
  },
  badgeGreen: {
    background: '#10b981', color: 'white', padding: '2px 8px',
    borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
  },
  heavyHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '6px 0', marginBottom: '6px', borderBottom: '2px solid #10b981',
  },
  item: {
    padding: '8px', margin: '4px 0', background: '#f8fafc',
    borderRadius: '4px', fontSize: '13px',
  },
};`

const files = {
  '/App.js': { code: appCode, active: true },
}
</script>

<template>
  <LiveReact :files="files" :editorHeight="380" />
</template>
