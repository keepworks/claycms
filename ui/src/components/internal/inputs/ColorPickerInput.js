import injectSheet from 'react-jss'
import React, { useState } from 'react'
import { ChromePicker } from 'react-color'

import ColorTile from 'components/internal/ColorTile'

function ColorPickerInput({ classes = {}, input, label }) {
  const [ showPicker, updateShowPicker ] = useState(false)
  const name = (input && input.name) || 'color-picker'

  const onTileClick = () => {
    updateShowPicker(prevState => !prevState)
  }

  const onColorChange = (color) => {
    input.onChange(color.hex)
  }

  return (
    <div className={classes.base}>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      <ColorTile
        onClick={onTileClick}
        color={input.value}
        spaced
      />
      {input.name && <input id={name} type="hidden" {...input} />}
      {showPicker && (
        <div className={classes.popover}>
          <div
            role="button"
            tabIndex={-1}
            onKeyPress={() => updateShowPicker(false)}
            onClick={() => updateShowPicker(false)}
            className={classes.cover}
          />
          <ChromePicker color={input.value} onChangeComplete={onColorChange} />
        </div>
      )}
    </div>
  )
}

export default injectSheet(({ colors, typography, units }) => ({
  base: {
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
    marginBottom: ({ spaced }) => spaced && 35
  },
  label: {
    ...typography.regularSquished,

    color: colors.text_pale,
    top: units.inputPaddingTop
  },
  cover: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  popover: {
    position: 'absolute',
    zIndex: units.colorPickerInputPopoverZindex,
    top: units.colorPickerInputPopoverTop,
    left: units.colorPickerInputPopoverLeft
  }
}))(ColorPickerInput)
