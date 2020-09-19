import React from 'react'

import BaseText from 'components/typography/BaseText'

function Heading({ children, ...other }) {
  return (
    <BaseText tag="h1" {...other}>
      {children}
    </BaseText>
  )
}

export default Heading
