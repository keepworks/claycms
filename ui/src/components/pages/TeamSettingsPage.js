import _ from 'lodash'
import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Component, Fragment } from 'react'

import AppContext from 'components/AppContext'
import ChangeTeamNameForm from 'components/internal/forms/ChangeTeamNameForm'
import CreateTransferRequestForm from 'components/internal/forms/CreateTransferRequestForm'
import FilledButton from 'components/buttons/FilledButton'
import ItemBar from 'components/ItemBar'
import Loader from 'components/internal/Loader'
import Spacer from 'components/Spacer'
import Text from 'components/typography/Text'
import { PageTitle, PanelText, TextLink } from 'components/internal/typography'
import { Panel, PanelBody, PanelContainer, PanelHeader } from 'components/internal/panel'
import { User } from 'models'
import { withQuery, withMutation } from 'lib/data'

class TeamSettingsPage extends Component {
  onCancelTransferRequest = () => {
    const { cancelTransferRequest, team } = this.props

    cancelTransferRequest({ id: team.id })
  }

  transferableUsersList = () => {
    const { teamMemberships } = this.props

    const options = teamMemberships
      .filter(({ role }) => role !== 'owner')
      .map(({ user: { id, firstName, lastName, email } }) => {
        const fullName = User.fullName({ firstName, lastName })
        const label = fullName.length ? `${fullName} (${email})` : email

        return { value: id, label }
      })

    return _.orderBy(options, [ option => option.label.toLowerCase() ], [ 'asc' ])
  }

  renderChangeTeamNamePanel = () => {
    const { team, updateTeam } = this.props

    return (
      <Panel>
        <PanelHeader icon="team">
          <Text color="dark" variant="semibold">Change Team Name</Text>
        </PanelHeader>
        <PanelBody>
          <ChangeTeamNameForm
            initialValues={{ id: team.id, name: team.name }}
            onSubmit={updateTeam}
          />
        </PanelBody>
      </Panel>
    )
  }

  renderTransferOwnershipPanel = (currentUser) => {
    const {
      createTransferRequest,
      teamMemberships,
      team: { id, isTransferRequested, transferOwner }
    } = this.props

    const owner = teamMemberships.find(({ role }) => role === 'owner').user
    const isOwner = owner.id === currentUser.id

    const transferableUsersList = this.transferableUsersList()

    return (
      <Panel>
        <PanelHeader icon="team">
          <Text color="dark" variant="semibold">Transfer Ownership</Text>
        </PanelHeader>
        <PanelBody>
          {isOwner && !isTransferRequested && (
            <Fragment>
              <PanelText>
                You (
                <strong>{currentUser.email}</strong>
                ) are the current owner of this team. Once you transfer this team,
                {' '}
                <strong>only the new owner can transfer it back.</strong>
              </PanelText>
              <Spacer height={20} />
              {transferableUsersList.length ? (
                <CreateTransferRequestForm
                  initialValues={{ id }}
                  onSubmit={createTransferRequest}
                  options={transferableUsersList}
                />
              ) : (
                <PanelText color="dark">
                  You need to
                  {' '}
                  <TextLink inherit to={`/teams/${id}/members`}>invite someone</TextLink>
                  {' '}
                  to your team before you can transfer ownership.
                </PanelText>
              )}
            </Fragment>
          )}
          {isOwner && isTransferRequested && (
            <ItemBar>
              <PanelText>
                Waiting for
                {' '}
                <strong>{User.fullName(transferOwner)}</strong>
                {` (${transferOwner.email}) `}
                to accept your transfer request.
              </PanelText>
              <FilledButton type="button" variant="flat" label="Cancel Transfer" onClick={this.onCancelTransferRequest} />
            </ItemBar>
          )}
          {!isOwner && (
            <PanelText>
              Only the team owner,
              {' '}
              <strong>{User.fullName(owner)}</strong>
              {` (${owner.email}), `}
              can transfer ownership of this team.
            </PanelText>
          )}
        </PanelBody>
      </Panel>
    )
  }

  render() {
    const { loading } = this.props

    return (
      <AppContext.Consumer>
        {({ currentUser }) => (
          <Fragment>
            <Helmet>
              <title>
                Team Settings
              </title>
            </Helmet>

            <PageTitle>
              Settings
            </PageTitle>

            {loading ? (
              <Loader />
            ) : (
              <PanelContainer>
                {this.renderChangeTeamNamePanel()}
                {this.renderTransferOwnershipPanel(currentUser)}
              </PanelContainer>
            )}
          </Fragment>
        )}
      </AppContext.Consumer>
    )
  }
}

TeamSettingsPage = withQuery(gql`
  query TeamQuery($id: ID!) {
    team(id: $id) {
      id
      name
      isTransferRequested
      transferOwner {
        id
        email
        firstName
        lastName
      }
    }

    teamMemberships(teamId: $id) {
      id
      role

      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`, {
  options: ({ match }) => ({
    variables: { id: match.params.teamId }
  })
})(TeamSettingsPage)

TeamSettingsPage = withMutation(gql`
  mutation UpdateTeamMutation($id: ID!, $input: UpdateTeamInput!) {
    updateTeam(id: $id, input: $input) {
      id
      name
    }
  }
`, {
  successAlert: ({ input: { name } }) => ({
    message: `Successfully changed team name to: ${name}`
  })
})(TeamSettingsPage)

TeamSettingsPage = withMutation(gql`
  mutation CreateTransferRequestMutator($id: ID!, $input: CreateTransferRequestInput!) {
    createTransferRequest(id: $id, input: $input) {
      id
      isTransferRequested

      transferOwner {
        id
        firstName
        lastName
        email
      }
    }
  }
`, {
  successAlert: {
    message: 'Successfully created the transfer request.'
  }
})(TeamSettingsPage)

TeamSettingsPage = withMutation(gql`
  mutation CancelTransferRequestMutation($id: ID!) {
    cancelTransferRequest(id: $id) {
      id
      isTransferRequested
    }
  }
`, {
  successAlert: {
    title: 'Canceled.',
    message: 'Successfully canceled the transfer request.'
  }
})(TeamSettingsPage)

export default TeamSettingsPage
