import _ from 'lodash'
import Dropzone from 'react-dropzone'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { createRef, Fragment, useEffect, useState } from 'react'

import FieldError from 'components/FieldError'
import FilledButton from 'components/buttons/FilledButton'
import Hint from 'components/internal/typography/Hint'
import Input from 'components/inputs/TextInput'
import ItemBar from 'components/ItemBar'
import Spacer from 'components/Spacer'
import { Text } from 'components/internal/typography'

function fileUrl(value) {
  return _.isString(value) && value
}

function imageUrl(value) {
  if (!value) {
    return null
  }

  return fileUrl(value) || URL.createObjectURL(value)
}

function UploadInput({ classes, input, meta, note, isImage, previewUrl }) {
  const dropzoneRef = createRef()
  const [ droppedFiles, setDroppedFiles ] = useState([ input.value ])

  const image = isImage && imageUrl(input.value)

  useEffect(() => {
    input.onChange(droppedFiles[0])
  }, [ input, droppedFiles ])

  const openDialog = () => {
    // Note that the ref is set async,
    // so it might be null at some point
    if (dropzoneRef.current) {
      dropzoneRef.current.open()
    }
  }

  const update = (files) => {
    setDroppedFiles([ ...files ])
    input.onChange(droppedFiles[0])
  }

  const remove = (files) => {
    const newFiles = [ ...droppedFiles ]
    newFiles.splice(newFiles.indexOf(files), 1)
    setDroppedFiles([ ' ' ])
  }

  const isFilePresent = droppedFiles[0].name || droppedFiles[0].trim()

  return (
    <Dropzone
      ref={dropzoneRef}
      onDrop={update}
      multiple={false}
      noKeyboard
      noClick
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          {isFilePresent && image && <div className={classes.previewSection} style={{ backgroundImage: `url(${image})` }} />}
          {isFilePresent && previewUrl && fileUrl(input.value) && (
            <div className={classes.previewSection}>
              <Text>Uploaded File:</Text>
              <Hint>{fileUrl(input.value)}</Hint>
            </div>
          )}
          <div className={classes.browseSection}>
            {isFilePresent && acceptedFiles.length > 0 && (
              <Fragment>
                {droppedFiles.map(({ path, size }) => (
                  <Text key={path}>
                    {`${path} - ${size} bytes`}
                  </Text>
                ))}
              </Fragment>
            )}
            {(!isFilePresent || acceptedFiles.length === 0) && (
              <Text>Drag &apos;n&apos; drop a file here</Text>
            )}
            <Spacer height={20} />
            <ItemBar>
              <FilledButton type="button" size="tiny" label="Browse" onClick={openDialog} />
              {isFilePresent && <FilledButton type="button" size="tiny" label="Remove" onClick={() => remove(acceptedFiles[0])} />}
            </ItemBar>
            {note && (
              <Fragment>
                <Spacer height={20} />
                {note}
              </Fragment>
            )}
          </div>
          <FieldError active={meta.active} error={Input.fieldError(meta)} />
        </div>
      )}
    </Dropzone>
  )
}

UploadInput.propTypes = {
  isImage: PropTypes.bool,
  previewUrl: PropTypes.bool,
  note: PropTypes.string
}

UploadInput.defaultProps = {
  isImage: false,
  previewUrl: false,
  note: null
}

export default injectSheet(({ colors, units }) => ({
  dropzone: {
    backgroundColor: colors.uploadInputBackground,
    borderColor: colors.uploadInputBorder,
    borderRadius: units.uploadInputBorderRadius,
    borderStyle: 'dashed',
    borderWidth: units.uploadInputBorderWidth,
    display: 'flex',
    justifyContent: 'space-around',
    outline: 'none',
    padding: units.uploadInputPadding,
    position: 'relative'
  },
  browseSection: {
    alignItems: 'center',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  previewSection: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: units.uploadInputPreviewHeight,
    width: units.uploadInputPreviewWidth
  }
}))(UploadInput)
