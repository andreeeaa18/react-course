<script setup>
import LiveReactComponent from '../../../common/components/LiveReact.vue'

const code = `import React, { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '500px' }}>
      <h2>Todo List</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: '8px', fontSize: '14px' }}
        />
        <button onClick={addTodo} style={{ padding: '8px 16px' }}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ padding: '10px', background: '#f0f0f0', marginBottom: '8px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
            <span>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`
</script>

<template>
  <LiveReactComponent :code="code" :editorHeight="550" />
</template>
