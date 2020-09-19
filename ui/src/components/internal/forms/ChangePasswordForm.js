import React from 'react'
import { Form, Field } from 'react-final-form'

import Column from 'components/internal/Column'
import FilledButton from 'components/buttons/FilledButton'
import ItemBar from 'components/ItemBar'
import Row from 'components/internal/Row'
import Spacer from 'components/Spacer'
import TextInput from 'components/inputs/TextInput'
import { User } from 'models'

function ChangePasswordForm(props) {
  return (
    <Form
      validate={User.validateChangePassword}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Row>
            <Column width="50%">
              <Field
                name="currentPassword"
                label="Current password"
                type="password"
                component={TextInput}
                stretched={false}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Field
                name="password"
                label="New password"
                type="password"
                component={TextInput}
                stretched={false}
              />
            </Column>
            <Column>
              <Field
                name="passwordConfirmation"
                label="Confirm new password"
                type="password"
                component={TextInput}
                stretched={false}
              />
            </Column>
          </Row>
          <Spacer height={20} />
          <ItemBar reversed>
            <FilledButton label="Save Password" disabled={submitting} />
          </ItemBar>
        </form>
      )}
      {...props}
    />
  )
}

export default ChangePasswordForm
