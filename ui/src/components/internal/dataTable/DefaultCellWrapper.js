import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'

function DefaultCellWrapper({ header, children, classes }) {
  return (
    <div
      className={classNames(
        classes.defaultCellWrapper,
        {
          [classes.defaultCellWrapper_header]: header
        }
      )}
    >
      {children}
    </div>
  )
}

DefaultCellWrapper.propTypes = {
  bordered: PropTypes.bool,
  header: PropTypes.bool,
  uppercase: PropTypes.bool,
  children: PropTypes.node.isRequired
}

DefaultCellWrapper.defaultProps = {
  bordered: true,
  header: false,
  uppercase: false
}

export default injectSheet(({ colors, typography, units }) => ({
  defaultCellWrapper: {
    ...typography.regularSmallSpaced,

    flexBasis: ({ width }) => width,
    flexGrow: ({ flexGrow }) => flexGrow,
    flexShrink: 1,
    overflow: 'hidden',
    padding: units.dataTableCellPadding,
    position: 'relative',
    textTransform: ({ uppercase }) => (uppercase ? 'uppercase' : 'none'),

    '&::before': {
      ...mixins.size(1, units.dataTableCellBorderHeight),

      backgroundColor: colors.dataTableBorderedCellBorderBackground,
      content: ({ bordered }) => (bordered ? '" "' : ''),
      marginTop: -units.dataTableCellBorderHeight / 2,
      position: 'absolute',
      top: '50%',
      left: 0
    },

    '& > p': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  },
  defaultCellWrapper_header: {
    ...typography.regularSmallCompact,

    color: colors.text_pale
  }
}))(DefaultCellWrapper)
