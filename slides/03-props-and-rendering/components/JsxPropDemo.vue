<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `
function Card({ header, body, footer }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>{header}</div>
      <div style={{ marginBottom: 12 }}>{body}</div>
      <div style={styles.footer}>{footer}</div>
    </div>
  );
}

export default function App() {
  const cardHeader = (
    <h2 style={{ margin: 0, color: THEME.primary, fontSize: 18 }}>
      Ana Pop
    </h2>
  );

  const cardBody = (
    <p style={{ margin: 0, color: THEME.secondary }}>
      Studentă la Informatică, anul 3. Pasionată de UI/UX și React.
    </p>
  );

  const cardFooter = (
    <button style={styles.button}>
      Urmărește
    </button>
  );

  return (
    <Card 
      header={cardHeader} 
      body={cardBody} 
      footer={cardFooter} 
    />
  );
}

const THEME = {
  primary: '#0ea5e9',
  secondary: '#475569',
  border: '#e2e8f0',
};

const styles = {
  container: {
    border: \`2px solid \${THEME.primary}\`,
    borderRadius: 12,
    padding: 16,
    maxWidth: 320,
    margin: '20px auto',
    fontFamily: 'system-ui',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  header: { borderBottom: \`1px solid \${THEME.border}\`, paddingBottom: 10, marginBottom: 12 },
  footer: { borderTop: \`1px solid \${THEME.border}\`, paddingTop: 10 },
  button: {
    background: THEME.primary,
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600
  }
};
`
</script>

<template>
  <LiveReact :code="code" :editorHeight="350" :showTabs="false" />
</template>