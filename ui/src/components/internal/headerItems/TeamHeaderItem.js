import PropTypes from 'prop-types'
import React from 'react'

import HeaderItem from 'components/internal/HeaderItem'
import HeaderItemContent from 'components/internal/HeaderItemContent'
import { HeaderItemText, HeaderItemTitle } from 'components/internal/typography'
import { matchPath } from 'react-router-dom'

function TeamHeaderItem({ teams, onAddClick, ...other }) {
  if (!teams) {
    return null
  }

  const matchTeamPage = matchPath(document.location.pathname, { path: '/teams/:teamId' })
  const matchTeamsPage = matchPath(document.location.pathname, { path: '/user/teams', exact: true })

  let text = null
  let icon = 'arrow-down'
  let onItemClick = null

  if (teams.length === 0) {
    text = 'New team'
    icon = 'round-plus'
    onItemClick = onAddClick
  } else if (matchTeamsPage) {
    text = 'All teams'
  } else if (matchTeamPage) {
    text = teams.find(team => team.id === matchTeamPage.params.teamId).name
  } else {
    text = 'Select a team'
  }

  return (
    <HeaderItem onItemClick={onItemClick} {...other}>
      <HeaderItemTitle>
        TEAM
      </HeaderItemTitle>
      <HeaderItemContent icon={icon}>
        <HeaderItemText>
          {text}
        </HeaderItemText>
      </HeaderItemContent>
    </HeaderItem>
  )
}

TeamHeaderItem.propTypes = {
  teams: PropTypes.array
}

TeamHeaderItem.defaultProps = {
  teams: null
}

export default TeamHeaderItem
