<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useEffect } from 'react';

// Simulăm un API
function fakeFetch(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      const users = {
        1: { name: 'Ana Popescu', role: 'Developer' },
        2: { name: 'Mihai Ionescu', role: 'Designer' },
        3: { name: 'Elena Radu', role: 'Manager' },
      };
      resolve(users[userId] || null);
    }, 800);
  });
}

export default function UserProfile() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false; // Flag pentru race condition
    setLoading(true);

    fakeFetch(userId).then(data => {
      // Dacă userId s-a schimbat între timp, ignorăm
      if (!ignore) {
        setUser(data);
        setLoading(false);
      }
    });

    // Cleanup: marcăm rezultatul ca invalid
    return () => {
      ignore = true;
    };
  }, [userId]);

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        {[1, 2, 3].map(id => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            style={{
              ...styles.tab,
              background: userId === id ? '#3b82f6' : '#e5e7eb',
              color: userId === id ? 'white' : '#374151'
            }}
          >
            User {id}
          </button>
        ))}
      </div>

      <div style={styles.card}>
        {loading ? (
          <p style={styles.loading}>Se încarcă...</p>
        ) : user ? (
          <>
            <h3 style={styles.name}>{user.name}</h3>
            <p style={styles.role}>{user.role}</p>
          </>
        ) : (
          <p>Utilizator negăsit</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '16px' },
  tab: {
    padding: '8px 20px', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600'
  },
  card: {
    padding: '24px', background: '#f8fafc',
    borderRadius: '12px', border: '2px solid #e2e8f0',
    minHeight: '80px'
  },
  loading: { color: '#94a3b8', fontStyle: 'italic', margin: 0 },
  name: { margin: '0 0 4px', fontSize: '20px', color: '#1e293b' },
  role: { margin: 0, fontSize: '15px', color: '#64748b' }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="420" />
</template>
