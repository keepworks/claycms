import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { Fragment, useState } from 'react'

import ConfirmationDialog from 'components/internal/dialogs/ConfirmationDialog'

function withConfirmation() {
  return (WrappedComponent) => {
    function EnhancedComponent(props) {
      const [ options, setOptions ] = useState({})
      const [ isConfirmationDialogOpen, setIsConfirmationDialogOpen ] = useState(false)

      const openConfirmationDialog = (values) => {
        setOptions(values)
        setIsConfirmationDialogOpen(true)
      }

      const closeConfirmationDialog = () => setIsConfirmationDialogOpen(false)

      return (
        <Fragment>
          <WrappedComponent {...props} confirm={openConfirmationDialog} />
          <ConfirmationDialog
            isOpen={isConfirmationDialogOpen}
            onRequestClose={closeConfirmationDialog}
            {...options}
          />
        </Fragment>
      )
    }

    hoistNonReactStatics(EnhancedComponent, WrappedComponent)

    return EnhancedComponent
  }
}

export default withConfirmation
