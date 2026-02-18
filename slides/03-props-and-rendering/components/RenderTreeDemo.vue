<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `
function Navbar() {
  return <nav style={styles.navbar}>BlogApp</nav>;
}

function ArticleCard({ title, excerpt }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardExcerpt}>{excerpt}</p>
    </div>
  );
}

function ArticleList() {
  return (
    <div style={styles.list}>
      <ArticleCard title="React Basics" excerpt="Learn the fundamentals of React components." />
      <ArticleCard title="Hooks in Depth" excerpt="useState, useEffect and custom hooks." />
    </div>
  );
}

function Footer() {
  return <footer style={styles.footer}>© 2024 BlogApp</footer>;
}

export default function App() {
  return (
    <div style={styles.app}>
      <Navbar />
      <ArticleList />
      <Footer />
    </div>
  );
}

const styles = {
  app: { fontFamily: 'system-ui', padding: 16, minHeight: '100vh' },
  navbar: { background: '#0ea5e9', color: 'white', padding: '10px 16px', borderRadius: 10, marginBottom: 12, fontWeight: 700, fontSize: 14 },
  list: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 },
  card: { background: '#fff', border: '2px solid #e0f2fe', borderRadius: 10, padding: 12 },
  cardTitle: { margin: '0 0 4px', fontSize: 14, color: '#0369a1', fontWeight: 700 },
  cardExcerpt: { margin: 0, fontSize: 12, color: '#64748b' },
  footer: { background: '#f1f5f9', borderRadius: 10, padding: '8px 16px', textAlign: 'center', fontSize: 12, color: '#64748b' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" :showTabs="false" />
</template>
