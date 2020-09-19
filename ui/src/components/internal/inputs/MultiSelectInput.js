import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import BaseSelectInput from 'components/internal/inputs/BaseSelectInput'
import FieldHint from 'components/FieldHint'
import Tag from 'components/internal/Tag'

function MultiSelectInput({ input, hint, label, classes, ...other }) {
  const inputRenderer = ({
    inputWrapperProps,
    inputProps,
    displayProps: { displayValue, isFocused }
  }) => (
    <div className={classes.inputWrapper} {...inputWrapperProps}>
      {label && (
        <label
          htmlFor={input.name}
          className={classNames(
            classes.label,
            {
              [classes.label_shrink]:
                (Array.isArray(displayValue) && displayValue.length > 0) || isFocused
            }
          )}
        >
          {label}
        </label>
      )}

      {Array.isArray(displayValue)
        ? displayValue.map(tag => (
          <Tag
            key={tag.value}
            ariaLabel={tag.label}
            isFocused={tag.isFocused}
            onRemove={tag.onClick}
            isRemovable
          >
            {tag.label}
          </Tag>
        ))
        : <div className={classes.displayValue}>{displayValue}</div>
      }

      <input id={input.name} className={classes.input} {...inputProps} />
      <FieldHint active={isFocused} hint={hint} />
    </div>
  )

  const optionRenderer = ({ isFocused, isSelected, option, ...optionProps }) => (
    <li
      className={classNames(
        classes.option,
        {
          [classes.option_selected]: isSelected,
          [classes.option_focused]: isFocused
        }
      )}
      {...optionProps}
    >
      {option.label}
    </li>
  )

  return (
    <BaseSelectInput
      creatable
      isMultiple
      inputRenderer={inputRenderer}
      optionRenderer={optionRenderer}
      wrapperClassName={classes.wrapper}
      input={input}
      {...other}
    />
  )
}

MultiSelectInput.propTypes = {
  hint: PropTypes.string,
  label: PropTypes.string,
  spaced: PropTypes.bool
}

MultiSelectInput.defaultProps = {
  hint: null,
  label: null,
  spaced: false
}

export default injectSheet(({ colors, typography, units }) => ({
  wrapper: {
    marginBottom: ({ spaced }) => (spaced ? units.inputMargin_spaced : units.inputMargin)
  },
  inputWrapper: {
    ...typography.regularSquished,

    alignItems: 'center',
    color: colors.text_pale,
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
        backgroundColor: colors.inputBorder_hover
      }
    }
  },
  input: {
    display: 'inline-block',
    backgroundColor: 'transparent',
    border: 'none',
    color: colors.inputText,
    paddingTop: 5,
    paddingBottom: 5
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
  displayValue: { // In case of placeholder being shown
    position: 'absolute'
  },
  option: {
    ...mixins.transitionSimple(),
    ...typography.regularSquished,

    alignItems: 'center',
    color: colors.text_dark,
    cursor: 'default',
    display: 'flex',
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 10,
    paddingLeft: 30
  },
  option_selected: {
    color: colors.text_primary
  },
  option_focused: {
    backgroundColor: '#fcfcff',
    color: colors.text_primary
  }
}))(MultiSelectInput)
