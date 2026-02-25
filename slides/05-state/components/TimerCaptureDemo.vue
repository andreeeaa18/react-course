<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h3 style={styles.title}>{number}</h3>
      <button
        onClick={() => {
          setNumber(number + 5);
          setTimeout(() => {
            // Chiar și după 3 secunde, "number" este din snapshot!
            alert('Valoarea din snapshot: ' + number);
          }, 3000);
        }}
        style={styles.button}
      >
        +5 (alert după 3s)
      </button>
      <p style={styles.hint}>
        Apasă rapid de mai multe ori, apoi așteaptă alert-urile
      </p>
    </>
  );
}

const styles = {
  title: {
    fontSize: '72px',
    textAlign: 'center',
    margin: '8px 0',
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  button: {
    display: 'block',
    margin: '0 auto',
    padding: '12px 28px',
    fontSize: '16px',
    background: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  hint: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: '12px',
    fontSize: '13px',
  },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="320" />
</template>
