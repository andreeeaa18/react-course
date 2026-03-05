<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

// Fiecare Panel are propriul state — nu "știe" de celălalt
function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <section style={styles.panel}>
      <h3 style={styles.title}>{title}</h3>
      {isActive
        ? <p style={styles.content}>{children}</p>
        : <button onClick={() => setIsActive(true)} style={styles.button}>
            Arată
          </button>
      }
    </section>
  );
}

export default function App() {
  return (
    <div style={styles.container}>
      <Panel title="Secțiunea 1">
        Conținutul primei secțiuni. Observă că ambele panouri
        se pot deschide independent.
      </Panel>
      <Panel title="Secțiunea 2">
        Conținutul celei de-a doua secțiuni. Într-un accordion real,
        doar unul ar trebui să fie deschis.
      </Panel>
    </div>
  );
}

const styles = {
  container: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  hint: {
    margin: 0,
    padding: '8px 12px',
    background: '#fef3c7',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#92400e'
  },
  panel: {
    padding: '12px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    background: '#f8fafc'
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '16px'
  },
  content: {
    margin: 0,
    fontSize: '14px',
    color: '#475569'
  },
  button: {
    padding: '8px 20px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="450" />
</template>
