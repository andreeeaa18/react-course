<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Actualizăm timpul la fiecare secundă
  setTimeout(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  // TOATĂ componenta se re-renderizează
  // dar React actualizează în DOM doar timpul, nu și input-ul!
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⏰ {time}</h2>
      <input
        type="text"
        placeholder="Scrie ceva aici..."
        style={styles.input}
      />
      <p style={styles.hint}>
        💡 Încearcă să scrii în input. Textul rămâne, deși componenta se re-renderizează la fiecare secundă!
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'system-ui',
    textAlign: 'center'
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#3b82f6'
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    width: '300px',
    border: '2px solid #3b82f6',
    borderRadius: '8px',
    outline: 'none'
  },
  hint: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="330" />
</template>
