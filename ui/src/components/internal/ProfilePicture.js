import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import FontIcon from 'components/FontIcon'
import { User } from 'models'

const sizes = Object.freeze({
  TINY: 'tiny',
  SMALL: 'small',
  LARGE: 'large'
})

function ProfilePicture({
  inverted,
  isActive,
  size,
  user: { firstName, lastName, profilePictureThumbnail, profilePictureNormal },
  classes
}) {
  const profilePicture = (size === sizes.SMALL) ? profilePictureThumbnail : profilePictureNormal
  const userInitials = User.initials({ firstName, lastName })

  let placeholder = null
  let isEmpty = false
  if (!profilePicture) {
    if (size === sizes.TINY || size === sizes.SMALL) {
      placeholder = userInitials || <FontIcon name="person" size={size === sizes.TINY ? 'small' : 'medium'} />
      isEmpty = !userInitials
    } else if (size === sizes.LARGE) {
      placeholder = <FontIcon name="person" size="large" />
      isEmpty = true
    }
  }

  return (
    <div
      style={{ backgroundImage: profilePicture && `url(${profilePicture})` }}
      className={classNames(
        classes.base,
        classes.profilePicture,
        classes[`profilePicture_${size}`],
        {
          [classes.profilePicture_active]: isActive,
          [classes.profilePicture_empty]: isEmpty,
          [classes.profilePicture_inverted]: inverted
        }
      )}
    >
      {placeholder}
    </div>
  )
}

ProfilePicture.sizes = sizes

ProfilePicture.propTypes = {
  centered: PropTypes.bool,
  inverted: PropTypes.bool,
  isActive: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(sizes)),
  user: PropTypes.object
}

ProfilePicture.defaultProps = {
  centered: false,
  inverted: false,
  isActive: false,
  size: ProfilePicture.sizes.SMALL,
  user: {}
}

export default injectSheet(({
  colors, shadows, typography, units
}) => ({
  base: ({ size }) => ({ // To handle specificity issues with functional styles
    ...mixins.size(units[`profilePictureSize_${size}`]),

    lineHeight: `${units[`profilePictureSize_${size}`] - 2 * units.profilePictureBorderWidth}px`
  }),
  profilePicture: {
    ...mixins.backgroundCover(),
    ...mixins.transitionSimple(),
    ...typography.semiboldSmall,

    backgroundClip: ({ user }) => (user.profilePictureThumbnail || user.profilePictureNormal) && 'padding-box',
    backgroundColor: colors.profilePictureBackground,
    borderColor: 'transparent',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: units.profilePictureBorderWidth,
    color: colors.text_dark,
    marginLeft: props => props.centered && 'auto',
    marginRight: props => props.centered && 'auto',
    textAlign: 'center',

    '& .icon': {
      color: colors.text_light,
      lineHeight: props => `${units[`profilePictureSize_${props.size}`] - 2 * units.profilePictureBorderWidth}px`
    }
  },
  profilePicture_empty: {
    backgroundColor: colors.profilePictureBackground_empty
  },
  profilePicture_active: {
    borderColor: colors.profilePictureBorder
  },
  profilePicture_inverted: {
    backgroundColor: colors.profilePictureBackground_inverted,
    color: colors.text_light
  },
  [`profilePicture_${sizes.LARGE}`]: {
    boxShadow: shadows.profilePicture
  }
}))(ProfilePicture)
