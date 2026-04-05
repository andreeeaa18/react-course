<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { useState, useCallback } from 'react';
import TodoList from './TodoList';

export default function App() {
  const [count, setCount] = useState(0);
  const [todos] = useState([
    { id: 1, text: 'Învață React.memo' },
    { id: 2, text: 'Învață useMemo' },
    { id: 3, text: 'Învață useCallback' },
  ]);

  // SOLUȚIA: useCallback păstrează aceeași referință
  const handleDelete = useCallback((id) => {
    console.log('Șterg todo:', id);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.counterSection}>
        <h3 style={styles.title}>Counter: {count}</h3>
        <button onClick={() => setCount(count + 1)} style={styles.btn}>
          +1
        </button>
        <p style={styles.hint}>
          Apasă +1 — TodoList NU se mai re-renderează!
        </p>
      </div>
      <TodoList todos={todos} onDelete={handleDelete} />
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  counterSection: { marginBottom: '16px' },
  title: { margin: '0 0 8px', color: '#0369a1' },
  btn: {
    padding: '8px 20px', background: '#0ea5e9', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px',
  },
  hint: { color: '#10b981', fontSize: '13px', margin: '8px 0 0', fontWeight: 'bold' },
};`

const todoListCode = `import { memo, useRef } from 'react';

// React.memo funcționează acum — useCallback stabilizează onDelete
const TodoList = memo(function TodoList({ todos, onDelete }) {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <span style={{ fontWeight: 'bold' }}>Todo List</span>
        <span style={styles.badge}>Randări: {renderCount.current}</span>
      </div>
      <ul style={styles.list}>
        {todos.map(todo => (
          <li key={todo.id} style={styles.item}>
            {todo.text}
            <button onClick={() => onDelete(todo.id)} style={styles.deleteBtn}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TodoList;

const styles = {
  wrapper: {
    padding: '12px', background: '#ecfdf5', border: '2px solid #6ee7b7',
    borderRadius: '8px',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '8px',
  },
  badge: {
    background: '#10b981', color: 'white', padding: '2px 10px',
    borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
  },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  item: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '6px 0', borderBottom: '1px solid #a7f3d0',
  },
  deleteBtn: {
    background: 'none', border: 'none', color: '#ef4444',
    cursor: 'pointer', fontSize: '16px',
  },
};`

const files = {
  '/App.js': { code: appCode, active: true },
  '/TodoList.js': { code: todoListCode },
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="380" />
</template>
