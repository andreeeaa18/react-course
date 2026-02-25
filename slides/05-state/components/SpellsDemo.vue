<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

const initialSpells = [
  { id: 1, name: '🔥 Fireball', power: 10 },
  { id: 2, name: '❄️ Ice Shard', power: 8 },
  { id: 3, name: '⚡ Lightning', power: 15 },
];

export default function SpellBook() {
  const [spells, setSpells] = useState(initialSpells);

  function upgradeSpell(id) {
    setSpells(spells.map(spell =>
      spell.id === id
        ? { ...spell, power: spell.power + 5 } // ✅ obiect nou
        : spell
    ));
  }

  function resetAll() {
    setSpells(initialSpells);
  }

  return (
    <div style={styles.container}>
      {spells.map(spell => (
        <div key={spell.id} style={styles.row}>
          <span style={styles.name}>{spell.name}</span>
          <div style={styles.barWrap}>
            <div style={{ ...styles.bar, width: Math.min(spell.power * 3, 150) + 'px' }} />
            <span style={styles.powerLabel}>{spell.power}</span>
          </div>
          <button onClick={() => upgradeSpell(spell.id)} style={styles.btn}>⬆️ +5</button>
        </div>
      ))}
      <button onClick={resetAll} style={styles.resetBtn}>↺ Reset</button>
    </div>
  );
}

const styles = {
  container: { padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' },
  row: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f9fafb', borderRadius: '8px' },
  name: { flex: 1, fontSize: '14px', fontWeight: 'bold' },
  barWrap: { display: 'flex', alignItems: 'center', gap: '6px' },
  bar: { height: '8px', background: '#6366f1', borderRadius: '4px', transition: 'width 0.2s' },
  powerLabel: { fontSize: '13px', fontWeight: 'bold', color: '#6366f1', minWidth: '28px' },
  btn: { padding: '5px 12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
  resetBtn: { alignSelf: 'flex-end', padding: '6px 14px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="420" />
</template>
