<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import WithSpread from './WithSpread';
import WithImmer from './WithImmer';

export default function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
      <WithSpread />
      <WithImmer />
    </div>
  );
}`,
    active: false,
  },
  '/WithSpread.js': {
    code: `import { useState } from 'react';

const initial = { name: 'Dragoș', stats: { hp: 100, attack: 25 } };

export default function WithSpread() {
  const [hero, setHero] = useState(initial);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Fără Immer</h3>
      <StatRow label="HP" value={hero.stats.hp} />
      <StatRow label="Atac" value={hero.stats.attack} />
      <div style={styles.btns}>
        <Btn onClick={() => setHero({
          ...hero,
          stats: { ...hero.stats, hp: hero.stats.hp + 10 }
        })}>
          +10 HP
        </Btn>
        <Btn onClick={() => setHero({
          ...hero,
          stats: { ...hero.stats, attack: hero.stats.attack + 5 }
        })}>
          +5 Atac
        </Btn>
      </div>
      <pre style={styles.pre}>{JSON.stringify(hero, null, 2)}</pre>
    </div>
  );
}

function StatRow({ label, value }) {
  return <div style={styles.row}><span>{label}</span><strong>{value}</strong></div>;
}
function Btn({ children, onClick }) {
  return <button onClick={onClick} style={styles.btn}>{children}</button>;
}

const styles = {
  card: { flex: 1, minWidth: '200px', border: '2px solid #e5e7eb', borderRadius: '10px', padding: '14px' },
  title: { margin: '0 0 10px', fontSize: '14px' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '14px' },
  btns: { display: 'flex', gap: '8px', margin: '10px 0' },
  btn: { padding: '6px 12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
  pre: { margin: 0, fontSize: '10px', color: '#6b7280', background: '#f9fafb', padding: '8px', borderRadius: '6px' },
};`,
    active: true,
  },
  '/WithImmer.js': {
    code: `import { useImmer } from 'use-immer';

const initial = { name: 'Dragoș', stats: { hp: 100, attack: 25 } };

export default function WithImmer() {
  const [hero, updateHero] = useImmer(initial);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>✅ Cu Immer (mai simplu!)</h3>
      <StatRow label="HP" value={hero.stats.hp} />
      <StatRow label="Atac" value={hero.stats.attack} />
      <div style={styles.btns}>
        <Btn onClick={() => updateHero(draft => {
          draft.stats.hp += 10; // sintaxă de mutație directă!
        })}>
          +10 HP
        </Btn>
        <Btn onClick={() => updateHero(draft => {
          draft.stats.attack += 5;
        })}>
          +5 Atac
        </Btn>
      </div>
      <pre style={styles.pre}>{JSON.stringify(hero, null, 2)}</pre>
    </div>
  );
}

function StatRow({ label, value }) {
  return <div style={styles.row}><span>{label}</span><strong>{value}</strong></div>;
}
function Btn({ children, onClick }) {
  return <button onClick={onClick} style={styles.btn}>{children}</button>;
}

const styles = {
  card: { flex: 1, minWidth: '200px', border: '2px solid #86efac', borderRadius: '10px', padding: '14px' },
  title: { margin: '0 0 10px', fontSize: '14px', color: '#15803d' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '14px' },
  btns: { display: 'flex', gap: '8px', margin: '10px 0' },
  btn: { padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
  pre: { margin: 0, fontSize: '10px', color: '#6b7280', background: '#f9fafb', padding: '8px', borderRadius: '6px' },
};`,
  },
}

const dependencies = {
  'use-immer': '^0.10.0',
  'immer': '^10.0.0',
}
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showTabs="true" :editorHeight="400" />
</template>
