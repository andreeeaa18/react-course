<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

export default function PointerTracker() {
  // Coordonatele se actualizează mereu împreună → un singur obiect
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handlePointerMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top)
    });
  }

  return (
    <div onPointerMove={handlePointerMove} style={styles.area}>
      <div style={{
        ...styles.dot,
        transform: \`translate(\${position.x - 10}px, \${position.y - 10}px)\`
      }} />
      <p style={styles.coords}>
        x: {position.x}, y: {position.y}
      </p>
    </div>
  );
}

const styles = {
  area: {
    position: 'relative',
    width: '100%',
    height: '200px',
    background: 'linear-gradient(135deg, #dbeafe, #ede9fe)',
    borderRadius: '12px',
    cursor: 'crosshair',
    overflow: 'hidden'
  },
  dot: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#3b82f6',
    pointerEvents: 'none'
  },
  coords: {
    position: 'absolute',
    bottom: '8px',
    right: '12px',
    margin: 0,
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#475569'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
