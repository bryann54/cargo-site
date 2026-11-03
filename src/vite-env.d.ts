/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QUOTE_ENDPOINT?: string
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
