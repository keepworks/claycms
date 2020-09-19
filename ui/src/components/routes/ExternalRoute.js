import React from 'react'

import ExternalLayout from 'components/layouts/ExternalLayout'
import ProtectedRoute from 'components/routes/ProtectedRoute'
import { User } from 'models'

function ExternalRoute(props) {
  return (
    <ProtectedRoute
      layout={ExternalLayout}
      requiredUserSessionState={User.sessionStates.LOGGED_OUT}
      {...props}
    />
  )
}

export default ExternalRoute
