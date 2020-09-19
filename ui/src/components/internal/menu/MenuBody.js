import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

function MenuBody({
  children, classes
}) {
  return (
    <div className={classes.menuBody}>
      {children}
    </div>
  )
}

MenuBody.propTypes = {
  children: PropTypes.node
}

MenuBody.defaultProps = {
  children: null
}

export default injectSheet(({ units }) => ({
  menuBody: ({ children }) => {
    const hasChildren = React.Children.toArray(children).length > 0

    return {
      maxHeight: units.menuBodyMaxHeight,
      overflowY: 'auto',
      paddingTop: hasChildren ? units.menuVerticalPadding : 0,
      paddingBottom: hasChildren ? units.menuVerticalPadding : 0
    }
  }
}))(MenuBody)
