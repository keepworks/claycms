import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import RadioInputOption from 'components/internal/typography/RadioInputOption'

function RadioInput({
  input, inputLabel, options, onChange, size, classes
}) {
  if (!options || options.length === 0) {
    return null
  }

  const handleChange = (value) => {
    if (onChange) {
      onChange(value)
    }

    input.onChange(value)
  }

  const renderInputLabel = () => {
    if (!inputLabel) {
      return null
    }

    return (
      <p className={classes.inputLabel}>
        {inputLabel}
      </p>
    )
  }

  return (
    <div className={classes.wrapper}>
      {renderInputLabel()}
      <div className={classes.options}>
        {options.map(option => (
          <RadioInputOption
            key={`option-${option.value}`}
            inputValue={input.value}
            option={option}
            onChange={handleChange}
            size={size}
          />
        ))}
        <input type="hidden" {...input} />
      </div>
    </div>
  )
}

RadioInput.propTypes = {
  inputLabel: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    additionalFields: PropTypes.arrayOf(PropTypes.node)
  })),
  size: PropTypes.oneOf([ 'small', 'regular' ]),
  spaced: PropTypes.bool
}

RadioInput.defaultProps = {
  inputLabel: null,
  options: null,
  size: 'regular',
  spaced: false
}

export default injectSheet(({ colors, typography, units }) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: ({ size, spaced }) => size !== 'small' && (spaced ? units.inputMargin_spaced : units.inputMargin),
    paddingTop: ({ size }) => size !== 'small' && units.inputPaddingTop
  },
  options: {
    display: 'flex',
    flexDirection: 'column'
  },
  inputLabel: {
    ...typography.regularSmallSpaced,

    color: colors.text_pale,
    marginBottom: units.radioInputLabelMarginBottom
  }
}))(RadioInput)
