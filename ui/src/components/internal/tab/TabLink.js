import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import * as mixins from 'styles/mixins'

function TabLink({ to, children, classes }) {
  return (
    <NavLink to={to} className={classes.tabLink} activeClassName={classes.tabLink_active}>
      {children}
    </NavLink>
  )
}

TabLink.propTypes = {
  to: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired
}

TabLink = injectSheet(({ colors, shadows, typography, units }) => ({
  tabLink: {
    ...mixins.size(units.tabWidth_fixed, units.tabHeight_fixed),
    ...mixins.transitionSimple(),
    ...typography.regularSmallSpacedSquished,

    alignItems: 'center',
    color: colors.tab,
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    outline: 'none',
    position: 'relative',

    '&:hover': {
      color: colors.tabLink_hover
    },

    '&::after': {
      backgroundColor: 'transparent',
      content: '" "',
      display: 'block',
      height: units.tabLinkUnderlineHeight_active,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0
    },

    '&:not(last-child)': {
      '&::before': {
        ...mixins.size(1, units.tabDividerHeight),

        backgroundColor: colors.tabDividerBackground,
        content: '" "',
        position: 'absolute',
        right: 0
      }
    }
  },
  tabLink_active: {
    ...typography.semiboldExtraSmallSquished,

    color: colors.tabLink_active,

    '&::after': {
      backgroundColor: colors.tabLink_active,
      boxShadow: shadows.tabLink_active,
      height: units.tabLinkUnderlineHeight_active
    }
  }
}))(TabLink)

export default TabLink
