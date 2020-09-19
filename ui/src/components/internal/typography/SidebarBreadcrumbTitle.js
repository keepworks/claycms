import React from 'react'

import BaseText from 'components/typography/BaseText'

function SidebarBreadcrumbTitle({ children, ...other }) {
  return (
    <BaseText
      tag="span"
      color="pale"
      variant="regularSmallSpaced"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default SidebarBreadcrumbTitle
