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

class ProjectMenu extends Component {
  constructor() {
    super()

    this.state = { searchTerm: '' }
  }

  onClickCreateNewProject = (e) => {
    const { closeMenu, openProjectDialog } = this.props

    closeMenu(e)
    openProjectDialog()
  }

  filterProjectsBySearchTerm() {
    const { projects } = this.props
    const { searchTerm } = this.state

    if (!searchTerm) {
      return null
    }

    return projects.filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  render() {
    const { isHidden, projects: allProjects, closeMenu, theme } = this.props
    const { searchTerm } = this.state

    const filteredProjects = this.filterProjectsBySearchTerm()
    const projects = filteredProjects || allProjects

    return (
      <Menu closeMenu={closeMenu} width={theme.units.headerItemWidth_wide} isHidden={isHidden}>
        {allProjects.length >= SEARCH_VISIBILITY_THRESHOLD && (
          <MenuSearchHeader
            onChange={value => this.setState({ searchTerm: value })}
            value={searchTerm}
          />
        )}
        {projects.length > 0 && (
          <MenuBody>
            <MenuLink pale exact to={`/teams/${projects[0].teamId}/projects`} onClick={closeMenu}>
              All projects
            </MenuLink>
            {projects.map(project => (
              <MenuLink
                key={project.id}
                to={`/teams/${project.teamId}/projects/${project.id}`}
                onClick={closeMenu}
              >
                {project.name}
              </MenuLink>
            ))}
          </MenuBody>
        )}
        {filteredProjects && filteredProjects.length === 0 && (
          <MenuBody>
            <MenuItem>No projects found.</MenuItem>
          </MenuBody>
        )}
        {allProjects.length > 0 && (
          <MenuFooter dark>
            <MenuItem onClick={this.onClickCreateNewProject} variant="small" pale>
              Create New Project
              <FontIcon name="round-plus" size="small" />
            </MenuItem>
          </MenuFooter>
        )}
      </Menu>
    )
  }
}

ProjectMenu.propTypes = {
  openProjectDialog: PropTypes.func,
  projects: PropTypes.array
}

ProjectMenu.defaultProps = {
  openProjectDialog: () => null,
  projects: null
}

export default withTheme(ProjectMenu)
