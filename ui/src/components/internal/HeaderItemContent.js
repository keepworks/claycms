import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import FontIcon from 'components/FontIcon'

function HeaderItemContent({ icon, classes, children }) {
  return (
    <div className={classes.headerItemContent}>
      {children}
      <FontIcon name={icon} size="small" />
    </div>
  )
}

HeaderItemContent.propTypes = {
  children: PropTypes.node.isRequired
}

export default injectSheet(({ colors, units }) => ({
  headerItemContent: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: units.headerItemContentMarginTop,

    '& .icon': {
      color: colors.text_light
    }
  }
}))(HeaderItemContent)
