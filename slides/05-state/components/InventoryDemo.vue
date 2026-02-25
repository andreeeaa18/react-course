<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

const SHOP = [
  { id: 1, name: '⚔️ Sabie de Fier' },
  { id: 2, name: '🪄 Staff Magic' },
  { id: 3, name: '🏹 Arc Elfic' },
  { id: 4, name: '🛡️ Scut de Cristal' },
];

export default function Inventory() {
  const [inventory, setInventory] = useState([SHOP[0]]);

  function addItem(item) {
    setInventory([...inventory, item]); // ✅ array nou cu spread
  }

  function removeItem(id) {
    setInventory(inventory.filter(i => i.id !== id)); // ✅ filter
  }

  const available = SHOP.filter(
    item => !inventory.some(inv => inv.id === item.id)
  );

  return (
    <div style={styles.container}>
      <div style={styles.panel}>
        <h4 style={styles.title}>🏪 Magazin</h4>
        {available.length === 0 && <p style={styles.empty}>Nimic disponibil</p>}
        {available.map(item => (
          <div key={item.id} style={styles.row}>
            <span>{item.name}</span>
            <button onClick={() => addItem(item)} style={styles.addBtn}>+ Adaugă</button>
          </div>
        ))}
      </div>
      <div style={styles.panel}>
        <h4 style={styles.title}>🎒 Inventar ({inventory.length})</h4>
        {inventory.length === 0 && <p style={styles.empty}>Gol</p>}
        {inventory.map(item => (
          <div key={item.id} style={styles.row}>
            <span>{item.name}</span>
            <button onClick={() => removeItem(item.id)} style={styles.removeBtn}>✕ Elimină</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', gap: '12px', padding: '12px', flexWrap: 'wrap' },
  panel: { flex: 1, minWidth: '180px', border: '2px solid #e5e7eb', borderRadius: '10px', padding: '12px' },
  title: { margin: '0 0 10px', fontSize: '14px', fontWeight: 'bold' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 4px', borderBottom: '1px solid #f3f4f6', fontSize: '13px' },
  empty: { color: '#9ca3af', fontSize: '13px', margin: 0 },
  addBtn: { padding: '4px 10px', background: '#10b981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' },
  removeBtn: { padding: '4px 10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
