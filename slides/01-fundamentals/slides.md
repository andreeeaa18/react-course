---
theme: neversink
title: React Fundamentals
info: Module 1 - React Fundamentals
transition: slide-left
mdc: true
layout: cover
---

# Module 1: React Fundamentals

Learn the core concepts of React

<div class="abs-br m-6 opacity-50 text-sm">
  <a href="/">← Back to Hub</a>
</div>

---
layout: default
---

# What is React?

React is a **JavaScript library** for building user interfaces.

<v-clicks>

- 🎯 **Component-Based** - Build encapsulated components
- 🔄 **Declarative** - Design simple views for each state
- 📚 **Learn Once, Write Anywhere** - Develop for web, mobile, and more

</v-clicks>

<v-click>

## Key Philosophy

React lets you compose complex UIs from small, isolated pieces of code called **components**.

</v-click>

---
layout: two-cols
---

# Your First Component

Components are the building blocks of React applications.

A component is a JavaScript function that returns JSX (markup).

::right::

```jsx
function Welcome() {
  return <h1>Hello, React!</h1>
}
```

<v-click>

**Key Points:**
- Component names start with capital letter
- Returns JSX (looks like HTML)
- Can be reused throughout your app

</v-click>

---
layout: default
---

# Live Demo: Hello World

<HelloWorld />

---
layout: default
---

# Props: Passing Data to Components

Props (short for "properties") let you pass data from parent to child components.

<PropsDemo />

---
layout: default
---

# JSX: JavaScript + XML

JSX is a syntax extension that lets you write HTML-like code in JavaScript.

<div class="grid grid-cols-2 gap-4">

<div>

## JSX
```jsx
const element = (
  <h1 className="greeting">
    Hello, {name}!
  </h1>
);
```

</div>

<div>

## Compiles to JavaScript
```js
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, ',
  name,
  '!'
);
```

</div>

</div>

<v-click>

**Important JSX Rules:**
- Use `className` instead of `class`
- Use `{}` to embed JavaScript expressions
- Components must return a single root element
- Self-closing tags must end with `/>`

</v-click>

---
layout: default
---

# Live Demo: Interactive Counter

Let's build a simple counter with state.

<CounterDemo />

---
layout: center
class: text-center
---

# Key Takeaways

<v-clicks>

- ✅ React components are JavaScript functions that return JSX
- ✅ Props allow you to pass data to components
- ✅ JSX combines markup with JavaScript logic
- ✅ State (`useState`) makes components interactive

</v-clicks>

<v-click>

## Next Steps

Continue to [Module 2: Hooks](/02-hooks/) to learn more about React Hooks!

</v-click>

<div class="abs-br m-6 opacity-50 text-sm">
  <a href="/">← Back to Hub</a>
</div>

---
layout: end
---

# Module 1 Complete! 🎉

<div class="abs-br m-6 opacity-50 text-sm">
  <a href="/">← Back to Hub</a> | <a href="/02-hooks/">Next: Hooks →</a>
</div>
