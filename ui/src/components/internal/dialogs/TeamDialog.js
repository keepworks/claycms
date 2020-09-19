import React from 'react'

import Dialog from 'components/internal/Dialog'
import TeamForm from 'components/internal/forms/TeamForm'

function TeamDialog({ onFormSubmit, ...other }) {
  const title = 'Create a Team'

  return (
    <Dialog title={title} contentLabel={`${title} Dialog`} {...other}>
      <TeamForm onSubmit={onFormSubmit} />
    </Dialog>
  )
}

export default TeamDialog
