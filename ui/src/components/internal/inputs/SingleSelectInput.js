import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import BaseSelectInput from 'components/internal/inputs/BaseSelectInput'
import FontIcon from 'components/FontIcon'
import FieldError from 'components/FieldError'
import FieldHint from 'components/FieldHint'
import TextInput from 'components/inputs/TextInput'

function SingleSelectInput({
  hint, disabled, input, label, classes, meta = {}, stretched, truncateText, ...other
}) {
  const inputRenderer = ({
    inputWrapperProps,
    inputProps,
    displayProps: { displayValue, isFocused, isDropdownOpen }
  }) => {
    const arrowDirection = isDropdownOpen ? 'up' : 'down'
    const error = TextInput.fieldError(meta)

    return (
      <div className={classes.inputWrapper} {...inputWrapperProps}>
        <FontIcon name={`arrow-${arrowDirection}-small`} size="tiny" />

        {label && (
          <label
            htmlFor={input.name}
            className={classNames(
              classes.label,
              {
                [classes.label_shrink]: displayValue || isFocused
              }
            )}
          >
            {label}
          </label>
        )}

        {displayValue && (
          <div
            className={classNames(
              classes.displayValue,
              {
                [classes.truncate]: truncateText
              }
            )}
          >
            {displayValue}
          </div>
        )}
        <input id={input.name} className={classes.input} {...inputProps} disabled={disabled} />

        <FieldError active={meta.active} error={error} stretched={stretched} />

        <FieldHint active={!error && isFocused} hint={hint} />
      </div>
    )
  }

  const optionRenderer = ({ isFocused, isSelected, option, ...optionProps }) => (
    <li
      className={classNames(
        classes.option,
        {
          [classes.option_selected]: isSelected,
          [classes.option_focused]: isFocused,
          [classes.truncate]: truncateText
        }
      )}
      {...optionProps}
    >
      {option.label}
    </li>
  )

  return (
    <BaseSelectInput
      inputRenderer={inputRenderer}
      optionRenderer={optionRenderer}
      wrapperClassName={classes.wrapper}
      input={input}
      disabled={disabled}
      {...other}
    />
  )
}

SingleSelectInput.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  searchable: PropTypes.bool,
  stretched: PropTypes.bool,
  truncateText: PropTypes.bool
}

SingleSelectInput.defaultProps = {
  disabled: false,
  label: null,
  searchable: false,
  stretched: true,
  truncateText: false
}

export default injectSheet(({ colors, typography, units }) => ({
  wrapper: {
    flex: ({ stretched }) => (stretched && 1),
    marginBottom: ({ spaced }) => (spaced ? units.inputMargin_spaced : units.inputMargin)
  },
  inputWrapper: {
    ...typography.regularSquished,

    alignItems: 'center',
    color: ({ disabled }) => (disabled ? colors.text_pale : colors.inputText),
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'default'),
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: units.inputPaddingTop,
    paddingBottom: units.inputPaddingBottom,
    position: 'relative',

    '&::after': {
      ...mixins.transitionSimple(),

      backgroundColor: colors.inputBorder,
      content: '" "',
      height: 1,
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0
    },

    '&:focus-within': {
      '&::after': {
        backgroundColor: colors.inputBorder_hover,
        marginRight: ({ stretched }) => (stretched ? units.inputBorderMarginHorizontal_focus : 0),
        marginLeft: ({ stretched }) => (stretched ? units.inputBorderMarginHorizontal_focus : 0)
      }
    },

    '& .icon': {
      position: 'absolute',
      right: 0
    }
  },
  input: {
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'default'),
    display: 'inline-block',
    backgroundColor: 'transparent',
    border: 'none'
  },
  label: {
    ...mixins.transitionSimple(),
    ...typography.regularSquished,

    color: colors.text_pale,
    pointerEvents: 'none',
    position: 'absolute',
    top: units.inputPaddingTop,
    width: '100%'
  },
  label_shrink: {
    ...typography.regularSmallSpaced,

    pointerEvents: 'auto',
    top: 0
  },
  displayValue: {
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'default'),
    position: 'absolute'
  },
  option: {
    ...mixins.transitionSimple(),
    ...typography.regularSquished,

    alignItems: 'center',
    color: colors.text_dark,
    cursor: 'default',
    display: ({ truncateText }) => (truncateText ? 'block ' : 'flex'),
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 10,
    paddingLeft: 30,
    pointerEvents: ({ disabled }) => disabled && 'none'
  },
  option_selected: {
    color: colors.text_primary
  },
  option_focused: {
    backgroundColor: '#fcfcff',
    color: colors.text_primary
  },
  truncate: {
    overflow: 'hidden',
    paddingRight: 20,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%'
  }
}))(SingleSelectInput)
