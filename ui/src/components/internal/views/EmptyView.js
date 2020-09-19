import PropTypes from 'prop-types'
import React from 'react'

import EmptyWrapper from 'components/internal/views/EmptyWrapper'
import { LoaderTitle, LoaderText } from 'components/internal/typography'

function EmptyView({ title, text }) {
  return (
    <EmptyWrapper>
      {title && (
        <LoaderTitle>
          {title}
        </LoaderTitle>
      )}
      <LoaderText>
        {text}
      </LoaderText>
    </EmptyWrapper>
  )
}

EmptyView.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
}

EmptyView.defaultProps = {
  title: null,
  text: null
}

export default EmptyView
