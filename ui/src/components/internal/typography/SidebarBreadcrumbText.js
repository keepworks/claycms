import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function SidebarBreadcrumbText({ classes, children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="primary"
      variant="semiboldMedium"
      className={classes.sidebarBreadcrumbText}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(() => ({
  sidebarBreadcrumbText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
}))(SidebarBreadcrumbText)
