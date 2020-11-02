import React from 'react'
import { Field, Form } from 'react-final-form'

import FilledButton from 'components/buttons/FilledButton'
import FormFooter from 'components/internal/FormFooter'
import TextInput from 'components/inputs/TextInput'

function ProjectSearchForm(props) {
  return (
    <Form
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="search" component={TextInput} placeholder="Search..." stretched={false} />
          <FormFooter>
            <FilledButton label="Search" disabled={submitting} />
          </FormFooter>
        </form>
      )}
      {...props}
    />
  )
}

export default ProjectSearchForm
