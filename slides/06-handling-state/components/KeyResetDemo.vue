<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/App.js': {
    code: `import MessengerBroken from './MessengerBroken';
import MessengerFixed from './MessengerFixed';

export default function App() {
  return (
    <div style={styles.container}>
      <MessengerBroken />
      <MessengerFixed />
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    padding: '8px'
  }
};`,
    active: true
  },
  '/contacts.js': {
    code: `export const contacts = [
  { id: 1, name: 'Ana', email: 'ana@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' },
  { id: 3, name: 'Clara', email: 'clara@mail.com' },
];`,
    hidden: true
  },
  '/ChatInput.js': {
    code: `import { useState } from 'react';

export default function ChatInput({ contact }) {
  const [text, setText] = useState('');

  return (
    <div style={styles.chat}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={'Scrie pentru ' + contact.name + '...'}
        style={styles.textarea}
      />
      <button
        disabled={!text}
        style={{ ...styles.sendBtn, opacity: text ? 1 : 0.4 }}
      >
        Trimite către {contact.email}
      </button>
    </div>
  );
}

const styles = {
  chat: { display: 'flex', flexDirection: 'column', gap: '8px' },
  textarea: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    minHeight: '60px',
    fontSize: '13px',
    resize: 'vertical'
  },
  sendBtn: {
    padding: '8px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold'
  }
};`,
    hidden: true
  },
  '/MessengerBroken.js': {
    code: `import { useState } from 'react';
import { contacts } from './contacts';
import ChatInput from './ChatInput';

// ❌ FĂRĂ key — mesajul rămâne la schimbarea contactului
export default function MessengerBroken() {
  const [selectedId, setSelectedId] = useState(1);
  const contact = contacts.find(c => c.id === selectedId);

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.badTitle}>❌ Fără key</h3>
      <div style={styles.sidebar}>
        {contacts.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            style={{
              ...styles.btn,
              background: c.id === selectedId ? '#ef4444' : '#f1f5f9',
              color: c.id === selectedId ? 'white' : '#334155'
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
      {/* Fără key — React păstrează state-ul! */}
      <ChatInput contact={contact} />
    </div>
  );
}

const styles = {
  wrapper: {
    border: '2px solid #fca5a5',
    borderRadius: '8px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  badTitle: { margin: 0, fontSize: '14px', color: '#dc2626' },
  sidebar: { display: 'flex', gap: '4px' },
  btn: {
    padding: '6px 10px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '12px'
  }
};`
  },
  '/MessengerFixed.js': {
    code: `import { useState } from 'react';
import { contacts } from './contacts';
import ChatInput from './ChatInput';

// ✅ CU key — mesajul se resetează la schimbarea contactului
export default function MessengerFixed() {
  const [selectedId, setSelectedId] = useState(1);
  const contact = contacts.find(c => c.id === selectedId);

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.goodTitle}>✅ Cu key</h3>
      <div style={styles.sidebar}>
        {contacts.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            style={{
              ...styles.btn,
              background: c.id === selectedId ? '#16a34a' : '#f1f5f9',
              color: c.id === selectedId ? 'white' : '#334155'
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
      {/* key={contact.id} → React resetează state-ul */}
      <ChatInput key={contact.id} contact={contact} />
    </div>
  );
}

const styles = {
  wrapper: {
    border: '2px solid #86efac',
    borderRadius: '8px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  goodTitle: { margin: 0, fontSize: '14px', color: '#16a34a' },
  sidebar: { display: 'flex', gap: '4px' },
  btn: {
    padding: '6px 10px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '12px'
  }
};`
  }
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="360" />
</template>
