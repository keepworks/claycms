import React from 'react'
import { Route, Switch } from 'react-router-dom'

import InternalRoute from 'components/routes/InternalRoute'
import TeamPage from 'components/pages/TeamPage'
import TransferRequestPage from 'components/pages/TransferRequestPage'
import UserPage from 'components/pages/UserPage'

function InternalRouter() {
  return (
    <Switch>
      <InternalRoute path="/user" component={UserPage} />
      <InternalRoute path="/teams/:teamId" component={TeamPage} />
      <InternalRoute path="/transfer-request/:token/:action" component={TransferRequestPage} />

      <Route
        render={() => (
          <div>
            Not Found
          </div>
        )}
      />
    </Switch>
  )
}

export default InternalRouter
