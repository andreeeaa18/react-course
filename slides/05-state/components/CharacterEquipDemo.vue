<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

export default function CharacterCard() {
  const [character, setCharacter] = useState({
    name: 'Dragoș Luptătorul',
    level: 1,
    stats: {        // obiect imbricat
      hp: 100,
      attack: 25,
      defense: 15,
    },
  });

  function upgradeHp() {
    setCharacter({
      ...character,          // copiază name și level
      stats: {
        ...character.stats,  // copiază attack și defense
        hp: character.stats.hp + 20,
      },
    });
  }

  function upgradeAttack() {
    setCharacter({
      ...character,
      stats: {
        ...character.stats,
        attack: character.stats.attack + 5,
      },
    });
  }

  function levelUp() {
    setCharacter({
      ...character,
      level: character.level + 1,       // shallow — nu atinge stats
    });
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.name}>{character.name}</span>
          <span style={styles.level}>Nivel {character.level}</span>
        </div>

        <div style={styles.statsBox}>
          <StatRow icon="❤️" label="HP" value={character.stats.hp} />
          <StatRow icon="⚔️" label="Atac" value={character.stats.attack} />
          <StatRow icon="🛡️" label="Apărare" value={character.stats.defense} />
        </div>

        <div style={styles.buttons}>
          <button style={styles.btn('#10b981')} onClick={upgradeHp}>❤️ +20 HP</button>
          <button style={styles.btn('#ef4444')} onClick={upgradeAttack}>⚔️ +5 Atac</button>
          <button style={styles.btn('#f59e0b')} onClick={levelUp}>⬆️ Level Up</button>
        </div>
      </div>

      <pre style={styles.json}>{JSON.stringify(character, null, 2)}</pre>
    </div>
  );
}

function StatRow({ icon, label, value }) {
  return (
    <div style={styles.statRow}>
      <span>{icon} {label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const styles = {
  container: { display: 'flex', gap: '16px', padding: '12px', flexWrap: 'wrap', alignItems: 'flex-start' },
  card: { flex: 1, minWidth: '200px', border: '2px solid #e5e7eb', borderRadius: '12px', padding: '16px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  name: { fontWeight: 'bold', fontSize: '16px' },
  level: { background: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: '999px', fontSize: '13px' },
  statsBox: { background: '#f9fafb', borderRadius: '8px', padding: '8px', marginBottom: '12px' },
  statRow: { display: 'flex', justifyContent: 'space-between', padding: '5px 4px', fontSize: '14px' },
  buttons: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  btn: color => ({ padding: '7px 12px', background: color, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }),
  json: { flex: 1, minWidth: '160px', background: '#f3f4f6', padding: '10px', borderRadius: '8px', fontSize: '12px', margin: 0, color: '#1e40af' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
