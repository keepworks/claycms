import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

function BaseText({
  tag: TextTag,
  variant,
  classes,
  children,
  className
}) {
  return (
    <TextTag className={classNames(classes[`${variant}`], classes.text, className)}>
      {children}
    </TextTag>
  )
}

BaseText.propTypes = {
  tag: PropTypes.oneOf([ 'div', 'h1', 'h2', 'h3', 'p', 'span' ]).isRequired,
  align: PropTypes.oneOf([ 'left', 'center', 'right', 'inherit' ]),
  className: PropTypes.string,
  color: PropTypes.oneOf([ 'primary', 'pale', 'light', 'dark', 'darker', 'error' ]),
  variant: PropTypes.oneOf([
    'lightSquished',
    'lightSmall',
    'light',
    'lightMedium',
    'lightMediumResponsive',
    'lightLarge',
    'lightExtraLarge',
    'lightExtraLargeSquished',
    'regularSmallCompact',
    'regularSmall',
    'regularSmallSpaced',
    'regularSmallSquished',
    'regularSmallSpacedSquished',
    'regularSmallSquishedResponsive',
    'regular',
    'regularSpaced',
    'regularSquished',
    'regularSquishedResponsive',
    'regularMedium',
    'regularMediumResponsive',
    'regularMediumSquished',
    'regularLarge',
    'medium',
    'semiboldExtraSmallSquished',
    'semiboldSmallSquished',
    'semiboldSmallSpaced',
    'semiboldSmall',
    'semiboldSmallResponsive',
    'semiboldSquished',
    'semiboldSquishedResponsive',
    'semibold',
    'semiboldMedium',
    'semiboldLarge',
    'semiboldLargeSquished',
    'semiboldExtraLarge',
    'bold',
    'boldMedium',
    'boldLargeResponsive',
    'boldExtraLargeResponsive',
    'blackLarge'
  ])
}

BaseText.defaultProps = {
  align: 'inherit',
  className: '',
  color: 'light',
  variant: 'regular'
}

export default injectSheet(({ colors, typography }) => ({
  ...typography,

  text: ({ align, color }) => ({
    color: `${colors[`text_${color}`]}`,
    textAlign: align
  })
}))(BaseText)
