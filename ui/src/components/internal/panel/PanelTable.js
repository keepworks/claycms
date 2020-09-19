import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import LoaderView from 'components/LoaderView'
import Text from 'components/typography/Text'

function PanelTable({ emptyText, loading, records, classes }) {
  const renderPanelTable = () => {
    if (loading) {
      return <LoaderView />
    }

    if (!records.length) {
      return <Text color="dark">{emptyText}</Text>
    }

    return (
      <Fragment>
        {records.map((record, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`panelTable-${index}`} className={classes.panelTableCell}>
            <div className={classes.panelTableCellMainContent}>
              <div>
                {record.name}
                {record.badge && (
                  <span className={classes.panelTableCellBadge}>{record.badge}</span>
                )}
              </div>
              {record.details && (
                <div className={classes.panelTableCellSubtitle}>{record.details}</div>
              )}
              {record.action}
            </div>
            <div className={classes.panelTableCellSideContent}>
              {record.status && (
                <span className={classes.panelTableCellStatus}>{`${record.status}:`}</span>
              )}
              <span>{record.time}</span>
            </div>
          </div>
        ))}
      </Fragment>
    )
  }

  return (
    <div className={classes.panelTableWrapper}>
      {renderPanelTable()}
    </div>
  )
}

PanelTable.propTypes = {
  emptyText: PropTypes.string,
  link: PropTypes.string,
  loading: PropTypes.bool,
  records: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      badge: PropTypes.string,
      details: PropTypes.string,
      action: PropTypes.node,
      status: PropTypes.string,
      time: PropTypes.string
    })
  )
}

PanelTable.defaultProps = {
  emptyText: null,
  link: null,
  loading: false,
  records: []
}

PanelTable = injectSheet(({ colors, typography, units }) => ({
  panelTableWrapper: {
    marginBottom: units.panelTableMarginBottom
  },
  panelTableCell: {
    alignItems: 'center',
    borderBottomColor: colors.panelTableBorder,
    borderBottomStyle: 'solid',
    borderBottomWidth: units.panelTableBorderWidth,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: units.panelTableCellVerticalPadding,
    paddingBottom: units.panelTableCellVerticalPadding,

    '&:first-child': {
      borderTopColor: colors.panelTableBorder,
      borderTopStyle: 'solid',
      borderTopWidth: units.panelTableBorderWidth
    }
  },
  panelTableCellMainContent: {
    ...typography.semiboldSmallSquished,

    width: '100%'
  },
  panelTableCellBadge: {
    ...typography.regularSmallCompact,

    backgroundColor: colors.panelTableCellBadgeBackground,
    borderRadius: units.panelTableCellBadgeBorderRadius,
    color: colors.panelTableCellBadgeColor,
    height: units.panelTableCellBadgeHeight,
    marginLeft: units.panelTableCellMarginLeft,
    paddingTop: units.panelTableCellBadgeVerticalPadding,
    paddingRight: units.panelTableCellBadgeHorizontalPadding,
    paddingBottom: units.panelTableCellBadgeVerticalPadding,
    paddingLeft: units.panelTableCellBadgeHorizontalPadding,
    textTransform: 'uppercase'
  },
  panelTableCellSideContent: {
    ...typography.mediumSquished,

    alignItems: 'center',
    borderLeftColor: colors.panelTableBorder,
    borderLeftStyle: 'solid',
    borderLeftWidth: units.panelTableBorderWidth,
    color: colors.panelTableSecondaryText,
    display: 'flex',
    flexDirection: 'column',
    height: units.panelTableCellHeight,
    justifyContent: 'center',
    minWidth: units.panelTableCellSideContentMinWidth
  },
  panelTableCellStatus: {
    ...typography.lightSmall
  },
  panelTableCellSubtitle: {
    ...typography.mediumSquished,

    color: colors.panelTableSecondaryText,
    display: 'inline-block',
    marginTop: units.panelTableCellSubtitleMarginTop,
    marginRight: units.panelTableCellSubtitleMarginRight,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: units.panelTableCellSubtitleWidth
  }
}))(PanelTable)

export default PanelTable
