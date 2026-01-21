<script setup>
import LiveReactComponent from '../../../common/components/LiveReact.vue'

const code = `import React from 'react';

export default function App() {
  return (
    <div style={{
      padding: '40px',
      fontFamily: 'system-ui',
      textAlign: 'center'
    }}>
      <h1>Hello, React! 👋</h1>
      <p>This is your first React component.</p>
      <p>Try editing the code above!</p>
    </div>
  );
}
`

const dependencies = {}
</script>

<template>
  <LiveReactComponent :code="code" :dependencies="dependencies" :editorHeight="100" />
</template>
