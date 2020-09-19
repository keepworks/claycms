import React, { Fragment } from 'react'

import AppContext from 'components/AppContext'
import Divider from 'components/internal/Divider'
import SidebarBreadcrumb from 'components/internal/sidebar/SidebarBreadcrumb'
import SidebarItem from 'components/internal/sidebar/SidebarItem'
import Spacer from 'components/Spacer'
import { User } from 'models'

function UserSidebar() {
  const items = [
    { name: 'Teams', url: '/user/teams', icon: 'team' },
    { name: 'Profile', url: '/user/profile', icon: 'person' },
    { name: 'Settings', url: '/user/settings', icon: 'setting' }

    // Temporarily hidden for launch
    // { name: 'Notifications', url: '/user/notifications', icon: 'notification-bell' },
  ]

  return (
    <Fragment>
      <Divider />

      <AppContext.Consumer>
        {({ currentUser }) => (
          <SidebarBreadcrumb text={User.fullName(currentUser)} title={currentUser.email} />
        )}
      </AppContext.Consumer>

      <Divider />
      <Spacer height={10} />

      {items.map(item => <SidebarItem key={item.name} item={item} />)}
    </Fragment>
  )
}

export default UserSidebar
