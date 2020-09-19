import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Component, Fragment } from 'react'

import DataTiles from 'components/internal/DataTiles'
import IconButton from 'components/internal/buttons/IconButton'
import Loader from 'components/internal/Loader'
import ProjectDialog from 'components/internal/dialogs/ProjectDialog'
import ProjectPage from 'components/pages/ProjectPage'
import { MutationResponseModes, OptimisticResponseModes, withMutation, withQuery } from 'lib/data'
import { PageTitle } from 'components/internal/typography'

class ProjectsPage extends Component {
  constructor() {
    super()

    this.state = {
      isProjectDialogOpen: false
    }
  }

  openProjectDialog = () => this.setState({ isProjectDialogOpen: true })

  closeProjectDialog = () => this.setState({ isProjectDialogOpen: false })

  handleFormSubmit = (values) => {
    const { createProject, history } = this.props

    return createProject(values, {
      onSuccess: ({ data: { project: { id, teamId } } }) => {
        this.closeProjectDialog()
        history.push(`/teams/${teamId}/projects/${id}`)
      }
    })
  }

  render() {
    const { loading, match, projects } = this.props
    const { isProjectDialogOpen } = this.state

    return (
      <Fragment>
        <Helmet>
          <title>
            Projects
          </title>
        </Helmet>

        <PageTitle>
          Projects
        </PageTitle>

        <IconButton icon="plus" onClick={this.openProjectDialog} />

        <Loader
          record={{
            loading,
            value: projects
          }}
          emptyView={{
            buttonLabel: 'Create new project',
            title: 'projects',
            onButtonClick: this.openProjectDialog
          }}
        />

        <DataTiles loading={loading} records={projects} tileLink={id => `${match.url}/${id}`} />

        <ProjectDialog
          isOpen={isProjectDialogOpen}
          formValues={{ teamId: match.params.teamId }}
          onFormSubmit={this.handleFormSubmit}
          onRequestClose={this.closeProjectDialog}
        />
      </Fragment>
    )
  }
}

ProjectsPage = withMutation(gql`
  mutation CreateProjectMutation($input: CreateProjectInput!) {
    project: createProject(input: $input) {
      ...ProjectPage_project
    }
  }

  ${ProjectPage.fragments.project}
`, {
  mode: MutationResponseModes.APPEND,
  optimistic: { mode: OptimisticResponseModes.CREATE, response: { __typename: 'Project' } }
})(ProjectsPage)

export default withQuery(gql`
  query ProjectsPageQuery($teamId: ID!) {
    projects(teamId: $teamId) {
      ...ProjectPage_project
    }
  }

  ${ProjectPage.fragments.project}
`, {
  options: ({ match }) => ({
    variables: { teamId: match.params.teamId }
  })
})(ProjectsPage)
