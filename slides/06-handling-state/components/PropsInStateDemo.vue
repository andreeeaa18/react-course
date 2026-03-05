<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

// ❌ Copiază prop-ul în state — rămâne desincronizat
function BadLabel({ color }) {
  const [localColor, setLocalColor] = useState(color);
  // localColor NU se actualizează când prop-ul color se schimbă!

  return (
    <div style={styles.label}>
      <span style={styles.tag}>❌ useState(color)</span>
      <div style={{
        ...styles.swatch,
        background: localColor
      }} />
      <code style={styles.code}>{localColor}</code>
    </div>
  );
}

// ✅ Folosește prop-ul direct — mereu sincronizat
function GoodLabel({ color }) {
  return (
    <div style={styles.label}>
      <span style={styles.tag}>✅ prop direct</span>
      <div style={{
        ...styles.swatch,
        background: color
      }} />
      <code style={styles.code}>{color}</code>
    </div>
  );
}

export default function App() {
  const [colorIndex, setColorIndex] = useState(0);
  const currentColor = colors[colorIndex];

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <p style={styles.info}>
          Culoarea selectată: <strong>{currentColor}</strong>
        </p>
        <button
          onClick={() => setColorIndex((colorIndex + 1) % colors.length)}
          style={{ ...styles.btn, background: currentColor }}
        >
          Schimbă culoarea
        </button>
      </div>

      <div style={styles.comparison}>
        <BadLabel color={currentColor} />
        <GoodLabel color={currentColor} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  info: { margin: 0, fontSize: '14px' },
  btn: {
    padding: '10px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  comparison: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  label: {
    padding: '16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  tag: { fontSize: '12px', fontWeight: 'bold' },
  swatch: {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    transition: 'background 0.2s'
  },
  code: { fontSize: '13px', color: '#475569' }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="400" />
</template>
