import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'

function BoxCell({ children, classes }) {
  return (
    <div className={classes.boxCell}>
      {children}
    </div>
  )
}

BoxCell.propTypes = {
  children: PropTypes.node.isRequired
}

export default injectSheet(({ colors, units }) => ({
  boxCell: {
    ...mixins.size(units.dataTableRowHeight),

    alignItems: 'center',
    backgroundColor: colors.dataTableBoxCellBackground,
    borderTopLeftRadius: units.dataTableRowBorderRadius,
    borderBottomLeftRadius: units.dataTableRowBorderRadius,
    borderRightColor: colors.dataTableBoxCellBorderRight,
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    boxSizing: 'content-box',
    display: 'flex',
    justifyContent: 'center'
  }
}))(BoxCell)
