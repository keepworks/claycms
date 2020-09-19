import React from 'react'

import BaseText from 'components/typography/BaseText'

function Title({ children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="darker"
      variant="boldLargeResponsive"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default Title
