import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import cleanProps from 'lib/cleanProps'
import FontIcon from 'components/FontIcon'

function IconLink({ href, icon, iconSize, to, children, className, classes, ...other }) {
  const LinkTag = to ? Link : 'a'

  const linkProps = {}

  if (to) {
    linkProps.to = to
  } else if (href) {
    linkProps.href = href
    linkProps.target = '_blank'
  }

  return (
    <LinkTag
      className={classNames(className, classes.iconLinkWrapper)}
      {...linkProps}
      {...cleanProps(other)}
    >
      {children}
      {icon && <FontIcon name={icon} size="tiny" />}
    </LinkTag>
  )
}

IconLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  icon: PropTypes.string,
  to: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ])
}

IconLink.defaultProps = {
  href: null,
  icon: null,
  to: null
}

IconLink = injectSheet(({ colors, typography, units }) => ({
  iconLinkWrapper: {
    ...typography.mediumSquished,

    alignItems: 'center',
    color: colors.iconLink,
    display: 'flex',

    '& .icon': {
      marginLeft: units.iconLinkIconMarginLeft
    }
  }
}))(IconLink)

export default IconLink
