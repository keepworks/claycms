import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import * as mixins from 'styles/mixins'
import Logo from 'components/Logo'
import { Greeting } from 'components/onboarding/typography'

const circleSize = 185

function Content({ children, classes }) {
  return (
    <div className={classes.content}>
      <Link to="/" className={classes.logoWrapper}>
        <Logo />
      </Link>

      <Greeting>
        {children}
      </Greeting>
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.node.isRequired
}

export default injectSheet(({ units }) => ({
  content: {
    height: units.onboardingContentHeight,
    paddingTop: units.onboardingContentVerticalPadding,
    position: 'relative',
    width: units.onboardingContentWidth,

    '&::after': {
      ...mixins.circle({ size: circleSize }),

      top: 0.5 * units.onboardingContentVerticalPadding,
      left: -0.5 * circleSize
    }
  },
  logoWrapper: {
    position: 'absolute',
    bottom: 40
  }
}))(Content)
