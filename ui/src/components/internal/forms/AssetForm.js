import React from 'react'
import { Field, Form } from 'react-final-form'

import DialogFormFooter from 'components/internal/DialogFormFooter'
import FilledButton from 'components/buttons/FilledButton'
import TextInput from 'components/inputs/TextInput'

function AssetForm(props) {
  return (
    <Form
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="name" component={TextInput} placeholder="Name" icon="attachment" autoFocus />

          <DialogFormFooter>
            <FilledButton label="Submit" disabled={submitting} />
          </DialogFormFooter>
        </form>
      )}
      {...props}
    />
  )
}

export default AssetForm
