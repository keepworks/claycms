import React from 'react'

import BaseText from 'components/typography/BaseText'

function SidePaneSubtitle({ classes, children, ...other }) {
  return (
    <BaseText
      tag="h1"
      color="light"
      variant="semiboldMedium"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default SidePaneSubtitle
