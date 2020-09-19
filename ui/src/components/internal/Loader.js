import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import EmptyWrapper from 'components/internal/views/EmptyWrapper'
import FilledButton from 'components/buttons/FilledButton'
import { LoaderText, LoaderTitle } from 'components/internal/typography'

import loaderGif from 'images/loader.gif'

function Loader({
  emptyView,
  record: { loading, value },
  classes
}) {
  const hasData = (Array.isArray(value) && value.length > 0)
    || (!Array.isArray(value) && Boolean(value))

  if (!loading && hasData) {
    return null
  }

  if (loading) {
    return (
      <EmptyWrapper>
        <img className={classes.loaderImage} src={loaderGif} alt="Loading..." />
        <LoaderText>
          Sit tight...
        </LoaderText>
      </EmptyWrapper>
    )
  }

  if (emptyView) {
    const { buttonLabel, title, onButtonClick } = emptyView

    return (
      <EmptyWrapper>
        <LoaderTitle>
          {`No ${title} found.`}
        </LoaderTitle>
        <LoaderText>
          Feel free to contact us for any assistance.
        </LoaderText>
        {buttonLabel && <FilledButton type="button" label={buttonLabel} onClick={onButtonClick} />}
      </EmptyWrapper>
    )
  }

  return null
}

Loader.propTypes = {
  emptyView: PropTypes.shape({
    buttonLabel: PropTypes.string,
    title: PropTypes.string,
    onButtonClick: PropTypes.func
  }),
  record: PropTypes.shape({
    loading: PropTypes.bool,
    values: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ])
  })
}

Loader.defaultProps = {
  emptyView: null,
  record: {
    loading: false,
    value: null
  }
}

export default injectSheet(({ units }) => ({
  loaderImage: {
    marginBottom: units.loaderImageMarginBottom
  }
}))(Loader)
