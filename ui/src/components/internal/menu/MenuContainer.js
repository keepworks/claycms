import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Manager, Reference, Popper } from 'react-popper'
import { withTheme } from 'react-jss'

class MenuContainer extends PureComponent {
  constructor() {
    super()

    this.referenceNode = null

    this.state = {
      isActive: false
    }
  }

  openMenu = () => this.setState({ isActive: true })

  closeMenu = (e) => {
    /*
      Ensure closeMenu passed to ClickOutside doesn't interfere with toggleMenu
    */
    if (this.referenceNode.contains(e.target)) {
      return
    }

    this.setState({ isActive: false })
  }

  toggleMenu = () => this.setState(prevState => ({ isActive: !prevState.isActive }))

  render() {
    const {
      isOpen, placement, variation, horizontalOffset, verticalOffset, children, theme
    } = this.props
    const { isActive } = this.state

    const childrenArray = React.Children.toArray(children)
    if (childrenArray.length > 2) {
      throw new Error('MenuContainer cannot have more than two children.')
    }

    const referenceElement = React.cloneElement(childrenArray[0], {
      onClick: this.toggleMenu,
      onMouseDown: (e) => { e.preventDefault() },
      isActive: isActive || isOpen
    })

    const popperElement = React.cloneElement(childrenArray[1], {
      closeMenu: this.closeMenu
    })

    return (
      <Manager>
        <Reference innerRef={(node) => { this.referenceNode = node }}>
          {({ ref }) => (
            <div ref={ref}>
              {referenceElement}
            </div>
          )}
        </Reference>
        {(isActive || isOpen) && (
          <Popper
            placement={`${placement}-${variation}`}
            modifiers={{ offset: { offset: `${horizontalOffset}, ${verticalOffset}` } }}
            positionFixed
          >
            {({ ref, style }) => (
              <div ref={ref} style={{ ...style, zIndex: theme.zIndexes.menu }}>
                {popperElement}
              </div>
            )}
          </Popper>
        )}
      </Manager>
    )
  }
}

MenuContainer.propTypes = {
  isOpen: PropTypes.bool,
  placement: PropTypes.oneOf([ 'auto', 'top', 'right', 'bottom', 'left' ]),
  variation: PropTypes.oneOf([ 'start', 'end' ]),
  horizontalOffset: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  verticalOffset: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  children: PropTypes.node.isRequired
}

MenuContainer.defaultProps = {
  isOpen: false,
  placement: 'bottom',
  variation: 'end',
  horizontalOffset: 0,
  verticalOffset: 0
}

export default withTheme(MenuContainer)
