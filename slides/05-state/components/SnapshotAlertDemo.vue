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
          alert(number); // Ce valoare va afișa?
        }}
        style={styles.button}
      >
        +5
      </button>
      <p style={styles.hint}>
        Apasă butonul — ce valoare apare în alert?
      </p>
    </>
  );
}

const styles = {
  title: {
    fontSize: '64px',
    textAlign: 'center',
    margin: '8px 0',
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  button: {
    display: 'block',
    margin: '0 auto',
    padding: '12px 32px',
    fontSize: '20px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  hint: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: '12px',
    fontSize: '14px',
  },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
