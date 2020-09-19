import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'

function ConditionalField({ is, isOneOf, when, children }) {
  const renderMatch = (value) => {
    if (isOneOf) {
      return isOneOf.includes(value) ? children : null
    }

    return value === is ? children : null
  }

  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => renderMatch(value)}
    </Field>
  )
}

ConditionalField.propTypes = {
  children: PropTypes.node.isRequired,
  when: PropTypes.string.isRequired,
  isOrIsOneOf: ({ is, isOneOf }, propName, componentName) => {
    if (!is && !isOneOf) {
      return new Error(`One of props 'is' or 'isOneOf' was not specified in '${componentName}'.`)
    }

    PropTypes.checkPropTypes({
      is: PropTypes.any,
      isOneOf: PropTypes.arrayOf(PropTypes.any)
    }, { is, isOneOf }, 'prop', componentName)

    return null
  }
}

ConditionalField.defaultProps = {
  isOrIsOneOf: null
}

export default ConditionalField
