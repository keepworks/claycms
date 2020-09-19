import React from 'react'

import BaseText from 'components/typography/BaseText'

function HeaderItemTitle({ children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="light"
      variant="regularSmallSpaced"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default HeaderItemTitle
