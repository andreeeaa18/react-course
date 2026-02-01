---
theme: neversink
title: React Hooks
info: Module 2 - React Hooks
transition: slide-left
mdc: true
layout: cover
---

# Module 2: React Hooks

Master useState, useEffect, and Custom Hooks

<div class="abs-br m-6 opacity-50 text-sm">
  <a href="../">← Back to Hub</a>
</div>

---
layout: default
---

# What are Hooks?

Hooks are functions that let you "hook into" React features from function components.

<v-clicks>

- 🪝 **useState** - Add state to components
- 🔄 **useEffect** - Perform side effects
- 🎯 **useContext** - Access context values
- 🛠️ **Custom Hooks** - Reuse stateful logic

</v-clicks>

<v-click>

## Rules of Hooks

1. Only call hooks at the **top level** (not in loops, conditions, or nested functions)
2. Only call hooks from **React function components** or custom hooks

</v-click>

---
layout: default
---

# useState: Managing State

`useState` returns a state value and a function to update it.

<NameFormDemo />

---
layout: default
---

# useEffect: Side Effects

`useEffect` runs after render and can handle side effects like data fetching, subscriptions, or DOM updates.

<TimerDemo />

---
layout: default
---

# useEffect Dependencies

The dependency array controls when the effect runs.

<div class="grid grid-cols-2 gap-4">

<div>

## No Dependencies
```jsx
useEffect(() => {
  // Runs after every render
});
```

</div>

<div>

## Empty Array
```jsx
useEffect(() => {
  // Runs once on mount
}, []);
```

</div>

<div>

## With Dependencies
```jsx
useEffect(() => {
  // Runs when count changes
}, [count]);
```

</div>

<div>

## With Cleanup
```jsx
useEffect(() => {
  const id = setInterval(() => {}, 1000);
  return () => clearInterval(id);
}, []);
```

</div>

</div>

---
layout: default
---

# Custom Hooks: Reusable Logic

Create your own hooks to extract and reuse component logic.

<WindowWidthDemo />

---
layout: default
---

# Multiple State Variables

You can use `useState` multiple times in a single component.

<TodoListDemo />

---
layout: center
class: text-center
---

# Key Takeaways

<v-clicks>

- ✅ `useState` manages component state
- ✅ `useEffect` handles side effects and lifecycle
- ✅ Dependency arrays control when effects run
- ✅ Custom hooks extract reusable logic

</v-clicks>

<v-click>

## Next Steps

Continue to Module 3: Advanced Patterns to learn about performance optimization!

</v-click>

<div class="abs-br m-6 opacity-50 text-sm">
  <a href="../">← Back to Hub</a>
</div>

---
layout: end
---

# Module 2 Complete! 🎉

<div class="abs-br m-6 opacity-50 text-sm">
  <a href="../">← Back to Hub</a> | <a href="../01-introduction/">← Previous</a>
</div>
