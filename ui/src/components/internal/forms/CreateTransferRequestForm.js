import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'

import FilledButton from 'components/buttons/FilledButton'
import ItemBar from 'components/ItemBar'
import SingleSelectInput from 'components/internal/inputs/SingleSelectInput'
import Spacer from 'components/Spacer'
import { Team } from 'models'

function CreateTransferRequestForm({ options, ...other }) {
  return (
    <Form
      validate={Team.validateCreateTransferRequest}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="userId"
            component={SingleSelectInput}
            label="Select new owner"
            options={options}
            stretched={false}
          />
          <Spacer height={20} />
          <ItemBar reversed>
            <FilledButton label="Transfer" disabled={submitting} />
          </ItemBar>
        </form>
      )}
      {...other}
    />
  )
}

CreateTransferRequestForm.propTypes = {
  options: PropTypes.array
}

CreateTransferRequestForm.defaultProps = {
  options: []
}

export default CreateTransferRequestForm
