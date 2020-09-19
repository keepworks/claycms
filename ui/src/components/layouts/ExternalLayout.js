import Helmet from 'react-helmet-async'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import * as mixins from 'styles/mixins'
import AlertBox from 'components/AlertBox'
import Footer from 'components/external/Footer'
import Header from 'components/external/Header'
import resolveImage from 'lib/resolveImage'
import ScrollToTop from 'components/ScrollToTop'

function ExternalLayout({ isBare, classes, children }) {
  const content = isBare ? children : (
    <Fragment>
      <div className={classes.pageCircle} />

      <div className={classes.header}>
        <Header />
      </div>

      {children}

      <Footer />
    </Fragment>
  )

  return (
    <Fragment>
      <Helmet>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </Helmet>

      <ScrollToTop>
        <div className={classes.externalBackground}>
          {content}
          <AlertBox />
        </div>
      </ScrollToTop>
    </Fragment>
  )
}

ExternalLayout.propTypes = {
  isBare: PropTypes.bool,
  children: PropTypes.node.isRequired
}

ExternalLayout.defaultProps = {
  isBare: false
}

export default injectSheet(({ colors, gradients, units }) => ({
  pageCircle: {
    ...mixins.backgroundContain(),
    ...mixins.responsiveProperties({
      height: units.externalPageCircleSizeResponsive,
      width: units.externalPageCircleSizeResponsive,
      bottom: units.externalPageCircleShiftBottomResponsive,
      left: units.externalPageCircleShiftLeftResponsive
    }),

    backgroundImage: `url(${resolveImage('external/page-circle.png')})`,
    content: '" "',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: -1
  },
  header: {
    position: 'relative',
    zIndex: 0,

    '&::before': {
      content: '" "',
      backgroundImage: gradients.externalHeroBackground,
      position: 'absolute',
      top: '-150%',
      right: '-15%',
      left: '30%',
      bottom: 0,
      zIndex: -1,

      ...mixins.responsiveProperties({
        borderBottomRightRadius: { xs: '20%', sm: '25%', md: '30%' },
        borderBottomLeftRadius: { xs: '70%' }
      })
    }
  },
  externalBackground: {
    backgroundColor: colors.externalBackground,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 0
  }
}))(ExternalLayout)
