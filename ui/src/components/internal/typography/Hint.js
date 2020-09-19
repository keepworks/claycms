import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import BaseText from 'components/typography/BaseText'
import FontIcon from 'components/FontIcon'

function Hint({ withIcon, children, classes, ...other }) {
  return (
    <BaseText
      tag="p"
      color="pale"
      className={classes.hint}
      {...other}
    >
      {withIcon && <FontIcon name="round-info" size="small" />}
      <span>{children}</span>
    </BaseText>
  )
}

Hint.propTypes = {
  variant: PropTypes.string,
  withIcon: PropTypes.bool
}

Hint.defaultProps = {
  variant: 'lightSmall',
  withIcon: false
}

export default injectSheet(({ fonts, typography, units }) => ({
  hint: {
    display: 'flex',

    '& strong': {
      ...fonts.poppinsSemibold
    },

    '& .icon': {
      lineHeight: ({ variant }) => typography[variant].lineHeight,
      marginRight: units.hintIconMarginRight
    }
  }
}))(Hint)
