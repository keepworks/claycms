import React from 'react'
import { Field, Form } from 'react-final-form'

import FilledButton from 'components/buttons/FilledButton'
import FormFooter from 'components/internal/FormFooter'
import TextInput from 'components/inputs/TextInput'
import { Project } from 'models'

function ChangeProjectNameForm(props) {
  return (
    <Form
      validate={Project.validateUpdate}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="name" component={TextInput} label="Project Name" stretched={false} />
          <FormFooter>
            <FilledButton label="Submit" disabled={submitting} />
          </FormFooter>
        </form>
      )}
      {...props}
    />
  )
}

export default ChangeProjectNameForm
