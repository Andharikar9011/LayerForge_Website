import { useEffect, useRef } from 'react'

/**
 * Intersection-Observer based scroll animation hook.
 * Adds .visible class when element enters viewport.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('visible')
          }
        })
      },
      { threshold: 0.15, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/**
 * Animate counting up from 0 to target.
 */
export function useCountUp(target, duration = 2000, start = false) {
  const ref = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!start || !ref.current) return

    const startTime = performance.now()
    const isDecimal = target.toString().includes('.')
    const numericTarget = parseFloat(target)

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = eased * numericTarget

      if (ref.current) {
        ref.current.textContent = isDecimal
          ? current.toFixed(1)
          : Math.floor(current).toLocaleString()
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [start, target, duration])

  return ref
}
