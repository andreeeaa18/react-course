<template>
<LiveWeb code="// 1. Callback (exemplu conceptual)
function fetchData(callback) {
  setTimeout(() => { // Simulăm o cerere de rețea
    callback('Date primite!');
  }, 1000);
}
fetchData(data => console.log('Callback:', data));

// 2. Promise (exemplu cu fetch, API de browser)
// Folosim un API public de test
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json()) 
  .then(data => console.log('Promise:', data.title))
  .catch(error => console.error('Eroare:', error));

// 3. Async/Await (cea mai modernă și lizibilă abordare)
async function getData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/2');
    const data = await response.json();
    console.log('Async/Await:', data.title);
  } catch (error) {
    console.error('Eroare:', error);
  }
}
getData();

console.log('Acest mesaj apare primul, fără a aștepta operațiunile asincrone!');" consoleOnly editorHeight="500px" />
</template>
