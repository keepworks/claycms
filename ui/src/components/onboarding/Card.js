import injectSheet from 'react-jss'
import React from 'react'

import * as mixins from 'styles/mixins'

const circleSize = 320

function Card({ classes, children }) {
  return (
    <div data-card className={classes.card}>
      {children}
    </div>
  )
}

export default injectSheet(({ colors, shadows, units }) => ({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: units.cardBorderRadius,
    boxShadow: shadows.card,
    overflow: 'hidden',
    paddingTop: units.cardVerticalPadding,
    paddingRight: units.cardHorizontalPadding,
    paddingBottom: units.cardVerticalPadding,
    paddingLeft: units.cardHorizontalPadding,
    position: 'relative',
    width: units.cardWidth,

    '&::after': {
      ...mixins.circle({
        size: circleSize,
        color: colors.circleBackground_dark,
        opacity: 1
      }),

      right: (-1 / 4) * circleSize,
      bottom: (-2 / 3) * circleSize,
      zIndex: -1
    }
  }
}))(Card)
