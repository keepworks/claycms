import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Manager, Reference, Popper } from 'react-popper'

import * as mixins from 'styles/mixins'

class Tooltip extends PureComponent {
  constructor() {
    super()

    this.state = {
      isActive: false
    }
  }

  showTooltip = () => {
    const { onMouseEnter } = this.props

    if (onMouseEnter) {
      onMouseEnter()
    }

    this.setState({ isActive: true })
  }

  hideTooltip = () => {
    const { onMouseLeave } = this.props

    if (onMouseLeave) {
      onMouseLeave()
    }

    this.setState({ isActive: false })
  }

  render() {
    const {
      description, placement, horizontalOffset, verticalOffset, classes, children
    } = this.props
    const { isActive } = this.state

    const child = React.Children.only(children)

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            React.cloneElement(child, {
              ref,
              role: 'tooltip',
              onMouseEnter: this.showTooltip,
              onMouseLeave: this.hideTooltip
            })
          )}
        </Reference>
        {isActive && (
          <Popper
            placement={`${placement}-start`}
            modifiers={{ offset: { offset: `${horizontalOffset}, ${verticalOffset}` } }}
            positionFixed
          >
            {({ ref, style, placement: popperPlacement, arrowProps }) => (
              <div ref={ref} style={style} className={classes.tooltip}>
                {description}

                <div
                  ref={arrowProps.ref}
                  className={classes.arrow}
                  data-placement={popperPlacement}
                  style={arrowProps.style}
                />
              </div>
            )}
          </Popper>
        )}
      </Manager>
    )
  }
}

Tooltip.propTypes = {
  description: PropTypes.string.isRequired,
  placement: PropTypes.oneOf([ 'top', 'bottom' ]),
  horizontalOffset: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  verticalOffset: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  children: PropTypes.node.isRequired
}

Tooltip.defaultProps = {
  placement: 'top',
  horizontalOffset: -15,
  verticalOffset: 10,
  onMouseEnter: null,
  onMouseLeave: null
}

export default injectSheet(({ colors, shadows, typography, units, zIndexes }) => ({
  tooltip: {
    ...typography.regularSmallSquished,

    backgroundColor: colors.tooltipBackground,
    boxShadow: shadows.tooltip,
    color: colors.text_light,
    padding: units.tooltipPadding,
    position: 'relative',
    zIndex: zIndexes.tooltip
  },
  arrow: {
    ...mixins.size(units.tooltipArrowSize),

    position: 'absolute',

    '&::before': {
      ...mixins.size('100%'),

      backgroundColor: colors.tooltipBackground,
      borderRadius: 1,
      content: '" "',
      display: 'block'
    },

    '&[data-placement^="top"]': {
      bottom: units.tooltipArrowVerticalShift,

      '&::before': {
        transform: 'rotate(45deg)'
      }
    },

    '&[data-placement^="bottom"]': {
      top: units.tooltipArrowVerticalShift,

      '&::before': {
        transform: 'rotate(45deg)'
      }
    }
  }
}))(Tooltip)
