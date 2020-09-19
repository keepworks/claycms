import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function HeaderItemText({ classes, children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="light"
      variant="semiboldSmallSquished"
      className={classes.headerItemText}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(() => ({
  headerItemText: {
    lineHeight: '17px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%'
  }
}))(HeaderItemText)
