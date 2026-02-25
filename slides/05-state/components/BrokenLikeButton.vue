<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `export default function LikeButton() {
  // ❌ Variabilă normală - NU va funcționa!
  let likes = 0;

  function handleClick() {
    likes = likes + 1;
    console.log('Likes:', likes); // Se afișează în consolă...
  }

  return (
    <div style={styles.container}>
      <button onClick={handleClick} style={styles.button}>
        ❤️ {likes} Likes
      </button>
      <p style={styles.hint}>
        Încearcă să apeși butonul și verifică consola!
      </p>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  button: {
    padding: '12px 24px',
    fontSize: '18px',
    background: '#333333',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  hint: { marginTop: '12px', color: '#666' }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="330" :showConsole="true" />
</template>
