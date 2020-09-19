import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import FontIcon from 'components/FontIcon'
import { SidebarBreadcrumbText, SidebarBreadcrumbTitle } from 'components/internal/typography'

function SidebarBreadcrumb({
  icon, leftItems, rightItems, link, text, title, classes
}) {
  const renderSidebarHeader = () => (
    <div className={classes.sidebarBreadcrumbTitleWrapper}>
      {icon && <FontIcon name={icon} size="small" />}
      <SidebarBreadcrumbTitle>
        {title}
      </SidebarBreadcrumbTitle>
    </div>
  )

  const renderBreadcrumbLeftItems = () => (
    leftItems && leftItems.map((item, index) => (
      <Fragment key={`breadcrumbLeftItem-${index}` /* eslint react/no-array-index-key: "off" */}>
        <div className={classes.itemSeparator} />
        <div className={classes.sidebarBreadcrumbItem}>
          {item}
        </div>
      </Fragment>
    ))
  )

  return (
    <div className={classes.sidebarBreadcrumb}>
      <div className={classes.sidebarBreadcrumbHeaderWrapper}>
        {link ? (
          <Link to={link}>
            {renderSidebarHeader()}
          </Link>
        ) : renderSidebarHeader()}
        <div className={classes.sidebarBreadcrumbTextWrapper}>
          {text && (
            <SidebarBreadcrumbText>
              {text}
            </SidebarBreadcrumbText>
          )}
          {renderBreadcrumbLeftItems()}
        </div>
      </div>

      <div className={classes.rightItems}>
        {rightItems}
      </div>
    </div>
  )
}

SidebarBreadcrumb.propTypes = {
  icon: PropTypes.string,
  leftItems: PropTypes.arrayOf(PropTypes.node),
  rightItems: PropTypes.arrayOf(PropTypes.node),
  text: PropTypes.string,
  title: PropTypes.string
}

SidebarBreadcrumb.defaultProps = {
  icon: null,
  leftItems: null,
  rightItems: null,
  text: null,
  title: null
}

export default injectSheet(({ colors, units }) => ({
  sidebarBreadcrumb: {
    alignItems: 'center',
    display: 'flex',
    marginRight: -1 * units.sidebarHorizontalPadding,
    marginLeft: -1 * units.sidebarHorizontalPadding,
    justifyContent: 'space-between',
    paddingTop: units.sidebarBreadcrumbPaddingVertical,
    paddingRight: units.sidebarItemPaddingHorizontal,
    paddingBottom: units.sidebarBreadcrumbPaddingVertical,
    paddingLeft: units.sidebarItemPaddingHorizontal
  },
  sidebarBreadcrumbTitleWrapper: {
    alignItems: 'center',
    display: 'inline-flex',

    '& .icon': {
      color: colors.text_pale,
      paddingRight: units.sidebarBreadcrumbIconPaddingRight
    }
  },
  sidebarBreadcrumbTextWrapper: {
    alignItems: 'center',
    display: 'flex',
    marginTop: units.sidebarBreadcrumbTextWrapperMarginTop
  },
  sidebarBreadcrumbItem: {
    alignSelf: 'stretch',
    alignItems: 'center',
    display: 'flex'
  },
  sidebarBreadcrumbHeaderWrapper: {
    width: '100%'
  },
  itemSeparator: {
    alignSelf: 'stretch',
    backgroundColor: colors.sidebarBreadcrumbItemBorder,
    marginTop: units.sidebarBreadcrumbItemMarginVertical,
    marginRight: units.sidebarBreadcrumbItemMarginHorizontal,
    marginBottom: units.sidebarBreadcrumbItemMarginVertical,
    marginLeft: units.sidebarBreadcrumbItemMarginHorizontal,
    width: 1
  },
  rightItems: {
    display: 'flex'
  }
}))(SidebarBreadcrumb)
