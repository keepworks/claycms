import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import Divider from 'components/internal/Divider'
import SidebarBreadcrumb from 'components/internal/sidebar/SidebarBreadcrumb'
import SidebarItem from 'components/internal/sidebar/SidebarItem'
import { withClientQuery } from 'lib/data'

function ProjectSidebar({ match, project: { name } = {} }) {
  return (
    <Fragment>
      <Divider />

      <SidebarBreadcrumb icon="arrow-left-thin" link={`/teams/${match.params.teamId}/projects`} text={name} title="PROJECTS" />
      <Divider />

      <SidebarItem item={{ name: 'Entities', url: `${match.url}/entities`, icon: 'flow' }} />
      <SidebarItem item={{ name: 'Assets', url: `${match.url}/assets`, icon: 'segment' }} />
      <SidebarItem item={{ name: 'Resources', url: `${match.url}/resources`, icon: 'segment' }} />
      <Divider />

      <SidebarItem item={{ name: 'Settings', url: `${match.url}/settings`, icon: 'setting' }} />
    </Fragment>
  )
}

ProjectSidebar.propTypes = {
  match: PropTypes.object.isRequired
}

ProjectSidebar = withClientQuery(gql`
  query ProjectSidebar($id: ID!) {
    project(id: $id) {
      id
      name
    }
  }
`, {
  options: ({ match }) => ({
    variables: { id: match.params.projectId }
  })
})(ProjectSidebar)

export default ProjectSidebar
