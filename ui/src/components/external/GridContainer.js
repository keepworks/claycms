import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'

function GridContainer({ classes, children }) {
  return (
    <div className={classes.gridContainer}>
      {children}
    </div>
  )
}

GridContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default injectSheet(({ units }) => ({
  gridContainer: {
    ...mixins.responsiveProperties({
      alignItems: { sm: 'center' },
      display: { xs: 'block', md: 'grid' },
      gridColumnGap: { sm: '20px' },
      marginRight: { xs: 20, md: 'auto' },
      marginLeft: { xs: 20, md: 'auto' },
      gridTemplateColumns: { md: 'repeat(15, 1fr)' },
      maxWidth: units.externalGridContainerMaxWidthResponsive
    })
  }
}))(GridContainer)
