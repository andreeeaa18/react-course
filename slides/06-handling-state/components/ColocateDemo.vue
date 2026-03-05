<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import BadExample from './BadExample';
import GoodExample from './GoodExample';

export default function App() {
  return (
    <div style={styles.container}>
      <BadExample />
      <GoodExample />
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
  '/BadExample.js': {
    code: `import { useState } from 'react';

// ❌ State-ul hover e în părinte — TOT se re-renderizează
let badRenders = { header: 0, sidebar: 0, card: 0 };

function Header() {
  badRenders.header++;
  return (
    <div style={styles.component}>
      Header <span style={styles.badge}>{badRenders.header}x</span>
    </div>
  );
}

function Sidebar() {
  badRenders.sidebar++;
  return (
    <div style={styles.component}>
      Sidebar <span style={styles.badge}>{badRenders.sidebar}x</span>
    </div>
  );
}

function Card({ isHovered, onHover, onLeave }) {
  badRenders.card++;
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        ...styles.card,
        background: isHovered ? '#dbeafe' : '#f8fafc',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
    >
      Hover me! <span style={styles.badge}>{badRenders.card}x</span>
    </div>
  );
}

export default function BadExample() {
  // isHovered e AICI — fiecare hover re-renderizează tot
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.badTitle}>❌ State în părinte</h3>
      <Header />
      <Sidebar />
      <Card
        isHovered={isHovered}
        onHover={() => setIsHovered(true)}
        onLeave={() => setIsHovered(false)}
      />
      <p style={styles.hint}>Numerele arată câte renderuri</p>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '12px',
    border: '2px solid #fca5a5',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  badTitle: { margin: 0, fontSize: '14px', color: '#dc2626' },
  component: {
    padding: '8px 12px',
    background: '#f1f5f9',
    borderRadius: '4px',
    fontSize: '13px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  card: {
    padding: '16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.15s',
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #e2e8f0'
  },
  badge: {
    background: '#ef4444',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '10px',
    fontSize: '11px'
  },
  hint: { margin: 0, fontSize: '10px', color: '#64748b' }
};`
  },
  '/GoodExample.js': {
    code: `import { useState } from 'react';

// ✅ State-ul hover e colocat în Card — doar el se re-renderizează
let goodRenders = { header: 0, sidebar: 0, card: 0 };

function Header() {
  goodRenders.header++;
  return (
    <div style={styles.component}>
      Header <span style={styles.badge}>{goodRenders.header}x</span>
    </div>
  );
}

function Sidebar() {
  goodRenders.sidebar++;
  return (
    <div style={styles.component}>
      Sidebar <span style={styles.badge}>{goodRenders.sidebar}x</span>
    </div>
  );
}

function Card() {
  // isHovered e AICI — doar Card se re-renderizează!
  const [isHovered, setIsHovered] = useState(false);
  goodRenders.card++;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.card,
        background: isHovered ? '#dcfce7' : '#f8fafc',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
    >
      Hover me! <span style={styles.badge}>{goodRenders.card}x</span>
    </div>
  );
}

export default function GoodExample() {
  return (
    <div style={styles.wrapper}>
      <h3 style={styles.goodTitle}>✅ State colocat</h3>
      <Header />
      <Sidebar />
      <Card />
      <p style={styles.hint}>Header/Sidebar rămân la 1x</p>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '12px',
    border: '2px solid #86efac',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  goodTitle: { margin: 0, fontSize: '14px', color: '#16a34a' },
  component: {
    padding: '8px 12px',
    background: '#f1f5f9',
    borderRadius: '4px',
    fontSize: '13px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  card: {
    padding: '16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.15s',
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #e2e8f0'
  },
  badge: {
    background: '#16a34a',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '10px',
    fontSize: '11px'
  },
  hint: { margin: 0, fontSize: '10px', color: '#64748b' }
};`
  }
}
</script>

<template>
  <LiveReact
    :files="files"
    :showTabs="true"
    :editorHeight="420"
  />
</template>
