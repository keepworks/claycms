/*
 * Removes extra props injected by HOCs
 *
 * Example Warning:
 * "Unknown props `input`, `meta`, `theme` on <input> tag. Remove these props from the element."
 *
 * More information: https://facebook.github.io/react/warnings/unknown-prop.html
 */
export default function (props, otherProps = []) {
  const cleanedProps = Object.assign({}, props)

  otherProps.forEach((prop) => {
    delete cleanedProps[prop]
  })
  // react-jss
  delete cleanedProps.theme

  return cleanedProps
}
