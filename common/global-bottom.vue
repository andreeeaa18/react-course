<script setup>
import { onMounted, ref, computed } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $slidev, $frontmatter } = useSlideContext()

const fg_default = 'text-neutral-800'
const bg_default = 'bg-neutral-100'
const label = ref('')
const fg = ref(fg_default)
const bg = ref(bg_default)

// Detect if we're in the hub or a module
const isHub = computed(() => {
  if (typeof window === 'undefined') return true
  const path = window.location.pathname
  // Check if we're at the root or react-course root (hub)
  return path === '/' || path.match(/\/react-course\/?$/)
})

// Hub URL for navigation - go to slide 10 (Cursuri page)
const hubUrl = computed(() => {
  if (isHub.value) return null // Don't show link in hub
  if (typeof window === 'undefined') return '#'

  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  return isDev ? 'http://localhost:3030/2' : '../2'
})

function process_colors() {
  if ($frontmatter.color) {
    if ($frontmatter.color == 'black') {
      fg.value = `text-gray-600`
      bg.value = `bg-gray-100`
    } else if ($frontmatter.color == 'white') {
      fg.value = fg_default
      bg.value = bg_default
    } else if ($frontmatter.color == 'dark') {
      fg.value = `text-gray-100`
      bg.value = `bg-gray-500`
    } else if ($frontmatter.color == 'navy') {
      fg.value = `text-gray-300`
      bg.value = `bg-gray-600`
    } else if ($frontmatter.color == 'light') {
      fg.value = `text-neutral-600`
      bg.value = `bg-neutral-300`
    } else if ($frontmatter.color.includes('-light')) {
      const parts = $frontmatter.color.split('-')
      fg.value = `text-${parts[0]}-100`
      bg.value = `bg-${parts[0]}-500`
    } else {
      fg.value = `text-${$frontmatter.color}-500`
      bg.value = `bg-${$frontmatter.color}-100`
    }
  }
}

function checkvars() {
  if ($frontmatter.slide_info_color === undefined) {
    fg.value = fg_default
    bg.value = bg_default
  }

  if ($frontmatter.slide_info_color && $frontmatter.slide_info_color.includes(',')) {
    const parts = $frontmatter.slide_info.split(',')
    fg.value = parts[0]
    bg.value = parts[1]
  } else {
    if ($frontmatter.layout == 'end') {
      fg.value = `text-neutral-100`
      bg.value = `bg-neutral-800`
    } else if ($frontmatter.layout == 'side-title') {
      if ($frontmatter.side && ($frontmatter.side == 'right' || $frontmatter.side == 'r')) {
        process_colors()
      } else {
        fg.value = fg_default
        bg.value = bg_default
      }
    } else if (
      $frontmatter.layout == 'cover' ||
      $frontmatter.layout == 'intro' ||
      $frontmatter.layout == 'default' ||
      $frontmatter.layout == 'section' ||
      $frontmatter.layout == 'credits' ||
      $frontmatter.layout == 'full'
    ) {
      process_colors()
    }
  }
}

function getlabel() {
  if ($frontmatter.neversink_slug) {
    label.value = $frontmatter.neversink_slug
  } else if ($slidev.configs.neversink_slug) {
    label.value = $slidev.configs.neversink_slug
  } else {
    label.value = ''
  }
}

onMounted(() => {
  getlabel()
  checkvars()
})
</script>

<template>
  <footer v-if="$frontmatter.slide_info !== false" class="absolute bottom-1 right-1 left-0 p-2 pr-3 full-width z-10">
    <div class="absolute bottom-0 right-0 p-2 pr-2">
      <a v-if="hubUrl" :href="hubUrl" class="slide-counter-link" title="Back to Cursuri (Slide 10)">
        <span class="pl-3 pr-3 p-2 font-mono font-size-2" :class="fg + ' ' + bg">
          <mdi-orbit />&nbsp;<span class="fw-bold">{{ label }}</span> | {{ $slidev.nav.currentPage }} of
          {{ $slidev.nav.total }}
        </span>
      </a>
      <span v-else class="pl-3 pr-3 p-2 font-mono font-size-2" :class="fg + ' ' + bg">
        <mdi-orbit />&nbsp;<span class="fw-bold">{{ label }}</span> | {{ $slidev.nav.currentPage }} of
        {{ $slidev.nav.total }}
      </span>
    </div>
  </footer>
</template>

<style scoped>
.slide-counter-link {
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
}

.slide-counter-link:hover {
  opacity: 0.8;
}
</style>
