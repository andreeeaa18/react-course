<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

const allProducts = [
  { id: 1, name: 'Laptop', price: 4500, category: 'electronics' },
  { id: 2, name: 'Telefon', price: 2800, category: 'electronics' },
  { id: 3, name: 'Căști', price: 350, category: 'electronics' },
  { id: 4, name: 'Tricou', price: 89, category: 'clothing' },
  { id: 5, name: 'Pantaloni', price: 199, category: 'clothing' },
  { id: 6, name: 'Ghiozdan', price: 250, category: 'accessories' },
];

export default function ProductFilter() {
  // Doar 2 variabile de state — restul e DERIVAT
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  // Derivat: filtrare bazată pe query + categorie
  const filtered = allProducts.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'all' || p.category === category;
    return matchesQuery && matchesCategory;
  });

  // Derivat: total calculat din lista filtrată
  const total = filtered.reduce((sum, p) => sum + p.price, 0);

  // Derivat: mesaj bazat pe rezultate
  const message = filtered.length === 0
    ? 'Niciun produs găsit'
    : \`\${filtered.length} produse — total: \${total} Lei\`;

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Caută produse..."
          style={styles.input}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={styles.select}
        >
          <option value="all">Toate</option>
          <option value="electronics">Electronice</option>
          <option value="clothing">Îmbrăcăminte</option>
          <option value="accessories">Accesorii</option>
        </select>
      </div>

      <div style={styles.info}>{message}</div>

      <div style={styles.list}>
        {filtered.map(p => (
          <div key={p.id} style={styles.item}>
            <span>{p.name}</span>
            <span style={styles.price}>{p.price} Lei</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  controls: { display: 'flex', gap: '8px' },
  input: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px'
  },
  select: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    background: 'white'
  },
  info: {
    padding: '8px 12px',
    background: '#f0f9ff',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#1e40af',
    fontWeight: 'bold'
  },
  list: { display: 'flex', flexDirection: 'column', gap: '4px' },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 12px',
    background: '#f8fafc',
    borderRadius: '6px',
    fontSize: '14px'
  },
  price: { fontWeight: 'bold', color: '#16a34a' }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
