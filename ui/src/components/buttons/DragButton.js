import classNames from 'classnames'
import injectSheet from 'react-jss'
import React from 'react'

import FontIcon from 'components/FontIcon'

function DragButton({ classes }) {
  return (
    <div className={classNames(classes.dragHandle, 'drag-handle')}>
      <FontIcon name="template-move-thick" size="small" />
    </div>
  )
}

export default injectSheet(({ colors }) => ({
  dragHandle: {
    color: colors.text_pale,
    fontSize: 0 /* clear line-height that causes extra spacing */
  }
}))(DragButton)
