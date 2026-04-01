<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { useState } from 'react';
import UserProfile from './UserProfile';

export default function App() {
  const [userId, setUserId] = useState(1);

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        {[1, 2, 3, 4, 5].map(id => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            style={{
              ...styles.btn,
              ...(userId === id ? styles.btnActive : {}),
            }}
          >
            User {id}
          </button>
        ))}
      </div>
      <p style={styles.hint}>
        Apasă rapid pe butoane diferite!
      </p>
      <UserProfile userId={userId} />
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  controls: { display: 'flex', gap: '6px', marginBottom: '8px' },
  btn: {
    padding: '6px 14px', background: '#e2e8f0', color: '#334155',
    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px',
  },
  btnActive: { background: '#0ea5e9', color: 'white' },
  hint: { color: '#94a3b8', fontSize: '12px', margin: '4px 0 12px' },
};`

const profileCode = `import { useState, useEffect } from 'react';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchedId, setFetchedId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const delay = Math.random() * 1800 + 200;

    fetch("https://jsonplaceholder.typicode.com/users/" + userId)
      .then(res => res.json())
      .then(data => wait(delay).then(() => data))
      .then(data => {
        console.log("Raspuns User " + data.id + " (cerut: " + userId + ", delay: " + Math.round(delay) + "ms)");
        setUser(data);
        setFetchedId(data.id);
        setLoading(false);
      });

    // Nu anulam nimic — BUG!
  }, [userId]);

  if (loading) return <p style={{ color: "#0ea5e9" }}>Se incarca user {userId}...</p>;

  const mismatch = fetchedId !== null && fetchedId !== userId;

  return (
    <div style={{
      ...styles.card,
      borderColor: mismatch ? "#ef4444" : "#e2e8f0",
    }}>
      {mismatch && (
        <div style={styles.warning}>
          RACE CONDITION! Cerut user {userId}, afisat user {fetchedId}
        </div>
      )}
      <h3 style={styles.name}>{user.name}</h3>
      <p>{user.email}</p>
      <p style={styles.city}>{user.address.city}</p>
    </div>
  );
}

const styles = {
  card: {
    padding: "16px", borderRadius: "8px", border: "2px solid #e2e8f0",
  },
  name: { margin: "0 0 8px", color: "#0369a1" },
  city: { color: "#64748b" },
  warning: {
    background: "#fef2f2", color: "#dc2626", padding: "8px 12px",
    borderRadius: "6px", fontWeight: "bold", fontSize: "13px", marginBottom: "12px",
  },
};`

const files = {
  '/App.js': { code: appCode, active: true },
  '/UserProfile.js': { code: profileCode },
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="400" />
</template>
