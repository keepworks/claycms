import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'

function HeaderItem({
  isActive, onClick, onItemClick, classes, children
}) {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick()
    }

    /*
      `onClick` is passed from MenuContainer to toggle the menu.

      In MenuContainer, React.cloneElement merges props shallowly.
      Therefore, if `onItemClick` is passed as `onClick`, it would be overwritten in MenuContainer.
    */
    onClick()
  }

  return (
    <div
      tabIndex={-1}
      className={classNames(
        classes.headerItem,
        { [classes.headerItem_active]: isActive }
      )}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="menuitem"
    >
      {children}
    </div>
  )
}

HeaderItem.propTypes = {
  isActive: PropTypes.bool,
  isHidden: PropTypes.bool,
  isWide: PropTypes.bool,
  onClick: PropTypes.func,
  onItemClick: PropTypes.func
}

HeaderItem.defaultProps = {
  isActive: false,
  isHidden: false,
  isWide: false,
  onClick: null,
  onItemClick: null
}

export default injectSheet(({ colors, units }) => ({
  headerItem: {
    ...mixins.transitionSimple(),

    borderRightColor: colors.headerItemBorder,
    borderRightStyle: 'solid',
    borderWidth: ({ isHidden }) => (isHidden ? 0 : 1),
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    opacity: ({ isHidden }) => (isHidden ? 0 : 1),
    paddingRight: ({ isHidden }) => (isHidden ? 0 : units.headerItemHorizonalPadding),
    paddingLeft: ({ isHidden }) => (isHidden ? 0 : units.headerItemHorizonalPadding),
    pointerEvents: ({ isHidden }) => (isHidden ? 'none' : 'all'),
    width: ({ isHidden, isWide }) => {
      if (isHidden) {
        return 0
      }

      return isWide ? units.headerItemWidth_wide : units.headerItemWidth
    },

    '&:hover': {
      backgroundColor: colors.headerItemBackground_hover
    }
  },
  headerItem_active: {
    backgroundColor: colors.headerItemBackground_hover
  }
}))(HeaderItem)
