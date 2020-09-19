import React from 'react'

import BaseText from 'components/typography/BaseText'

function CellContent({ children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="dark"
      variant="semiboldSmall"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default CellContent
