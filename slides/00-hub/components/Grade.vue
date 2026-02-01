<script setup lang="ts">
import { inject } from 'vue'
import type { THEME_CONFIG } from '../../../common/theme/config'

const themeConfig = inject<typeof THEME_CONFIG>('themeConfig')
</script>

<template>
  <div class="grade-container" :class="themeConfig?.scheme">
    <div class="grade-box coursework">
      <p class="grade-title">60%</p>
      <p class="grade-subtitle">Activitate Semestrială</p>
      <div class="coursework-details">
        <div class="detail-item">Atestare 1 <span>25%</span></div>
        <div class="detail-item">Atestare 2 <span>25%</span></div>
        <div class="detail-item">Laboratoare <span>25%</span></div>
        <div class="detail-item">LI: Proiect <span>25%</span></div>
      </div>
    </div>

    <div class="grade-box exam">
      <p class="grade-title">40%</p>
      <p class="grade-subtitle">Examen Final</p>
    </div>
  </div>
</template>

<style>
.grade-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  width: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--neversink-fg-color);
}

.grade-box {
  background-color: var(--neversink-admon-bg-color);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--neversink-admon-border-color);
}

.grade-box.coursework {
  flex-basis: 65%;
}

.grade-box.exam {
  flex-basis: 35%;
  justify-content: center;
}

.grade-title {
  font-size: 3.2em;
  font-weight: 600;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--neversink-border-color);
  color: var(--neversink-highlight-color);
}

.grade-subtitle {
  font-size: 1.3em;
  margin-top: 10px;
  margin-bottom: 15px;
  opacity: 0.9;
}

.coursework-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  flex-grow: 1;
}

.detail-item {
  background-color: var(--neversink-bg-color);
  padding: 15px;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--neversink-admon-text-color);
}

.detail-item span {
  display: block;
  font-weight: bold;
  font-size: 1.5em;
  margin-top: 5px;
  color: var(--neversink-fg-code-color);
}
</style>