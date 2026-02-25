<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

export default function LikeButton() {
  // useState returnează un array cu 2 elemente:
  // 1. Variabila de state (likes)
  // 2. Funcția care o actualizează (setLikes)
  const [likes, setLikes] = useState(0);

  function handleClick() {
    // setLikes actualizează state-ul ȘI declanșează re-render
    setLikes(likes + 1);
    console.log('Button clicked! Likes:', likes + 1);
  }

  return (
    <div style={styles.container}>
      <button onClick={handleClick} style={styles.button}>
        ❤️ {likes} Likes
      </button>
      <p style={styles.hint}>
        ✅ Funcționează! UI-ul se actualizează la fiecare click
      </p>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  button: {
    padding: '12px 24px',
    fontSize: '18px',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  hint: { marginTop: '12px', color: '#666' }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="350" :showConsole="true" />
</template>
