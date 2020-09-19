import React from 'react'

import EntityForm from 'components/internal/forms/EntityForm'
import { SidePane, SidePaneBody, SidePaneHeader } from 'components/internal/sidePane'
import { SidePaneTitle } from 'components/internal/typography'

function EntitySidePane({ entities, formValues, onFormSubmit, onRequestClose, ...other }) {
  const action = formValues.id ? 'Edit' : 'New'

  const title = `${action} Entity`

  return (
    <SidePane contentLabel={`${title} SidePane`} onRequestClose={onRequestClose} {...other}>
      <SidePaneHeader onArrowClick={onRequestClose}>
        <SidePaneTitle>
          {title}
        </SidePaneTitle>
      </SidePaneHeader>

      <SidePaneBody>
        <EntityForm entities={entities} initialValues={formValues} onSubmit={onFormSubmit} />
      </SidePaneBody>
    </SidePane>
  )
}

export default EntitySidePane
