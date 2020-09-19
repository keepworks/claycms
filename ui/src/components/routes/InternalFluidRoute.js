import React from 'react'

import InternalLayout from 'components/layouts/InternalLayout'
import ProtectedRoute from 'components/routes/ProtectedRoute'
import { User } from 'models'

function InternalFluidRoute(props) {
  return (
    <ProtectedRoute
      layout={InternalLayout}
      layoutProps={{ fluid: true }}
      requiredUserSessionState={User.sessionStates.LOGGED_IN}
      {...props}
    />
  )
}

export default InternalFluidRoute
