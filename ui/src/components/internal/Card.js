import injectSheet from 'react-jss'
import React from 'react'

function Card({ classes, children }) {
  return (
    <div className={classes.card}>
      {children}
    </div>
  )
}

export default injectSheet(({ colors, shadows, units }) => ({
  card: {
    backgroundColor: colors.internalCardBackground,
    boxShadow: shadows.internalCard,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    paddingRight: units.internalCardHorizontalPadding,
    paddingLeft: units.internalCardHorizontalPadding
  }
}))(Card)
