import _ from 'lodash'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import FontIcon from 'components/FontIcon'

const rowActionIconSize = 'small'

function Row({
  actions,
  compact,
  header,
  record,
  rowIds,
  rowProps,
  selectable,
  selectedIds,
  sortable,
  onRowClick,
  updateSelection,
  classes,
  children
}) {
  const { isPale = false, showActions = true } = rowProps && rowProps({ record })

  const handleRowClick = () => {
    if (onRowClick) {
      onRowClick(record)
    }
  }

  const renderDragHandleColumn = () => (
    <div className={classNames(classes.dataTableDragHandle, 'drag-handle')}>
      <FontIcon name="template-move-thin" size="small" />
    </div>
  )

  const renderCheckboxColumn = () => {
    const checked = header
      ? _.isEqual(rowIds.sort(), selectedIds.sort())
      : record && selectedIds.includes(record.id)

    const handleChange = (e) => {
      e.stopPropagation()

      if (header) {
        if (checked) {
          updateSelection([])
        } else {
          updateSelection(rowIds)
        }
      } else if (record) {
        if (checked) {
          updateSelection(selectedIds.filter(selectedId => selectedId !== record.id))
        } else {
          updateSelection([ record.id, ...selectedIds ])
        }
      }
    }

    return (
      <div role="presentation" className={classes.dataTableCheckboxWrapper} onClick={handleChange}>
        <input
          checked={checked}
          type="checkbox"
          name="checkbox"
          onChange={handleChange}
          className={classes.dataTableCheckbox}
        />
      </div>
    )
  }

  const renderRowActions = () => {
    if (!showActions || actions.length === 0) {
      return null
    }

    return (
      <div className={classes.dataTableRowActions}>
        {actions.map(({ icon, onClick }) => (
          <div
            key={icon}
            role="button"
            tabIndex={-1}
            className={classes.dataTableRowAction}
            onClick={(e) => {
              e.stopPropagation()
              onClick(record, e)
            }}
            onKeyPress={(e) => {
              e.stopPropagation()
              onClick(record, e)
            }}
          >
            <FontIcon name={icon} size={rowActionIconSize} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      role="row"
      tabIndex={-1}
      className={classNames(
        classes.dataTableRow,
        {
          [classes.dataTableRow_compact]: compact,
          [classes.dataTableRow_header]: header,
          [classes.dataTableRow_pale]: isPale,
          [classes.dataTableRow_selected]: !header && record && selectedIds.includes(record.id),
          [classes.dataTableRow_showActions]: showActions && actions.length
        }
      )}
      onClick={() => handleRowClick(record)}
      onKeyPress={() => handleRowClick(record)}
    >
      {sortable && renderDragHandleColumn()}

      {selectable && renderCheckboxColumn()}

      {children}

      {renderRowActions()}
    </div>
  )
}

Row = injectSheet(({
  colors, shadows, typography, units
}) => ({
  dataTableRow: {
    ...mixins.size('100%', units.dataTableRowHeight),
    ...mixins.transitionSimple(),
    ...typography.regularSmallSpaced,

    alignItems: 'center',
    color: colors.text_dark,
    cursor: ({ onRowClick }) => (onRowClick ? 'pointer' : 'auto'),
    display: 'flex',
    position: 'relative',
    zIndex: 0,

    '&::before': {
      ...mixins.transitionSimple(),

      backgroundColor: colors.dataTableRowBackground,
      borderColor: 'transparent',
      borderRadius: units.dataTableRowBorderRadius,
      borderStyle: 'solid',
      borderWidth: 1,
      boxShadow: shadows.dataTableRow,
      content: '" "',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1
    },

    '&:hover': {
      '&::before': {
        boxShadow: ({ header }) => (header ? 'none' : shadows.dataTableRow_hover)
      },

      '& $dataTableRowActions': {
        opacity: 1,
        pointerEvents: 'auto'
      }
    },

    '&:not(:last-child)': {
      marginBottom: ({ compact }) => (compact
        ? units.dataTableRowMarginBottom_compact : units.dataTableRowMarginBottom)
    }
  },
  dataTableRow_compact: {
    ...mixins.size('100%', units.dataTableRowHeight_compact)
  },
  dataTableRow_header: {
    ...mixins.size('100%', units.dataTableHeaderHeight),

    '&::before': {
      backgroundColor: colors.dataTableHeaderBackground
    }
  },
  dataTableRow_showActions: {
    '&:hover': {
      '&::before': {
        right: -1 * (units.dataTableRowActionPaddingRight + FontIcon.sizes[rowActionIconSize])
      }
    }
  },
  dataTableRow_selected: {
    '&::before': {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: colors.dataTableRow_selected
    }
  },
  dataTableRow_pale: {
    color: colors.text_pale
  },
  dataTableDragHandle: {
    alignItems: 'center',
    cursor: 'grab',
    display: 'flex',
    height: '100%',
    paddingLeft: units.dataTableDragHandleHorizontalPadding,
    paddingRight: units.dataTableDragHandleHorizontalPadding
  },
  dataTableCheckboxWrapper: {
    alignItems: 'center',
    borderRight: ({ compact }) => (compact ? `solid 1px ${colors.dataTableBorderedCellBorderBackground}` : 'none'),
    cursor: 'pointer',
    display: 'flex',
    height: '100%',
    paddingLeft: units.dataTableCheckboxWrapperHorizontalPadding,
    paddingRight: ({ compact }) => (compact ? units.dataTableCheckboxWrapperHorizontalPadding : 0)
  },
  dataTableCheckbox: {
    height: ({ compact }) => (
      compact
        ? (units.dataTableCheckboxSize_compact + 2 * units.dataTableCheckboxBorderWidth)
        : units.dataTableCheckboxSize + 2 * units.dataTableCheckboxBorderWidth),
    width: ({ compact }) => (
      compact
        ? (units.dataTableCheckboxSize_compact + 2 * units.dataTableCheckboxBorderWidth)
        : units.dataTableCheckboxSize + 2 * units.dataTableCheckboxBorderWidth),

    position: 'relative',

    '&::before': {
      height: ({ compact }) => (
        compact ? units.dataTableCheckboxSize_compact : units.dataTableCheckboxSize),
      width: ({ compact }) => (
        compact ? units.dataTableCheckboxSize_compact : units.dataTableCheckboxSize),

      backgroundColor: colors.checkboxBackground,
      borderColor: colors.checkboxBorder,
      borderRadius: units.dataTableCheckboxBorderRadius,
      borderStyle: 'solid',
      borderWidth: units.dataTableCheckboxBorderWidth,
      content: '" "',
      cursor: 'pointer',
      position: 'absolute'
    },

    '&:checked::before': {
      backgroundColor: colors.checkboxBackground_checked,
      borderColor: colors.checkboxBackground_checked,
      color: colors.checkboxTick,
      content: '"\ue030"', // From fontastic - `icon-tick`
      fontFamily: 'claycms-icons',
      fontSize: units.checkboxTickFontSize,
      lineHeight: ({ compact }) => `${compact ? units.dataTableCheckboxSize_compact : units.dataTableCheckboxSize}px`,
      textAlign: 'center'
    }
  },
  dataTableRowActions: {
    ...mixins.transitionSimple(),

    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: '100%',
    opacity: 0,
    pointerEvents: 'none',
    position: 'absolute',
    left: '100%'
  },
  dataTableRowAction: {
    ...mixins.transitionSimple(),

    alignItems: 'center',
    color: colors.text_pale,
    display: 'flex',
    flexBasis: '50%',
    paddingRight: units.dataTableRowActionPaddingRight,

    '&:hover': {
      color: colors.text_dark
    },

    '&:nth-child(2n + 1)': {
      paddingTop: units.dataTableRowActionPaddingTop
    },

    '&:nth-child(2n)': {
      paddingBottom: units.dataTableRowActionPaddingBottom
    }
  }
}))(Row)

Row.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func
  })),
  children: PropTypes.node.isRequired,
  compact: PropTypes.bool,
  header: PropTypes.bool,
  rowProps: PropTypes.func,
  onRowClick: PropTypes.func,
  record: PropTypes.object,
  rowIds: PropTypes.arrayOf(PropTypes.string),
  selectable: PropTypes.bool,
  selectedIds: PropTypes.arrayOf(PropTypes.string),
  sortable: PropTypes.bool,
  updateSelection: PropTypes.func
}

Row.defaultProps = {
  actions: [],
  compact: false,
  header: false,
  rowProps: () => ({}),
  onRowClick: null,
  record: null,
  rowIds: [],
  selectable: true,
  selectedIds: [],
  sortable: false,
  updateSelection: () => null
}

export default Row
