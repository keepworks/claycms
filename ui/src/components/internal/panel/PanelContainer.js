import React from 'react'
import { withTheme } from 'react-jss'

import Column from 'components/internal/Column'
import Row from 'components/internal/Row'

function PanelContainer({ children, theme }) {
  return (
    <Row>
      <Column width={theme.units.panelContainerWidth}>
        {children}
      </Column>
    </Row>
  )
}

export default withTheme(PanelContainer)
