import React from 'react'
import { Field, Form } from 'react-final-form'

import FilledButton from 'components/buttons/FilledButton'
import FormFooter from 'components/onboarding/FormFooter'
import TextInput from 'components/inputs/TextInput'
import { User } from 'models'

function ResetPasswordForm(props) {
  return (
    <Form
      validate={User.validateResetPassword}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="resetPasswordToken" component="input" type="hidden" />
          <Field name="password" component={TextInput} type="password" placeholder="New Password" autoFocus />
          <Field name="passwordConfirmation" component={TextInput} type="password" placeholder="Confirm New Password" />

          <FormFooter>
            <FilledButton label="Reset" disabled={submitting} />
          </FormFooter>
        </form>
      )}
      {...props}
    />
  )
}

export default ResetPasswordForm
