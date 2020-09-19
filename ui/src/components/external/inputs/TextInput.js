import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import cleanProps from 'lib/cleanProps'
import FieldError from 'components/external/FieldError'
import Input from 'components/inputs/TextInput'

function TextInput({
  input,
  meta,
  type,
  classes,
  ...other
}) {
  return (
    <div className={classes.wrapper}>
      <input {...input} type={type} className={classes.input} {...cleanProps(other)} />

      <FieldError active={meta.active} error={Input.fieldError(meta)} />
    </div>
  )
}

TextInput.propTypes = {
  type: PropTypes.string
}

TextInput.defaultProps = {
  type: 'text'
}

export default injectSheet(({
  colors, typography, units
}) => ({
  wrapper: {
    position: 'relative',
    width: '100%'
  },
  input: {
    ...typography.regularSquishedResponsive,

    ...mixins.placeholder({
      ...mixins.transitionSimple(),

      color: colors.externalInputPlaceholder
    }),
    ...mixins.size('100%', units.externalInputHeight),
    ...mixins.transitionSimple(),

    backgroundColor: colors.externalInputBackground,
    borderColor: ({ meta }) => (
      Input.fieldError(meta) ? colors.externalFieldErrorBackground : 'transparent'
    ),
    borderRadius: units.externalInputBorderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    color: colors.externalInputText,
    paddingRight: units.externalInputPaddingRight,
    paddingLeft: units.externalInputPaddingLeft,

    '&:focus': {
      ...mixins.placeholder({
        opacity: 0.2
      })
    }
  }
}))(TextInput)
