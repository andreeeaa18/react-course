<script setup>
import { computed } from 'vue'

const props = defineProps({
  module: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

// Development port mapping
const devPorts = {
  '01-fundamentals': 3031,
  '02-hooks': 3032,
  '03-advanced': 3033,
  '04-ecosystem': 3034
}

// Detect environment
const isDev = computed(() => {
  return import.meta.env.DEV || window.location.hostname === 'localhost'
})

// Generate correct URL based on environment
const moduleUrl = computed(() => {
  if (isDev.value) {
    const port = devPorts[props.module]
    return `http://localhost:${port}/`
  } else {
    // Production: use relative path
    return `/${props.module}/`
  }
})
</script>

<template>
  <a :href="moduleUrl" class="hub-card no-underline" target="_blank">
    <div class="hub-card-icon">{{ icon }}</div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div v-if="isDev" class="dev-badge">
      Port: {{ devPorts[module] }}
    </div>
  </a>
</template>

<style scoped>
a.no-underline {
  text-decoration: none;
  color: inherit;
}

.dev-badge {
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: rgba(97, 218, 251, 0.2);
  border-radius: 4px;
  font-size: 0.75rem;
  color: #61dafb;
  font-family: monospace;
}
</style>
