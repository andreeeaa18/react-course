<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

// Componenta Panel — controlată de părinte
function Panel({ title, children, isActive, onShow }) {
  return (
    <div style={{
      ...styles.panel,
      borderColor: isActive ? '#3b82f6' : '#e2e8f0'
    }}>
      <div style={styles.header} onClick={onShow}>
        <h3 style={styles.title}>{title}</h3>
        <span style={{
          ...styles.arrow,
          transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)'
        }}>▶</span>
      </div>
      {isActive && (
        <div style={styles.content}>{children}</div>
      )}
    </div>
  );
}

export default function Accordion() {
  // State-ul e în părinte — o singură sursă de adevăr
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={styles.container}>
      <Panel
        title="Ce este React?"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        React este o bibliotecă JavaScript pentru construirea interfețelor utilizator.
        Folosește o abordare declarativă bazată pe componente.
      </Panel>
      <Panel
        title="De ce folosim React?"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        React permite crearea de UI-uri interactive eficient,
        folosind Virtual DOM pentru actualizări rapide.
      </Panel>
      <Panel
        title="Cum învățăm React?"
        isActive={activeIndex === 2}
        onShow={() => setActiveIndex(2)}
      >
        Pas cu pas: JSX, componente, props, state, hooks,
        apoi construind proiecte reale.
      </Panel>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '8px'
  },
  panel: {
    borderRadius: '8px',
    border: '2px solid',
    overflow: 'hidden',
    transition: 'border-color 0.2s'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    cursor: 'pointer',
    background: '#f8fafc'
  },
  title: { margin: 0, fontSize: '15px' },
  arrow: {
    transition: 'transform 0.2s',
    fontSize: '12px',
    color: '#64748b'
  },
  content: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#475569',
    borderTop: '1px solid #e2e8f0'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="420" />
</template>
