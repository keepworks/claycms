import React from 'react'

import BaseText from 'components/typography/BaseText'

function Greeting({ children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="light"
      variant="regularLarge"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default Greeting
