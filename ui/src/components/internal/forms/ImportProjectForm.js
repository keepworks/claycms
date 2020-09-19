import React from 'react'
import { Field, Form } from 'react-final-form'

import FilledButton from 'components/buttons/FilledButton'
import FormFooter from 'components/internal/FormFooter'
import TextInput from 'components/inputs/TextInput'
import { Restore } from 'models'

function ImportProjectForm(props) {
  return (
    <Form
      validate={Restore.validateCreate}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="url" component={TextInput} label="URL" stretched={false} />
          <FormFooter>
            <FilledButton label="Submit" disabled={submitting} />
          </FormFooter>
        </form>
      )}
      {...props}
    />
  )
}

export default ImportProjectForm
