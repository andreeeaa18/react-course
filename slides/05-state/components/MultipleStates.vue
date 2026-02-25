<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

export default function Dashboard() {
  // Trei state-uri diferite, complet independente
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Dashboard</h3>

      <div style={styles.cards}>
        {/* Primul state: likes (număr) */}
        <div style={styles.cardYellow}>
          <div style={styles.count}>❤️ {likes}</div>
          <button onClick={() => setLikes(likes + 1)} style={styles.buttonYellow}>
            Like
          </button>
        </div>

        {/* Al doilea state: views (număr) */}
        <div style={styles.cardBlue}>
          <div style={styles.count}>👁️ {views}</div>
          <button onClick={() => setViews(views + 1)} style={styles.buttonBlue}>
            View
          </button>
        </div>

        {/* Al treilea state: isOnline (boolean) */}
        <div style={{
          ...styles.card,
          background: isOnline ? '#d1fae5' : '#fee2e2',
          border: \`2px solid \${isOnline ? '#10b981' : '#ef4444'}\`
        }}>
          <div style={styles.status}>
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            style={{
              ...styles.button,
              background: isOnline ? '#10b981' : '#ef4444'
            }}
          >
            Toggle Status
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '30px', fontFamily: 'system-ui', maxWidth: '500px' },
  title: { marginBottom: '25px', fontSize: '24px' },
  cards: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: { padding: '20px', borderRadius: '8px' },
  cardYellow: {
    padding: '20px',
    background: '#fef3c7',
    borderRadius: '8px',
    border: '2px solid #f59e0b'
  },
  cardBlue: {
    padding: '20px',
    background: '#dbeafe',
    borderRadius: '8px',
    border: '2px solid #3b82f6'
  },
  count: { fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' },
  status: { fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' },
  button: {
    padding: '8px 16px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  buttonYellow: {
    padding: '8px 16px',
    background: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  buttonBlue: {
    padding: '8px 16px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
