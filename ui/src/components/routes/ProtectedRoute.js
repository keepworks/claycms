import PropTypes from 'prop-types'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import AppContext from 'components/AppContext'
import { User } from 'models'
import { withClientMutation } from 'lib/data'

import SET_REFERRER from 'mutations/referrer'

function ProtectedRoute({
  component: Component,
  layout: Layout,
  layoutProps,
  location,
  requiredUserSessionState,
  setReferrer,
  ...other
}) {
  return (
    <Route
      render={props => (
        <AppContext.Consumer>
          {({ currentUser, referrer }) => {
            if (requiredUserSessionState === User.sessionStates.LOGGED_OUT && currentUser) {
              const route = (referrer && referrer.url) || '/user/teams'

              setReferrer({ url: null })

              return <Redirect to={route} />
            }

            if (requiredUserSessionState === User.sessionStates.LOGGED_IN && !currentUser) {
              const { pathname, search, hash } = location

              setReferrer({ url: (pathname || '') + (search || '') + (hash || '') })

              return <Redirect to="/" />
            }

            return (
              <Layout {...layoutProps}>
                <Component {...props} />
              </Layout>
            )
          }}
        </AppContext.Consumer>
      )}
      {...other}
    />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired,
  layoutProps: PropTypes.object,
  requiredUserSessionState: PropTypes.oneOf(Object.values(User.sessionStates)).isRequired
}

ProtectedRoute.defaultProps = {
  layoutProps: null
}

ProtectedRoute = withClientMutation(SET_REFERRER)(ProtectedRoute)

export default ProtectedRoute
