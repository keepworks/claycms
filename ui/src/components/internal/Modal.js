import injectSheet from 'react-jss'
import React from 'react'

import BaseModal from 'components/BaseModal'
import CloseButton from 'components/buttons/CloseButton'

function Modal({ onRequestClose, classes, children, ...other }) {
  return (
    <BaseModal
      contentBaseClassName={classes.contentBase}
      onRequestClose={onRequestClose}
      {...other}
    >
      <div className={classes.closeButton}>
        <CloseButton onClick={onRequestClose} />
      </div>
      {children}
    </BaseModal>
  )
}

export default injectSheet(({ colors, units }) => ({
  contentBase: {
    backgroundColor: colors.modalBackground,
    overflowY: 'auto',
    paddingTop: units.modalVerticalPadding,
    paddingRight: units.modalHorizontalPadding,
    paddingBottom: units.modalVerticalPadding,
    paddingLeft: units.modalHorizontalPadding,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  closeButton: {
    position: 'fixed',
    top: units.modalCloseButtonPositionTop,
    right: units.modalCloseButtonPositionRight
  }
}))(Modal)
