export const ScrollListener = (options) => {
  const { $target, $origin, variablePrefix } = options
  const setProp = (prop, value) =>
    $target.style.setProperty(`--${variablePrefix}-${prop}`, value)

  return () => {
    const {
      scrollTop, scrollLeft,
      scrollHeight, scrollWidth,
    } = $origin
    setProp('x', scrollLeft)
    setProp('y', scrollTop)
    if (options.includeSizes) {
      setProp('height', scrollHeight)
      setProp('width', scrollWidth)
    }
    if (options.includeProgress) {
      const { innerHeight, innerWidth } = window
      const progressX = !scrollLeft ? 0 : (scrollLeft / (scrollWidth - innerWidth))
      const progressY = !scrollTop ? 0 : (scrollTop / (scrollHeight - innerHeight))
      setProp('px', progressX)
      setProp('py', progressY)
    }
  }
}


export default (customOptions = {}) => {
  const defaultOptions = {
    originEl: 'html',
    targetEl: 'html',
    variablePrefix: 'csss-scroll-pos',
    includeSizes: true,
    includeProgress: true,
    autoStart: true
  }
  const options = { ...defaultOptions, ...customOptions }

  const $origin = document.querySelector(options.originEl)
  const $target = document.querySelector(options.targetEl)

  const scrollListener = ScrollListener({ $origin, $target, ...options })
  window.addEventListener('scroll', scrollListener, true)

  if (options.autoStart) {
    scrollListener()
  }
}