import React from 'react'

import BaseText from 'components/typography/BaseText'

function Text({ children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="dark"
      variant="regularSpaced"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default Text
