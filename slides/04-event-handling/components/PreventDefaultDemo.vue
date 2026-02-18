<script setup>
import LiveWeb from '../../../common/components/LiveWeb.vue'

const jsCode = `const form = document.getElementById('form');
const toggle = document.getElementById('toggle');
const result = document.getElementById('result');
const linkTest = document.getElementById('link-test');
let prevent = true;

toggle.addEventListener('click', function() {
  prevent = !prevent;
  toggle.textContent = prevent
    ? 'preventDefault: ON'
    : 'preventDefault: OFF (pagina se reincarca!)';
  toggle.style.background = prevent ? '#22c55e' : '#ef4444';
  showResult('--- preventDefault ' + (prevent ? 'activat' : 'dezactivat') + ' ---', '#64748b');
});

form.addEventListener('submit', function(e) {
  if (prevent) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    showResult('Formular trimis via JS: ' + name + ' (' + email + ')', '#22c55e');
  }
  // daca prevent=false, browser-ul va face reload
});

linkTest.addEventListener('click', function(e) {
  if(prevent){
    e.preventDefault();
    showResult('Link interceptat - navigarea a fost oprita!', '#f59e0b');
  }
});

function showResult(msg, color) {
  result.textContent = msg;
  result.style.color = color;
  result.style.display = 'block';
}
`

const htmlCode = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, sans-serif; }
    body { padding: 16px; background: #f8fafc; font-size: 13px; }
    .card { background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
    h3 { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 10px; }
    label { display: block; font-size: 11px; font-weight: 600; color: #374151; margin-bottom: 4px; }
    input { width: 100%; border: 2px solid #e2e8f0; border-radius: 6px; padding: 7px 10px; font-size: 12px; margin-bottom: 8px; outline: none; }
    input:focus { border-color: #6366f1; }
    .btn-submit { background: #6366f1; color: white; border: none; padding: 8px 20px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; }
    #toggle { width: 100%; padding: 9px; border: none; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; background: #22c55e; color: white; margin-bottom: 10px; }
    #result { display: none; font-weight: 700; font-size: 12px; margin-top: 8px; padding: 8px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; }
    a { color: #6366f1; font-size: 12px; text-decoration: underline; cursor: pointer; display: inline-block; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <button id="toggle">preventDefault: ON</button>
    <h3>Formular de contact</h3>
    <form id="form">
      <label>Nume</label>
      <input id="name" type="text" placeholder="Ion Popescu" value="Ion Popescu">
      <label>Email</label>
      <input id="email" type="email" placeholder="ion@example.com" value="ion@example.com">
      <button class="btn-submit" type="submit">Trimite</button>
    </form>
    <div id="result"></div>
    <br>
    <a id="link-test" href="https://google.com">Link catre Google (interceptat)</a>
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
  <LiveWeb :files="files" :editorHeight="340" :showTabs="false" :showFileExplorer="false"
    :options="{ activeFile: '/index.js' }" />
</template>
