import gql from 'graphql-tag'
import injectSheet from 'react-jss'
import React, { Fragment, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import MenuContainer from 'components/internal/menu/MenuContainer'
import ProjectDialog from 'components/internal/dialogs/ProjectDialog'
import ProjectHeaderItem from 'components/internal/headerItems/ProjectHeaderItem'
import ProjectMenu from 'components/internal/menus/ProjectMenu'
import TeamDialog from 'components/internal/dialogs/TeamDialog'
import TeamHeaderItem from 'components/internal/headerItems/TeamHeaderItem'
import TeamMenu from 'components/internal/menus/TeamMenu'
import UserHeaderItem from 'components/internal/headerItems/UserHeaderItem'
import UserMenu from 'components/internal/menus/UserMenu'
import { MutationResponseModes, OptimisticResponseModes, withMutation, withQueries } from 'lib/data'

const headerScrollThreshold = 20

class Header extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isHovered: false,
      isProjectDialogOpen: false,
      isTeamDialogOpen: false,
      lastScrollPosition: window.pageYOffset
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  openProjectDialog = () => this.setState({ isProjectDialogOpen: true })

  closeProjectDialog = () => this.setState({ isProjectDialogOpen: false })

  openTeamDialog = () => this.setState({ isTeamDialogOpen: true })

  closeTeamDialog = () => this.setState({ isTeamDialogOpen: false })

  handleProjectFormSubmit = (values) => {
    const { createProject, history } = this.props

    return createProject(values, {
      onSuccess: ({ data: { project: { id, teamId } } }) => {
        this.closeProjectDialog()
        history.push(`/teams/${teamId}/projects/${id}`)
      }
    })
  }

  handleTeamFormSubmit = (values) => {
    const { createTeam, history } = this.props

    return createTeam(values, {
      onSuccess: ({ data: { team: { id } } }) => {
        this.closeTeamDialog()
        history.push(`/teams/${id}`)
      }
    })
  }

  handleMouseEnter = () => this.setState({ isHovered: true })

  handleMouseLeave = () => this.setState({ isHovered: false })

  handleScroll = () => this.setState({ lastScrollPosition: window.pageYOffset })

  render() {
    const {
      match, projects, teams, classes, theme
    } = this.props
    const {
      isHovered, isProjectDialogOpen, isTeamDialogOpen, lastScrollPosition
    } = this.state

    const hideHeaderItem = lastScrollPosition > headerScrollThreshold && !isHovered

    return (
      <Fragment>
        <div
          className={classes.header}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <MenuContainer verticalOffset={theme.units.headerMenuVerticalOffset}>
            <ProjectHeaderItem
              isHidden={hideHeaderItem}
              projects={projects}
              onAddClick={this.openProjectDialog}
            />
            <ProjectMenu
              isHidden={hideHeaderItem}
              openProjectDialog={this.openProjectDialog}
              projects={projects}
            />
          </MenuContainer>

          <MenuContainer verticalOffset={theme.units.headerMenuVerticalOffset}>
            <TeamHeaderItem
              isHidden={hideHeaderItem}
              teams={teams}
              onAddClick={this.openTeamDialog}
            />
            <TeamMenu
              isHidden={hideHeaderItem}
              openTeamDialog={this.openTeamDialog}
              teams={teams}
            />
          </MenuContainer>

          <MenuContainer verticalOffset={theme.units.headerMenuVerticalOffset}>
            <UserHeaderItem />
            <UserMenu />
          </MenuContainer>
        </div>

        <ProjectDialog
          isOpen={isProjectDialogOpen}
          formValues={{ teamId: match.params.teamId }}
          onFormSubmit={this.handleProjectFormSubmit}
          onRequestClose={this.closeProjectDialog}
        />

        <TeamDialog
          isOpen={isTeamDialogOpen}
          onFormSubmit={this.handleTeamFormSubmit}
          onRequestClose={this.closeTeamDialog}
        />
      </Fragment>
    )
  }
}

Header.fragments = {
  teams: gql`
    fragment Header_teams on Team {
      id
      name
    }
  `,
  projects: gql`
    fragment Header_projects on Project {
      id
      name
      teamId
    }
  `
}

const HeaderTeamsQuery = gql`
  query HeaderTeamsQuery {
    teams {
      ...Header_teams
    }
  }

  ${Header.fragments.teams}
`

const HeaderProjectsQuery = gql`
  query HeaderProjectsQuery($teamId: ID!) {
    projects(teamId: $teamId) {
      ...Header_projects
    }
  }

  ${Header.fragments.projects}
`

Header = injectSheet(({
  gradients, shadows, units, zIndexes
}) => ({
  header: {
    backgroundImage: gradients.internalHeader,
    borderRadius: units.internalHeaderBorderRadius,
    boxShadow: shadows.internalHeader,
    display: 'flex',
    flex: '0 1 auto',
    height: units.internalHeaderHeight,
    position: 'fixed',
    top: units.internalHeaderTop,
    right: units.internalHeaderRight,
    zIndex: zIndexes.internalHeader
  }
}))(Header)

Header = withMutation(gql`
  mutation CreateTeamMutation($input: CreateTeamInput!) {
    team: createTeam(input: $input) {
      ...Header_teams
    }
  }

  ${Header.fragments.teams}
`, {
  mode: MutationResponseModes.APPEND,
  optimistic: { mode: OptimisticResponseModes.CREATE, response: { __typename: 'Team' } },
  query: HeaderTeamsQuery
})(Header)

Header = withMutation(gql`
  mutation CreateProjectMutation($input: CreateProjectInput!) {
    project: createProject(input: $input) {
      ...Header_projects
    }
  }

  ${Header.fragments.projects}
`, {
  mode: MutationResponseModes.APPEND,
  optimistic: { mode: OptimisticResponseModes.CREATE, response: { __typename: 'Project' } },
  query: HeaderProjectsQuery
})(Header)

Header = withQueries([
  { query: HeaderTeamsQuery },
  {
    query: HeaderProjectsQuery,
    config: {
      options: ({ match }) => ({
        variables: { teamId: match.params.teamId }
      }),
      skip: ({ match }) => !match.params.teamId
    }
  }
])(Header)

export default withRouter(Header)
