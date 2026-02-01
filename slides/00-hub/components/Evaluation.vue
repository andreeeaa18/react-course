<script setup lang="ts">
import CardContainer from '../../../common/components/CardContainer.vue'
import InfoCard from '../../../common/components/InfoCard.vue'
</script>

<template>
  <CardContainer layout="grid-3" gap="20px">
    <InfoCard icon="1️⃣" title="Atestare 1">
      <p class="eval-description">Evaluare teoretică și practică la mijlocul semestrului.</p>
      <p>(Moodle)</p>
    </InfoCard>

    <InfoCard icon="2️⃣" title="Atestare 2">
      <p class="eval-description">A doua evaluare semestrială.</p>
      <p>(Moodle)</p>
    </InfoCard>

    <InfoCard icon="🏁" title="Examen Final">
      <p class="eval-description">Verificarea finală a cunoștințelor acumulate.</p>
      <p>(Foaie)</p>
      <Ghost :size="40" mood="sad" color="#d6d6d6ff" />
    </InfoCard>
  </CardContainer>
</template>

<style scoped>
.eval-description {
  font-size: 1em;
  margin-bottom: 10px;
}

:deep(.info-card-title) {
  font-size: 1.8em;
}

:deep(.info-card-icon) {
  font-size: 3.5em;
}

:deep(.info-card) {
  padding: 20px;
}
</style>
