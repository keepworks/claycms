import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import AlertBox from 'components/AlertBox'
import Content from 'components/internal/Content'
import Header from 'components/internal/Header'
import ScrollToTop from 'components/ScrollToTop'
import Sidebar from 'components/internal/sidebar/Sidebar'

function InternalLayout({ fluid, classes, children }) {
  return (
    <ScrollToTop>
      <div className={classes.internalLayout}>
        <Header />
        <Sidebar fluid={fluid} />
        <Content fluid={fluid}>
          {children}
        </Content>
        <AlertBox />
      </div>
    </ScrollToTop>
  )
}

InternalLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default injectSheet(({ colors, units }) => ({
  internalLayout: {
    backgroundColor: colors.internalBackground,
    minHeight: '100%',
    minWidth: units.internalLayoutMinWidth
  }
}))(InternalLayout)
