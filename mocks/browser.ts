import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Setup the Service Worker with our handlers
export const worker = setupWorker(...handlers)
