import React from 'react'

import BaseText from 'components/typography/BaseText'

function DialogTitle({ children, ...other }) {
  return (
    <BaseText
      tag="h1"
      color="dark"
      variant="semiboldLarge"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default DialogTitle
