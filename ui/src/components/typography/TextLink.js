import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import cleanProps from 'lib/cleanProps'

function TextLink({
  href, to, children, className, classes, ...other
}) {
  const LinkTag = to ? Link : 'a'

  const linkProps = {}

  if (to) {
    linkProps.to = to
  } else if (href) {
    linkProps.href = href
    linkProps.target = '_blank'
  }

  return (
    <LinkTag className={classNames(className)} {...linkProps} {...cleanProps(other)}>
      {children}
    </LinkTag>
  )
}

TextLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  to: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ])
}

TextLink.defaultProps = {
  href: null,
  to: null
}

export default TextLink
