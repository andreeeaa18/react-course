<script setup lang="ts">
import CardContainer from '../../../common/components/CardContainer.vue'
import InfoCard from '../../../common/components/InfoCard.vue'
</script>

<template>
  <CardContainer layout="centered">
    <InfoCard icon="💻" style="max-width: 65%;">
      <p class="work-focus-text">
        Pe parcursul semestrului veți realiza un proiect individual pe care îl veți prezenta la sfârșit de semestru.
      </p>
    </InfoCard>
  </CardContainer>
</template>

<style scoped>
.work-focus-text {
  font-size: 1.25em;
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
}
</style>
