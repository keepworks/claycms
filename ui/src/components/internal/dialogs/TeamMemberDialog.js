import React from 'react'

import Dialog from 'components/internal/Dialog'
import TeamMemberForm from 'components/internal/forms/TeamMemberForm'
import { TeamMembership } from 'models'

function TeamMemberDialog({ formValues, onFormSubmit, ...other }) {
  const action = formValues.id ? 'Edit' : 'Invite New'
  const title = `${action} Member`

  const { id, role = TeamMembership.defaultRole, user: { email } = {}, ...rest } = formValues
  const initialValues = { id, role, email, ...rest }

  return (
    <Dialog title={title} contentLabel={`${title} Dialog`} {...other}>
      <TeamMemberForm initialValues={initialValues} onSubmit={onFormSubmit} />
    </Dialog>
  )
}

export default TeamMemberDialog
