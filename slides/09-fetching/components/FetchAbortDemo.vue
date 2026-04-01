<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { useState } from 'react';
import UserProfile from './UserProfile';

export default function App() {
  const [userId, setUserId] = useState(1);
  const [show, setShow] = useState(true);

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <button onClick={() => setUserId(id => (id % 10) + 1)} style={styles.btn}>
          Schimba user (ID: {userId})
        </button>
        <button onClick={() => setShow(s => !s)} style={styles.btnDanger}>
          {show ? 'Unmount' : 'Mount'}
        </button>
      </div>
      {show && <UserProfile userId={userId} />}
      <p style={styles.hint}>
        Apasa rapid — fiecare schimbare anuleaza request-ul anterior!
      </p>
    </div>
  );
}

const styles = {
  container: { padding: '16px' },
  controls: { display: 'flex', gap: '8px', marginBottom: '16px' },
  btn: {
    padding: '8px 16px', background: '#0ea5e9', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
  },
  btnDanger: {
    padding: '8px 16px', background: '#ef4444', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
  },
  hint: { color: '#64748b', fontSize: '13px', marginTop: '12px' },
};`

const profileCode = `import { useState, useEffect } from 'react';

export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users/" + userId,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("HTTP " + res.status);
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

    // Cleanup: anulam request-ul la unmount sau userId schimbat
    return () => controller.abort();
  }, [userId]);

  if (loading) return <p style={{ color: '#0ea5e9' }}>Se incarca user {userId}...</p>;
  if (!user) return null;

  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{user.name}</h3>
      <p>{user.email}</p>
      <p style={styles.city}>{user.address.city}</p>
    </div>
  );
}

const styles = {
  card: {
    padding: '16px', borderRadius: '8px',
    border: '2px solid #e2e8f0',
  },
  name: { margin: '0 0 8px', color: '#0369a1' },
  city: { color: '#64748b' },
};`

const files = {
  '/App.js': { code: appCode, active: true },
  '/UserProfile.js': { code: profileCode },
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="380" />
</template>
