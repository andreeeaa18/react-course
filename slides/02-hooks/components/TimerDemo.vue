<script setup>
import LiveReactComponent from '../../../common/components/LiveReact.vue'

const code = `import React, { useState, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }

    // Cleanup function
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem' }}>{seconds}s</h1>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => setIsRunning(!isRunning)} style={{ padding: '10px 20px', fontSize: '16px' }}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setSeconds(0); setIsRunning(false); }} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Reset
        </button>
      </div>
    </div>
  );
}`
</script>

<template>
  <LiveReactComponent :code="code" :editorHeight="500" />
</template>
