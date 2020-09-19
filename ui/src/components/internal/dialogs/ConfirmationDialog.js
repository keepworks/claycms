import PropTypes from 'prop-types'
import React from 'react'

import Dialog from 'components/internal/Dialog'
import DialogFormFooter from 'components/internal/DialogFormFooter'
import FilledButton from 'components/buttons/FilledButton'

import { Text } from 'components/internal/typography'

function ConfirmationDialog({ description, onConfirmClick, onRequestClose, ...other }) {
  const handleConfirmClick = () => {
    if (onConfirmClick) {
      onConfirmClick()
    }

    if (onRequestClose) {
      onRequestClose()
    }
  }

  return (
    <Dialog title="Are you sure?" contentLabel="Confirmation Dialog" onRequestClose={onRequestClose} {...other}>
      {description && (
        <Text>
          {description}
        </Text>
      )}

      <DialogFormFooter>
        <FilledButton label="Cancel" type="button" variant="flat" onClick={onRequestClose} />
        <FilledButton label="Confirm" type="button" onClick={handleConfirmClick} />
      </DialogFormFooter>
    </Dialog>
  )
}

ConfirmationDialog.propTypes = {
  description: PropTypes.string,
  onConfirmClick: PropTypes.func,
  onRequestClose: PropTypes.func
}

ConfirmationDialog.defaultProps = {
  description: null,
  onConfirmClick: null,
  onRequestClose: null
}

export default ConfirmationDialog
