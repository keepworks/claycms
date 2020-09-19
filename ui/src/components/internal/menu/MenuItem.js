import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import MenuLink from 'components/internal/menu/MenuLink'

function MenuItem({
  onClick, variant, children, classes
}) {
  return (
    <div
      role="menuitem"
      tabIndex={-1}
      className={classNames(classes.menuItem, classes[`menuItem_${variant}`])}
      onClick={onClick}
      onKeyPress={onClick}
    >
      {children}
    </div>
  )
}

MenuItem.propTypes = {
  onClick: PropTypes.func,
  pale: PropTypes.bool,
  variant: PropTypes.oneOf([ 'regular', 'small' ])
}

MenuItem.defaultProps = {
  onClick: null,
  pale: false,
  variant: 'regular'
}

export default injectSheet(({ colors, typography, units }) => ({
  menuItem: {
    ...MenuLink.commonStyles({ colors, units }),

    alignItems: 'center',
    display: 'flex',

    '& .icon': {
      marginLeft: 10
    },

    '&:hover': {
      color: ({ onClick }) => onClick && colors.text_primary
    }
  },
  menuItem_regular: {
    ...typography.regularSquished
  },
  menuItem_small: {
    ...typography.regularSmallSpacedSquished
  }
}))(MenuItem)
