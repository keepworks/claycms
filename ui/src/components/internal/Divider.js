import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'

function Divider({ classes }) {
  return <div className={classes.divider} />
}

Divider.propTypes = {
  isVertical: PropTypes.bool
}

Divider.defaultProps = {
  isVertical: false
}

export default injectSheet(({ colors }) => ({
  divider: ({ isVertical }) => ({
    alignSelf: 'center',
    backgroundColor: colors.internalDividerBackground,

    ...(isVertical ? mixins.size(1, '100%') : mixins.size('100%', 1))
  })
}))(Divider)
