<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

function Counter({ label, color }) {
  const [score, setScore] = useState(0);

  return (
    <div style={{ ...styles.counter, borderColor: color }}>
      <span style={styles.label}>{label}</span>
      <span style={{ ...styles.score, color }}>{score}</span>
      <button onClick={() => setScore(score + 1)} style={styles.btn}>
        +1
      </button>
    </div>
  );
}

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  const [showSecond, setShowSecond] = useState(true);

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <h3 style={styles.heading}>Aceeași componentă, aceeași poziție</h3>
        <p style={styles.hint}>Schimbă stilul — state-ul se păstrează!</p>
        {isFancy ? (
          <Counter label="Fancy ✨" color="#a855f7" />
        ) : (
          <Counter label="Normal" color="#3b82f6" />
        )}
        <label style={styles.toggle}>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => setIsFancy(e.target.checked)}
          />
          Fancy mode
        </label>
      </div>

      <div style={styles.section}>
        <h3 style={styles.heading}>Componenta dispare din arbore</h3>
        <p style={styles.hint}>Ascunde și arată — state-ul se resetează!</p>
        {showSecond && (
          <Counter label="Al doilea" color="#f59e0b" />
        )}
        <label style={styles.toggle}>
          <input
            type="checkbox"
            checked={showSecond}
            onChange={e => setShowSecond(e.target.checked)}
          />
          Arată contorul
        </label>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    padding: '8px'
  },
  section: {
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  heading: { margin: 0, fontSize: '14px' },
  hint: { margin: 0, fontSize: '12px', color: '#64748b' },
  counter: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid',
    background: '#f8fafc'
  },
  label: { fontWeight: 'bold', fontSize: '14px' },
  score: { fontSize: '28px', fontWeight: 'bold', flex: 1, textAlign: 'center' },
  btn: {
    padding: '8px 16px',
    background: '#e2e8f0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    cursor: 'pointer'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
