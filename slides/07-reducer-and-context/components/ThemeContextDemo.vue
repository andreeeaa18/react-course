<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { createContext, useContext, useState } from 'react';

// Pasul 1: Creăm contextul cu o valoare implicită
const ThemeContext = createContext('light');

// Component adânc în arbore — nu primește niciun prop
function Button({ children }) {
  const theme = useContext(ThemeContext);
  return (
    <button style={theme === 'dark' ? styles.btnDark : styles.btnLight}>
      {children}
    </button>
  );
}

// Component intermediar — nici el nu știe de temă
function Card({ title }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{title}</p>
      <Button>Acțiune</Button>
    </div>
  );
}

// Pasul 2: Furnizăm contextul sus în arbore
export default function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <div style={theme === 'dark' ? styles.appDark : styles.appLight}>
        <h2 style={styles.title}>Exemplu ThemeContext</h2>

        {/* Card nu știe nimic despre temă */}
        <Card title="Card 1" />
        <Card title="Card 2" />

        {/* Pasul 3: Orice component poate citi tema */}
        <button
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          style={styles.toggle}
        >
          Schimbă tema: {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </ThemeContext.Provider>
  );
}

const styles = {
  appLight: { padding: '20px', background: '#f8fafc', borderRadius: '12px', minHeight: '200px' },
  appDark:  { padding: '20px', background: '#1e293b', borderRadius: '12px', minHeight: '200px', color: '#f1f5f9' },
  title: { fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' },
  btnLight: { padding: '8px 16px', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  btnDark:  { padding: '8px 16px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  toggle: { marginTop: '16px', padding: '8px 20px', background: '#64748b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'block' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="420" />
</template>
