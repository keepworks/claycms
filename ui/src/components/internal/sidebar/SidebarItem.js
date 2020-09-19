import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import * as mixins from 'styles/mixins'
import FontIcon from 'components/FontIcon'
import { SidebarItemText } from 'components/internal/typography'

function SidebarItem({ item, classes }) {
  return (
    <NavLink
      to={item.url}
      className={classes.sidebarItem}
      activeClassName={classes.sidebarItem_active}
    >
      <div className={classes.sidebarItemIconWrapper}>
        <FontIcon name={item.icon} size="small" />
      </div>
      <SidebarItemText className={classes.sidebarItemText}>
        {item.name}
      </SidebarItemText>
    </NavLink>
  )
}

SidebarItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default injectSheet(({
  fonts, colors, shadows, units
}) => ({
  sidebarItem: {
    alignItems: 'center',
    display: 'inline-flex',
    marginRight: -1 * units.sidebarHorizontalPadding,
    marginLeft: -1 * units.sidebarHorizontalPadding,
    paddingTop: units.sidebarItemPaddingVertical,
    paddingRight: units.sidebarItemPaddingHorizontal,
    paddingBottom: units.sidebarItemPaddingVertical,
    paddingLeft: units.sidebarItemPaddingHorizontal,

    '&:hover': {
      '& $sidebarItemText': {
        ...fonts.poppinsSemibold
      },

      '& $sidebarItemIconWrapper': {
        '& .icon': {
          color: colors.text_dark
        }
      }
    }
  },
  sidebarItem_active: {
    '& $sidebarItemText': {
      ...fonts.poppinsSemibold
    },

    '& $sidebarItemIconWrapper': {
      backgroundColor: colors.sidebarItemBackground_active,
      boxShadow: shadows.sidebarItem_active,

      '& .icon': {
        color: colors.text_dark
      }
    }
  },
  sidebarItemText: { // Used for sidebarItem_active and to override class in SidebarItemText
  },
  sidebarItemIconWrapper: {
    ...mixins.size(units.sidebarItemIconSize),
    ...mixins.transitionSimple(),

    alignItems: 'center',
    borderRadius: '50%',
    display: 'inline-flex',
    justifyContent: 'center',
    marginRight: units.sidebarItemIconMarginRight,
    /*
      minWidth is added to ensure that `sidebarItemIconWrapper` doesn't get squished
      if `SideBarText` exceeds the parent's width.
    */
    minWidth: units.sidebarItemIconSize,
    textAlign: 'center',

    '& .icon': {
      ...mixins.transitionSimple(),

      color: colors.text_pale
    }
  }
}))(SidebarItem)
