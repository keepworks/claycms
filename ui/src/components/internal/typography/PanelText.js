import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function PanelText({ children, classes, ...other }) {
  return (
    <BaseText
      tag="p"
      color="dark"
      className={classes.panelText}
      {...other}
    >
      <span>{children}</span>
    </BaseText>
  )
}

PanelText.propTypes = {
  variant: PropTypes.string
}

PanelText.defaultProps = {
  variant: 'regularSpaced'
}

export default injectSheet(({ fonts }) => ({
  panelText: {
    '& strong': {
      ...fonts.poppinsSemibold
    }
  }
}))(PanelText)
