import injectSheet from 'react-jss'
import React from 'react'

import * as mixins from 'styles/mixins'

function MenuDivider({ classes }) {
  return <div className={classes.menuDivider} />
}

export default injectSheet(({ colors, units }) => ({
  menuDivider: {
    ...mixins.size('100%', 1),

    backgroundColor: colors.menuDividerBackground,
    marginTop: units.menuDividerVerticalMargin,
    marginBottom: units.menuDividerVerticalMargin
  }
}))(MenuDivider)
