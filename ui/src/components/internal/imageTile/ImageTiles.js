import injectSheet from 'react-jss'
import React from 'react'

const spacing = 30

function ImageTiles({ children, classes }) {
  return (
    <div className={classes.imageTiles}>
      {children}
    </div>
  )
}

export default injectSheet(() => ({
  imageTiles: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto',
    gridGap: `${spacing}px ${spacing}px`,
    marginBottom: spacing,
    marginTop: spacing
  }
}))(ImageTiles)
