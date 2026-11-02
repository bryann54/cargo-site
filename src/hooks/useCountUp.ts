import { useEffect, useState } from 'react'

export function useCountUp(target: number, duration = 1200, trigger = true) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!trigger) return

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(target * progress))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [duration, target, trigger])

  return { value }
}
