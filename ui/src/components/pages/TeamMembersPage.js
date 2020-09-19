import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import injectSheet from 'react-jss'
import React, { Component, Fragment } from 'react'

import AppContext from 'components/AppContext'
import BoxCell from 'components/internal/dataTable/BoxCell'
import FontIcon from 'components/FontIcon'
import IconButton from 'components/internal/buttons/IconButton'
import Loader from 'components/internal/Loader'
import ProfilePicture from 'components/internal/ProfilePicture'
import Table from 'components/internal/dataTable/Table'
import TeamMemberDialog from 'components/internal/dialogs/TeamMemberDialog'
import { MutationResponseModes, OptimisticResponseModes, withMutation, withQuery } from 'lib/data'
import { PageTitle } from 'components/internal/typography'
import { TeamMembership, User } from 'models'

const statusMap = {
  CONFIRMED: {
    icon: 'round-tick',
    color: '#6cf1ba'
  },
  UNCONFIRMED: {
    icon: 'slide-right',
    color: '#ffd76e'
  }
}

class TeamMembersPage extends Component {
  constructor() {
    super()

    this.state = {
      isTeamMemberDialogOpen: false,
      teamMembership: {}
    }
  }

  static getDerivedStateFromProps(props) {
    const { history, location } = props

    if (location.state && location.state.newMember) {
      // Clear state from location for next re-render.
      history.replace({ state: {} })

      return {
        isTeamMemberDialogOpen: true
      }
    }

    // Return null to indicate no change to state.
    return null
  }

  openTeamMembersDialog = teamMembership => this.setState({
    teamMembership, isTeamMemberDialogOpen: true
  })

  closeTeamMembersDialog = () => this.setState({ isTeamMemberDialogOpen: false })

  handleFormSubmit = (values) => {
    const { createTeamMembership, updateTeamMembership } = this.props

    if (values.id) {
      return updateTeamMembership(values, { onSuccess: () => this.closeTeamMembersDialog() })
    }

    return createTeamMembership(values, { onSuccess: () => this.closeTeamMembersDialog() })
  }

  profileCellRenderer = ({ record: { user } }) => <ProfilePicture inverted user={user} />

  fullNameCellRenderer = ({ record: { user } }) => {
    const { classes } = this.props

    return (
      <div className={classes.fullName}>
        {User.fullName(user)}
      </div>
    )
  }

  emailCellRenderer = ({ record: { user: { email } } }) => {
    const { classes } = this.props

    return (
      <div className={classes.email}>
        {email}
      </div>
    )
  }

  statusCellRenderer = ({ record: { user: { isConfirmed } } }) => {
    const { classes } = this.props

    return (
      <div className={classes.status}>
        {isConfirmed ? 'Normal' : 'Pending'}
        <div
          style={{ color: isConfirmed ? statusMap.CONFIRMED.color : statusMap.UNCONFIRMED.color }}
        >
          <FontIcon name={isConfirmed ? statusMap.CONFIRMED.icon : statusMap.UNCONFIRMED.icon} size="small" />
        </div>
      </div>
    )
  }

