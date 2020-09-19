import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import Logo from 'components/Logo'
import ProjectSidebar from 'components/internal/sidebars/ProjectSidebar'
import TeamSidebar from 'components/internal/sidebars/TeamSidebar'
import UserSidebar from 'components/internal/sidebars/UserSidebar'

function Sidebar({ fluid, classes }) {
  return (
    <div
      className={classNames(
        classes.sidebarContainer,
        { [classes.sidebarContainer_fixed]: !fluid }
      )}
    >
      <Link className={classes.sidebarHeader} to="/user/teams">
        <Logo variant="color" />
      </Link>
      <Switch>
        <Route path="/teams/:teamId/projects/:projectId/messages/:messageId" render={() => null} />
        <Route path="/teams/:teamId/projects/:projectId/segments/:segmentId" render={() => null} />
        <Route path="/teams/:teamId/projects/:projectId" component={ProjectSidebar} />
        <Route path="/teams/:teamId" component={TeamSidebar} />
        <Route path="/" component={UserSidebar} />
      </Switch>
    </div>
  )
}

Sidebar.propTypes = {
  fluid: PropTypes.bool
}

Sidebar.defaultProps = {
  fluid: false
}

export default injectSheet(({ units }) => ({
  sidebarContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: units.sidebarHorizontalPadding,
    paddingRight: units.sidebarHorizontalPadding
  },
  sidebarContainer_fixed: {
    overflowX: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: units.sidebarWidth
  },
  sidebarHeader: {
    display: 'inline-block',
    marginRight: -1 * units.sidebarHorizontalPadding,
    marginLeft: -1 * units.sidebarHorizontalPadding,
    paddingTop: units.sidebarHeaderPaddingTop,
    paddingRight: units.sidebarItemPaddingHorizontal,
    paddingBottom: units.sidebarHeaderPaddingBottom,
    paddingLeft: units.sidebarItemPaddingHorizontal
  }
}))(Sidebar)
