import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import cleanProps from 'lib/cleanProps'

let Badge = ({ _ref, size, variant, classes, children, ...other }) => (
  <div ref={_ref} className={classNames(classes.badge, classes[`badge_${variant}`])} {...cleanProps(other)}>
    {children}
  </div>
)

Badge.sizes = {
  small: 12,
  medium: 16,
  large: 24
}

Badge.propTypes = {
  size: PropTypes.oneOf([ 'small', 'medium', 'large' ]),
  variant: PropTypes.oneOf([ 'primary' ])
}

Badge.defaultProps = {
  size: 'medium',
  variant: 'primary'
}

Badge = injectSheet(({ colors }) => ({
  badge: ({ size }) => ({
    ...mixins.size(Badge.sizes[size]),

    alignItems: 'center',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center'
  }),
  badge_primary: {
    backgroundColor: colors.badgeBackground_primary,
    color: colors.badgeText_primary
  }
}))(Badge)

export default React.forwardRef((props, ref) => <Badge _ref={ref} {...props} />)
