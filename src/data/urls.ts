const IS_DEV = import.meta.env.DEV

const GIST_BASE =
  'https://gist.github.com/pandawabs/9d98240d06ce64162aebc93905798655/raw/466d0c961c0894f65c6ff8c5753fa16ebc679389'

export const CV_EN_URL = IS_DEV ? '/api/cv-en.json' : `${GIST_BASE}/pandawabs-cv-en.json`
export const CV_ID_URL = IS_DEV ? '/api/cv-id.json' : `${GIST_BASE}/pandawabs-cv-id.json`

export const CACHE_TTL_MS = 24 * 60 * 60 * 1000
