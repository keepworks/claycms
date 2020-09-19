export default function (object) {
  return Object.keys(object).map(key => ({ label: object[key], value: object[key] }))
}
