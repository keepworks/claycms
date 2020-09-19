import ClickOutside from 'react-click-outside'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'

function Menu({
  closeMenu, children, classes
}) {
  return (
    <ClickOutside onClickOutside={closeMenu} className={classes.menu}>
      {children}
    </ClickOutside>
  )
}

Menu.propTypes = {
  isHidden: PropTypes.bool,
  closeMenu: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  children: PropTypes.node
}

Menu.defaultProps = {
  isHidden: false,
  width: 'auto',
  /*
    *Menu Components render <Menu> even though the record is empty
    to ensure that Popper.js can properly position the element and
    there is no shift when a new record is added.
  */
  children: null
}

export default injectSheet(({ colors, shadows, units }) => ({
  menu: ({ isHidden, width }) => ({
    ...mixins.transitionSimple(),

    backgroundColor: colors.menuBackground,
    borderRadius: units.menuBorderRadius,
    boxShadow: shadows.menu,
    opacity: isHidden ? 0 : 1,
    overflow: 'hidden',
    pointerEvents: isHidden ? 'none' : 'auto',
    width
  })
}))(Menu)
