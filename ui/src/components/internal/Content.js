import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

function Content({ fluid, classes, children }) {
  return (
    <div className={classNames(classes.content, { [classes.content_fluid]: fluid })}>
      {children}
    </div>
  )
}

Content.propTypes = {
  fluid: PropTypes.bool,
  children: PropTypes.node.isRequired
}

Content.defaultProps = {
  fluid: false
}

export default injectSheet(({ units }) => ({
  content: {
    paddingTop: units.internalContentPaddingTop,
    paddingRight: units.internalContentPaddingRight,
    paddingBottom: units.internalContentPaddingBottom,
    paddingLeft: units.sidebarWidth + units.internalContentPaddingLeft
  },
  content_fluid: {
    paddingTop: 0,
    paddingRight: units.internalContentPaddingHorizontal_fluid,
    paddingBottom: units.internalContentPaddingBottom_fluid,
    paddingLeft: units.internalContentPaddingHorizontal_fluid
  }
}))(Content)
