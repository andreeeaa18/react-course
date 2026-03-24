<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useRef } from 'react';

const colors = [
  { id: 1, name: 'Roșu', bg: '#fecaca', border: '#ef4444' },
  { id: 2, name: 'Verde', bg: '#bbf7d0', border: '#22c55e' },
  { id: 3, name: 'Albastru', bg: '#bfdbfe', border: '#3b82f6' },
  { id: 4, name: 'Galben', bg: '#fef08a', border: '#eab308' },
  { id: 5, name: 'Violet', bg: '#e9d5ff', border: '#8b5cf6' },
];

export default function ScrollDemo() {
  // Folosim un Map pentru a stoca mai multe ref-uri
  const itemsRef = useRef(null);

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  function scrollToColor(id) {
    const map = getMap();
    const node = map.get(id);
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        {colors.map(c => (
          <button
            key={c.id}
            onClick={() => scrollToColor(c.id)}
            style={{...styles.navBtn, background: c.border, color: 'white'}}
          >
            {c.name}
          </button>
        ))}
      </nav>

      <div style={styles.list}>
        {colors.map(c => (
          <div
            key={c.id}
            ref={node => {
              const map = getMap();
              map.set(c.id, node);
              return () => map.delete(c.id); // React 19+ cleanup
            }}
            style={{
              ...styles.card,
              background: c.bg,
              borderColor: c.border
            }}
          >
            <span style={styles.emoji}>🎨</span>
            <span style={styles.colorName}>{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  nav: {
    display: 'flex', gap: '8px', marginBottom: '12px',
    flexWrap: 'wrap'
  },
  navBtn: {
    padding: '6px 14px', border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '13px', fontWeight: '600'
  },
  list: {
    height: '180px', overflowY: 'auto',
    border: '2px solid #e5e7eb', borderRadius: '12px',
    padding: '8px'
  },
  card: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '24px', borderRadius: '8px', marginBottom: '8px',
    border: '2px solid'
  },
  emoji: { fontSize: '28px' },
  colorName: { fontSize: '20px', fontWeight: 'bold' }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="450" />
</template>
