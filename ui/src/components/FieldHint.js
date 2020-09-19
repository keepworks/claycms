import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import FontIcon from 'components/FontIcon'

function FieldHint({ active, hint, classes }) {
  if (!hint || !active) {
    return null
  }

  return (
    <div className={classes.fieldHint}>
      <FontIcon name="round-info" size="small" />
      {hint}
    </div>
  )
}

FieldHint.propTypes = {
  active: PropTypes.bool,
  hint: PropTypes.string
}

FieldHint.defaultProps = {
  active: false,
  hint: null
}

export default injectSheet(({ colors, typography, units }) => ({
  fieldHint: {
    ...typography.lightSmall,

    color: colors.text_pale,
    paddingLeft: units.fieldHintPaddingLeft,
    position: 'absolute',
    top: `calc(100% + ${units.fieldHintTop}px)`,

    '& .icon': {
      lineHeight: `${typography.lightSmall.lineHeight * typography.lightSmall.fontSize}px`,
      position: 'absolute',
      left: 0
    }
  }
}))(FieldHint)
