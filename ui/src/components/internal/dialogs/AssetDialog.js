import React from 'react'

import AssetForm from 'components/internal/forms/AssetForm'
import Dialog from 'components/internal/Dialog'

function AssetDialog({ formValues, onFormSubmit, ...other }) {
  const action = formValues.id ? 'Edit' : 'Add'
  const title = `${action} Asset`

  return (
    <Dialog title={title} contentLabel={`${title} Dialog`} {...other}>
      <AssetForm initialValues={formValues} onSubmit={onFormSubmit} />
    </Dialog>
  )
}

export default AssetDialog
