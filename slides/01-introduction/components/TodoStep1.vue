<script setup>
import LiveWeb from '../../../common/components/LiveWeb.vue'

const files = {
  '/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo List</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div id="app">
    <h1>📝 My Todo List</h1>
    <div class="input-container">
      <input type="text" id="todoInput" placeholder="Add a new task...">
      <button id="addBtn">Add</button>
    </div>
    <ul id="todoList"></ul>
  </div>
  <script src="/script.js"><` + `/script>
</body>
</html>`,
  '/script.js': `// JavaScript code will go here
console.log('Todo app loaded!');`,
  '/styles.css': {
    code: `body {
  font-family: system-ui, -apple-system, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 20px;
}

#app {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  min-width: 300px;
}

h1 {
  margin: 0 0 1.5rem 0;
  color: #333;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
}

input {
  flex: 1;
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

button {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  background: #5568d3;
}

#todoList {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 8px;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #888;
}

.todo-text {
  flex: 1;
}

.delete-btn {
  background: #e74c3c;
  padding: 6px 12px;
  font-size: 12px;
}

.delete-btn:hover {
  background: #c0392b;
}`,
    hidden: true
  }
}
</script>

<template>
  <LiveWeb :files="files" :editorHeight="350" :options="{ activeFile: '/script.js' }" :showFileExplorer="false" />
</template>
