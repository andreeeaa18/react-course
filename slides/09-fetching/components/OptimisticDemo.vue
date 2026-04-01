<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `import { useState } from 'react';

// Simulam un API lent (1.5s delay)
async function fakeToggleLike(postId, liked) {
  await new Promise(r => setTimeout(r, 1500));
  // 20% sansa de eroare
  if (Math.random() < 0.2) throw new Error("Server error!");
  return { postId, liked };
}

export default function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Introducere in React", likes: 12, liked: false },
    { id: 2, title: "Hooks sunt amazing", likes: 34, liked: true },
    { id: 3, title: "Fetch API in React", likes: 7, liked: false },
  ]);

  async function handleLike(postId) {
    const post = posts.find(p => p.id === postId);
    const newLiked = !post.liked;

    // 1. Actualizare OPTIMISTA — instant in UI
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, liked: newLiked, likes: p.likes + (newLiked ? 1 : -1) }
        : p
    ));

    try {
      // 2. Trimitem la server (lent!)
      await fakeToggleLike(postId, newLiked);
      console.log("Server confirmat pentru post " + postId);
    } catch (err) {
      // 3. ROLLBACK la starea anterioara daca serverul esueaza
      console.log("Eroare! Rollback post " + postId);
      setPosts(prev => prev.map(p =>
        p.id === postId
          ? { ...p, liked: !newLiked, likes: p.likes + (newLiked ? -1 : 1) }
          : p
      ));
    }
  }

  return (
    <div style={styles.container}>
      <p style={styles.hint}>Click pe heart — UI-ul reactioneaza instant. 20% sansa de rollback!</p>
      {posts.map(post => (
        <div key={post.id} style={styles.card}>
          <div>
            <strong>{post.title}</strong>
            <span style={styles.count}> ({post.likes} likes)</span>
          </div>
          <button onClick={() => handleLike(post.id)} style={styles.btn}>
            {post.liked ? "❤️" : "🤍"}
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: '16px', fontFamily: 'system-ui' },
  hint: { color: '#64748b', fontSize: '13px', marginBottom: '12px' },
  card: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0',
    marginBottom: '8px',
  },
  count: { color: '#64748b', fontSize: '14px' },
  btn: {
    background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer',
  },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" />
</template>
