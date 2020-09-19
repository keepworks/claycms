import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withTheme } from 'react-jss'

import FontIcon from 'components/FontIcon'
import Menu from 'components/internal/menu/Menu'
import MenuBody from 'components/internal/menu/MenuBody'
import MenuFooter from 'components/internal/menu/MenuFooter'
import MenuItem from 'components/internal/menu/MenuItem'
import MenuSearchHeader from 'components/internal/menu/MenuSearchHeader'
import MenuLink from 'components/internal/menu/MenuLink'

const SEARCH_VISIBILITY_THRESHOLD = 5

class TeamMenu extends Component {
  constructor() {
    super()

    this.state = { searchTerm: '' }
  }

  onClickCreateNewTeam = (e) => {
    const { closeMenu, openTeamDialog } = this.props

    closeMenu(e)
    openTeamDialog()
  }

  filterTeamsBySearchTerm() {
    const { teams } = this.props
    const { searchTerm } = this.state

    if (!searchTerm) {
      return null
    }

    return teams.filter(team => team.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  render() {
    const { isHidden, teams: allTeams, closeMenu, theme } = this.props
    const { searchTerm } = this.state

    const filteredTeams = this.filterTeamsBySearchTerm()
    const teams = filteredTeams || allTeams

    return (
      <Menu closeMenu={closeMenu} width={theme.units.headerItemWidth} isHidden={isHidden}>
        {allTeams.length >= SEARCH_VISIBILITY_THRESHOLD && (
          <MenuSearchHeader
            onChange={value => this.setState({ searchTerm: value })}
            value={searchTerm}
          />
        )}
        {teams.length > 0 && (
          <MenuBody>
            <MenuLink pale exact to="/user/teams" onClick={closeMenu}>
              All teams
            </MenuLink>
            {teams.map(team => (
              <MenuLink key={team.id} to={`/teams/${team.id}`} onClick={closeMenu}>
                {team.name}
              </MenuLink>
            ))}
          </MenuBody>
        )}
        {filteredTeams && filteredTeams.length === 0 && (
          <MenuBody>
            <MenuItem>No teams found.</MenuItem>
          </MenuBody>
        )}
        {allTeams.length > 0 && (
          <MenuFooter dark>
            <MenuItem onClick={this.onClickCreateNewTeam} variant="small" pale>
              Create New Team
              <FontIcon name="round-plus" size="small" />
            </MenuItem>
          </MenuFooter>
        )}
      </Menu>
    )
  }
}

TeamMenu.propTypes = {
  openTeamDialog: PropTypes.func,
  teams: PropTypes.array
}

TeamMenu.defaultProps = {
  openTeamDialog: () => null,
  teams: null
}

export default withTheme(TeamMenu)
