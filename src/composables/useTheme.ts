import { ref, watchEffect } from 'vue'

const THEME_KEY = 'cv_theme'

const theme = ref<'light' | 'dark'>('light')

export function useTheme() {
  function applyTheme(t: 'light' | 'dark') {
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  function initTheme() {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') {
      theme.value = stored
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.value = 'dark'
    }
    applyTheme(theme.value)
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem(THEME_KEY, theme.value)
    applyTheme(theme.value)
  }

  initTheme()

  return { theme, toggleTheme }
}
