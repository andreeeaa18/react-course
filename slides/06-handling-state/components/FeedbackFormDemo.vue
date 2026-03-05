<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

function sendFeedback(text) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (text.toLowerCase().includes('eroare')) {
        reject(new Error('Serverul a returnat o eroare!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('typing'); 
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await sendFeedback(text);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleChange(e) {
    setText(e.target.value);
    setError(null); 
  }

  if (status === 'success') {
    return (
      <div style={styles.successBox}>
        <p style={styles.successText}>Mulțumim pentru feedback!</p>
        <button
          onClick={() => { setStatus('typing'); setText(''); }}
          style={styles.resetButton}
        >
          Trimite alt feedback
        </button>
      </div>
    );
  }

  const isDisabled = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>
        Cum a fost experiența ta?
      </label>
      <textarea
        value={text}
        onChange={handleChange}
        disabled={isDisabled}
        placeholder="Scrie feedback-ul tău aici... (scrie 'eroare' pentru a simula o eroare)"
        style={{...styles.textarea, opacity: isDisabled ? 0.6 : 1}}
      />
      <button
        type="submit"
        disabled={text.length === 0 || isDisabled}
        style={{
          ...styles.button,
          opacity: (text.length === 0 || isDisabled) ? 0.5 : 1
        }}
      >
        {isDisabled ? 'Se trimite...' : 'Trimite feedback'}
      </button>
      {error && <p style={styles.error}>{error.message}</p>}
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
    maxWidth: '400px'
  },
  label: {
    fontWeight: 'bold',
    fontSize: '16px'
  },
  textarea: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    minHeight: '80px',
    fontSize: '14px',
    resize: 'vertical'
  },
  button: {
    padding: '10px 20px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  error: {
    color: '#dc2626',
    margin: 0,
    padding: '8px 12px',
    background: '#fef2f2',
    borderRadius: '6px',
    fontSize: '14px'
  },
  successBox: {
    padding: '24px',
    textAlign: 'center'
  },
  successText: {
    color: '#16a34a',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  resetButton: {
    padding: '8px 16px',
    background: '#e2e8f0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="420" />
</template>
