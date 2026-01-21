<script setup>
import LiveReactComponent from '../../../common/components/LiveReact.vue'

const code = `import React, { useState, useEffect } from 'react';

// Custom Hook
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export default function App() {
  const width = useWindowWidth();

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui', textAlign: 'center' }}>
      <h2>Window Width</h2>
      <p style={{ fontSize: '2rem', color: '#61dafb' }}>{width}px</p>
      <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
        Try resizing your browser window!
      </p>
    </div>
  );
}`
</script>

<template>
  <LiveReactComponent :code="code" :editorHeight="500" />
</template>
