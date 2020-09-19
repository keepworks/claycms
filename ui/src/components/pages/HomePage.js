import gql from 'graphql-tag'
import injectSheet from 'react-jss'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Footer from 'components/external/Footer'
import GridContainer from 'components/external/GridContainer'
import GridItem from 'components/external/GridItem'
import Header from 'components/external/Header'
import Logo from 'components/Logo'
import { Heading } from 'components/external/typography'
import { withMutation } from 'lib/data'

function HomePage({ classes }) {
  return (
    <Fragment>
      <div className={classes.hero}>
        <Header />

        <GridContainer>
          <GridItem end="span 10">
            <Link to="/">
              <Logo size="large" />
            </Link>
            <Heading>
              Headless CMS for React.js
            </Heading>
          </GridItem>
        </GridContainer>
      </div>

      <div className={classes.footerWrapper}>
        <Footer />
      </div>
    </Fragment>
  )
}

HomePage = injectSheet(({ gradients, units }) => ({
  hero: {
    height: units.externalHeroHeight,
    position: 'relative',
    zIndex: 0,

    '&::before': {
      backgroundImage: gradients.externalHeroBackground,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      content: '" "',
      minWidth: 3000,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: -1
    }
  },
  footerWrapper: {
    overflow: 'hidden',
    position: 'fixed',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0
  }
}))(HomePage)

HomePage = withMutation(gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      isConfirmationExpired
    }
  }
`)(HomePage)

export default HomePage
