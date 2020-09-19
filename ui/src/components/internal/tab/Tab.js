import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { Tab as ReactTab } from 'react-tabs'

import * as mixins from 'styles/mixins'
import cleanProps from 'lib/cleanProps'

function Tab({ variant, classes, children, ...other }) {
  return (
    <ReactTab
      className={classNames(
        classes.tab,
        classes[`tab_${variant}`]
      )}
      selectedClassName={classNames(
        classes.tab_selected,
        classes[`tab_${variant}Selected`]
      )}
      {...cleanProps(other)}
    >
      {children}
    </ReactTab>
  )
}

Tab.propTypes = {
  variant: PropTypes.oneOf([ 'fixed', 'fluid' ])
}

Tab.defaultProps = {
  variant: 'fluid'
}

Tab = injectSheet(({ colors, shadows, typography, units }) => ({
  tab: {
    ...mixins.transitionSimple(),

    color: colors.tab,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    outline: 'none',
    position: 'relative',

    '&:hover': {
      color: colors.tab_hover
    },

    '&::after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0
    },

    '& > *': {
      margin: 10
    }
  },
  tab_fluid: {
    ...typography.regular,

    flex: '1 0 auto',
    padding: units.tabPadding,
    textTransform: 'uppercase',

    '&::after': {
      backgroundColor: colors.tabUnderline,
      height: units.tabUnderlineHeight
    }
  },
  tab_fixed: {
    ...mixins.size(units.tabWidth_fixed, units.tabHeight_fixed),
    ...typography.regularSmallSpacedSquished,

    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',

    '&::after': {
      backgroundColor: 'transparent',
      height: units.tabUnderlineHeight_selected
    },

    '&:not(last-child)': {
      '&::before': {
        ...mixins.size(1, units.tabDividerHeight),

        backgroundColor: colors.tabDividerBackground,
        content: '" "',
        position: 'absolute',
        right: 0
      }
    }
  },
  tab_selected: {
    color: colors.tab_selected,

    '&::after': {
      backgroundColor: colors.tab_selected,
      boxShadow: shadows.tab_selected,
      height: units.tabUnderlineHeight_selected
    }
  },
  tab_fluidSelected: {
    ...typography.semiboldExtraSmall
  },
  tab_fixedSelected: {
    ...typography.semiboldExtraSmallSquished
  }
}))(Tab)

Tab.tabsRole = 'Tab'

export default Tab
