import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { Route } from 'react-router-dom'

import * as mixins from 'styles/mixins'
import AppContext from 'components/AppContext'
import cleanProps from 'lib/cleanProps'
import ProfilePicture from 'components/internal/ProfilePicture'

function UserHeaderItem({ isActive, classes, ...other }) {
  return (
    <Route path="/user">
      {({ match }) => (
        <AppContext.Consumer>
          {({ currentUser }) => (
            <div
              className={classNames(
                classes.userHeaderItem,
                { [classes.userHeaderItem_active]: isActive || !!match }
              )}
              {...cleanProps(other)}
            >
              <ProfilePicture isActive={isActive || !!match} user={currentUser} />
            </div>
          )}
        </AppContext.Consumer>
      )}
    </Route>
  )
}

UserHeaderItem.propTypes = {
  isActive: PropTypes.bool
}

UserHeaderItem.defaultProps = {
  isActive: false
}

export default injectSheet(({ colors, units }) => ({
  userHeaderItem: {
    ...mixins.transitionSimple(),

    cursor: 'pointer',
    padding: (units.internalHeaderHeight - units.profilePictureSize_small) / 2,

    '&:hover': {
      backgroundColor: colors.headerItemBackground_hover
    }
  },
  userHeaderItem_active: {
    backgroundColor: colors.headerItemBackground_hover
  }
}))(UserHeaderItem)
