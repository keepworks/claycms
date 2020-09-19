import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import * as mixins from 'styles/mixins'
import cleanProps from 'lib/cleanProps'

function MenuLink({
  pale, classes, children, ...other
}) {
  return (
    <NavLink
      className={classes.menuLink}
      activeClassName={classes.menuLink_active}
      {...cleanProps(other)}
    >
      {children}
    </NavLink>
  )
}

MenuLink.propTypes = {
  pale: PropTypes.bool
}

MenuLink.defaultProps = {
  pale: false
}

MenuLink.commonStyles = ({ colors, units }) => ({
  ...mixins.transitionSimple(),

  color: ({ pale }) => (pale ? colors.text_pale : colors.text_dark),
  cursor: ({ to, onClick }) => (to || onClick) && 'pointer',
  paddingTop: units.menuLinkVerticalPadding,
  paddingRight: units.menuLinkHorizontalPadding,
  paddingBottom: units.menuLinkVerticalPadding,
  paddingLeft: units.menuLinkHorizontalPadding
})

export default injectSheet(({ colors, typography, units }) => ({
  menuLink: {
    ...MenuLink.commonStyles({ colors, units }),
    ...typography.regularSquished,

    display: 'block',

    '&:hover': {
      backgroundColor: colors.menuLink_hover,
      color: colors.text_primary
    }
  },
  menuLink_active: {
    backgroundColor: colors.menuLink_hover,
    color: ({ pale }) => (pale ? colors.text_pale : colors.text_primary)
  }
}))(MenuLink)
