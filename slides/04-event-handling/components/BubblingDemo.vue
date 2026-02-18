<script setup>
import LiveWeb from '../../../common/components/LiveWeb.vue'

const jsCode = `const log = document.getElementById('log');
const stopBtn = document.getElementById('stop-btn');
let stopProp = false;

stopBtn.addEventListener('click', function() {
  stopProp = !stopProp;
  stopBtn.textContent = stopProp
    ? 'stopPropagation: ON'
    : 'stopPropagation: OFF';
  stopBtn.style.background = stopProp ? '#22c55e' : '#94a3b8';
  addLog('--- stopPropagation ' + (stopProp ? 'activat' : 'dezactivat') + ' ---', 'sys');
});

function addLog(msg, cls) {
  const d = document.createElement('div');
  d.className = 'entry ' + cls;
  d.textContent = msg;
  log.insertBefore(d, log.firstChild);
}

document.getElementById('level-3').addEventListener('click', function(e) {
  if (stopProp) e.stopPropagation();
  addLog('3. document (cel mai general)', 'l3');
});

document.getElementById('level-2').addEventListener('click', function(e) {
  if (stopProp) e.stopPropagation();
  addLog('2. div.sectiune', 'l2');
});

document.getElementById('level-1').addEventListener('click', function(e) {
  if (stopProp) e.stopPropagation();
  addLog('1. button (sursa click-ului)', 'l1');
});

addLog('Apasa butonul galben si urmareste ordinea...', 'sys');
`

const htmlCode = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, sans-serif; }
    body { padding: 16px; background: #f8fafc; font-size: 13px; }
    .layout { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .card { background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 14px; }
    h3 { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 10px; }
    #level-3 { background: #f1f5f9; border: 2px solid #94a3b8; border-radius: 10px; padding: 12px; cursor: pointer; }
    #level-2 { background: #eff6ff; border: 2px solid #60a5fa; border-radius: 8px; padding: 10px; margin-top: 8px; cursor: pointer; }
    #level-1 { display: block; background: #f59e0b; color: white; border: none; border-radius: 6px; padding: 8px 16px; margin-top: 8px; font-weight: 700; cursor: pointer; font-size: 12px; }
    .label { font-size: 10px; font-weight: 700; color: #64748b; margin-bottom: 4px; }
    .label-blue { color: #3b82f6; }
    #stop-btn { width: 100%; padding: 8px; border: none; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; background: #94a3b8; color: white; margin-bottom: 10px; }
    .log { background: #0f172a; border-radius: 8px; padding: 10px; min-height: 100px; max-height: 140px; overflow-y: auto; }
    .entry { font-family: monospace; font-size: 11px; padding: 2px 0; border-bottom: 1px solid #1e293b; }
    .l1 { color: #fbbf24; }
    .l2 { color: #60a5fa; }
    .l3 { color: #94a3b8; }
    .sys { color: #475569; font-style: italic; }
  </style>
</head>
<body>
  <div class="layout">
    <div class="card">
      <h3>DOM - da click pe buton</h3>
      <div id="level-3">
        <div class="label">document</div>
        <div id="level-2">
          <div class="label label-blue">div.sectiune</div>
          <button id="level-1">Click aici!</button>
        </div>
      </div>
      <div style="margin-top: 12px;">
        <button id="stop-btn">stopPropagation: OFF</button>
      </div>
    </div>
    <div class="card">
      <h3>Ordinea evenimentelor</h3>
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
