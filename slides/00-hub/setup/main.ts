// Import the shared setup from common
import { defineAppSetup } from '@slidev/types'
import sharedSetup from '../../../common/setup/main'
import '../../../common/theme/style.css'

// Import hub-specific components
import Grade from '../components/Grade.vue'
import Attendance from '../components/Attendance.vue'
import Rules from '../components/Rules.vue'
import Contact from '../components/Contact.vue'
import WorkFocus from '../components/WorkFocus.vue'
import Evaluation from '../components/Evaluation.vue'
import LabProcess from '../components/LabProcess.vue'
import LabTasks from '../components/LabTasks.vue'

export default defineAppSetup(({ app }) => {
  // Run shared setup first
  if (sharedSetup && typeof sharedSetup === 'function') {
    sharedSetup({ app } as any)
  }

  // Register hub-specific components
  app.component('Grade', Grade)
  app.component('Attendance', Attendance)
  app.component('Rules', Rules)
  app.component('Contact', Contact)
  app.component('WorkFocus', WorkFocus)
  app.component('Evaluation', Evaluation)
  app.component('LabProcess', LabProcess)
  app.component('LabTasks', LabTasks)
})