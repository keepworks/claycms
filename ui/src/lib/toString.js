export default function (value) {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'string' || value instanceof String) {
    return value
  }
  return String(value)
}
