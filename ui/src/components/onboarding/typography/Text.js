import React from 'react'

import BaseText from 'components/typography/BaseText'

function Text({ children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="light"
      variant="light"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default Text
