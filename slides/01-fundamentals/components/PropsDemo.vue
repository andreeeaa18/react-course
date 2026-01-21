<script setup>
import LiveReactComponent from '../../../common/components/LiveReact.vue'

const code = `import React from 'react';

function Greeting({ name, emoji }) {
  return (
    <div style={{
      padding: '20px',
      margin: '10px',
      background: '#f0f0f0',
      borderRadius: '8px'
    }}>
      <h2>Hello, {name}! {emoji}</h2>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Greeting name="Alice" emoji="🎨" />
      <Greeting name="Bob" emoji="🚀" />
      <Greeting name="Charlie" emoji="⚡" />
    </div>
  );
}`
</script>

<template>
  <LiveReactComponent :code="code" :editorHeight="450" />
</template>
