import React from 'react'

import Modal from 'components/internal/Modal'
import UpdateProfilePictureForm from 'components/internal/forms/UpdateProfilePictureForm'
import Spacer from 'components/Spacer'
import { DialogTitle } from 'components/internal/typography'

function PictureModal(props) {
  const title = 'Change Profile Picture'

  return (
    <Modal contentLabel={`${title} Modal`} {...props}>
      <DialogTitle>Change Profile Picture</DialogTitle>
      <Spacer height={20} />
      <UpdateProfilePictureForm {...props} />
    </Modal>
  )
}

export default PictureModal
