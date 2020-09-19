import PropTypes from 'prop-types'
import React from 'react'

import HeaderItem from 'components/internal/HeaderItem'
import HeaderItemContent from 'components/internal/HeaderItemContent'
import { HeaderItemText, HeaderItemTitle } from 'components/internal/typography'
import { matchPath } from 'react-router-dom'

function ProjectHeaderItem({ projects, onAddClick, ...other }) {
  if (!projects) {
    return null
  }

  const isProjectPage = matchPath(document.location.pathname, { path: '/teams/:teamId/projects/:projectId' })
  const isProjectsPage = matchPath(document.location.pathname, { path: '/teams/:teamId/projects', exact: true })

  let text = null
  let icon = 'arrow-down'
  let onItemClick = null

  if (projects.length === 0) {
    text = 'New project'
    icon = 'round-plus'
    onItemClick = onAddClick
  } else if (isProjectsPage) {
    text = 'All projects'
  } else if (isProjectPage) {
    const currentProject = projects.find(project => project.id === isProjectPage.params.projectId)
    text = currentProject && currentProject.name
  } else {
    text = 'Select a project'
  }

  return (
    <HeaderItem isWide onItemClick={onItemClick} {...other}>
      <HeaderItemTitle>
        PROJECT
      </HeaderItemTitle>
      <HeaderItemContent icon={icon}>
        <HeaderItemText>
          {text}
        </HeaderItemText>
      </HeaderItemContent>
    </HeaderItem>
  )
}

ProjectHeaderItem.propTypes = {
  projects: PropTypes.array
}

ProjectHeaderItem.defaultProps = {
  projects: null
}

export default ProjectHeaderItem
