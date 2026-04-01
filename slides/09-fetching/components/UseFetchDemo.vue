<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import useFetch from './useFetch';

export default function App() {
  const { data: users, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  );

  if (loading) return <p style={{ color: '#0ea5e9' }}>Se incarca...</p>;
  if (error) return <p style={{ color: '#ef4444' }}>Eroare: {error}</p>;

  return (
    <div style={{ padding: '16px' }}>
      <button onClick={refetch} style={styles.btn}>Reincarca</button>
      <ul style={styles.list}>
        {users.map(user => (
          <li key={user.id} style={styles.item}>
            <strong>{user.name}</strong>
            <span style={styles.email}>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  btn: {
    padding: '8px 16px', background: '#0ea5e9', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '12px',
  },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  item: {
    padding: '8px 0', borderBottom: '1px solid #e2e8f0',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  email: { color: '#64748b', fontSize: '13px' },
};`

const hookCode = `import { useState, useEffect, useCallback } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url, { signal });
      if (!res.ok) throw new Error("HTTP " + res.status);

      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setLoading(false);
      }
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
}`

const files = {
  '/App.js': { code: appCode, active: true },
  '/useFetch.js': { code: hookCode },
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="380" />
</template>
