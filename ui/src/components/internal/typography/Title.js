import React from 'react'

import BaseText from 'components/typography/BaseText'

function Title({ children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="dark"
      variant="semiboldLargeSquished"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default Title
