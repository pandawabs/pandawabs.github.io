import { event as gtagEvent } from 'vue-gtag'

export function useAnalytics() {
  function trackEvent(action: string, params?: Record<string, string>) {
    try {
      gtagEvent(action, params)
    } catch {
      // gtag not loaded (dev mode)
    }
  }

  return { trackEvent }
}
