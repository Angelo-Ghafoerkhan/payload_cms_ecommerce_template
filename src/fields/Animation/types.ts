export default interface AnimationType {
  enabled?: boolean
  trigger: 'onLoad' | 'onScroll' | 'onHover'
  type: 'fade' | 'slideLeft' | 'slideRight' | 'zoom'
  duration: number // in milliseconds
  delay: number // in milliseconds
  threshold?: number // percentage (0-100) for scroll trigger
}
