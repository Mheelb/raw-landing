/**
 * SSR-safe scroll reveal using IntersectionObserver.
 * Returns a template ref and a boolean that flips true once the element enters the viewport.
 */
export function useReveal(threshold = 0.12) {
  const el = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    if (!el.value) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el.value)
  })

  return { el, isVisible }
}
