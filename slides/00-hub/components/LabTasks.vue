<script setup lang="ts">
import CardContainer from '../../../common/components/CardContainer.vue'
import InfoCard from '../../../common/components/InfoCard.vue'

const labs = [
  {
    title: 'Lab 1 - Crafting Game',
    url: 'https://github.com/cristi-usm/lab1-react-native'
  },
  {
    title: 'Lab 2 - Clasament',
    url: 'https://github.com/cristi-usm/lab2-react-native'
  },
  {
    title: 'Laborator 3',
    url: 'https://github.com/user/repo/link-to-lab3'
  },
  {
    title: 'Laborator 4',
    url: 'https://github.com/user/repo/link-to-lab4'
  }
]
</script>

<template>
  <CardContainer layout="grid-2" gap="25px" style="width: 90%; margin: 2rem auto 0;">
    <InfoCard
      v-for="lab in labs"
      :key="lab.title"
      class="lab-task-card"
    >
      <p class="lab-task-title">{{ lab.title }}</p>
      <a :href="lab.url" target="_blank" class="lab-task-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
        Vezi Sarcini
      </a>
    </InfoCard>
  </CardContainer>
</template>

<style scoped>
.lab-task-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.lab-task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.lab-task-title {
  font-size: 1.5em;
  font-weight: 600;
  color: var(--neversink-highlight-color);
  margin-bottom: 15px;
}

.lab-task-link {
  display: inline-flex;
  align-items: center;
  background-color: var(--neversink-bg-code-color);
  color: var(--neversink-fg-code-color);
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.lab-task-link:hover {
  opacity: 0.8;
}

.lab-task-link svg {
  margin-right: 8px;
}

:deep(.info-card-icon) {
  display: none;
}

:deep(.info-card-title) {
  display: none;
}
</style>
