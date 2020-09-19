import React from 'react'

import BaseText from 'components/typography/BaseText'

function PageListText({ children, ...other }) {
  return (
    <BaseText
      tag="span"
      color="darker"
      variant="medium"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default PageListText
