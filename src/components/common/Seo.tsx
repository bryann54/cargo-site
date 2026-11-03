import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  path?: string
  image?: string
}

export function Seo({ title, description, path = '/', image }: SeoProps) {
  useEffect(() => {
    document.title = title
    const setMeta = (
      attr: 'name' | 'property',
      key: string,
      content: string,
    ) => {
      let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
      )
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }
    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    const url = `https://bryann54.github.io${base}${path}`
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:card', 'summary_large_image')
    if (image) setMeta('property', 'og:image', image)

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, path, image])

  return null
}
