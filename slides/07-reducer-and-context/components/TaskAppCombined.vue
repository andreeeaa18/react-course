<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const files = {
  '/TasksContext.js': {
    code: `import { createContext, useContext, useReducer } from 'react';

// ── 1. Cele două contexte ─────────────────────────────────
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

// ── 2. Reducer-ul ─────────────────────────────────────────
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added':
      return [...tasks, { id: action.id, text: action.text, done: false }];
    case 'toggled':
      return tasks.map(t =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );
    case 'deleted':
      return tasks.filter(t => t.id !== action.id);
    default:
      throw Error('Acțiune necunoscută: ' + action.type);
  }
}

const initialTasks = [
  { id: 1, text: 'Vizitează Muzeul Kioto', done: true },
  { id: 2, text: 'Cumpără suveniruri', done: false },
];

// ── 3. Provider-ul ────────────────────────────────────────
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

// ── 4. Custom hooks ───────────────────────────────────────
export function useTasks() {
  return useContext(TasksContext);
}
export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}`,
    active: true,
  },
  '/App.js': {
    code: `import { TasksProvider } from './TasksContext';
import AddTask from './AddTask';
import TaskList from './TaskList';

export default function App() {
  return (
    <TasksProvider>
      <div style={styles.container}>
        <h2 style={styles.title}>📋 Lista de task-uri</h2>
        <AddTask />
        <TaskList />
      </div>
    </TasksProvider>
  );
}

const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif', maxWidth: '420px' },
  title: { fontSize: '18px', fontWeight: 'bold', marginBottom: '14px', color: '#0f172a' },
};`,
  },
  '/AddTask.js': {
    code: `import { useState } from 'react';
import { useTasksDispatch } from './TasksContext';

let nextId = 3;

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch(); // ← nu primește props

  function handleAdd() {
    if (!text.trim()) return;
    dispatch({ type: 'added', id: nextId++, text });
    setText('');
  }

  return (
    <div style={styles.row}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
        placeholder="Adaugă un task..."
        style={styles.input}
      />
      <button onClick={handleAdd} style={styles.btn}>Adaugă</button>
    </div>
  );
}

const styles = {
  row: { display: 'flex', gap: '8px', marginBottom: '14px' },
  input: { flex: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' },
  btn: { padding: '8px 16px', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
};`,
  },
  '/TaskList.js': {
    code: `import { useTasks, useTasksDispatch } from './TasksContext';

export default function TaskList() {
  const tasks = useTasks();           // ← citește state-ul
  const dispatch = useTasksDispatch(); // ← trimite acțiuni

  return (
    <ul style={styles.list}>
      {tasks.map(task => (
        <li key={task.id} style={styles.item}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => dispatch({ type: 'toggled', id: task.id })}
            style={styles.checkbox}
          />
          <span style={{ ...styles.text, textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.5 : 1 }}>
            {task.text}
          </span>
          <button onClick={() => dispatch({ type: 'deleted', id: task.id })} style={styles.del}>✕</button>
        </li>
      ))}
    </ul>
  );
}

const styles = {
  list: { listStyle: 'none', padding: 0, margin: 0 },
  item: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', marginBottom: '8px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' },
  checkbox: { width: '16px', height: '16px', cursor: 'pointer', accentColor: '#0ea5e9' },
  text: { flex: 1, fontSize: '14px', color: '#334155' },
  del: { padding: '3px 8px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
};`,
  },
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :editorHeight="440" />
</template>
