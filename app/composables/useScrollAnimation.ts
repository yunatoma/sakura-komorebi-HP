import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(threshold = 0.15) {
  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!elementRef.value) return

    // クライアントサイドナビゲーション時など、既にビューポート内にある場合は即座に表示
    const rect = elementRef.value.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
          observer = null
        }
      },
      { threshold }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { elementRef, isVisible }
}
