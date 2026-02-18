<script setup>
import LiveWeb from '../../../common/components/LiveWeb.vue'

const jsCode = `const btn = document.getElementById('btn');
const hoverArea = document.getElementById('hover-area');
const inp = document.getElementById('inp');
const clickLog = document.getElementById('click-log');
const keyLog = document.getElementById('key-log');

function showProps(logEl, pairs) {
  logEl.textContent = '';
  const row = document.createElement('div');
  row.className = 'row';
  pairs.forEach(function(pair) {
    const chip = document.createElement('span');
    chip.className = 'chip';
    const k = document.createElement('span');
    k.className = 'chip-key';
    k.textContent = pair[0] + ': ';
    const v = document.createElement('span');
    v.className = 'chip-val';
    v.textContent = String(pair[1]);
    chip.appendChild(k);
    chip.appendChild(v);
    row.appendChild(chip);
  });
  logEl.appendChild(row);
}

function setPlaceholder(logEl, msg) {
  const p = document.createElement('span');
  p.className = 'placeholder';
  p.textContent = msg;
  logEl.appendChild(p);
}

setPlaceholder(clickLog, 'Apasa butonul sau misca mouse-ul...');
setPlaceholder(keyLog, 'Focuseaza input-ul si tasteaza...');

btn.addEventListener('click', function(e) {
  showProps(clickLog, [
    ['type', e.type],
    ['target', e.target.tagName.toLowerCase()],
    ['clientX', e.clientX],
    ['clientY', e.clientY],
    ['button', e.button],
  ]);
});

hoverArea.addEventListener('mousemove', function(e) {
  hoverArea.textContent = 'clientX: ' + e.clientX + '  clientY: ' + e.clientY;
  showProps(clickLog, [
    ['type', e.type],
    ['clientX', e.clientX],
    ['clientY', e.clientY],
  ]);
});

inp.addEventListener('keydown', function(e) {
  showProps(keyLog, [
    ['key', e.key],
    ['code', e.code],
    ['shift', e.shiftKey],
    ['ctrl', e.ctrlKey],
    ['alt', e.altKey],
  ]);
});

inp.addEventListener('input', function(e) {
  const old = keyLog.querySelector('.val-row');
  if (old) keyLog.removeChild(old);
  const valRow = document.createElement('div');
  valRow.className = 'row val-row';
  const chip = document.createElement('span');
  chip.className = 'chip';
  const k = document.createElement('span');
  k.className = 'chip-key';
  k.textContent = 'target.value: ';
  const v = document.createElement('span');
  v.className = 'chip-val';
  v.textContent = e.target.value;
  chip.appendChild(k);
  chip.appendChild(v);
  valRow.appendChild(chip);
  keyLog.appendChild(valRow);
});
`

const htmlCode = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, sans-serif; }
    body { padding: 16px; background: #f8fafc; }
    h2 { font-size: 14px; font-weight: 800; color: #334155; margin-bottom: 12px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .card { background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 14px; }
    .card h3 { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 10px; }
    button { background: #f59e0b; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; width: 100%; margin-bottom: 8px; }
    input { width: 100%; border: 2px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; font-size: 13px; margin-bottom: 8px; outline: none; }
    .log { background: #1e293b; color: #94a3b8; border-radius: 8px; padding: 10px; font-size: 11px; font-family: monospace; min-height: 80px; max-height: 120px; overflow-y: auto; }
    .row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 4px; }
    .chip { background: #1e3a5f; border-radius: 4px; padding: 2px 6px; }
    .chip-key { color: #7dd3fc; }
    .chip-val { color: #86efac; }
    .hover-area { background: #fef3c7; border: 2px dashed #f59e0b; border-radius: 8px; padding: 12px; text-align: center; font-size: 12px; color: #92400e; cursor: crosshair; margin-bottom: 8px; }
    .placeholder { color: #475569; font-style: italic; }
  </style>
</head>
<body>
  <h2>Exploreaza Obiectul Event</h2>
  <div class="grid">
    <div class="card">
      <h3>Click / Mouse</h3>
      <button id="btn">Apasa-ma!</button>
      <div class="hover-area" id="hover-area">Misca mouse-ul aici</div>
      <div class="log" id="click-log"></div>
    </div>
    <div class="card">
      <h3>Keyboard / Input</h3>
      <input id="inp" placeholder="Tasteaza ceva...">
      <div class="log" id="key-log"></div>
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
