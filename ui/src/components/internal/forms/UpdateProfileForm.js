import React from 'react'
import { Form, Field } from 'react-final-form'

import FilledButton from 'components/buttons/FilledButton'
import ItemBar from 'components/ItemBar'
import Spacer from 'components/Spacer'
import TextInput from 'components/inputs/TextInput'
import { User } from 'models'

function UpdateProfileForm(props) {
  return (
    <Form
      validate={User.validateProfile}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            label="First Name"
            component={TextInput}
            stretched={false}
          />
          <Spacer height={30} />
          <Field
            name="lastName"
            label="Last Name"
            component={TextInput}
            stretched={false}
          />
          <Spacer height={20} />
          <ItemBar reversed>
            <FilledButton label="Submit" disabled={submitting} />
          </ItemBar>
        </form>
      )}
      {...props}
    />
  )
}

export default UpdateProfileForm
