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
          setNumber(number + 1); // number = 0
          setNumber(number + 1); // number = 0 (același snapshot!)
          setNumber(number + 1); // number = 0 (același snapshot!)
        }}
        style={styles.button}
      >
        +3
      </button>
      <p style={styles.hint}>
        Apasă butonul — cu câte unități incrementează?
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
    color: '#8b5cf6',
  },
  button: {
    display: 'block',
    margin: '0 auto',
    padding: '12px 36px',
    fontSize: '24px',
    background: '#8b5cf6',
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
