import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import AssetBox from 'components/internal/AssetBox'

function AssetList({ loading, records, classes, ...other }) {
  if (loading || !records || records.length === 0) {
    return null
  }

  return (
    <div className={classes.wrapper}>
      {records.map(record => <AssetBox key={record.id} asset={record} {...other} />)}
    </div>
  )
}

AssetList.propTypes = {
  records: PropTypes.array
}

AssetList.defaultProps = {
  records: null
}

export default injectSheet(() => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}))(AssetList)
