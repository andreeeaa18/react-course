<script setup lang="ts">
import CardContainer from '../../../common/components/CardContainer.vue'
import InfoCard from '../../../common/components/InfoCard.vue'
</script>

<template>
  <CardContainer layout="flex">
    <InfoCard icon="📅" title="Termene Limită" style="flex-basis: 45%;">
      <p>Respectarea termenelor este <strong>esențială</strong>. Lucrările trimise cu întârziere nu vor fi evaluate.</p>
    </InfoCard>

    <InfoCard icon="⚠️" title="Integritate" style="flex-basis: 45%;">
      <p>Toleranță <strong>zero</strong> pentru plagiat. Toate temele și proiectele trebuie să fie individuale.</p>
    </InfoCard>
  </CardContainer>
</template>
