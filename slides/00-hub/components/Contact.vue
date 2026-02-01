<script setup lang="ts">
import CardContainer from '../../../common/components/CardContainer.vue'
import InfoCard from '../../../common/components/InfoCard.vue'
</script>

<template>
  <CardContainer layout="flex">
    <InfoCard icon="🕒" title="Anunțarea Absențelor" style="flex-basis: 45%;">
      <p>Dacă nu puteți frecventa, vă rog să anunțați în prealabil.</p>
    </InfoCard>

    <InfoCard icon="📬" title="Contact" style="flex-basis: 45%;">
      <div class="contact-list">
        <div class="contact-item">
          <span class="contact-item-icon">✉️</span>
          <span>cristian.crudu@usm.md</span>
        </div>
        <div class="contact-item">
          <span class="contact-item-icon">📞</span>
          <span>+373 67 277 471</span>
        </div>
      </div>
    </InfoCard>
  </CardContainer>
</template>

<style scoped>
.contact-list {
  text-align: left;
  width: 100%;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.contact-item-icon {
  margin-right: 15px;
  font-size: 1.5em;
}
</style>
