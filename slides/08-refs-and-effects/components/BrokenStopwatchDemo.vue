<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);

  // Stocăm ID-ul intervalului într-o variabilă locală
  let intervalId = null;

  function handleStart() {
    const time = Date.now();
    setStartTime(time);
    setNow(time);

    intervalId = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    // intervalId este null aici — de ce?
    // La fiecare re-render, funcția se execută din nou
    // și intervalId se reinițializează cu null
    clearInterval(intervalId);
    console.log('intervalId la Stop:', intervalId);
  }

  let seconds = 0;
  if (startTime != null && now != null) {
    seconds = (now - startTime) / 1000;
  }

  return (
    <div style={styles.container}>
      <p style={styles.time}>{seconds.toFixed(2)}s</p>
      <div style={styles.buttons}>
        <button onClick={handleStart} style={styles.start}>
          Start
        </button>
        <button onClick={handleStop} style={styles.stop}>
          Stop
        </button>
      </div>
      <p style={styles.hint}>
        Apasă Start, apoi Stop. Cronometrul nu se oprește!
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px', textAlign: 'center',
    fontFamily: 'system-ui'
  },
  time: {
    fontSize: '48px', fontWeight: 'bold',
    fontFamily: 'monospace', margin: '12px 0',
    color: '#1e293b'
  },
  buttons: { display: 'flex', gap: '12px', justifyContent: 'center' },
  start: {
    padding: '10px 24px', background: '#22c55e', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontSize: '16px', fontWeight: '600'
  },
  stop: {
    padding: '10px 24px', background: '#ef4444', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontSize: '16px', fontWeight: '600'
  },
  hint: { fontSize: '13px', color: '#ef4444', marginTop: '12px', fontWeight: '500' }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="480" />
</template>
