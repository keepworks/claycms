import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import * as mixins from 'styles/mixins'

function FooterLink({ to, children, classes }) {
  return (
    <NavLink to={to} className={classes.footerLink} activeClassName={classes.footerLink_active}>
      {children}
    </NavLink>
  )
}

FooterLink.propTypes = {
  to: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  children: PropTypes.node.isRequired
}

FooterLink.defaultProps = {
  to: null
}

export default injectSheet(({ colors, typography }) => ({
  footerLink: {
    ...mixins.transitionSimple(),
    ...typography.regularSmallSquishedResponsive,

    color: colors.text_pale,

    '&:hover': {
      color: colors.text_darker
    }
  },
  footerLink_active: {
    color: colors.text_primary,

    '&:hover': {
      color: colors.text_primary
    }
  }
}))(FooterLink)
