import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function SubTitle({ classes, children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="dark"
      variant="semiboldSquished"
      className={classes.subTitle}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  subTitle: {
    marginTop: units.internalSubTitleMarginVertical,
    marginBottom: units.internalSubTitleMarginVertical
  }
}))(SubTitle)
