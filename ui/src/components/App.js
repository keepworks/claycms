import gql from 'graphql-tag'
import Helmet, { HelmetProvider } from 'react-helmet-async'
import injectSheet from 'react-jss'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import * as mixins from 'styles/mixins'
import * as Sentry from '@sentry/browser'
import AppContext from 'components/AppContext'
import AppLoader from 'components/AppLoader'
import ExternalRouter from 'components/routers/ExternalRouter'
import User from 'models/User'
import { withClientQuery, withQuery } from 'lib/data'

import GET_REFERRER from 'queries/referrer'
import GET_TOKEN from 'queries/session'

const isUserLoggedIn = session => Boolean(session && session.token)

class App extends Component {
  configureSentry = () => {
    const { currentUser } = this.props

    let user = {}

    if (currentUser) {
      user = {
        id: user.id,
        email: user.email,
        name: User.fullName(user)
      }
    }

    Sentry.configureScope((scope) => {
      scope.setUser(user)
    })
  }

  render() {
    const { loading, currentUser, session, referrer } = this.props

    // Logout issue: After session changes, 'loading' continues to be set to true
    // even though the query is skipped. The issue was raised, but the fix seems to
    // be only for the <Query> component.
    // https://github.com/apollographql/react-apollo/issues/1869
    if (isUserLoggedIn(session) && loading) {
      return <AppLoader />
    }

    this.configureSentry()

    return (
      <HelmetProvider>
        <Helmet
          defaultTitle="Clay CMS | Headless CMS for React.js"
          titleTemplate="%s | Clay CMS"
        >
          <meta charSet="utf-8" />
          <meta name="description" content="Headless CMS for React.js" />
        </Helmet>
        <AppContext.Provider value={{ currentUser, referrer }}>
          <ExternalRouter />
        </AppContext.Provider>
      </HelmetProvider>
    )
  }
}

App = injectSheet(() => {
  const globalStyles = Object.keys(mixins.breakpoints).reduce((styles, breakpoint) => {
    styles[`.hidden-${breakpoint}`] = mixins.responsiveProperties({
      display: { [breakpoint]: 'none' }
    })

    styles[`.visible-${breakpoint}`] = mixins.responsiveProperties({
      display: { [breakpoint]: 'block' }
    })

    return styles
  }, {})

  return {
    '@global': globalStyles
  }
})(App)

App = withQuery(gql`
  query AppQuery {
    currentUser {
      id
      email
      firstName
      lastName
      profilePictureThumbnail
      profilePictureNormal
    }
  }
`, {
  skip: ({ session }) => !isUserLoggedIn(session)
})(App)

App = withClientQuery(GET_TOKEN)(App)

App = withClientQuery(GET_REFERRER)(App)

export default withRouter(App)
