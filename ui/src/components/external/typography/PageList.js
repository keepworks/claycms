import injectSheet from 'react-jss'
import React from 'react'

function PageList({ children, classes }) {
  return (
    <ul className={classes.list}>
      {children}
    </ul>
  )
}

export default injectSheet(({ units }) => ({
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,

    '& + *': {
      marginTop: units.externalParagraphMarginTop
    }
  }
}))(PageList)
