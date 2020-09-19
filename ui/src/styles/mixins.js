import _ from 'lodash'

const placeholder = styles => ({
  '&::-webkit-input-placeholder': {
    /* Chrome/Opera/Safari */
    ...styles
  },
  '&::-moz-placeholder': {
    /* Firefox 19+ */
    ...styles
  },
  '&:-ms-input-placeholder': {
    /* IE 10+ */
    ...styles
  },
  '&:-moz-placeholder': {
    /* Firefox 18- */
    ...styles
  }
})

const backgroundContain = () => ({
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain'
})

const backgroundCover = () => ({
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
})

const listless = {
  listStyle: 'none',
  margin: 0,
  padding: 0
}

const size = (width, height = width) => ({ width, height })

const circle = ({ size: diameter, color = '#fff', opacity = 0.04 }) => ({
  ...size(diameter),

  backgroundColor: color,
  borderRadius: '50%',
  content: '" "',
  opacity,
  pointerEvents: 'none',
  position: 'absolute'
})

const animateUnderline = ({ color = '#fff', bottom = 0 } = {}) => ({
  position: 'relative',

  '&::after': {
    backgroundColor: color,
    content: '" "',
    height: 2,
    position: 'absolute',
    right: 0,
    bottom,
    left: 0,
    transform: 'scaleX(0)',
    transformOrigin: '100% 50%',
    transition: 'transform .4s cubic-bezier(.23, 1, .32, 1)'
  },

  '&:hover': {
    '&::after': {
      transform: 'scaleX(1)',
      transformOrigin: '0 50%'
    }
  }
})

const underline = ({ color = '#fff', bottom = 0 } = {}) => ({
  position: 'relative',

  '&::after': {
    backgroundColor: color,
    content: '" "',
    height: 2,
    position: 'absolute',
    right: 0,
    bottom,
    left: 0
  }
})

const breakpoints = {
  xs: '@media (min-width: 0)',
  sm: '@media (min-width: 576px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 992px)',
  xl: '@media (min-width: 1200px)'
}

const responsiveProperty = (property, values) => (
  Object.keys(values).reduce((prop, value) => {
    prop[breakpoints[value]] = { [property]: values[value] }

    return prop
  }, {})
)

const responsiveProperties = ({ wrapper, ...properties }) => (
  Object.keys(properties).reduce((propertyList, property) => {
    _.merge(propertyList, responsiveProperty(property, properties[property]))

    return propertyList
  }, Object.values(breakpoints).reduce((list, breakpoint) => ({ ...list, [breakpoint]: {} }), {}))
)

const makeTransition = ({ transitionDuration = '0.3s', transitionTimingFunction = 'ease' } = {}) => (transitionProperty = 'all') => ({
  transitionProperty,
  transitionDuration,
  transitionTimingFunction
})

const transitionSimple = makeTransition()
const transitionFluid = makeTransition({ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' })

export {
  animateUnderline,
  backgroundContain,
  backgroundCover,
  breakpoints,
  circle,
  listless,
  placeholder,
  responsiveProperties,
  responsiveProperty,
  size,
  transitionFluid,
  transitionSimple,
  underline
}
