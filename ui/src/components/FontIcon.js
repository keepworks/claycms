import PropTypes from 'prop-types'
import React from 'react'

const FontIcon = React.forwardRef(({ name, size, ...other }, ref) => (
  <span
    ref={ref}
    className={`icon icon-${name}`}
    style={{ fontSize: FontIcon.sizes[size] }}
    {...other}
  />
))

FontIcon.sizes = {
  nano: 6,
  micro: 8,
  milli: 10,
  tiny: 12,
  small: 16,
  medium: 24,
  large: 32,
  extraLarge: 40
}

FontIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(FontIcon.sizes))
}

FontIcon.defaultProps = {
  size: 'medium'
}

export default FontIcon
