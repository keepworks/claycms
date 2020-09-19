import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'

function ButtonGroupInput({
  className, input, inputLabel, options, handleMouseOut, handleMouseOver, size, classes
}) {
  if (!options || options.length === 0) {
    return null
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
    <div className={classNames(classes.wrapper, className)}>
      {renderInputLabel()}
      <div className={classes.options}>
        {options.map(({ label, value }) => (
          <div
            key={`option-${value}`}
            role="button"
            tabIndex={0}
            className={classNames(
              classes.option,
              classes[`option_${size}`],
              { [classes.option_active]: value === input.value }
            )}
            onClick={() => input.onChange(value)}
            onKeyPress={() => input.onChange(value)}
            onMouseOut={handleMouseOut}
            onBlur={handleMouseOut}
            onMouseOver={() => handleMouseOver(value)}
            onFocus={() => handleMouseOver(value)}
          >
            {label}
          </div>
        ))}
        <input type="hidden" {...input} />
      </div>
    </div>
  )
}

ButtonGroupInput.propTypes = {
  className: PropTypes.string,
  inputLabel: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]).isRequired,
    value: PropTypes.string.isRequired
  })),
  handleMouseOut: PropTypes.func,
  handleMouseOver: PropTypes.func,
  size: PropTypes.oneOf([ 'small', 'normal', 'large' ])
}

ButtonGroupInput.defaultProps = {
  className: null,
  inputLabel: null,
  options: null,
  handleMouseOut: () => null,
  handleMouseOver: () => null,
  size: 'normal'
}

export default injectSheet(({
  colors, shadows, typography, units
}) => ({
  wrapper: {
    alignItems: 'center',
    display: 'inline-flex'
  },
  options: {
    display: 'flex',
    flex: '1 0 auto'
  },
  inputLabel: {
    ...typography.regularSmallCompact,

    color: colors.text_pale,
    marginRight: units.buttonInputGroupLabelMarginRight,
    textTransform: 'uppercase'
  },
  option: {
    ...mixins.transitionSimple('border-color, box-shadow'),
    ...typography.regularSmallSquished,

    alignItems: 'center',
    backgroundColor: colors.buttonGroupInputBackground,
    borderColor: colors.buttonGroupInputBorder,
    borderRightColor: colors.buttonGroupInputBorderRight,
    borderStyle: 'solid',
    borderWidth: units.buttonGroupInputBorderWidth,
    color: colors.text_pale,
    cursor: 'pointer',
    display: 'flex',
    flex: '1 1 0',
    justifyContent: 'center',
    whiteSpace: 'nowrap',

    '&:first-of-type': {
      borderTopLeftRadius: units.buttonGroupInputBorderRadius,
      borderBottomLeftRadius: units.buttonGroupInputBorderRadius
    },

    '&:last-of-type': {
      borderRightColor: colors.buttonGroupInputBorder,
      borderTopRightRadius: units.buttonGroupInputBorderRadius,
      borderBottomRightRadius: units.buttonGroupInputBorderRadius
    },

    '&:not(:first-of-type)': {
      marginLeft: -1 * units.buttonGroupInputBorderWidth // Prevent borders from overlapping
    },

    '& .icon:not(:only-child)': {
      paddingRight: units.buttonInputGroupIconMarginRight
    }
  },
  option_small: {
    height: units.buttonGroupInputHeight_small,
    minWidth: units.buttonGroupInputMinWidth_small,
    padding: units.buttonGroupInputPadding_small
  },
  option_normal: {
    height: units.buttonGroupInputHeight_normal,
    minWidth: units.buttonGroupInputMinWidth_normal,
    padding: [
      units.buttonGroupInputPaddingVertical_normal,
      units.buttonGroupInputPaddingHorizontal_normal
    ]
  },
  option_large: {
    height: units.buttonGroupInputHeight_large,
    minWidth: units.buttonGroupInputMinWidth_large,
    padding: units.buttonGroupInputPadding_large
  },
  option_active: {
    borderColor: `${colors.buttonGroupInputBorder_active} !important`, // `!important` overrides borderRightColor set for `option`
    boxShadow: shadows.buttonGroupInput_active,
    color: colors.text_dark,
    zIndex: 1
  }
}))(ButtonGroupInput)
