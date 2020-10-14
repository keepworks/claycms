import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import * as mixins from 'styles/mixins'
import FieldHint from 'components/FieldHint'
import withUniqueId from 'components/decorators/withUniqueId'

function SwitchInput({ activeLabel, classes, disabled, hint, input, label, uniqueId }) {
  const [ isHintActive, setIsHintActive ] = useState(false)

  const name = (input && input.name) || 'switch'

  const isActive = typeof input.value === 'boolean' ? input.value : input.value === 't'

  const toggleValue = () => input.onChange(!isActive)

  const showHint = () => setIsHintActive(true)
  const hideHint = () => setIsHintActive(false)

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      toggleValue()
    }
  }

  const renderLabel = () => {
    if (!activeLabel && !label) {
      return null
    }

    const labelText = (isActive && activeLabel) ? activeLabel : label

    return labelText && (
      <label htmlFor={uniqueId(name)} className={classes.label}>
        {labelText}
      </label>
    )
  }

  return (
    <div
      className={classes.switchInputWrapper}
      onMouseEnter={showHint}
      onMouseLeave={hideHint}
    >
      {renderLabel()}
      <div
        role="checkbox"
        tabIndex={-1}
        aria-checked={isActive}
        className={
          classNames(classes.switchInput,
            { [classes.switchInput_active]: isActive },
            { [classes.switchInput_disabled]: disabled })
        }
        onClick={toggleValue}
        onKeyDown={handleKeyDown}
      >
        {input.name && <input id={uniqueId(name)} type="hidden" disabled={disabled} {...input} />}
      </div>

      <FieldHint active={isHintActive} hint={hint} />
    </div>

  )
}

SwitchInput.propTypes = {
  activeLabel: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  reverse: PropTypes.bool
}

SwitchInput.defaultProps = {
  activeLabel: null,
  disabled: false,
  label: null,
  reverse: false
}

SwitchInput = withUniqueId()(SwitchInput)

export default injectSheet(({ colors, shadows, typography, units }) => ({
  base: {
    display: 'relative'
  },
  switchInputWrapper: {
    alignItems: 'center',
    display: 'flex',
    marginTop: 10,
    marginBottom: ({ spaced }) => (spaced ? units.inputMargin_spaced : units.inputMargin),
    position: 'relative'
  },
  label: ({ reverse }) => ({
    ...typography.regularSquished,

    color: colors.switchInputLabel,
    marginRight: reverse ? 0 : units.switchInputLabelHorizontalMargin,
    marginLeft: reverse ? units.switchInputLabelHorizontalMargin : 0,
    order: reverse ? 1 : 0
  }),
  switchInput: {
    ...mixins.size(units.switchInputWidth, units.switchInputKnobSize),
    ...mixins.transitionSimple(),

    backgroundColor: colors.switchInputBackground,
    borderColor: colors.switchInputBorder,
    borderRadius: units.switchInputKnobSize / 2,
    borderStyle: 'solid',
    borderWidth: units.switchInputBorderWidth,
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative',

    '&:after': {
      ...mixins.size(units.switchInputKnobSize),
      ...mixins.transitionSimple(),

      backgroundColor: colors.switchInputKnobBackground,
      borderRadius: '50%',
      boxShadow: shadows.switchInputKnob,
      boxSizing: 'border-box',
      content: "''",
      display: 'block',
      marginLeft: -units.switchInputBorderWidth,
      position: 'absolute',
      top: -units.switchInputBorderWidth,
      left: 0
    }
  },
  switchInput_active: {
    backgroundColor: colors.switchInputBackground_active,

    '&:after': {
      backgroundColor: colors.switchInputKnobBackground_active,
      marginLeft: -units.switchInputKnobSize + units.switchInputBorderWidth,
      left: '100%'
    }
  },
  switchInput_disabled: {
    backgroundColor: colors.switchInputBackground_disabled,
    pointerEvents: 'none'
  }
}))(SwitchInput)
