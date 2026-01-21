import { defineAppSetup } from '@slidev/types'
import { Sandpack } from 'sandpack-vue3'

export default defineAppSetup(({ app }) => {
  // Register Sandpack as a global component available in all slides
  app.component('Sandpack', Sandpack)
})
