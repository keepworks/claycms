import gql from 'graphql-tag'
import React from 'react'

import Menu from 'components/internal/menu/Menu'
import MenuBody from 'components/internal/menu/MenuBody'
import MenuFooter from 'components/internal/menu/MenuFooter'
import MenuItem from 'components/internal/menu/MenuItem'
import MenuLink from 'components/internal/menu/MenuLink'
import { resetStore } from 'client/methods'
import { withMutation } from 'lib/data'

function UserMenu({ closeMenu, ssoLogout }) {
  const handleLogout = () => ssoLogout().then(resetStore)

  return (
    <Menu closeMenu={closeMenu}>
      <MenuBody>
        <MenuLink to="/user/profile" onClick={closeMenu}>
          Profile
        </MenuLink>
        {/* <MenuLink to="/user/notifications" onClick={closeMenu}>
          Notifications
        </MenuLink> */}
        {/* <MenuLink to="/user/settings" onClick={closeMenu}>
          Settings
        </MenuLink> */}
      </MenuBody>
      <MenuFooter>
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuFooter>
    </Menu>
  )
}

UserMenu = withMutation(gql`
  mutation SSOLogoutMutation {
    ssoLogout {
      success
    }
  }
`)(UserMenu)

export default UserMenu
