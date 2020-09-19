import React from 'react'

import BaseText from 'components/typography/BaseText'

function CellTitle({ children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="dark"
      variant="semibold"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default CellTitle
