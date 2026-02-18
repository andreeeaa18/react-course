<script setup>
import LiveWeb from '../../../common/components/LiveWeb.vue'

const jsCode = `const mainBtn = document.getElementById('main-btn');
const addBtn = document.getElementById('add-btn');
const removeBtn = document.getElementById('remove-btn');
const onceBtn = document.getElementById('once-btn');
const log = document.getElementById('log');
const counter = document.getElementById('counter');

let totalClicks = 0;
let dinamicCount = 0;

function addLogEntry(text, colorClass) {
  const entry = document.createElement('div');
  entry.className = 'entry ' + colorClass;
  entry.textContent = text;
  log.insertBefore(entry, log.firstChild);
}

function updateCounter() {
  totalClicks++;
  counter.textContent = 'Total click-uri: ' + totalClicks;
}

// Listener 1: permanent
function listener1() {
  updateCounter();
  addLogEntry('Listener 1 (permanent): click #' + totalClicks, 'l1');
}

// Listener 2: poate fi adaugat / eliminat
function listener2() {
  addLogEntry('Listener 2 (dinamic #' + dinamicCount + '): activ!', 'l2');
}

mainBtn.addEventListener('click', listener1);
addLogEntry('Listener 1 atasat la start', 'sys');

addBtn.addEventListener('click', function() {
  dinamicCount++;
  mainBtn.addEventListener('click', listener2);
  addLogEntry('+ Listener 2 adaugat', 'sys');
});

removeBtn.addEventListener('click', function() {
  mainBtn.removeEventListener('click', listener2);
  addLogEntry('- Listener 2 eliminat', 'sys');
});

onceBtn.addEventListener('click', function() {
  addLogEntry('Listener once: rulat o singura data!', 'l3');
  addLogEntry('Listener once s-a auto-eliminat', 'sys');
}, { once: true });

addLogEntry('Listener once atasat - apasa butonul violet!', 'sys');
`

const htmlCode = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, sans-serif; }
    body { padding: 16px; background: #f8fafc; font-size: 13px; }
    h2 { font-size: 14px; font-weight: 800; color: #334155; margin-bottom: 12px; }
    .layout { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .card { background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 14px; }
    .card h3 { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 10px; }
    .btn-row { display: flex; gap: 8px; margin-bottom: 10px; }
    button { flex: 1; padding: 9px 0; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; cursor: pointer; }
    #main-btn { background: #f59e0b; color: white; }
    #add-btn { background: #22c55e; color: white; }
    #remove-btn { background: #ef4444; color: white; }
    #once-btn { background: #8b5cf6; color: white; width: 100%; margin-bottom: 8px; padding: 9px; }
    .log { background: #0f172a; border-radius: 8px; padding: 10px; min-height: 120px; max-height: 160px; overflow-y: auto; }
    .entry { font-family: monospace; font-size: 11px; padding: 2px 0; border-bottom: 1px solid #1e293b; }
    .l1 { color: #fbbf24; }
    .l2 { color: #34d399; }
    .l3 { color: #a78bfa; }
    .sys { color: #64748b; font-style: italic; }
    .counter { font-size: 20px; font-weight: 900; color: #f59e0b; text-align: center; padding: 8px; }
  </style>
</head>
<body>
  <h2>addEventListener - Mai multi listeneri pe acelasi element</h2>
  <div class="layout">
    <div class="card">
      <h3>Buton principal</h3>
      <div class="btn-row">
        <button id="main-btn">Click!</button>
      </div>
      <div class="btn-row">
        <button id="add-btn">+ Adauga listener</button>
        <button id="remove-btn">- Elimina listener</button>
      </div>
      <button id="once-btn">Listener once: true</button>
      <div class="counter" id="counter">Total click-uri: 0</div>
    </div>
    <div class="card">
      <h3>Log events</h3>
      <div class="log" id="log"></div>
    </div>
  </div>
  <script src="/index.js"><` + `/script>
</body>
</html>`

const files = {
  '/index.js': { code: jsCode, active: true },
  '/index.html': { code: htmlCode, hidden: true },
}
</script>

<template>
  <LiveWeb :files="files" :editorHeight="340" :showTabs="false" :showFileExplorer="false" :options="{ activeFile: '/index.js' }" />
</template>
