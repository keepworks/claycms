import React from 'react'

import BaseText from 'components/typography/BaseText'

function SidebarItemText({ children, ...other }) {
  return (
    <BaseText
      tag="span"
      color="dark"
      variant="regularSquished"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default SidebarItemText
