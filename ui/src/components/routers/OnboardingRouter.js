import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import AppLoader from 'components/AppLoader'
import lazy from 'lib/lazy'
import OnboardingRoute from 'components/routes/OnboardingRoute'
import SSOCallbackPage from 'components/pages/SSOCallbackPage'
import SSOLoginPage from 'components/pages/SSOLoginPage'

const InternalRouter = lazy(() => import('components/routers/InternalRouter'))

function OnboardingRouter() {
  return (
    <Switch>
      <OnboardingRoute path="/sso/login" component={SSOLoginPage} />
      <OnboardingRoute path="/sso/callback" component={SSOCallbackPage} />

      <Route
        render={() => (
          <Suspense fallback={<AppLoader />}>
            <InternalRouter />
          </Suspense>
        )}
      />
    </Switch>
  )
}

export default OnboardingRouter
