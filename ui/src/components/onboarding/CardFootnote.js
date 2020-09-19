import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'

function CardFootnote({ hide, classes, children }) {
  return (
    <div className={classNames(classes.cardFootnote, { [classes.cardFootnote_hide]: hide })}>
      {children}
    </div>
  )
}

CardFootnote.propTypes = {
  hide: PropTypes.bool,
  spaced: PropTypes.bool
}

CardFootnote.defaultProps = {
  hide: false,
  spaced: false
}

export default injectSheet(({ units }) => ({
  cardFootnote: {
    ...mixins.transitionSimple(),

    paddingTop: ({ spaced }) => (
      spaced ? units.cardFootnotePaddingTop * 2 : units.cardFootnotePaddingTop
    ),
    textAlign: 'center'
  },
  cardFootnote_hide: {
    opacity: 0
  }
}))(CardFootnote)
