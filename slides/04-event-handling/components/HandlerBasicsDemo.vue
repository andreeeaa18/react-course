<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `function Button({ onClick, children, color = '#6366f1' }) {
  return (
    <button onClick={onClick} style={{ ...buttonStyle, background: color }}>
      {children}
    </button>
  );
}

export default function App() {
  function handleBuy() {
    alert('☕ Coffee added to cart!');
  }

  function handleFavorite() {
    alert('♡ Added to favorites!');
  }

  function handleMouseEnter() {
    alert('🖱 Mouse entered the card!');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      alert('⏎ Enter pressed! Value: "' + e.target.value + '"');
    }
  }

  return (
    <div style={containerStyle}>

      <div style={cardStyle}>
        <div style={emojiStyle}>☕</div>
        <div style={nameStyle}>Arabica Premium Coffee</div>
        <div style={detailStyle}>250g · Medium roast · $12</div>
        <div style={actionsStyle}>
          <Button onClick={handleBuy} color="#22c55e">🛒 Buy</Button>
          <Button onClick={handleFavorite} color="#f59e0b">♡ Favorite</Button>
        </div>
      </div>

      <div onMouseEnter={handleMouseEnter} style={hoverAreaStyle}>
        🖱 Hover over me! (onMouseEnter)
      </div>

      <input
        onKeyDown={handleKeyDown}
        placeholder="Search product... (press Enter)"
        style={inputStyle}
      />

    </div>
  );
}

const buttonStyle = {
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '13px',
};

const containerStyle = { padding: '20px', fontFamily: 'system-ui', maxWidth: '360px' };

const cardStyle = {
  border: '2px solid #e2e8f0',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '12px',
};

const emojiStyle = { fontSize: '28px', marginBottom: '6px' };
const nameStyle = { fontWeight: 'bold', fontSize: '14px', marginBottom: '2px' };
const detailStyle = { color: '#64748b', fontSize: '12px', marginBottom: '12px' };
const actionsStyle = { display: 'flex', gap: '8px' };

const hoverAreaStyle = {
  border: '2px dashed #cbd5e1',
  borderRadius: '12px',
  padding: '14px',
  marginBottom: '12px',
  textAlign: 'center',
  color: '#64748b',
  fontSize: '13px',
  cursor: 'pointer',
};

const inputStyle = {
  width: '100%',
  border: '2px solid #e2e8f0',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box',
};
`
</script>

<template>
  <LiveReact :code="code" :editorHeight="340" />
</template>
