import React from 'react'

import Dialog from 'components/internal/Dialog'
import ImportProjectForm from 'components/internal/forms/ImportProjectForm'

function ImportDialog({ formValues, onFormSubmit, ...other }) {
  const title = 'Import Project'

  return (
    <Dialog title={title} contentLabel={`${title} Dialog`} {...other}>
      <ImportProjectForm onSubmit={onFormSubmit} />
    </Dialog>
  )
}

export default ImportDialog
