import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import ProjectPage from 'components/pages/ProjectPage'
import ProjectsPage from 'components/pages/ProjectsPage'
import TeamBillingPage from 'components/pages/TeamBillingPage'
import TeamMembersPage from 'components/pages/TeamMembersPage'
import TeamSettingsPage from 'components/pages/TeamSettingsPage'
import { withQuery } from 'lib/data'

function TeamPage({ match, team }) {
  if (!team) {
    // TODO: Handle NOT_FOUND: The resource you are looking for does not exist.
    return null
  }

  return (
    <Fragment>
      <Helmet>
        <title>
          {team.name}
        </title>
      </Helmet>

      <Switch>
        { /* `exact` ensures that Project* pages get rendered */ }
        <Route exact path={`${match.path}/projects`} component={ProjectsPage} />
        <Route path={`${match.path}/members`} component={TeamMembersPage} />
        <Route path={`${match.path}/billing`} component={TeamBillingPage} />
        <Route path={`${match.path}/settings`} component={TeamSettingsPage} />
        <Route path={`${match.path}/projects/:projectId`} component={ProjectPage} />
        <Redirect from={match.url} to={`${match.url}/projects`} />
      </Switch>
    </Fragment>
  )
}

TeamPage.fragments = {
  team: gql`
    fragment TeamPage_team on Team {
      id
      name
    }
  `
}

TeamPage = withQuery(gql`
  query TeamPage($id: ID!) {
    team(id: $id) {
      ...TeamPage_team
    }
  }

  ${TeamPage.fragments.team}
`, {
  options: ({ match }) => ({
    variables: { id: match.params.teamId }
  })
})(TeamPage)

export default TeamPage