  render() {
    const {
      destroyTeamMembership,
      loading,
      match: { params: { teamId } },
      teamMemberships
    } = this.props
    const { isTeamMemberDialogOpen, teamMembership } = this.state

    const columns = [
      { dataKey: 'user.profile', flexGrow: 1, cellWrapper: BoxCell, cellRenderer: this.profileCellRenderer },
      { dataKey: 'user.firstName', flexGrow: 1, bordered: false, cellRenderer: this.fullNameCellRenderer },
      { dataKey: 'user.email', flexGrow: 1, pale: true, cellRenderer: this.emailCellRenderer },
      { dataKey: 'role', width: 150, uppercase: true },
      { dataKey: 'user.status', width: 150, uppercase: true, cellRenderer: this.statusCellRenderer }
    ]

    const actions = [
      { icon: 'edit', onClick: record => this.openTeamMembersDialog(record) },
      { icon: 'trash', onClick: record => destroyTeamMembership(record) }
    ]

    return (
      <AppContext.Consumer>
        {({ currentUser }) => {
          const currentUserTeamMembership = teamMemberships && teamMemberships.find(
            membership => membership.userId === currentUser.id
          )
          const canInvite = TeamMembership.authorize(currentUserTeamMembership, 'invite')

          const rowProps = ({ record: { role, user } }) => ({
            isPale: !user.isConfirmed,
            showActions: canInvite && role !== 'owner'
          })

          return (
            <Fragment>
              <Helmet>
                <title>
                  Members
                </title>
              </Helmet>

              <PageTitle>
                Members
              </PageTitle>

              {canInvite && <IconButton icon="plus" onClick={() => this.openTeamMembersDialog()} />}

              <Loader
                record={{
                  loading,
                  value: teamMemberships
                }}
                emptyView={{
                  buttonLabel: 'Add new member',
                  title: 'members',
                  onButtonClick: () => this.openTeamMembersDialog()
                }}
              />

              <Table
                columns={columns}
                actions={actions}
                loading={loading}
                records={teamMemberships}
                rowProps={rowProps}
                selectable={false}
              />

              <TeamMemberDialog
                isOpen={isTeamMemberDialogOpen}
                formValues={{ teamId, ...teamMembership }}
                onFormSubmit={this.handleFormSubmit}
                onRequestClose={this.closeTeamMembersDialog}
              />
            </Fragment>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

TeamMembersPage = injectSheet(({ typography }) => ({
  fullName: {
    ...typography.semibold
  },
  email: {
    ...typography.regularSquished
  },
  status: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  }
}))(TeamMembersPage)

TeamMembersPage.fragments = {
  teamMemberships: gql`
    fragment TeamMembersPage_teamMemberships on TeamMembership {
      id
      userId
      role

      user {
        id
        email
        firstName
        lastName
        profilePictureThumbnail
        isConfirmed
      }
    }
  `
}

TeamMembersPage = withMutation(gql`
  mutation CreateTeamMembershipMutation($input: CreateTeamMembershipInput!) {
    createTeamMembership(input: $input) {
      ...TeamMembersPage_teamMemberships
    }
  }

  ${TeamMembersPage.fragments.teamMemberships}
`, {
  inputFilter: gql`
    fragment CreateTeamMembershipInput on CreateTeamMembershipInput {
      teamId
      email
      role
    }
  `,
  mode: MutationResponseModes.APPEND
})(TeamMembersPage)

TeamMembersPage = withMutation(gql`
  mutation TeamMembershipMutation($id: ID!, $input: UpdateTeamMembershipInput!) {
    updateTeamMembership(id: $id, input: $input) {
      ...TeamMembersPage_teamMemberships
    }
  }

  ${TeamMembersPage.fragments.teamMemberships}
`, {
  inputFilter: gql`
    fragment UpdateTeamMembershipInput on UpdateTeamMembershipInput {
      id
      role
    }
  `,
  optimistic: { mode: OptimisticResponseModes.UPDATE, response: { __typename: 'TeamMembership' } }
})(TeamMembersPage)

TeamMembersPage = withMutation(gql`
  mutation DestroyTeamMembershipMutation($id: ID!) {
    destroyTeamMembership(id: $id) {
      id
    }
  }
`, {
  optimistic: { mode: OptimisticResponseModes.DESTROY, response: { __typename: 'TeamMembership' } },
  mode: MutationResponseModes.DELETE,
  successAlert: ({ input: { user: { email } } }) => ({
    message: `Successfully removed ${email} from the team.`
  })
})(TeamMembersPage)

TeamMembersPage = withQuery(gql`
  query TeamMembersPage($teamId: ID) {
    teamMemberships(teamId: $teamId) {
      ...TeamMembersPage_teamMemberships
    }
  }

  ${TeamMembersPage.fragments.teamMemberships}
`, {
  options: ({ match }) => ({
    variables: { teamId: match.params.teamId }
  })
})(TeamMembersPage)

export default TeamMembersPage
