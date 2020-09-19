import React from 'react'
import { Field, Form } from 'react-final-form'

import FilledButton from 'components/buttons/FilledButton'
import ItemBar from 'components/ItemBar'
import Spacer from 'components/Spacer'
import TextInput from 'components/inputs/TextInput'
import { Team } from 'models'

function ChangeTeamNameForm(props) {
  return (
    <Form
      validate={Team.validateUpdate}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="name" component={TextInput} label="Team Name" stretched={false} />
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

export default ChangeTeamNameForm
