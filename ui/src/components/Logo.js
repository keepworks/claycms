import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import resolveImage from 'lib/resolveImage'

const sizes = {
  symbol_normal: [ 35, 54 ],
  text_normal: [ 89, 40 ],
  text_large: [ 134, 60 ]
}

function Logo({ type, variant, classes }) {
  return <img src={resolveImage(`logo-${type}-${variant}.png`)} alt="Clay CMS" className={classes.logo} />
}

Logo.propTypes = {
  size: PropTypes.oneOf([ 'normal', 'large' ]),
  type: PropTypes.oneOf([ 'symbol', 'text' ]),
  variant: PropTypes.oneOf([ 'color', 'white' ])
}

Logo.defaultProps = {
  size: 'normal',
  type: 'text',
  variant: 'white'
}

export default injectSheet(() => ({
  logo: ({ size, type }) => ({
    ...mixins.size(...sizes[`${type}_${size}`])
  })
}))(Logo)
