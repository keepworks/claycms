import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import BaseModal from 'components/BaseModal'
import CloseButton from 'components/buttons/CloseButton'
import { DialogTitle } from 'components/internal/typography'

function Dialog({
  title,
  onRequestClose,
  classes,
  children,
  ...other
}) {
  return (
    <BaseModal
      isOpen
      overlayBaseClassName={classes.overlayBase}
      contentBaseClassName={classes.contentBase}
      contentAfterOpenClassName={classes.contentAfterOpen}
      contentBeforeCloseClassName={classes.contentBeforeClose}
      onRequestClose={onRequestClose}
      {...other}
    >
      <div className={classes.header}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <CloseButton onClick={onRequestClose} />
      </div>
      {children}
    </BaseModal>
  )
}

Dialog.propTypes = {
  title: PropTypes.string.isRequired
}

export default injectSheet(({ colors, shadows, units }) => ({
  overlayBase: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  contentBase: {
    borderRadius: units.dialogBorderRadius,
    boxShadow: shadows.dialog,
    marginTop: units.dialogMarginTop,
    padding: units.dialogPadding,
    width: units.dialogWidth,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 0,

    '&::before': {
      ...mixins.size(units.dialogCircleSize_small),

      backgroundColor: colors.dialogCircleBackground,
      borderRadius: '50%',
      content: '" "',
      position: 'absolute',
      top: units.dialogCircleShiftTop_small,
      left: units.dialogCircleShiftLeft_small,
      zIndex: -1
    },

    '&::after': {
      ...mixins.size(units.dialogCircleSize_large),

      backgroundColor: colors.dialogCircleBackground,
      borderRadius: '50%',
      content: '" "',
      position: 'absolute',
      right: units.dialogCircleShiftRight_small,
      bottom: units.dialogCircleShiftBottom_small,
      zIndex: -1
    }
  },
  contentAfterOpen: {
    marginTop: 0
  },
  contentBeforeClose: {
    marginTop: units.dialogMarginTop
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: units.dialogHeaderPaddingBottom
  }
}))(Dialog)
