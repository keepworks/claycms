import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import AssetsPage from 'components/pages/AssetsPage'
import DashboardPage from 'components/pages/DashboardPage'
import EntitiesPage from 'components/pages/EntitiesPage'
import EntityPage from 'components/pages/EntityPage'
import Loader from 'components/internal/Loader'
import ResourcesPage from 'components/pages/ResourcesPage'
import ProjectSettingsPage from 'components/pages/ProjectSettingsPage'
import { withQuery } from 'lib/data'

function ProjectPage({ history, match, project, loading }) {
  if (!loading && !project) {
    history.push(`/teams/${match.params.teamId}`)
    return null
  }

  if (loading) {
    return <Loader record={{ loading: true }} />
  }

  return (
    <Fragment>
      <Helmet>
        <title>
          {project.name}
        </title>
      </Helmet>

      <Switch>
        <Route path={`${match.path}/dashboard`} component={DashboardPage} />
        <Route path={`${match.path}/entities/:entityId`} component={EntityPage} />
        <Route path={`${match.path}/entities`} component={EntitiesPage} />
        <Route path={`${match.path}/assets`} component={AssetsPage} />
        <Route path={`${match.path}/resources`} component={ResourcesPage} />
        <Route path={`${match.path}/settings`} component={ProjectSettingsPage} />
        <Redirect from={match.url} to={`${match.url}/entities`} />
      </Switch>
    </Fragment>
  )
}

ProjectPage.fragments = {
  project: gql`
    fragment ProjectPage_project on Project {
      id
      name
      teamId
      isRestoring
    }
  `
}

ProjectPage = withQuery(gql`
  query ProjectPage($id: ID!) {
    project(id: $id) {
      ...ProjectPage_project
    }
  }

  ${ProjectPage.fragments.project}
`, {
  options: ({ match }) => ({
    variables: { id: match.params.projectId }
  })
})(ProjectPage)

export default ProjectPage
