<script setup lang="ts">
import CardContainer from '../../../common/components/CardContainer.vue'
import InfoCard from '../../../common/components/InfoCard.vue'
</script>

<template>
  <CardContainer layout="grid-3" gap="25px">
    <InfoCard icon="💡" title="1. Rezolvare">
      <p>Rezolvați individual sarcinile de laborator propuse.</p>
    </InfoCard>

    <InfoCard icon="🚀" title="2. Pull Request">
      <p>Trimiteți soluția ca un <strong>Pull Request (PR)</strong> pe GitHub înainte de termenul limită.</p>
      <div class="feedback-note">Includeți la dorință în fiecare PR solicitare de <strong>feedback</strong>.</div>
    </InfoCard>

    <InfoCard icon="💬" title="3. Susținere">
      <p>După închiderea PR-ului, veți susține lucrarea și veți răspunde la întrebări în timpul orelor.</p>
    </InfoCard>
  </CardContainer>
</template>

<style scoped>
:deep(.info-card-title) {
  font-size: 1.5em;
}

:deep(.info-card-icon) {
  font-size: 3.5em;
}

:deep(.info-card-content) {
  font-size: 1.1em;
  flex-grow: 1;
}

.feedback-note {
  font-size: 0.9em;
  margin-top: 15px;
  padding: 8px;
  background-color: var(--neversink-bg-color);
  border-radius: 6px;
  font-style: italic;
  width: 100%;
}
</style>
