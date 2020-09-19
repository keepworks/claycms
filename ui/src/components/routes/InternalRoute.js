import React from 'react'

import InternalLayout from 'components/layouts/InternalLayout'
import ProtectedRoute from 'components/routes/ProtectedRoute'
import { User } from 'models'

function InternalRoute(props) {
  return (
    <ProtectedRoute
      layout={InternalLayout}
      requiredUserSessionState={User.sessionStates.LOGGED_IN}
      {...props}
    />
  )
}

export default InternalRoute
