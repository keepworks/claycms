import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { withTheme } from 'react-jss'

import ItemBar from 'components/ItemBar'
import Spacer from 'components/Spacer'

function DialogFormFooter({ children }) {
  return (
    <Fragment>
      <Spacer height={30} />

      <ItemBar reversed>
        {children}
      </ItemBar>
    </Fragment>
  )
}

DialogFormFooter.propTypes = {
  children: PropTypes.node.isRequired
}

export default withTheme(DialogFormFooter)
