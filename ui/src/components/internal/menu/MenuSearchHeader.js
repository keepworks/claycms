import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import FontIcon from 'components/FontIcon'
import MenuLink from 'components/internal/menu/MenuLink'

class MenuSearchHeader extends Component {
  componentDidMount() {
    this.triggerInputFocus()
  }

  triggerInputFocus() {
    this.input.focus()
  }

  render() {
    const { onChange, value, classes } = this.props

    return (
      <div className={classes.menuSearchHeaderWrapper}>
        <input type="text" placeholder="Search..." ref={(input) => { this.input = input }} onChange={e => onChange(e.target.value)} value={value} />
        <FontIcon name="search" size="small" onClick={() => this.triggerInputFocus()} />
      </div>
    )
  }
}

MenuSearchHeader.propTypes = {
  onChange: PropTypes.func,
  pale: PropTypes.bool
}

MenuSearchHeader.defaultProps = {
  onChange: () => null,
  pale: true
}

export default injectSheet(({ colors, typography, units }) => ({
  menuSearchHeaderWrapper: {
    ...MenuLink.commonStyles({ colors, units }), // Uses 'pale' prop
    ...typography.regular,

    alignItems: 'center',
    backgroundColor: colors.menuSectionBackground,
    borderBottomColor: colors.menuSectionBorder,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    cursor: 'text',
    display: 'flex',
    height: units.menuSearchHeaderHeight,
    width: '100%',

    '& input': {
      backgroundColor: 'transparent',
      border: 'none',
      width: '100%'
    },

    '&:hover': {
      color: colors.text_primary
    }
  }
}))(MenuSearchHeader)
