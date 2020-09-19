import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import FontIcon from 'components/FontIcon'
import ItemBar from 'components/ItemBar'

function ActionList({ actions, record, classes }) {
  return (
    <ItemBar>
      {actions.map(({ icon, onClick }) => (
        <div
          key={icon}
          role="button"
          tabIndex={-1}
          className={classes.action}
          onClick={(e) => {
            e.stopPropagation()
            onClick(record, e)
          }}
          onKeyPress={(e) => {
            e.stopPropagation()
            onClick(record, e)
          }}
        >
          <FontIcon name={icon} size="small" />
        </div>
      ))}
    </ItemBar>
  )
}

ActionList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func
  })),
  record: PropTypes.object
}

ActionList.defaultProps = {
  actions: [],
  record: null
}

export default injectSheet(({ colors, units }) => ({
  action: {
    ...mixins.transitionSimple(),

    display: 'flex',
    color: colors.text_pale,
    cursor: 'pointer',

    '&:hover': {
      color: colors.text_dark
    },

    '&:not(:last-child)': {
      marginRight: units.assetBoxActionMarginRight
    }
  }
}))(ActionList)
