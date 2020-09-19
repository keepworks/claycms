import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import withUniqueId from 'components/decorators/withUniqueId'

function CheckboxInput({ input, label, uniqueId, classes }) {
  return (
    <div className={classes.checkboxWrapper}>
      <input id={uniqueId(input.name)} className={classes.checkbox} type="checkbox" {...input} />
      <label htmlFor={uniqueId(input.name)}>{label}</label>
    </div>
  )
}

CheckboxInput.propTypes = {
  label: PropTypes.string
}

CheckboxInput.defaultProps = {
  label: ''
}

const CheckboxInputWithUniqueId = withUniqueId()(CheckboxInput)

export default injectSheet(({ colors, units, typography }) => ({
  checkboxWrapper: {
    padding: [ units.checkboxVerticalPadding, units.checkboxHorizontalPadding ]
  },
  checkbox: {
    opacity: 0,
    position: 'absolute',

    '& + label': {
      ...typography.regularSquished,

      cursor: 'pointer',
      padding: 0,
      position: 'relative'
    },

    // Box.
    '& + label::before': {
      background: 'white',
      backgroundColor: colors.checkboxBackground,
      borderColor: colors.checkboxBorder,
      borderRadius: units.checkboxBorderRadius,
      borderStyle: 'solid',
      borderWidth: units.checkboxBorderWidth,
      content: '" "',
      display: 'inline-block',
      height: units.checkboxSize,
      marginRight: units.checkboxHorizontalMargin,
      verticalAlign: 'text-top',
      width: units.checkboxSize
    },

    // Box checked
    '&:checked + label::before': {
      backgroundColor: colors.checkboxBackground_checked,
      borderColor: colors.checkboxBackground_checked,
      color: colors.checkboxTick,
      content: '"\ue030"', // From fontastic - `icon-tick`
      fontFamily: 'claycms-icons',
      fontSize: units.checkboxTickFontSize,
      lineHeight: `${units.checkboxSize}px`,
      textAlign: 'center'
    },

    // Disabled state label.
    '&:disabled + label': {
      color: colors.text_pale,
      cursor: 'auto'
    },

    // Disabled box.
    '&:disabled + label::before': {
      boxShadow: 'none',
      background: colors.text_pale
    },

    '&:checked + label': {
      color: colors.checkboxBackground_checked
    }
  }
}))(CheckboxInputWithUniqueId)
