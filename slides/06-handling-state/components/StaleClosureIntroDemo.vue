<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleDelayedAlert() {
    // ⚠️ count este "capturat" ACUM — valoarea din acest render
    setTimeout(() => {
      alert('Count la momentul click-ului: ' + count);
    }, 3000);
  }

  return (
    <div style={styles.container}>
      <p style={styles.count}>{count}</p>
      <div style={styles.buttons}>
        <button onClick={() => setCount(count + 1)} style={styles.incrementBtn}>
          +1
        </button>
        <button onClick={handleDelayedAlert} style={styles.alertBtn}>
          Arată count după 3 secunde
        </button>
      </div>
      <p style={styles.hint}>
        1. Apasă "Arată count" (count=0) <br/>
        2. Apasă rapid "+1" de câteva ori <br/>
        3. Așteaptă alert-ul — va arăta 0, nu valoarea curentă!
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  count: {
    margin: 0,
    fontSize: '48px',
    fontWeight: 'bold'
  },
  buttons: {
    display: 'flex',
    gap: '8px'
  },
  incrementBtn: {
    padding: '10px 24px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  alertBtn: {
    padding: '10px 16px',
    background: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  hint: {
    margin: 0,
    padding: '10px 14px',
    background: '#fef3c7',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#92400e',
    textAlign: 'center',
    lineHeight: '1.6'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="400" />
</template>
