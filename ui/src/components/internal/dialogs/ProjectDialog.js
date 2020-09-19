import React from 'react'

import Dialog from 'components/internal/Dialog'
import ProjectForm from 'components/internal/forms/ProjectForm'

function ProjectDialog({ formValues, onFormSubmit, ...other }) {
  const title = 'Create a Project'

  return (
    <Dialog title={title} contentLabel={`${title} Dialog`} {...other}>
      <ProjectForm initialValues={formValues} onSubmit={onFormSubmit} />
    </Dialog>
  )
}

export default ProjectDialog
