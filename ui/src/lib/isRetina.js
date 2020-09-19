export default function isRetina() {
  let mediaQuery

  if (typeof window !== 'undefined' && window !== null) {
    mediaQuery = `(-webkit-min-device-pixel-ratio: 2),
      (min--moz-device-pixel-ratio: 2),
      (-o-min-device-pixel-ratio: 2/1),
      (min-resolution: 2dppx),
      (min-device-pixel-ratio: 2)`

    return window.matchMedia && window.matchMedia(mediaQuery).matches
  }

  return false
}
