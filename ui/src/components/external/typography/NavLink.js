import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import * as mixins from 'styles/mixins'

function NavLink({
  className, isButton, to, children, classes
}) {
  return (
    <Link to={to} className={classNames(`${isButton ? classes.navLink_button : classes.navLink}`, className)}>
      {children}
    </Link>
  )
}

NavLink.propTypes = {
  className: PropTypes.string,
  isButton: PropTypes.bool,
  to: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  children: PropTypes.node.isRequired
}

NavLink.defaultProps = {
  className: null,
  isButton: false,
  to: null
}

export default injectSheet(({
  colors, shadows, typography, units
}) => ({
  navLink: {
    ...mixins.animateUnderline({ bottom: -3 }),
    ...typography.semiboldSmallResponsive,

    color: colors.text_light,
    textTransform: 'uppercase'
  },
  navLink_button: {
    ...mixins.transitionSimple(),
    ...typography.semiboldSmallResponsive,

    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: units.externalButtonBorderRadius,
    boxShadow: shadows.externalButton,
    color: colors.text_darker,
    cursor: 'pointer',
    display: 'flex',
    height: units.externalButtonHeight,
    justifyContent: 'center',
    minWidth: units.externalButtonWidth,
    paddingTop: 0,
    paddingRight: units.externalNavLinkHorizontalPadding_button,
    paddingBottom: 0,
    paddingLeft: units.externalNavLinkHorizontalPadding_button,
    textTransform: 'uppercase',

    '&:hover, &:focus': {
      color: colors.text_primary
    }
  }
}))(NavLink)
