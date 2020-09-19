import React from 'react'

import BaseText from 'components/typography/BaseText'

function CellText({ children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="pale"
      variant="semiboldExtraSmallSquished"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default CellText
