import classNames from 'classnames'
import gql from 'graphql-tag'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import FontIcon from 'components/FontIcon'

function Tag({ ariaLabel, isFocused, isRemovable, onRemove, size, classes, children }) {
  return (
    <div className={classNames(classes.tag, classes[`tag_${size}`], { [classes.tag_isRemovable]: isRemovable })}>
      {children}

      {isRemovable && (
        <div
          aria-label={`Remove tag: ${ariaLabel}`}
          role="button"
          tabIndex={-1}
          className={classNames(
            classes.removeTag,
            { [classes.removeTag_focused]: isFocused }
          )}
          onClick={onRemove}
          onKeyPress={onRemove}
        >
          <FontIcon name="cross" size="nano" />
        </div>
      )}
    </div>
  )
}

Tag.propTypes = {
  ariaLabel: PropTypes.string,
  isFocused: PropTypes.bool,
  isRemovable: PropTypes.bool,
  size: PropTypes.oneOf([ 'small', 'medium' ]),
  onRemove: PropTypes.func,
  children: PropTypes.node.isRequired
}

Tag.defaultProps = {
  ariaLabel: null,
  isRemovable: false,
  isFocused: false,
  size: 'small',
  onRemove: () => null
}

Tag.fragments = {
  tag: gql`
    fragment Tag_tag on Tag {
      id
      name
    }
  `
}

export default injectSheet(({ colors, typography, units }) => ({
  tag: {
    alignItems: 'center',
    backgroundColor: colors.tagBackground,
    borderRadius: units.tagBorderRadius,
    color: colors.tag,
    display: 'inline-flex',
    height: units.tagHeight,
    paddingRight: units.tagPaddingHorizontal,
    paddingLeft: units.tagPaddingHorizontal,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',

    '&:not(:last-child)': {
      marginRight: units.tagMarginRight
    }
  },
  tag_small: {
    ...typography.regularSmall
  },
  tag_medium: {
    ...typography.regular
  },
  tag_isRemovable: {
    paddingRight: 0
  },
  removeTag: {
    ...mixins.transitionSimple(),

    alignItems: 'center',
    borderBottomRightRadius: units.tagBorderRadius,
    borderTopRightRadius: units.tagBorderRadius,
    cursor: 'pointer',
    display: 'flex',
    height: '100%',
    marginLeft: units.tagPaddingHorizontal / 2,
    paddingRight: units.tagPaddingHorizontal,
    paddingLeft: units.tagPaddingHorizontal / 2,
    opacity: 0.6,

    '&:hover': {
      backgroundColor: colors.tagRemoveBackground,
      color: colors.text_light,
      opacity: 1
    }
  },
  removeTag_focused: {
    backgroundColor: colors.tagRemoveBackground,
    color: colors.text_light,
    opacity: 1
  }
}))(Tag)
