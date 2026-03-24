<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return; // Nu pornim nimic dacă e oprit

    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    // Cleanup: oprim intervalul
    return () => clearInterval(id);
  }, [isRunning]); // Re-sincronizăm când isRunning se schimbă

  return (
    <div style={styles.container}>
      <p style={styles.count}>{count}</p>
      <div style={styles.buttons}>
        <button
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
          style={{
            ...styles.btn,
            background: isRunning ? '#9ca3af' : '#22c55e'
          }}
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          style={{
            ...styles.btn,
            background: !isRunning ? '#9ca3af' : '#ef4444'
          }}
        >
          Stop
        </button>
        <button
          onClick={() => { setIsRunning(false); setCount(0); }}
          style={{...styles.btn, background: '#6b7280'}}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px', textAlign: 'center',
    fontFamily: 'system-ui'
  },
  count: {
    fontSize: '64px', fontWeight: 'bold',
    fontFamily: 'monospace', margin: '8px 0',
    color: '#1e293b'
  },
  buttons: { display: 'flex', gap: '10px', justifyContent: 'center' },
  btn: {
    padding: '10px 24px', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontSize: '15px', fontWeight: '600'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="420" />
</template>
