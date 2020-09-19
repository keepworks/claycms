import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import AlertBox from 'components/AlertBox'
import Container from 'components/Container'
import ScrollToTop from 'components/ScrollToTop'

function OnboardingLayout({ classes, children }) {
  return (
    <ScrollToTop>
      <div className={classes.onboardingBackground}>
        <Container>
          {children}
        </Container>
        <AlertBox />
      </div>
    </ScrollToTop>
  )
}

OnboardingLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default injectSheet(({ gradients }) => ({
  onboardingBackground: {
    ...mixins.size('100vw', '100vh'),

    backgroundImage: gradients.onboardingBackground,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden'
  }
}))(OnboardingLayout)
