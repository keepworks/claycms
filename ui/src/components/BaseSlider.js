import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import Slider from 'rc-slider'

import * as mixins from 'styles/mixins'

const barHeight = 2
const knobSize = 20

function BaseSlider({ handleStyle, trackStyle, railStyle, theme, classes, ...other }) {
  const baseHandleStyle = {
    ...mixins.size(knobSize),

    backgroundColor: theme.colors.baseSliderHandleBackground,
    borderColor: theme.colors.baseSliderHandleBorder,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: theme.shadows.baseSliderHandle,
    marginLeft: 0,
    marginTop: 0,
    transform: 'translateX(-50%)'
  }

  const baseTrackStyle = {
    backgroundColor: theme.colors.baseSliderTrackBackground,
    borderRadius: 0,
    height: barHeight
  }

  const baseRailStyle = {
    backgroundColor: theme.colors.baseSliderRailBackground,
    borderRadius: 0,
    height: barHeight
  }

  return (
    <Slider
      className={classes.slider}
      handleStyle={{ ...baseHandleStyle, ...handleStyle }}
      trackStyle={{ ...baseTrackStyle, ...trackStyle }}
      railStyle={{ ...baseRailStyle, ...railStyle }}
      style={{ height: knobSize + 10 }}
      {...other}
    />
  )
}

BaseSlider.propTypes = {
  handleStyle: PropTypes.object,
  trackStyle: PropTypes.object,
  railStyle: PropTypes.object
}

BaseSlider.defaultProps = {
  handleStyle: null,
  trackStyle: null,
  railStyle: null
}

export default injectSheet(() => ({
  slider: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex'
  }
}))(BaseSlider)
