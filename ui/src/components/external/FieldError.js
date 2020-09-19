import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import { FieldErrorText } from 'components/external/typography'

function FieldError({ error, classes }) {
  if (!error) {
    return null
  }

  return (
    <div className={classes.fieldError}>
      <div className={classes.arrow} />
      <FieldErrorText>
        {error}
      </FieldErrorText>
    </div>
  )
}

FieldError.propTypes = {
  error: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ])
}

FieldError.defaultProps = {
  error: null
}

export default injectSheet(({ colors, units }) => ({
  fieldError: {
    backgroundColor: colors.externalFieldErrorBackground,
    color: colors.text_primary,
    marginLeft: units.externalFieldErrorShiftLeft,
    marginTop: units.externalFieldErrorShiftTop,
    paddingTop: units.externalFieldErrorVerticalPadding,
    paddingRight: units.externalFieldErrorHorizontalPadding,
    paddingBottom: units.externalFieldErrorVerticalPadding,
    paddingLeft: units.externalFieldErrorHorizontalPadding,
    position: 'absolute',
    top: '100%'
  },
  arrow: {
    ...mixins.size(units.externalFieldErrorArrowSize),

    position: 'absolute',
    top: -0.5 * units.externalFieldErrorArrowSize,
    left: units.externalFieldErrorArrowShiftHorizontal,

    '&::before': {
      ...mixins.size('100%'),

      backgroundColor: colors.externalFieldErrorBackground,
      borderRadius: 1,
      content: '" "',
      display: 'block',
      transform: `translateY(${units.externalFieldErrorArrowShiftVertical}px) rotate(45deg)`
    }
  }
}))(FieldError)
