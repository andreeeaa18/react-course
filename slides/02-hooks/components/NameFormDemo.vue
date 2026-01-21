<script setup>
import LiveReactComponent from '../../../common/components/LiveReact.vue'

const code = `import React, { useState } from 'react';

export default function NameForm() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h2>What is your name?</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '8px', fontSize: '16px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', fontSize: '16px' }}>
            Submit
          </button>
        </form>
      ) : (
        <div>
          <h2>Hello, {name}! 👋</h2>
          <button onClick={() => setSubmitted(false)} style={{ padding: '8px 16px' }}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}`
</script>

<template>
  <LiveReactComponent :code="code" :editorHeight="500" />
</template>
