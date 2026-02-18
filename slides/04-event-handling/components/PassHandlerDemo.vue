<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `// Child component — doesn't know WHAT happens, only that a click occurred
function ProductCard({ name, price, emoji, onBuy, onFavorite }) {
  return (
    <div style={cardStyle}>
      <span style={emojiStyle}>{emoji}</span>
      <div style={infoStyle}>
        <div style={nameStyle}>{name}</div>
        <div style={priceStyle}>{price}</div>
      </div>
      <button onClick={onFavorite} style={favBtnStyle}>♡</button>
      <button onClick={onBuy} style={buyBtnStyle}>+ Cart</button>
    </div>
  );
}

// Parent component — defines and passes down the handlers
export default function Shop() {
  function handleBuy(product) {
    alert('🛒 ' + product + ' added to cart!');
  }

  function handleFavorite(product) {
    alert('♡ ' + product + ' saved to favorites!');
  }

  const products = [
    { id: 1, name: 'Arabica Coffee', price: '$12', emoji: '☕' },
    { id: 2, name: 'Green Tea',      price: '$8',  emoji: '🍵' },
    { id: 3, name: 'Dark Chocolate', price: '$9',  emoji: '🍫' },
  ];

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>🛍 Shop</h3>
      {products.map(p => (
        <ProductCard
          key={p.id}
          {...p}
          onBuy={() => handleBuy(p.name)}
          onFavorite={() => handleFavorite(p.name)}
        />
      ))}
    </div>
  );
}

const cardStyle = {
  background: 'white',
  border: '2px solid #e2e8f0',
  borderRadius: '12px',
  padding: '12px 14px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '8px',
};

const emojiStyle = { fontSize: '24px' };
const infoStyle = { flex: 1 };
const nameStyle = { fontWeight: 'bold', fontSize: '13px' };
const priceStyle = { color: '#6366f1', fontSize: '12px', fontWeight: 'bold' };

const favBtnStyle = {
  background: 'none', border: 'none',
  fontSize: '18px', cursor: 'pointer', padding: '4px',
};

const buyBtnStyle = {
  background: '#6366f1', color: 'white', border: 'none',
  padding: '6px 12px', borderRadius: '8px', cursor: 'pointer',
  fontWeight: 'bold', fontSize: '12px',
};

const containerStyle = { padding: '16px', fontFamily: 'system-ui', maxWidth: '380px' };
const titleStyle = { margin: '0 0 12px', color: '#334155', fontSize: '15px' };
`
</script>

<template>
  <LiveReact :code="code" :editorHeight="340" />
</template>
