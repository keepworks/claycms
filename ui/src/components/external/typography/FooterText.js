import React from 'react'

import BaseText from 'components/typography/BaseText'

function FooterText({ children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="pale"
      variant="regularSmallSquishedResponsive"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default FooterText
