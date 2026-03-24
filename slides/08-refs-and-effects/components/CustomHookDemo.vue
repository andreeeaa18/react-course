<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import StatusBar from './StatusBar';
import SaveButton from './SaveButton';

export default function App() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Custom Hook: useOnlineStatus</h2>
      <p style={styles.hint}>
        Deschide DevTools → Network → bifează "Offline"
        pentru a testa
      </p>
      <div style={styles.row}>
        <StatusBar />
        <SaveButton />
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  title: { margin: '0 0 4px', fontSize: '18px', color: '#1e293b' },
  hint: { fontSize: '12px', color: '#94a3b8', margin: '0 0 16px' },
  row: { display: 'flex', gap: '16px', flexWrap: 'wrap' }
};`,
    active: true
  },
  '/useOnlineStatus.js': {
    code: `import { useState, useEffect } from 'react';

// Custom Hook — logica este scrisă O SINGURĂ DATĂ
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function handleOnline() { setIsOnline(true); }
    function handleOffline() { setIsOnline(false); }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Fiecare componentă care apelează useOnlineStatus()
// primește propriul state independent!`
  },
  '/StatusBar.js': {
    code: `import { useOnlineStatus } from './useOnlineStatus';

export default function StatusBar() {
  const isOnline = useOnlineStatus();

  return (
    <div style={{
      padding: '16px 24px',
      borderRadius: '12px',
      background: isOnline ? '#f0fdf4' : '#fef2f2',
      border: '2px solid ' + (isOnline ? '#22c55e' : '#ef4444'),
      fontWeight: '600',
      color: isOnline ? '#166534' : '#991b1b'
    }}>
      {isOnline ? '✅ Online' : '❌ Deconectat'}
    </div>
  );
}`
  },
  '/SaveButton.js': {
    code: `import { useOnlineStatus } from './useOnlineStatus';

export default function SaveButton() {
  const isOnline = useOnlineStatus();

  return (
    <button
      disabled={!isOnline}
      style={{
        padding: '16px 24px',
        borderRadius: '12px',
        border: 'none',
        background: isOnline ? '#3b82f6' : '#9ca3af',
        color: 'white',
        fontSize: '15px',
        fontWeight: '600',
        cursor: isOnline ? 'pointer' : 'not-allowed'
      }}
    >
      {isOnline ? 'Salvează progresul' : 'Se reconectează...'}
    </button>
  );
}`
  }
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="420" />
</template>
