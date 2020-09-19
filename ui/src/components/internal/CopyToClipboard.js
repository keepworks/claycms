import copy from 'copy-to-clipboard'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import FontIcon from 'components/FontIcon'
import Tooltip from 'components/internal/Tooltip'

class CopyToClipboard extends PureComponent {
  constructor() {
    super()

    this.state = {
      isCopied: false
    }
  }

  handleClick = () => {
    const { text } = this.props

    copy(text)

    this.setState({ isCopied: true })
  }

  handleMouseLeave = () => {
    this.setState({ isCopied: false })
  }

  renderComponent = () => {
    const { icon, iconSize, render } = this.props

    if (render) {
      return render(this.handleClick)
    }

    return (
      <FontIcon
        name={icon}
        size={iconSize}
        onClick={this.handleClick}
      />
    )
  }

  render() {
    const { description } = this.props
    const { isCopied } = this.state

    const tooltip = isCopied ? 'Copied!' : description

    return (
      <Tooltip description={tooltip} onMouseLeave={this.handleMouseLeave}>
        {this.renderComponent()}
      </Tooltip>
    )
  }
}

CopyToClipboard.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  render: PropTypes.func,
  text: PropTypes.string.isRequired
}

CopyToClipboard.defaultProps = {
  description: 'Copy to clipboard',
  icon: 'code',
  iconSize: 'tiny',
  render: null
}

export default CopyToClipboard
