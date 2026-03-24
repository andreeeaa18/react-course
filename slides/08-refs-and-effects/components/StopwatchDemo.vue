<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  // Stocăm ID-ul intervalului într-un ref
  // pentru a-l putea opri mai târziu
  const intervalRef = useRef(null);

  function handleStart() {
    const time = Date.now();
    setStartTime(time);
    setNow(time);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setStartTime(null);
    setNow(null);
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
        <button onClick={handleReset} style={styles.reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px', textAlign: 'center',
    fontFamily: 'system-ui'
  },
  time: {
    fontSize: '48px', fontWeight: 'bold',
    fontFamily: 'monospace', margin: '16px 0',
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
  reset: {
    padding: '10px 24px', background: '#6b7280', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontSize: '16px', fontWeight: '600'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="480" />
</template>
