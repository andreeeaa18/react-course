<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `
function Card({ title, children }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Card title="Notificări">
        <p style={styles.text}>Ai 3 mesaje noi.</p>
        <button style={styles.button}>Marchează tot</button>
      </Card>

      <Card title="Statistici">
        <p style={{ ...styles.text, marginBottom: 0 }}> - 12 cursuri parcurse</p>
        <p style={{ ...styles.text, marginBottom: 0 }}> - 8 teme predate</p>
      </Card>
    </div>
  );
}

const THEME = {
  primary: '#6366f1',
  text: '#475569',
  border: '#e2e8f0'
};

const styles = {
  card: {
    border: \`2px solid \${THEME.primary}\`,
    borderRadius: 12,
    padding: 16,
    maxWidth: 320,
    margin: '20px auto',
    fontFamily: 'system-ui',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  title: { 
    margin: '0 0 12px', 
    color: THEME.primary, 
    borderBottom: \`1px solid \${THEME.border}\`, 
    paddingBottom: 8 
  },
  button: {
    background: THEME.primary,
    color: 'white',
    border: 'none',
    padding: '6px 16px',
    borderRadius: 8,
    cursor: 'pointer'
  },
  text: { margin: '0 0 8px', color: THEME.text }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="350" :showTabs="false" />
</template>