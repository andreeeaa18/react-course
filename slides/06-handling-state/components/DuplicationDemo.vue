<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

const initialItems = [
  { id: 0, title: 'Covrigei' },
  { id: 1, title: 'Brânzică' },
  { id: 2, title: 'Ciocolată' },
];

export default function ShoppingList() {
  const [items, setItems] = useState(initialItems);
  // Stocăm doar ID-ul, nu obiectul întreg
  const [selectedId, setSelectedId] = useState(0);

  // Derivăm obiectul selectat la fiecare render
  const selectedItem = items.find(item => item.id === selectedId);

  function handleTitleChange(id, newTitle) {
    setItems(items.map(item =>
      item.id === id ? { ...item, title: newTitle } : item
    ));
  }

  return (
    <div style={styles.container}>
      <div style={styles.list}>
        <h3 style={styles.heading}>Produse</h3>
        {items.map(item => (
          <div key={item.id} style={styles.row}>
            <input
              value={item.title}
              onChange={e => handleTitleChange(item.id, e.target.value)}
              style={styles.input}
            />
            <button
              onClick={() => setSelectedId(item.id)}
              style={{
                ...styles.selectBtn,
                background: item.id === selectedId ? '#3b82f6' : '#e2e8f0',
                color: item.id === selectedId ? 'white' : '#334155'
              }}
            >
              {item.id === selectedId ? '✓' : 'Selectează'}
            </button>
          </div>
        ))}
      </div>
      <div style={styles.preview}>
        <h3 style={styles.heading}>Selectat</h3>
        <p style={styles.selected}>{selectedItem.title}</p>
        <p style={styles.hint}>
          Editează titlul unui produs — selecția se actualizează automat!
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    gap: '16px',
    padding: '8px'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  heading: { margin: 0, fontSize: '16px' },
  row: { display: 'flex', gap: '8px', alignItems: 'center' },
  input: {
    flex: 1,
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px'
  },
  selectBtn: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  },
  preview: {
    padding: '16px',
    background: '#f0f9ff',
    borderRadius: '8px',
    border: '2px solid #93c5fd'
  },
  selected: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e40af',
    margin: '8px 0'
  },
  hint: {
    fontSize: '12px',
    color: '#64748b',
    margin: 0
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="420" />
</template>
