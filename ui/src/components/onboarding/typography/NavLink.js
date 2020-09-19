import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import * as mixins from 'styles/mixins'

function NavLink({
  to, children, classes
}) {
  return (
    <Link to={to} className={classes.navLink}>
      {children}
    </Link>
  )
}

NavLink.propTypes = {
  to: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  children: PropTypes.node.isRequired
}

NavLink.defaultProps = {
  to: null
}

export default injectSheet(({ colors, typography }) => ({
  navLink: {
    ...mixins.animateUnderline({ bottom: -6 }),
    ...typography.semibold,

    color: colors.text_light
  }
}))(NavLink)
