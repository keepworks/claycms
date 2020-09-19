import React from 'react'

import BaseText from 'components/typography/BaseText'

function FieldErrorText({ children, ...other }) {
  return (
    <BaseText
      tag="span"
      color="primary"
      variant="regularSmall"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default FieldErrorText
