import React from 'react'

import FieldForm from 'components/internal/forms/FieldForm'
import { SidePane, SidePaneBody, SidePaneHeader } from 'components/internal/sidePane'
import { SidePaneTitle } from 'components/internal/typography'

function FieldSidePane({ entities, formValues, onFormSubmit, onRequestClose, ...other }) {
  const action = formValues.id ? 'Edit' : 'New'

  const title = `${action} Field`

  return (
    <SidePane contentLabel={`${title} SidePane`} onRequestClose={onRequestClose} {...other}>
      <SidePaneHeader onArrowClick={onRequestClose}>
        <SidePaneTitle>
          {title}
        </SidePaneTitle>
      </SidePaneHeader>

      <SidePaneBody>
        <FieldForm initialValues={formValues} onSubmit={onFormSubmit} entities={entities} />
      </SidePaneBody>
    </SidePane>
  )
}

export default FieldSidePane
