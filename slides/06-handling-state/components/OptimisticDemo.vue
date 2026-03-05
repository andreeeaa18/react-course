<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

// Simulăm un API lent care poate eșua (20% șanse)
function fakeApi(action) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error('Eroare de rețea!'));
      } else {
        resolve();
      }
    }, 1000);
  });
}

function Post({ title }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(42);
  const [error, setError] = useState(null);

  async function handleToggleLike() {
    // Salvăm starea anterioară (pentru revert)
    const prevLiked = liked;
    const prevLikes = likes;

    // Actualizare OPTIMISTĂ — instant!
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    setError(null);

    try {
      await fakeApi(liked ? 'unlike' : 'like');
      // Succes — nu facem nimic, state-ul e deja corect
    } catch (err) {
      // Eșec — REVERT la starea anterioară
      setLiked(prevLiked);
      setLikes(prevLikes);
      setError(err.message);
    }
  }

  return (
    <div style={styles.post}>
      <h3 style={styles.title}>{title}</h3>
      <div style={styles.actions}>
        <button onClick={handleToggleLike} style={{
          ...styles.likeBtn,
          color: liked ? '#dc2626' : '#64748b',
          borderColor: liked ? '#fca5a5' : '#e2e8f0'
        }}>
          {liked ? '❤️' : '🤍'} {likes}
        </button>
      </div>
      {error && (
        <p style={styles.error}>
          {error} — state-ul a fost restaurat
        </p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div style={styles.container}>
      <p style={styles.info}>
        Click-ul actualizează instant (optimist).
        20% șanse de eroare → state revert automat.
      </p>
      <Post title="Primul meu component React!" />
      <Post title="Am învățat useState azi" />
    </div>
  );
}

const styles = {
  container: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  info: {
    margin: 0,
    fontSize: '12px',
    color: '#64748b',
    padding: '8px',
    background: '#f8fafc',
    borderRadius: '6px'
  },
  post: {
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px'
  },
  title: { margin: '0 0 8px 0', fontSize: '15px' },
  actions: { display: 'flex', gap: '8px' },
  likeBtn: {
    padding: '8px 16px',
    background: 'white',
    border: '2px solid',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.15s'
  },
  error: {
    margin: '8px 0 0 0',
    padding: '6px 10px',
    background: '#fef2f2',
    borderRadius: '4px',
    color: '#dc2626',
    fontSize: '12px'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="440" />
</template>
