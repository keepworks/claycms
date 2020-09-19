import injectSheet from 'react-jss'
import React from 'react'

import BaseModal from 'components/BaseModal'

function SidePane({ classes, children, ...other }) {
  return (
    <BaseModal
      contentBaseClassName={classes.contentBase}
      contentAfterOpenClassName={classes.contentAfterOpen}
      contentBeforeCloseClassName={classes.contentBeforeClose}
      {...other}
    >
      {children}
    </BaseModal>
  )
}

export default injectSheet(({ colors, shadows, units }) => ({
  contentBase: {
    backgroundColor: colors.sidePaneBackground,
    boxShadow: shadows.sidePane,
    display: 'flex',
    flexDirection: 'column',
    padding: units.sidePanePadding,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    transform: 'translateX(100%)',
    width: units.sidePaneWidth
  },
  contentAfterOpen: {
    transform: 'translateX(0)'
  },
  contentBeforeClose: {
    transform: 'translateX(100%)'
  }
}))(SidePane)
