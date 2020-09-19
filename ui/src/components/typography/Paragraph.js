import React from 'react'

import BaseText from 'components/typography/BaseText'

function Paragraph({ children, ...other }) {
  return (
    <BaseText tag="p" {...other}>
      {children}
    </BaseText>
  )
}

export default Paragraph
