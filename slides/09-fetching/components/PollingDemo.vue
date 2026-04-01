<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState, useEffect, useRef } from 'react';

const API = "https://api.coingecko.com/api/v3/simple/price" +
  "?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true";

export default function App() {
  const [prices, setPrices] = useState(null);
  const [pollCount, setPollCount] = useState(0);
  const [active, setActive] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!active) {
      clearInterval(intervalRef.current);
      return;
    }

    function poll() {
      fetch(API)
        .then(r => r.json())
        .then(data => {
          setPrices(data);
          setPollCount(c => c + 1);
        })
        .catch(() => {});
    }

    poll(); // prima dată imediat
    intervalRef.current = setInterval(poll, 5000);

    return () => clearInterval(intervalRef.current);
  }, [active]);

  const coins = prices ? [
    { name: 'Bitcoin', key: 'bitcoin', emoji: '₿' },
    { name: 'Ethereum', key: 'ethereum', emoji: 'Ξ' },
    { name: 'Solana', key: 'solana', emoji: '◎' },
  ] : [];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Crypto Prices (polling la 5s)</h3>
        <button
          onClick={() => setActive(a => !a)}
          style={{
            ...styles.btn,
            background: active ? '#ef4444' : '#22c55e',
          }}
        >
          {active ? 'Stop' : 'Start'}
        </button>
      </div>
      {prices ? (
        <div style={styles.stats}>
          {coins.map(coin => {
            const change = prices[coin.key].usd_24h_change;
            return (
              <div key={coin.key} style={styles.stat}>
                <div style={styles.emoji}>{coin.emoji}</div>
                <div style={styles.statValue}>
                  \${prices[coin.key].usd.toLocaleString()}
                </div>
                <div style={styles.statLabel}>{coin.name}</div>
                <div style={{
                  fontSize: '12px', marginTop: '4px',
                  color: change >= 0 ? '#22c55e' : '#ef4444',
                }}>
                  {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={styles.loading}>Se încarcă...</div>
      )}
      <p style={styles.info}>
        Request-uri: {pollCount} | Status: {active ? 'activ' : 'oprit'}
      </p>
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  title: { margin: 0, color: '#0f172a' },
  btn: {
    padding: '6px 16px', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer',
  },
  stats: {
    display: 'flex', gap: '12px', padding: '16px 0',
    justifyContent: 'center',
  },
  stat: {
    textAlign: 'center', padding: '12px 16px',
    background: '#f0f9ff', borderRadius: '8px', flex: 1,
  },
  emoji: { fontSize: '20px', marginBottom: '4px' },
  statValue: { fontSize: '20px', fontWeight: 'bold', color: '#0ea5e9' },
  statLabel: { fontSize: '12px', color: '#64748b', marginTop: '2px' },
  loading: { textAlign: 'center', padding: '20px', color: '#64748b' },
  info: { color: '#64748b', fontSize: '13px', textAlign: 'center' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
