import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import ItemBar from 'components/ItemBar'
import Spacer from 'components/Spacer'

function FormFooter({ children }) {
  return (
    <Fragment>
      <Spacer height={30} />

      <ItemBar reversed>
        {children}
      </ItemBar>
    </Fragment>
  )
}

FormFooter.propTypes = {
  children: PropTypes.node.isRequired
}

export default FormFooter
