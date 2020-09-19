import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import Divider from 'components/internal/Divider'
import SidebarBreadcrumb from 'components/internal/sidebar/SidebarBreadcrumb'
import SidebarItem from 'components/internal/sidebar/SidebarItem'
import Spacer from 'components/Spacer'
import { withClientQuery } from 'lib/data'

function TeamSidebar({ match, team: { name } = {} }) {
  const items = [
    { name: 'Projects', url: `${match.url}/projects`, icon: 'project' },
    { name: 'Members', url: `${match.url}/members`, icon: 'person' },
    { name: 'Settings', url: `${match.url}/settings`, icon: 'setting' }

    // Temporarily hidden for launch
    // { name: 'Billing', url: `${match.url}/billing`, icon: 'billing' },
  ]

  return (
    <Fragment>
      <Divider />

      <SidebarBreadcrumb icon="arrow-left-thin" link="/user/teams" text={name} title="TEAMS" />

      <Divider />
      <Spacer height={10} />

      {items.map(item => <SidebarItem key={item.name} item={item} />)}
    </Fragment>
  )
}

TeamSidebar.propTypes = {
  match: PropTypes.object.isRequired
}

TeamSidebar = withClientQuery(gql`
  query TeamSidebar($id: ID!) {
    team(id: $id) {
      id
      name
    }
  }
`, {
  options: ({ match }) => ({
    variables: { id: match.params.teamId }
  })
})(TeamSidebar)

export default TeamSidebar
