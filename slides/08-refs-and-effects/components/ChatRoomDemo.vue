<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import { useState } from 'react';
import ChatRoom from './ChatRoom';

const rooms = ['general', 'react', 'random'];

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(true);

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <label style={styles.label}>
          Camera:
          <select
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
            style={styles.select}
          >
            {rooms.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
        <button
          onClick={() => setShow(!show)}
          style={styles.btn}
        >
          {show ? 'Deconectează' : 'Conectează'}
        </button>
      </div>

      {show && <ChatRoom roomId={roomId} />}
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  controls: {
    display: 'flex', gap: '12px', alignItems: 'center',
    marginBottom: '12px'
  },
  label: { fontSize: '14px', fontWeight: '600', color: '#374151' },
  select: {
    marginLeft: '8px', padding: '6px 10px',
    borderRadius: '6px', border: '1px solid #d1d5db',
    fontSize: '14px'
  },
  btn: {
    padding: '6px 16px', background: '#6366f1', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer',
    fontSize: '13px', fontWeight: '600'
  }
};`,
    active: true
  },
  '/ChatRoom.js': {
    code: `import { useEffect } from 'react';
import { createConnection } from './chat';

export default function ChatRoom({ roomId }) {
  // Effect: sincronizăm cu serverul de chat
  useEffect(() => {
    // START sincronizare
    const connection = createConnection(roomId);
    connection.connect();

    // Cleanup: STOP sincronizare
    return () => {
      connection.disconnect();
    };
  }, [roomId]); // Re-sincronizăm când roomId se schimbă

  return (
    <div style={styles.room}>
      <h3 style={styles.title}>
        Camera: #{roomId}
      </h3>
      <p style={styles.hint}>Verifică consola pentru mesajele de conexiune!</p>
    </div>
  );
}

const styles = {
  room: {
    padding: '16px', background: '#f0f9ff',
    borderRadius: '12px', border: '2px solid #bae6fd'
  },
  title: { margin: '0 0 8px', color: '#0369a1' },
  hint: { margin: 0, fontSize: '13px', color: '#7dd3fc' }
};`
  },
  '/chat.js': {
    code: `// Simulăm un server de chat
export function createConnection(roomId) {
  return {
    connect() {
      console.log('✅ Conectat la camera "' + roomId + '"');
    },
    disconnect() {
      console.log('❌ Deconectat de la camera "' + roomId + '"');
    }
  };
}`
  }
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="400" />
</template>
