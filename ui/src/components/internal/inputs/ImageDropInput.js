import AvatarEditor from 'react-avatar-editor'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { Component, createRef, Fragment } from 'react'

import * as mixins from 'styles/mixins'
import AutoSizer from 'react-virtualized-auto-sizer'
import BaseSlider from 'components/BaseSlider'
import FilledButton from 'components/buttons/FilledButton'
import FontIcon from 'components/FontIcon'
import ItemBar from 'components/ItemBar'
import Spacer from 'components/Spacer'
import Text from 'components/internal/typography/Text'
import TextLink from 'components/internal/typography/TextLink'
import { showAlertFailure } from 'client/methods'

const sliderStep = 0.01
const buttonStep = 0.1

class ImageDropInput extends Component {
  constructor(props) {
    super(props)

    const { defaultScale } = props

    this.dropzone = createRef()
    this.avatarEditor = null

    this.state = {
      image: null,
      scale: defaultScale
    }
  }

  setScale = (scale) => {
    this.setState({ scale })
    this.updateImage()
  }

  handleDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length > 0) {
      this.setState({ image: acceptedFiles[0] })
      return
    }

    if (rejectedFiles.length > 0) {
      this.showFailureAlert()
    }
  }

  showFailureAlert = () => {
    showAlertFailure({
      title: 'Yikes! Format not supported',
      message: 'Please check the file that you are trying to upload.'
    })
  }

  updateImage = () => {
    const { input: { onChange } } = this.props

    if (this.avatarEditor) {
      const canvas = this.avatarEditor.getImage()
      canvas.toBlob((blob) => {
        onChange(new File([ blob ], 'image', { type: blob.type }))
      })
    }
  }

  increaseImageSize = () => {
    const { scale } = this.state
    const { maxScale } = this.props

    this.setScale(Math.min(scale + buttonStep, maxScale))
  }

  decreaseImageSize = () => {
    const { scale } = this.state
    const { minScale } = this.props

    this.setScale(Math.max(scale - buttonStep, minScale))
  }

  changeImage = () => this.dropzone.current.open()

  renderSlider() {
    const { defaultScale, maxScale, minScale, theme } = this.props
    const { scale } = this.state

    const sliderKnobStyle = {
      backgroundColor: '#fff',
      borderColor: theme.colors.neutral_light,
      boxShadow: theme.shadows.sliderKnob
    }

    const sliderBarStyle = {
      backgroundColor: theme.colors.neutral_light
    }

    return (
      <BaseSlider
        min={minScale}
        max={maxScale}
        defaultValue={defaultScale}
        step={sliderStep}
        value={scale}
        handleStyle={sliderKnobStyle}
        trackStyle={sliderBarStyle}
        railStyle={sliderBarStyle}
        onChange={this.setScale}
      />
    )
  }

  render() {
    const { height, imageSize, classes } = this.props

    const { image, scale } = this.state

    return (
      <Fragment>
        <Dropzone
          ref={this.dropzone}
          accept="image/*"
          multiple={false}
          onDrop={this.handleDrop}
          disableClick={!!image}
          disablePreview
          style={{}}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className={classNames(
                classes.dropzoneWrapper,
                {
                  [classes.dropzoneWrapper_empty]: image
                }
              )}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!image && (
                <Fragment>
                  <Text variant="medium" color="dark">Drag and drop picture here</Text>
                  <Spacer height={15} />
                  <Text color="pale" variant="regularSmallSquished">
                    or
                    {' '}
                    {/* eslint-disable-next-line */}
                    <TextLink to="#">
                      upload
                    </TextLink>
                    {' '}
                    from disk.
                  </Text>
                </Fragment>
              )}
            </div>
          )}
        </Dropzone>
        {image && (
          <div className={classes.avatarWrapper}>
            <AutoSizer disableHeight>
              {({ width }) => {
                const borderHorizontalWidth = (width - imageSize) / 2
                const borderVerticalWidth = (height - imageSize) / 2
                const editorWidth = width - (2 * borderHorizontalWidth)
                const editorHeight = height - (2 * borderVerticalWidth)

                return (
                  <AvatarEditor
                    ref={(el) => { this.avatarEditor = el }}
                    image={image}
                    width={editorWidth}
                    height={editorHeight}
                    border={[ borderHorizontalWidth, borderVerticalWidth ]}
                    borderRadius={100}
                    scale={scale}
                    onLoadSuccess={this.updateImage}
                    onLoadFailure={this.showFailureAlert}
                    onMouseUp={this.updateImage}
                  />
                )
              }}
            </AutoSizer>
          </div>
        )}
        <Spacer height={20} />
        {image && (
          <ItemBar>
            <div className={classes.imageModifiers}>
              <FontIcon name="image" size="tiny" onClick={this.decreaseImageSize} />
              <Spacer width={10} />
              {this.renderSlider()}
              <Spacer width={10} />
              <FontIcon name="image-thin" size="small" onClick={this.increaseImageSize} />
            </div>
            <Spacer width={60} />
            <FilledButton type="button" label="Choose a different picture" onClick={this.dropzone.current.open} variant="flat" />
          </ItemBar>
        )}
      </Fragment>
    )
  }
}

ImageDropInput.propTypes = {
  defaultScale: PropTypes.number,
  height: PropTypes.number,
  imageSize: PropTypes.number.isRequired,
  maxScale: PropTypes.number,
  minScale: PropTypes.number
}

ImageDropInput.defaultProps = {
  defaultScale: 1.5,
  height: 375,
  maxScale: 5,
  minScale: 1
}

export default injectSheet(({ colors }) => ({
  avatarWrapper: {
    borderRadius: 6,
    cursor: 'move',
    height: props => props.height,
    overflow: 'hidden'
  },
  imageModifiers: {
    alignItems: 'center',
    color: colors.imageDropInputModifierIconColor,
    display: 'flex',
    flex: 1,

    '& .icon': {
      cursor: 'pointer'
    }
  },
  dropzoneWrapper: {
    ...mixins.transitionSimple(),

    alignItems: 'center',
    borderColor: colors.inputBorder,
    borderStyle: 'solid',
    borderWidth: 1,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    height: props => props.height,
    justifyContent: 'center',
    textAlign: 'center',

    ':hover': {
      borderColor: colors.inputBorder_hover
    }
  },
  dropzoneWrapper_empty: {
    display: 'none'
  },
  uploadInstructions: {
    textAlign: 'center'
  }
}))(ImageDropInput)
