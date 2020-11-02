import React from 'react'

import Modal from 'components/internal/Modal'
import RecordForm from 'components/internal/forms/RecordForm'
import Spacer from 'components/Spacer'
import { DialogTitle } from 'components/internal/typography'

function RecordModal({ formValues, ...other }) {
  const action = formValues.id ? 'Edit' : 'New'

  const title = `${action} Record`

  return (
    <Modal contentLabel={`${title} Modal`} {...other}>
      <DialogTitle>{title}</DialogTitle>
      <Spacer height={20} />
      <RecordForm
        {...other}
        initialValues={formValues}
      />
    </Modal>
  )
}

export default RecordModal
