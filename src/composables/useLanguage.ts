import { ref } from 'vue'
import { en, id, type SectionLabels } from '@/locales/translations'

const LANG_KEY = 'cv_lang'

const lang = ref<'en' | 'id'>('en')

export function useLanguage() {
  function applyLang(l: 'en' | 'id') {
    document.documentElement.lang = l
    document.title = l === 'en' ? en.siteTitle : id.siteTitle
  }

  function initLanguage() {
    const stored = localStorage.getItem(LANG_KEY)
    if (stored === 'en' || stored === 'id') {
      lang.value = stored
    }
    applyLang(lang.value)
  }

  function setLanguage(l: 'en' | 'id') {
    lang.value = l
    localStorage.setItem(LANG_KEY, l)
    applyLang(l)
  }

  function t(): SectionLabels {
    return lang.value === 'en' ? en : id
  }

  initLanguage()

  return { lang, setLanguage, t }
}
