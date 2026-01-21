<template>
  <div class="sandbox-container" @keydown.stop @keyup.stop @keypress.stop>
    <SandpackProvider :template="template" :files="files" :custom-setup="customSetup" :theme="theme">
      <SandpackLayout>
        <SandpackFileExplorer />
        <SandpackCodeEditor :extensions="extensions" :extensionsKeymap="extensionsKeymap"
          :showLineNumbers="sandpackOptions.showLineNumbers" :showInlineErrors="sandpackOptions.showInlineErrors"
          :wrapContent="sandpackOptions.wrapContent" :editorHeight="sandpackOptions.editorHeight"
          :showTabs="sandpackOptions.showTabs" :closableTabs="sandpackOptions.closableTabs" />
        <SandpackPreview :showNavigator="sandpackOptions.showNavigator" />
      </SandpackLayout>
    </SandpackProvider>
  </div>
</template>

<script setup>
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer } from 'sandpack-vue3';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { computed } from 'vue';

const props = defineProps({
  code: {
    type: String,
    default: `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h4>Interactive React Demo</h4>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`
  },
  dependencies: {
    type: Object,
    default: () => ({})
  },
  theme: {
    type: String,
    default: 'dark'
  },
  editorHeight: {
    type: [String, Number],
    default: '800px'
  },
  showLineNumbers: {
    type: Boolean,
    default: true
  },
  showInlineErrors: {
    type: Boolean,
    default: true
  },
  showTabs: {
    type: Boolean,
    default: false
  },
  showNavigator: {
    type: Boolean,
    default: false
  }
});

const template = 'react';

const files = computed(() => ({
  '/App.js': props.code,
}));

const customSetup = computed(() => ({
  dependencies: {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    ...props.dependencies
  }
}));

const sandpackOptions = computed(() => ({
  showLineNumbers: props.showLineNumbers,
  showInlineErrors: props.showInlineErrors,
  wrapContent: true,
  editorHeight: typeof props.editorHeight === 'number' ? `${props.editorHeight}px` : props.editorHeight,
  showTabs: props.showTabs,
  showNavigator: props.showNavigator,
  closableTabs: props.showTabs
}));

const extensions = [autocompletion()];
const extensionsKeymap = [completionKeymap];
</script>

<style scoped>
.sandbox-container {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
}

/* Ensure proper sizing in slides */
.sandbox-container :deep(.sp-wrapper) {
  min-height: 700px;
}
</style>
