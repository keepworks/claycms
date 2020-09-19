import classNames from 'classnames'
import injectSheet from 'react-jss'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'

const closeTransitionDuration = 300

function BaseModal({
  overlayBaseClassName,
  overlayAfterOpenClassName,
  overlayBeforeCloseClassName,
  contentBaseClassName,
  contentAfterOpenClassName,
  contentBeforeCloseClassName,
  classes,
  children,
  ...other
}) {
  return (
    <Modal
      appElement={document.getElementById('root')}
      bodyOpenClassName={classes.body}
      overlayClassName={{
        base: classNames(classes.overlay, overlayBaseClassName),
        afterOpen: classNames(classes.overlayAfterOpen, overlayAfterOpenClassName),
        beforeClose: classNames(classes.overlayBeforeClose, overlayBeforeCloseClassName)
      }}
      className={{
        base: classNames(classes.content, contentBaseClassName),
        afterOpen: classNames(classes.contentAfterOpen, contentAfterOpenClassName),
        beforeClose: classNames(classes.contentBeforeClose, contentBeforeCloseClassName)
      }}
      closeTimeoutMS={closeTransitionDuration}
      {...other}
    >
      {children}
    </Modal>
  )
}

BaseModal.propTypes = {
  contentLabel: PropTypes.string.isRequired, // For screenreaders
  onRequestClose: PropTypes.func.isRequired
}

export default injectSheet(({ colors, zIndexes }) => ({
  body: {
    overflow: 'hidden'
  },
  overlay: {
    ...mixins.transitionFluid(),

    backgroundColor: colors.baseModalOverlayBackground,
    opacity: 0,
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: zIndexes.modal
  },
  overlayAfterOpen: {
    backdropFilter: 'blur(5px)',
    opacity: 1
  },
  overlayBeforeClose: {
    backdropFilter: 'blur(0)',
    opacity: 0
  },
  content: {
    ...mixins.transitionFluid(),

    backgroundColor: colors.baseModalBackground
  }
}))(BaseModal)
