import { ref, type Ref, watch } from 'vue'
import type { CvData } from '@/types/cv'
import { CV_EN_URL, CV_ID_URL, CACHE_TTL_MS } from '@/data/urls'

type DataStatus = 'idle' | 'loading' | 'loaded' | 'error' | 'stale'

const CACHE_KEY_PREFIX = 'cv_data_'
const CACHE_TS_KEY_PREFIX = 'cv_data_ts_'

const data = ref<CvData | null>(null)
const status = ref<DataStatus>('idle')
const errorMessage = ref<string | null>(null)

function getCacheKey(lang: string) {
  return `${CACHE_KEY_PREFIX}${lang}`
}

function getCacheTsKey(lang: string) {
  return `${CACHE_TS_KEY_PREFIX}${lang}`
}

function readCache(lang: string): CvData | null {
  try {
    const raw = localStorage.getItem(getCacheKey(lang))
    if (!raw) return null
    return JSON.parse(raw) as CvData
  } catch {
    return null
  }
}

function writeCache(lang: string, cv: CvData) {
  try {
    localStorage.setItem(getCacheKey(lang), JSON.stringify(cv))
    localStorage.setItem(getCacheTsKey(lang), String(Date.now()))
  } catch {
    // quota exceeded, ignore
  }
}

function isCacheExpired(lang: string): boolean {
  const ts = localStorage.getItem(getCacheTsKey(lang))
  if (!ts) return true
  return Date.now() - Number(ts) > CACHE_TTL_MS
}

function getUrl(lang: string): string {
  return lang === 'id' ? CV_ID_URL : CV_EN_URL
}

async function fetchCv(lang: string) {
  // Check cache first
  const cached = readCache(lang)
  const expired = isCacheExpired(lang)

  if (cached && !expired) {
    data.value = cached
    status.value = 'loaded'
    return
  }

  if (cached && expired) {
    data.value = cached
    status.value = 'stale'
    // Fall through to background refresh
  } else {
    status.value = 'loading'
    data.value = null
  }

  try {
    const response = await fetch(getUrl(lang))
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const json: CvData = await response.json()
    data.value = json
    status.value = 'loaded'
    writeCache(lang, json)
  } catch (err) {
    if (cached) {
      // Stale cache available — keep showing it
      errorMessage.value = null
      status.value = 'loaded'
    } else {
      errorMessage.value = err instanceof Error ? err.message : 'Unknown error'
      status.value = 'error'
    }
  }
}

export function useCvData(language: Ref<string>) {
  watch(
    language,
    (newLang) => {
      fetchCv(newLang)
    },
    { immediate: true },
  )

  return { data, status, error: errorMessage, refetch: () => fetchCv(language.value) }
}
