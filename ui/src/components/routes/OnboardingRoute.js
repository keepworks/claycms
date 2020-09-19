import React from 'react'

import OnboardingLayout from 'components/layouts/OnboardingLayout'
import ProtectedRoute from 'components/routes/ProtectedRoute'
import { User } from 'models'

function OnboardingRoute(props) {
  return (
    <ProtectedRoute
      layout={OnboardingLayout}
      requiredUserSessionState={User.sessionStates.LOGGED_OUT}
      {...props}
    />
  )
}

export default OnboardingRoute
