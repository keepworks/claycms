import React from 'react'
import { Field, Form } from 'react-final-form'

import FilledButton from 'components/buttons/FilledButton'
import FormFooter from 'components/onboarding/FormFooter'
import TextInput from 'components/inputs/TextInput'
import { User } from 'models'

function ConfirmUserForm(props) {
  return (
    <Form
      validate={User.validateConfirmUser}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="firstName" component={TextInput} placeholder="First Name" icon="first-name" autoComplete="on" />
          <Field name="lastName" component={TextInput} placeholder="Last Name" icon="last-name" autoComplete="on" />
          <Field name="password" component={TextInput} type="password" placeholder="Password" icon="password" />
          <Field name="passwordConfirmation" component={TextInput} type="password" placeholder="Confirm Password" icon="password" />
          <Field name="confirmationToken" component="input" type="hidden" />

          <FormFooter>
            <FilledButton label="Submit" disabled={submitting} />
          </FormFooter>
        </form>
      )}
      {...props}
    />
  )
}

export default ConfirmUserForm
