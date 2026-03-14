<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

const initialTasks = [
  { id: 1, text: 'Vizitează Muzeul Kioto', done: true },
  { id: 2, text: 'Cumpără suveniruri', done: false },
  { id: 3, text: 'Plimbă-te prin Gion', done: false },
];

// nextId e în afara componentei — persistă între render-uri
let nextId = 4;

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setText] = useState('');

  // Handler 1: adaugă un task nou
  function handleAddTask() {
    if (!text.trim()) return;
    setTasks([...tasks, { id: nextId++, text, done: false }]);
    setText('');
  }

  // Handler 2: bifează / debifează un task
  function handleToggleTask(taskId) {
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, done: !t.done } : t
    ));
  }

  // Handler 3: șterge un task
  function handleDeleteTask(taskId) {
    setTasks(tasks.filter(t => t.id !== taskId));
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📋 Lista de task-uri</h2>
      <div style={styles.inputRow}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAddTask()}
          placeholder="Adaugă un task nou..."
          style={styles.input}
        />
        <button onClick={handleAddTask} style={styles.addBtn}>Adaugă</button>
      </div>
      <ul style={styles.list}>
        {tasks.map(task => (
          <li key={task.id} style={styles.item}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => handleToggleTask(task.id)}
              style={styles.checkbox}
            />
            <span style={{ ...styles.text, textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.5 : 1 }}>
              {task.text}
            </span>
            <button onClick={() => handleDeleteTask(task.id)} style={styles.deleteBtn}>✕</button>
          </li>
        ))}
      </ul>
      <p style={styles.counter}>
        {tasks.filter(t => !t.done).length} task-uri rămase
      </p>
    </div>
  );
}

const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif', maxWidth: '460px' },
  title: { fontSize: '18px', fontWeight: 'bold', marginBottom: '14px', color: '#0ea5e9' },
  inputRow: { display: 'flex', gap: '8px', marginBottom: '14px' },
  input: { flex: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', outline: 'none' },
  addBtn: { padding: '8px 16px', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  item: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', marginBottom: '8px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' },
  checkbox: { width: '16px', height: '16px', cursor: 'pointer', accentColor: '#0ea5e9' },
  text: { flex: 1, fontSize: '14px', color: '#334155' },
  deleteBtn: { padding: '3px 8px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  counter: { marginTop: '10px', fontSize: '13px', color: '#94a3b8', textAlign: 'right' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="400" />
</template>
