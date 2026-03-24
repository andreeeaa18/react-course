<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useEffect } from 'react';

export default function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(true);

  useEffect(() => {
    if (!isTracking) return;

    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    // Adăugăm event listener-ul
    window.addEventListener('pointermove', handleMove);

    // Cleanup: îl eliminăm
    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, [isTracking]);

  return (
    <div style={styles.container}>
      <label style={styles.label}>
        <input
          type="checkbox"
          checked={isTracking}
          onChange={e => setIsTracking(e.target.checked)}
        />
        {' '}Urmărește cursorul
      </label>
      <div style={styles.coords}>
        <span style={styles.coord}>X: {position.x}</span>
        <span style={styles.coord}>Y: {position.y}</span>
      </div>
      {isTracking && (
        <div style={{
          ...styles.dot,
          transform: \`translate(\${position.x - 8}px, \${position.y - 8}px)\`
        }} />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '16px', fontFamily: 'system-ui',
    position: 'relative', minHeight: '120px'
  },
  label: {
    fontSize: '15px', cursor: 'pointer',
    fontWeight: '600', color: '#374151'
  },
  coords: {
    display: 'flex', gap: '16px', marginTop: '12px'
  },
  coord: {
    padding: '8px 16px', background: '#f0f9ff',
    borderRadius: '8px', fontFamily: 'monospace',
    fontSize: '16px', fontWeight: '600', color: '#0369a1'
  },
  dot: {
    width: '16px', height: '16px', borderRadius: '50%',
    background: '#ef4444', position: 'fixed',
    pointerEvents: 'none', zIndex: 999
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="420" />
</template>
