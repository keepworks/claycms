import injectSheet from 'react-jss'
import React from 'react'

import FontIcon from 'components/FontIcon'

function PanelHeader({ children, classes, icon }) {
  return (
    <div className={classes.panelHeader}>
      {icon && (
        <div className={classes.iconWrapper}>
          <FontIcon name={icon} />
        </div>
      )}
      {children}
    </div>
  )
}

export default injectSheet(({ colors, units }) => ({
  panelHeader: {
    alignItems: 'center',
    backgroundColor: colors.panelHeaderBackgroundColor,
    borderBottomColor: colors.panelHeaderBottomBorder,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    display: 'flex',
    paddingBottom: units.panelHeaderVerticalPadding,
    paddingLeft: units.panelHeaderHorizontalPadding,
    paddingRight: units.panelHeaderHorizontalPadding,
    paddingTop: units.panelHeaderVerticalPadding
  },
  iconWrapper: {
    color: colors.panelHeaderIcon,
    marginRight: units.panelHeaderIconWrapperMarginRight
  }
}))(PanelHeader)
