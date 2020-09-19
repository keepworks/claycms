import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import AppLoader from 'components/AppLoader'
import ExternalRoute from 'components/routes/ExternalRoute'
import HomePage from 'components/pages/HomePage'
import lazy from 'lib/lazy'
import PrivacyPolicyPage from 'components/pages/PrivacyPolicyPage'
import TermsOfServicePage from 'components/pages/TermsOfServicePage'

const OnboardingRouter = lazy(() => import('components/routers/OnboardingRouter'))

function ExternalRouter() {
  return (
    <Switch>
      <ExternalRoute exact path="/" component={HomePage} layoutProps={{ isBare: true }} />
      <ExternalRoute path="/terms-of-service" component={TermsOfServicePage} />
      <ExternalRoute path="/privacy-policy" component={PrivacyPolicyPage} />

      <Route
        render={() => (
          <Suspense fallback={<AppLoader />}>
            <OnboardingRouter />
          </Suspense>
        )}
      />
    </Switch>
  )
}

export default ExternalRouter
