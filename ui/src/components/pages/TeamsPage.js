import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Component, Fragment } from 'react'

import DataTiles from 'components/internal/DataTiles'
import IconButton from 'components/internal/buttons/IconButton'
import Loader from 'components/internal/Loader'
import TeamDialog from 'components/internal/dialogs/TeamDialog'
import TeamPage from 'components/pages/TeamPage'
import { MutationResponseModes, OptimisticResponseModes, withMutation, withQuery } from 'lib/data'
import { PageTitle } from 'components/internal/typography'

class TeamsPage extends Component {
  constructor() {
    super()

    this.state = {
      isTeamDialogOpen: false
    }
  }

  openTeamDialog = () => this.setState({ isTeamDialogOpen: true })

  closeTeamDialog = () => this.setState({ isTeamDialogOpen: false })

  handleFormSubmit = (values) => {
    const { createTeam, history } = this.props

    return createTeam(values, {
      onSuccess: ({ data: { team: { id } } }) => {
        this.closeTeamDialog()
        history.push(`/teams/${id}`)
      }
    })
  }

  render() {
    const { loading, teams } = this.props
    const { isTeamDialogOpen } = this.state

    return (
      <Fragment>
        <Helmet>
          <title>
            Teams
          </title>
        </Helmet>

        <PageTitle>
          Teams
        </PageTitle>

        <IconButton icon="plus" onClick={this.openTeamDialog} />

        <Loader
          record={{
            loading,
            value: teams
          }}
          emptyView={{
            buttonLabel: 'Create new team',
            title: 'teams',
            onButtonClick: this.openTeamDialog
          }}
        />

        <DataTiles loading={loading} records={teams} tileLink={id => `/teams/${id}`} />

        <TeamDialog
          isOpen={isTeamDialogOpen}
          onFormSubmit={this.handleFormSubmit}
          onRequestClose={this.closeTeamDialog}
        />
      </Fragment>
    )
  }
}

TeamsPage = withMutation(gql`
  mutation CreateTeamMutation($input: CreateTeamInput!) {
    team: createTeam(input: $input) {
      ...TeamPage_team
    }
  }

  ${TeamPage.fragments.team}
`, {
  mode: MutationResponseModes.APPEND,
  optimistic: { mode: OptimisticResponseModes.CREATE, response: { __typename: 'Team' } }
})(TeamsPage)

export default withQuery(gql`
  query TeamsPageQuery {
    teams {
      ...TeamPage_team
    }
  }

  ${TeamPage.fragments.team}
`)(TeamsPage)
