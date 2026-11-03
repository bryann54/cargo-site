import { useEffect, useRef } from 'react'

/**
 * Adds `.is-visible` to elements with `.reveal` inside the container
 * once they enter the viewport. Runs once per element.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = root.querySelectorAll<HTMLElement>('.reveal')
    if (!targets.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return ref
}
