<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

export default function PlayerCard() {
  const [hero, setHero] = useState({
    name: 'Eroul Albastru',
    hp: 100,
    score: 0,
    isAlive: true,
  });

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.name}>{hero.name}</h3>
        <div style={styles.badge(hero.isAlive)}>
          {hero.isAlive ? '✅ Viu' : '💀 Mort'}
        </div>

        <StatRow label="HP" value={hero.hp} color="#ef4444" />
        <StatRow label="Scor" value={hero.score} color="#f59e0b" />

        <div style={styles.buttons}>
          <Btn color="#ef4444" onClick={() => setHero({ ...hero, hp: hero.hp - 10 })}>
            -10 HP
          </Btn>
          <Btn color="#10b981" onClick={() => setHero({ ...hero, hp: hero.hp + 10 })}>
            +10 HP
          </Btn>
          <Btn color="#f59e0b" onClick={() => setHero({ ...hero, score: hero.score + 50 })}>
            +50 Scor
          </Btn>
          <Btn color="#6b7280" onClick={() => setHero({ ...hero, isAlive: !hero.isAlive })}>
            Toggle Viață
          </Btn>
        </div>
      </div>

      <div style={styles.debug}>
        <strong>State curent:</strong>
        <pre style={styles.pre}>{JSON.stringify(hero, null, 2)}</pre>
      </div>
    </div>
  );
}

function StatRow({ label, value, color }) {
  return (
    <div style={styles.statRow}>
      <span style={{ color, fontWeight: 'bold' }}>{label}</span>
      <span style={styles.statValue}>{value}</span>
    </div>
  );
}

function Btn({ children, color, onClick }) {
  return (
    <button onClick={onClick} style={{ ...styles.btn, background: color }}>
      {children}
    </button>
  );
}

const styles = {
  container: { display: 'flex', gap: '16px', padding: '12px', flexWrap: 'wrap', alignItems: 'flex-start' },
  card: { flex: 1, minWidth: '200px', border: '2px solid #e5e7eb', borderRadius: '12px', padding: '16px' },
  name: { margin: '0 0 8px', fontSize: '18px' },
  badge: alive => ({
    display: 'inline-block', padding: '2px 10px', borderRadius: '999px',
    background: alive ? '#d1fae5' : '#fee2e2',
    color: alive ? '#065f46' : '#991b1b',
    fontSize: '13px', marginBottom: '12px',
  }),
  statRow: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f3f4f6' },
  statValue: { fontWeight: 'bold', fontSize: '18px' },
  buttons: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px' },
  btn: { padding: '7px 12px', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
  debug: { flex: 1, minWidth: '160px', fontSize: '13px' },
  pre: { background: '#f3f4f6', padding: '10px', borderRadius: '8px', fontSize: '12px', margin: '4px 0 0' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
