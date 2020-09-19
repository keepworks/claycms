import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import FontIcon from 'components/FontIcon'

function CloseButton({ onClick, classes }) {
  return (
    <div role="button" tabIndex={-1} className={classes.close} onClick={onClick} onKeyDown={onClick}>
      <FontIcon name="cross" size="small" />
    </div>
  )
}

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default injectSheet(({ colors }) => ({
  close: {
    color: colors.closeIcon,
    cursor: 'pointer',
    fontSize: 0 /* clear line-height that causes extra spacing */
  }
}))(CloseButton)
