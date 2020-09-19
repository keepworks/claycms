import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import CloseButton from 'components/buttons/CloseButton'
import FontIcon from 'components/FontIcon'
import { withClientMutation, withClientQuery } from 'lib/data'

import GET_ALERT from 'queries/alert'
import { CLOSE_ALERT } from 'mutations/alert'

const defaults = {
  success: {
    icon: 'alert-success',
    title: 'Well done!'
  },
  failure: {
    icon: 'alert-failure',
    title: 'Yikes!'
  }
}

const alertIconSize = 'medium'
const closeTimeoutInMS = 5000

let closeTimer = null

function AlertBox({
  alert: {
    isOpen, icon, title, message, variant
  },
  closeAlert,
  classes
}) {
  if (isOpen) {
    if (closeTimer) {
      clearTimeout(closeTimer)
    }

    closeTimer = setTimeout(closeAlert, closeTimeoutInMS)
  }

  const handleClose = () => {
    if (closeTimer) {
      clearTimeout(closeTimer)
    }

    closeAlert()
  }

  return (
    <div className={classes.container}>
      <div
        role="alert"
        className={classNames(
          classes.alert,
          classes[`alert_${variant}`],
          { [classes.alert_open]: isOpen }
        )}
      >
        <div role="button" tabIndex={-1} className={classes.dismiss} onClick={handleClose} onKeyPress={handleClose} />
        <div className={classes.header}>
          <div className={classNames(classes.icon, classes[`icon_${variant}`])}>
            <FontIcon name={icon || defaults[variant].icon} size={alertIconSize} />
          </div>
          <div className={classNames(classes.title, classes[`title_${variant}`])}>
            {title || defaults[variant].title}
          </div>
          <CloseButton onClick={handleClose} />
        </div>
        {message && (
          <div className={classes.message}>
            {message || defaults[variant].message}
          </div>
        )}
      </div>
    </div>
  )
}

AlertBox.propTypes = {
  alert: PropTypes.shape({
    isOpen: PropTypes.bool,
    variant: PropTypes.oneOf(Object.keys(defaults)).isRequired
  })
}

AlertBox.defaultProps = {
  alert: {
    isOpen: false
  }
}

AlertBox = injectSheet(({
  colors, shadows, typography, units, zIndexes
}) => ({
  container: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: zIndexes.alert
  },
  alert: {
    ...mixins.responsiveProperty('width', units.alertWidth),
    ...mixins.transitionSimple(),

    backgroundColor: colors.alertBackground,
    borderRadius: units.alertBorderRadius,
    boxShadow: shadows.alert,
    opacity: 0,
    paddingTop: units.alertVerticalPadding,
    paddingRight: units.alertHorizontalPadding,
    paddingBottom: units.alertVerticalPadding,
    paddingLeft: units.alertHorizontalPadding,
    pointerEvents: 'none',
    position: 'absolute',
    right: units.alertPositionRight,
    bottom: 0
  },
  alert_open: {
    bottom: units.alertPositionBottom,
    opacity: 1,
    pointerEvents: 'auto'
  },
  dismiss: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: units.alertHeaderPaddingBottom
  },
  icon: {
    fontSize: 0, /* clear line-height that causes extra spacing */
    marginRight: units.alertIconMargin
  },
  icon_success: {
    color: colors.alert_success
  },
  icon_failure: {
    color: colors.alert_failure
  },
  title: {
    ...typography.semiboldMedium,

    flex: '1 0 auto'
  },
  title_success: {
    color: colors.alert_success
  },
  title_failure: {
    color: colors.alert_failure
  },
  message: {
    ...typography.regularSquished,

    color: colors.alertText
  }
}))(AlertBox)

AlertBox = withClientMutation(CLOSE_ALERT)(AlertBox)

AlertBox = withClientQuery(GET_ALERT)(AlertBox)

export default AlertBox
