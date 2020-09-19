import isRetina from 'lib/isRetina'

export default function resolveImageUrl(url1x, url2x) {
  if (isRetina()) {
    return url2x
  }

  return url1x
}
