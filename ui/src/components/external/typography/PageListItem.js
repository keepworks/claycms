import injectSheet from 'react-jss'
import React from 'react'

import * as mixins from 'styles/mixins'
import { PageListText } from 'components/external/typography'

function PageListItem({ children, classes }) {
  return (
    <li className={classes.listItem}>
      <PageListText>
        {children}
      </PageListText>
    </li>
  )
}

export default injectSheet(({ colors, typography, units }) => ({
  listItem: {
    position: 'relative',
    paddingLeft: units.externalListItemBulletSize + units.externalListItemPaddingLeft,

    '&::before': {
      ...mixins.size(units.externalListItemBulletSize),

      backgroundColor: colors.externalListItemBulletColor,
      borderRadius: '50%',
      content: '" "',
      position: 'absolute',
      top: (
        (typography.medium.lineHeight * typography.medium.fontSize)
        - units.externalListItemBulletSize
      ) / 2,
      left: 0
    }
  }
}))(PageListItem)
