import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import AppLoader from 'components/AppLoader'
import ConfirmPage from 'components/pages/ConfirmPage'
import ForgotPasswordPage from 'components/pages/ForgotPasswordPage'
import lazy from 'lib/lazy'
import LoginPage from 'components/pages/LoginPage'
import OnboardingRoute from 'components/routes/OnboardingRoute'
import ResetPasswordPage from 'components/pages/ResetPasswordPage'
import SignupPage from 'components/pages/SignupPage'

const InternalRouter = lazy(() => import('components/routers/InternalRouter'))

function OnboardingRouter() {
  return (
    <Switch>
      <OnboardingRoute path="/login" component={LoginPage} />
      <OnboardingRoute path="/forgot-password" component={ForgotPasswordPage} />
      <OnboardingRoute path="/reset-password" component={ResetPasswordPage} />
      <OnboardingRoute path="/signup" component={SignupPage} />
      <OnboardingRoute path="/confirm/:token" component={ConfirmPage} />

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
