import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import { Paragraph } from 'components/typography'

function FieldError({ error, classes }) {
  if (!error) {
    return null
  }

  return (
    <div className={classes.fieldError}>
      <Paragraph align="right" color="error" variant="regularSmall">
        {error}
      </Paragraph>
    </div>
  )
}

FieldError.propTypes = {
  active: PropTypes.bool,
  error: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
  stretched: PropTypes.bool
}

FieldError.defaultProps = {
  active: false,
  error: null,
  stretched: false
}

export default injectSheet(({ colors, units }) => ({
  fieldError: {
    paddingTop: units.fieldErrorVerticalPadding,
    paddingRight: units.fieldErrorHorizontalPadding,
    paddingBottom: units.fieldErrorVerticalPadding,
    paddingLeft: units.fieldErrorHorizontalPadding,
    position: 'absolute',
    top: '100%',
    right: 0,
    left: 0,

    '&::before': {
      ...mixins.transitionSimple(),

      backgroundColor: colors.fieldErrorBackground,
      content: "' '",
      marginRight: ({ active, stretched }) => (
        (active && stretched) ? units.inputBorderMarginHorizontal_focus : 0
      ),
      marginLeft: ({ active, stretched }) => (
        (active && stretched) ? units.inputBorderMarginHorizontal_focus : 0
      ),
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }
}))(FieldError)
