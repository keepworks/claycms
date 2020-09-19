import React from 'react'
import { Field, Form } from 'react-final-form'

import FilledButton from 'components/buttons/FilledButton'
import FormFooter from 'components/onboarding/FormFooter'
import TextInput from 'components/inputs/TextInput'
import { User } from 'models'

function LoginForm({ onSubmit }) {
  return (
    <Form
      onSubmit={onSubmit}
      validate={User.validateLogin}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="email" component={TextInput} type="email" placeholder="Email" icon="email" autoComplete="on" autoFocus />
          <Field name="password" component={TextInput} type="password" placeholder="Password" icon="password" />

          <FormFooter>
            <FilledButton label="Log in" disabled={submitting} />
          </FormFooter>
        </form>
      )}
    />
  )
}

export default LoginForm
