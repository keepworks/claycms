import injectSheet from 'react-jss'
import React from 'react'
import { TabList as ReactTabList } from 'react-tabs'

import cleanProps from 'lib/cleanProps'
import * as mixins from 'styles/mixins'

function TabList({ classes, children, ...other }) {
  return (
    <ReactTabList className={classes.tabList} {...cleanProps(other)}>
      {children}
    </ReactTabList>
  )
}

TabList = injectSheet(() => ({
  tabList: {
    ...mixins.listless,

    alignItems: 'center',
    display: 'flex'
  }
}))(TabList)

TabList.tabsRole = 'TabList'

export default TabList
