<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `
function CourseItem({ name, isPacked }) {
  return (
    <div style={styles.item}>
      <span>{isPacked ? '✅' : '📦'} {name}</span>
      {isPacked && <span style={styles.badge}>Finalizat</span>}
    </div>
  );
}


export default function App() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p style={styles.title}>Progres cursuri</p>
        <CourseItem name="Introducere în React" isPacked={true} />
        <CourseItem name="Props & Rendering" isPacked={true} />
        <CourseItem name="Hooks & State" isPacked={false} />
        <CourseItem name="Routing" isPacked={false} />
      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'system-ui', maxWidth: 340, margin: '20px auto' },
  card: { background: '#fff', border: '2px solid #e2e8f0', borderRadius: 12, padding: 16, marginBottom: 12 },
  title: { margin: '0 0 10px', fontSize: 15, color: '#334155', fontWeight: 700 },
  item: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '7px 0', borderBottom: '1px solid #f1f5f9', gap: 8
  },
  badge: { background: '#dcfce7', color: '#166534', borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 700 },
  adminBanner: { background: '#fef3c7', color: '#92400e', borderRadius: 8, padding: '8px 12px', marginBottom: 12, fontWeight: 700, fontSize: 13 },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" :showTabs="false" />
</template>
