import React from 'react'
import { Field, Form } from 'react-final-form'

import FilledButton from 'components/buttons/FilledButton'
import FormFooter from 'components/onboarding/FormFooter'
import TextInput from 'components/inputs/TextInput'
import { User } from 'models'

function ForgotPasswordForm({ onSubmit }) {
  return (
    <Form
      onSubmit={onSubmit}
      validate={User.validateForgotPassword}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="email" component={TextInput} type="email" placeholder="Email" autoComplete="on" autoFocus />

          <FormFooter>
            <FilledButton label="Submit" disabled={submitting} />
          </FormFooter>
        </form>
      )}
    />
  )
}

export default ForgotPasswordForm
