<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { useState, useRef } from 'react';

// VARIANTĂ REA: state-ul e sus în App — tot arborele se re-renderează
function AppBad() {
  const [color, setColor] = useState('#0ea5e9');

  return (
    <div style={styles.container}>
      <h4 style={{ ...styles.title, color: '#ef4444' }}>❌ State sus (în App)</h4>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={styles.colorInput}
      />
      <div style={{ ...styles.preview, background: color }} />
      <HeavyComponent label="Grafic Complex" />
    </div>
  );
}

// VARIANTĂ BUNĂ: extragem state-ul într-un component separat
function AppGood() {
  return (
    <div style={styles.container}>
      <h4 style={{ ...styles.title, color: '#10b981' }}>✅ State jos (extras)</h4>
      <ColorPicker />
      <HeavyComponent label="Grafic Complex" />
    </div>
  );
}

function ColorPicker() {
  const [color, setColor] = useState('#10b981');

  return (
    <>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={styles.colorInput}
      />
      <div style={{ ...styles.preview, background: color }} />
    </>
  );
}

function HeavyComponent({ label }) {
  const renderCount = useRef(0);
  renderCount.current++;

  // Simulăm un component costisitor (delay artificial)
  for (let i = 0; i < 150; i++) {
    Array.from({ length: 2000 }, (_, j) => Math.sqrt(j * i) * Math.log(j + 1));
  }

  return (
    <div style={styles.heavy}>
      <span>{label}</span>
      <span style={styles.badge}>Randări: {renderCount.current}</span>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <AppBad />
      <AppGood />
    </div>
  );
}

const styles = {
  container: {
    padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px',
    flex: 1, fontFamily: 'system-ui',
  },
  title: { margin: '0 0 8px', fontSize: '14px' },
  colorInput: { width: '60px', height: '32px', border: 'none', cursor: 'pointer' },
  preview: {
    width: '100%', height: '24px', borderRadius: '4px', margin: '8px 0',
  },
  heavy: {
    padding: '12px', background: '#f8fafc', border: '2px dashed #cbd5e1',
    borderRadius: '6px', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', fontSize: '13px',
  },
  badge: {
    background: '#6366f1', color: 'white', padding: '2px 10px',
    borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
  },
};`

const files = {
  '/App.js': { code: appCode, active: true },
}
</script>

<template>
  <LiveReact :files="files" :editorHeight="380" />
</template>
