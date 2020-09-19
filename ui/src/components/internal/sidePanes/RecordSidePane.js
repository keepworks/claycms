import React from 'react'

import RecordForm from 'components/internal/forms/RecordForm'
import { SidePane, SidePaneBody, SidePaneHeader } from 'components/internal/sidePane'
import { SidePaneTitle } from 'components/internal/typography'

function RecordSidePane({ fields, formValues, onFormSubmit, onRequestClose, ...other }) {
  const action = formValues.id ? 'Edit' : 'New'

  const title = `${action} Record`

  return (
    <SidePane contentLabel={`${title} SidePane`} onRequestClose={onRequestClose} {...other}>
      <SidePaneHeader onArrowClick={onRequestClose}>
        <SidePaneTitle>
          {title}
        </SidePaneTitle>
      </SidePaneHeader>

      <SidePaneBody>
        <RecordForm fields={fields} initialValues={formValues} onSubmit={onFormSubmit} />
      </SidePaneBody>
    </SidePane>
  )
}

export default RecordSidePane
