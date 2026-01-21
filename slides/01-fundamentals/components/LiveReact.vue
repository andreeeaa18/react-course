<!-- Local import of shared LiveReact component -->
<script setup>
import LiveReactComponent from '../../../common/components/LiveReact.vue'

// Re-export props
const props = defineProps({
  code: String,
  dependencies: Object,
  theme: String,
  editorHeight: [String, Number],
  showLineNumbers: Boolean,
  showInlineErrors: Boolean,
  showTabs: Boolean,
  showNavigator: Boolean
})
</script>

<template>
  <LiveReactComponent v-bind="props" />
</template>
