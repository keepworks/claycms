import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import Badge from 'components/internal/Badge'
import cleanProps from 'lib/cleanProps'
import FieldError from 'components/FieldError'
import FieldHint from 'components/FieldHint'
import FontIcon from 'components/FontIcon'

function TextInput({
  badge,
  disabled,
  hint,
  icon,
  isMultiline,
  input,
  label,
  meta,
  spaced,
  stretched,
  type,
  classes,
  ...other
}) {
  if (label && icon) {
    throw new Error('You can pass either `icon` or `label` to TextInput')
  }

  const error = TextInput.fieldError(meta)

  const renderIcon = () => icon && <FontIcon name={icon} size="small" />

  const renderAlertIcon = () => error && <FontIcon name="round-alert" size="small" />

  const renderBadge = () => badge && <Badge data-name="badge" size="medium">{badge}</Badge>

  const renderLabel = () => label && (
    <label
      htmlFor={input.name}
      className={classNames(
        classes.label,
        { [classes.label_shrink]: meta.active || input.value || input.value === 0 }
      )}
    >
      {label}
    </label>
  )

  return (
    <div className={classes.textInput}>
      <div className={classes.inputWrapper} disabled={disabled}>
        {renderIcon()}
        {renderAlertIcon() || renderBadge()}
        {renderLabel()}

        {isMultiline ? (
          <textarea
            id={input.name}
            className={classes.input}
            rows={8}
            {...input}
            {...cleanProps(other, [ 'activeIcon', 'isActive', 'initialValue' ])}
          />
        ) : (
          <input
            id={input.name}
            type={type}
            className={classes.input}
            {...input}
            {...cleanProps(other, [ 'activeIcon', 'isActive', 'initialValue' ])}
          />
        )}
      </div>

      <FieldError active={meta.active} error={error} stretched={stretched} />

      <FieldHint active={!error && meta.active} hint={hint} />
    </div>
  )
}

TextInput.propTypes = {
  activeIcon: PropTypes.bool,
  autoComplete: PropTypes.oneOf([ 'off', 'on' ]),
  badge: PropTypes.oneOfType([ PropTypes.number, PropTypes.bool ]),
  disabled: PropTypes.bool,
  flexGrow: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  hint: PropTypes.string,
  icon: PropTypes.string,
  isMultiline: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object,
  spaced: PropTypes.bool,
  stretched: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.oneOf([ 'default', 'expandable', 'simple' ])
}

TextInput.defaultProps = {
  activeIcon: true,
  autoComplete: 'off',
  badge: null,
  disabled: false,
  flexGrow: 'initial',
  hint: null,
  icon: null,
  isMultiline: false,
  label: null,
  meta: {},
  spaced: false,
  stretched: true,
  type: 'text',
  variant: 'default'
}

TextInput.fieldError = ({
  dirtySinceLastSubmit, error, pristine, submitError, touched, submitFailed
}) => touched && (!pristine || submitFailed) && (error || (!dirtySinceLastSubmit && submitError))

export default injectSheet(({
  colors, typography, units
}) => ({
  textInput: ({ variant, spaced, flexGrow }) => {
    const commonStyles = {
      position: 'relative', // For FieldError and FieldHint
      flexGrow: flexGrow || 'initial'
    }

    if (variant === 'expandable') {
      return {
        ...commonStyles,

        display: 'flex',
        flexDirection: 'row-reverse',
        marginRight: units.textInputHorizontalMargin_expandable,
        marginLeft: units.textInputHorizontalMargin_expandable
      }
    }

    if (variant === 'simple') {
      return {
        ...commonStyles,

        display: 'flex'
      }
    }

    return {
      ...commonStyles,

      marginBottom: (spaced ? units.inputMargin_spaced : units.inputMargin)
    }
  },
  inputWrapper: {
    ...mixins.transitionFluid(),

    display: 'flex',
    position: 'relative',
    minWidth: ({ variant }) => (variant === 'expandable' ? '30%' : 'auto'),

    '& .icon': {
      ...mixins.transitionSimple(),

      color: ({ activeIcon }) => (activeIcon ? colors.inputIcon_active : colors.inputIcon),
      paddingTop: ({ variant }) => (variant === 'expandable' || variant === 'simple' ? 0 : units.inputPaddingTop),
      position: 'absolute',
      left: 0
    },

    '& .icon-round-alert': {
      right: 0,
      left: 'auto'
    },

    '& [data-name=badge]': {
      ...typography.robotoBold,

      position: 'absolute',
      right: 0,
      left: 'auto'
    },

    '&::after': {
      ...mixins.transitionSimple(),

      backgroundColor: ({ meta }) => (
        TextInput.fieldError(meta)
          ? colors.inputBorder_hover : colors.inputBorder
      ),
      bottom: 0,
      content: '" "',
      height: 1,
      position: 'absolute',
      right: 0,
      left: 0
    },

    '&:focus-within': {
      minWidth: ({ variant }) => (variant === 'expandable' ? '40%' : 'auto'),

      '&::after': {
        backgroundColor: colors.inputBorder_hover,
        marginRight: ({ stretched }) => (stretched ? units.inputBorderMarginHorizontal_focus : 0),
        marginLeft: ({ stretched }) => (stretched ? units.inputBorderMarginHorizontal_focus : 0)
      }
    },

    '&:hover': {
      '&::after': {
        backgroundColor: colors.inputBorder_hover
      }
    },

    '&[disabled]': {
      pointerEvents: 'none',

      '& .icon, & $input': {
        color: colors.text_pale
      }
    }
  },
  input: {
    ...mixins.transitionSimple(),
    ...typography.regularSquished,

    ...mixins.placeholder({
      ...mixins.transitionSimple(),

      color: colors.inputPlaceholder
    }),

    backgroundColor: 'transparent',
    border: 'none',
    color: colors.inputText,
    marginTop: ({ variant }) => (variant === 'expandable' || variant === 'simple' ? 0 : units.inputPaddingTop),
    paddingRight: units.inputHorizontalPadding,
    paddingBottom: units.inputPaddingBottom,
    paddingLeft: ({ icon }) => (icon ? units.inputHorizontalPadding : 0),
    width: '100%',

    '&:focus': {
      ...mixins.placeholder({
        opacity: 0.5
      })
    }
  },
  label: {
    ...mixins.transitionSimple(),
    ...typography.regularSquished,

    color: colors.text_pale,
    pointerEvents: 'none',
    position: 'absolute',
    top: units.inputPaddingTop
  },
  label_shrink: {
    ...typography.regularSmallSpaced,

    pointerEvents: 'auto',
    top: 0
  }
}))(TextInput)
