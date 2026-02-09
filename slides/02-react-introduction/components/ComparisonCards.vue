<template>
  <div class="flex items-center justify-center gap-12 mt-16 mb-4">
    <div class="bg-orange-50 border-4 border-orange-400 rounded-3xl p-12 flex-1 max-w-sm text-center">
      <h3 class="text-5xl font-black mb-4">Imperativ</h3>
      <p v-click class="text-4xl text-orange-600 font-bold">Cum?</p>
    </div>

    <div class="text-6xl font-black text-sky-400">
      VS
    </div>

    <div class="bg-sky-50 border-4 border-sky-400 rounded-3xl p-12 flex-1 max-w-sm text-center">
      <h3 class="text-5xl font-black mb-4">Declarativ</h3>
      <p v-click class="text-4xl text-sky-600 font-bold">Ce?</p>
    </div>
  </div>

  <v-click>
    <AdmonitionType type="note" class="mt-12">
      Deobicei această definiție e mai clară după ce înveți diferența dintre programare imperativă vs declarativă
    </AdmonitionType>
  </v-click>
</template>
