import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import * as mixins from 'styles/mixins'

function RadioInputOption({
  inputValue,
  option: { name, description, value, additionalFields },
  onChange,
  classes
}) {
  return (
    <div
      role="radio"
      tabIndex={0}
      aria-checked={inputValue === value}
      className={classNames(classes.radioInputOption, {
        [classes.radioInputOption_active]: inputValue === value
      })}
      onClick={() => onChange(value)}
      onKeyPress={() => onChange(value)}
    >
      {name && (
        <Fragment>
          <span data-name>{name}</span>
          :&nbsp;
        </Fragment>
      )}
      {description}
      {value === inputValue && additionalFields}
    </div>
  )
}

RadioInputOption.propTypes = {
  inputValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  onChange: PropTypes.func,
  option: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    additionalFields: PropTypes.arrayOf(PropTypes.node)
  }),
  size: PropTypes.oneOf([ 'regular', 'small' ])
}

RadioInputOption.defaultProps = {
  inputValue: null,
  onChange: null,
  option: null,
  size: 'regular'
}

export default injectSheet(({ colors, typography, units }) => ({
  radioInputOption: {
    ...mixins.transitionSimple(),
    ...typography.regularSpaced,

    alignItems: 'center',
    color: colors.text_pale,
    cursor: 'pointer',
    marginBottom: ({ size }) => (size === 'regular'
      ? units.radioInputOptionMarginBottom_regular
      : units.radioInputOptionMarginBottom_small),
    paddingLeft: units.radioInputOptionPaddingLeft,
    position: 'relative',

    '& > [data-name]': {
      ...typography.semiboldSmall,

      color: colors.text_dark
    },

    '&:last-of-type': {
      marginBottom: 0
    },

    '&::before': {
      ...mixins.size(20),

      backgroundColor: colors.radioInputBulletBackground,
      borderRadius: '50%',
      content: '" "',
      display: 'block',
      marginLeft: ({ size }) => size === 'small' && units.radioInputOptionMarginLeft_small,
      position: 'absolute',
      top: 4,
      left: 0
    }
  },
  radioInputOption_active: {
    color: colors.text_dark,

    '&::before': {
      ...mixins.size(6),

      backgroundColor: colors.radioInputBulletBackground_active,
      borderColor: colors.radioInputBulletBorder_active,
      borderStyle: 'solid',
      borderWidth: units.radioInputBulletBorderWidth_active
    }
  }
}))(RadioInputOption)
