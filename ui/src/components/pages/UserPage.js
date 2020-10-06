import React from 'react'
import { Route, Switch } from 'react-router-dom'

import TeamsPage from 'components/pages/TeamsPage'
import UserProfilePage from 'components/pages/UserProfilePage'
import UserNotificationsPage from 'components/pages/UserNotificationsPage'

function UserPage({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}/teams`} component={TeamsPage} />
      <Route path={`${match.path}/profile`} component={UserProfilePage} />
      <Route path={`${match.path}/notifications`} component={UserNotificationsPage} />
    </Switch>
  )
}

export default UserPage
