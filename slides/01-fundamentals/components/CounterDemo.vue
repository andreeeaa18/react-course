<script setup>
import LiveReactComponent from '../../../common/components/LiveReact.vue'

const code = `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      padding: '40px',
      fontFamily: 'system-ui',
      textAlign: 'center'
    }}>
      <h2>Counter: {count}</h2>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
        <button
          onClick={() => setCount(count - 1)}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          -1
        </button>
        <button
          onClick={() => setCount(0)}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          +1
        </button>
      </div>
    </div>
  );
}`
</script>

<template>
  <LiveReactComponent :code="code" :editorHeight="500" />
</template>
