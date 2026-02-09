<template>
  <div class="flex items-center justify-center gap-12 mt-4 mb-4">
    <div class="bg-orange-50 border-4 border-orange-400 rounded-3xl p-8 flex-1 max-w-md">
      <h3 class="text-4xl font-black mb-6 text-center">Imperativ</h3>
      <div v-click class="space-y-4 text-lg">
        <div class="bg-white p-4 rounded-lg">
          <p class="font-bold text-orange-600 mb-2">🚗 Navigație GPS:</p>
          <p class="text-sm">"La semafor cotește stânga, mergi 2 blocuri, apoi dreapta pe strada principală..."</p>
        </div>
        <div class="bg-white p-4 rounded-lg">
          <p class="font-bold text-orange-600 mb-2">🍳 La restaurant:</p>
          <p class="text-sm">"Du-te la bucătărie, ia ouă, sparge-le, pune tigaia pe foc, toarnă untul..."</p>
        </div>
      </div>
    </div>

    <div class="text-6xl font-black text-sky-400">
      VS
    </div>

    <div class="bg-sky-50 border-4 border-sky-400 rounded-3xl p-8 flex-1 max-w-md">
      <h3 class="text-4xl font-black mb-6 text-center">Declarativ</h3>
      <div v-click class="space-y-4 text-lg">
        <div class="bg-white p-4 rounded-lg">
          <p class="font-bold text-sky-600 mb-2">🚗 Navigație GPS:</p>
          <p class="text-sm">"Du-mă la aeroport"</p>
        </div>
        <div class="bg-white p-4 rounded-lg">
          <p class="font-bold text-sky-600 mb-2">🍳 La restaurant:</p>
          <p class="text-sm">"Vreau ouă prăjite"</p>
        </div>
      </div>
    </div>
  </div>

  <v-click>
    <AdmonitionType type="tip" class="mt-8">
      În ambele cazuri, tu descrii CE vrei, iar sistemul se ocupă de CUM să îl obțină.
    </AdmonitionType>
  </v-click>
</template>
