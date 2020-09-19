import _ from 'lodash'
import classNames from 'classnames'
import ClickOutside from 'react-click-outside'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ResizeAware from 'react-resize-aware'
import { Manager, Reference, Popper } from 'react-popper'

import * as mixins from 'styles/mixins'
import toString from 'lib/toString'

const defaultInitialValue = ''
const comparisionRules = Object.freeze({
  PARTIAL: 'PARTIAL',
  FULL: 'FULL'
})

const toArray = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean)
  }

  if (typeof value === 'object' && value !== null) {
    return [ value ]
  }

  return []
}

/**
 * Aria attributes based on https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
 */
class BaseSelectInput extends Component {
  constructor(props) {
    super(props)

    this.optionElMapping = {}

    this.inputWrapperNode = null
    this.inputNode = null

    /**
     * Instance property used to allow different scroll behaviors.
     *
     * -> `ArrowUp` and `ArrowDown`: Should trigger `scrollIntoView`
     * -> `onMouseMove`: Should not trigger `scrollIntoView`
     */
    this.scrollToFocusedOptionOnUpdate = false

    const { input: { value } } = props

    const options = toArray(props.options)
    const selectedOptions = options.filter(option => toString(value).includes(option.value))

    this.state = {
      options,
      selectedOptions,
      /**
       * `focusedValue` is value of the option focused in the dropdown
       */
      focusedValue: defaultInitialValue,
      /**
       * `focusedSelectedValue` is the value of the option focused in the input
       */
      focusedSelectedValue: defaultInitialValue,
      isDropdownOpen: false,
      /**
       * `isFocused` determines if the inputWrapper is in focus
       */
      isFocused: false,
      typedValue: defaultInitialValue
    }
  }

  /**
   * `getDerivedStateFromProps` is used to handle cases where options are loaded via network calls.
   */
  static getDerivedStateFromProps(props, state) {
    const { options, ...other } = state

    const propOptions = toArray(props.options)

    if (_.difference(options, propOptions).length >= 0) {
      return {
        options: propOptions,
        ...other
      }
    }

    // Return null to indicate no change to state.
    return null
  }

  componentDidMount() {
    const { autoFocus } = this.props

    if (autoFocus) {
      this.focusInputWrapper()
    }
  }

  componentDidUpdate() {
    if (this.hasFilteredOptions() && this.scrollToFocusedOptionOnUpdate) {
      this.scrollIntoView(this.getFocusedOption())
    }

    this.scrollToFocusedOptionOnUpdate = false
  }

  compareOption = (typedValue, option, rule = comparisionRules.PARTIAL) => {
    const stringToMatch = typedValue.toLowerCase()

    if (!comparisionRules[rule]) {
      throw new Error(`${rule} is not a valid rule for compareOption`)
    }

    if (rule === comparisionRules.PARTIAL) {
      return toString(option.value).toLowerCase().includes(stringToMatch)
      || toString(option.label).toLowerCase().includes(stringToMatch)
    }

    return toString(option.value).toLowerCase() === stringToMatch
    || toString(option.label).toLowerCase() === stringToMatch
  }

  getNewOptionData = (typedValue, optionLabel) => ({
    label: optionLabel,
    value: typedValue,
    isNew: true
  })

  isValidNewOption = (typedValue) => {
    const { options, selectedOptions } = this.state

    return !(
      !typedValue
      || selectedOptions.some(o => this.compareOption(typedValue, o, comparisionRules.FULL))
      || options.some(option => this.compareOption(typedValue, option, comparisionRules.FULL))
    )
  }

  cleanOptions = options => options.filter(option => !option.isNew)

  handleInputBlur = () => {
    this.closeDropdown()
    this.setState({ isFocused: false })
  }

  handleInputChange = (e) => {
    const { creatable, formatCreateLabel } = this.props
    const { options } = this.state

    const typedValue = e.target.value

    let newOption
    let newOptions = options

    if (creatable) {
      newOptions = this.cleanOptions(options)

      if (typedValue) {
        if (this.isValidNewOption(typedValue)) {
          newOption = this.getNewOptionData(typedValue, formatCreateLabel(typedValue))
          newOptions = [ ...newOptions, newOption ]
        }
      }
    }

    this.setState({
      options: newOptions, typedValue
    }, () => this.openDropdown('first'))
  }

  handleInputFocus = () => {
    const { input, openMenuOnFocus } = this.props

    if (openMenuOnFocus) {
      this.openDropdown('first')
    }

    if (input.onFocus) { // Call to Final Form
      input.onFocus()
    }

    this.setState({ isFocused: true })
  }

  handleInputKeyDown = (e) => {
    const { isMultiple } = this.props
    const { focusedSelectedValue, isDropdownOpen, typedValue } = this.state

    const focusedOption = this.getFocusedOption()
    const focusedSelectedOption = this.getFocusedSelectedOption()

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        e.stopPropagation()
        if (isDropdownOpen) {
          this.closeDropdown()
        }
        break
      case ' ': // space
        if (typedValue) {
          return
        }
        // falls through
      case 'Enter':
        e.preventDefault()
        if (isDropdownOpen) {
          this.selectOption(focusedOption)
        } else {
          this.openDropdown('first')
        }
        break
      case 'ArrowLeft':
        if (!isMultiple || typedValue) {
          return
        }
        this.focusValue('previous')
        break
      case 'ArrowRight':
        if (!isMultiple || typedValue) {
          return
        }
        this.focusValue('next')
        break
      case 'Delete':
      case 'Backspace':
        if (typedValue) {
          return
        }
        if (focusedSelectedValue) {
          this.removeValue(focusedSelectedOption)
        } else {
          this.popValue()
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (isDropdownOpen) {
          this.focusOption('up')
        } else {
          this.openDropdown('last')
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (isDropdownOpen) {
          this.focusOption('down')
        } else {
          this.openDropdown('first')
        }
        break
      default:
    }
  }

  handleOptionHover = (option) => {
    if (!option) {
      return
    }

    this.setState({ focusedValue: option.value })
  }

  popValue = () => {
    const { input: { value, onChange } } = this.props
    const { selectedOptions } = this.state

    const inputValue = toArray(value)
    if (inputValue.length === 0) {
      return
    }

    onChange(inputValue.slice(0, inputValue.length - 1))
    this.setState({ selectedOptions: selectedOptions.slice(0, selectedOptions.length - 1) })
  }

  selectOption = (option) => {
    if (!option) {
      return
    }

    const { input: { value, onChange }, isMultiple, onSelectOption } = this.props
    const { selectedOptions } = this.state

    let selectedOption = option
    if (option.isNew) {
      // clean selectedOption's value before passing it to input
      selectedOption = this.getNewOptionData(option.value, option.value)
    }

    onSelectOption(selectedOption)

    let inputValue
    if (isMultiple) {
      inputValue = toArray(value)
      inputValue.push(selectedOption.value)
      selectedOptions.push(selectedOption)
    } else {
      inputValue = selectedOption.value
    }

    onChange(inputValue)

    this.setState({ selectedOptions })

    this.focusInputWrapper()
    this.closeDropdown()
  }

  openDropdown = (focusOption) => {
    const { isMultiple } = this.props
    const { options, selectedOptions } = this.state

    const filteredOptions = this.getFilteredOptions(options, selectedOptions)
    let openAtIndex = focusOption === 'first' ? 0 : filteredOptions.length - 1
    let selectedIndex

    if (isMultiple) {
      selectedIndex = filteredOptions.indexOf(selectedOptions[0])
    } else {
      const selectedOption = this.getSelectedOption(options)
      selectedIndex = filteredOptions.indexOf(selectedOption)
    }

    if (selectedIndex > -1) {
      openAtIndex = selectedIndex
    }

    const focusedValue = this.hasFilteredOptions()
      ? filteredOptions[openAtIndex].value
      : defaultInitialValue

    this.scrollToFocusedOptionOnUpdate = true

    this.setState({
      isDropdownOpen: true,
      focusedValue
    })
  }

  closeDropdown = () => {
    const { options } = this.state

    this.setState({
      options: this.cleanOptions(options),
      focusedValue: defaultInitialValue,
      isDropdownOpen: false,
      typedValue: defaultInitialValue
    })
  }

  toggleDropdown = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const { isDropdownOpen, isFocused } = this.state

    if (!isFocused) {
      this.focusInputWrapper()
    }

    if (isDropdownOpen) {
      this.closeDropdown()
    } else {
      this.openDropdown('first')
    }
  }

  getOptionsId = () => {
    const { input: { name } } = this.props

    return `${name}-popup`
  }

  getOptionId = (option) => {
    const { input: { name } } = this.props

    return `${name}-option-${option.value}`
  }

  getFilteredOptions = (options, selectedOptions) => {
    const { isMultiple } = this.props
    const { typedValue } = this.state

    let filteredOptions
    if (isMultiple) {
      // filteredOptions is a diff of `options` and `selectedOptions`
      const selectedOptionsValues = selectedOptions.map(option => option.value)
      filteredOptions = options.filter(option => (
        !selectedOptionsValues.includes(toString(option.value))
      ))
    } else {
      filteredOptions = options
    }

    return filteredOptions.filter(option => this.compareOption(typedValue, option))
  }

  getFocusedOption = () => {
    const { options, focusedValue, selectedOptions } = this.state

    const filteredOptions = this.getFilteredOptions(options, selectedOptions)
    return filteredOptions.find(option => option.value === focusedValue)
  }

  getFocusedSelectedOption = () => {
    const { focusedSelectedValue, selectedOptions } = this.state

    return selectedOptions.find(option => option.value === focusedSelectedValue)
  }

  getSelectedOption = (options) => {
    const { input: { value } } = this.props

    return options.find(option => toString(option.value) === toString(value)) || {}
  }

  hasFilteredOptions = () => {
    const { options, selectedOptions } = this.state

    const filteredOptions = this.getFilteredOptions(options, selectedOptions)
    return filteredOptions.length !== 0
  }

  scrollIntoView = (option) => {
    const focusedEl = this.optionElMapping[option.value]
    const dropdownEl = focusedEl.parentElement

    const dropdownRect = dropdownEl.getBoundingClientRect()
    const focusedRect = focusedEl.getBoundingClientRect()
    const extraScroll = focusedEl.offsetHeight / 3

    if (focusedRect.bottom + extraScroll > dropdownRect.bottom) {
      dropdownEl.scrollTop = Math.min(
        focusedEl.offsetTop + focusedEl.clientHeight + extraScroll - dropdownEl.offsetHeight,
        dropdownEl.scrollHeight
      )
    } else if (focusedRect.top - extraScroll < dropdownRect.top) {
      dropdownEl.scrollTop = Math.max(focusedEl.offsetTop - extraScroll, 0)
    }
  }

  removeValue = (option) => {
    const { input: { value, onChange }, isMultiple } = this.props
    const { selectedOptions } = this.state

    // Only MultiSelect supports removing value
    if (!isMultiple || selectedOptions.length === 0) {
      return
    }

    const newSelectedOptions = selectedOptions.filter(o => o.value !== option.value)
    let inputValue = toArray(value)
    inputValue = inputValue.filter(v => v !== option.value)

    onChange(inputValue)

    this.setState({
      focusedSelectedValue: defaultInitialValue,
      selectedOptions: newSelectedOptions
    })
  }

  focusInputWrapper() {
    if (!this.inputWrapperNode || !this.inputNode) {
      return
    }

    this.inputWrapperNode.focus()
    this.inputNode.focus()
    this.setState({ isFocused: true })
  }

  focusOption(direction = 'first') {
    if (!this.hasFilteredOptions()) {
      return
    }

    const { options, selectedOptions } = this.state
    const focusedOption = this.getFocusedOption()
    const filteredOptions = this.getFilteredOptions(options, selectedOptions)

    let nextFocusIndex = 0 // handles 'first'
    nextFocusIndex = filteredOptions.indexOf(focusedOption)
    if (!focusedOption) {
      nextFocusIndex = -1
    }

    if (direction === 'up') {
      nextFocusIndex = Math.max(nextFocusIndex - 1, 0)
    } else if (direction === 'down') {
      nextFocusIndex = Math.min(nextFocusIndex + 1, filteredOptions.length - 1)
    } else if (direction === 'last') {
      nextFocusIndex = filteredOptions.length - 1
    }

    this.scrollToFocusedOptionOnUpdate = true

    this.setState({ focusedValue: filteredOptions[nextFocusIndex].value })
  }

  focusValue(direction = 'previous') {
    const { isMultiple } = this.props
    const { focusedSelectedValue, selectedOptions } = this.state

    // Only MultiSelect supports value focusing
    if (!isMultiple || selectedOptions.length === 0) {
      return
    }

    // Reset focused value in dropdown
    this.setState({ focusedValue: defaultInitialValue })

    const selectedOptionsValues = selectedOptions.map(option => option.value)

    const lastIndex = selectedOptionsValues.length - 1
    let currentFocusIndex
    let nextFocusIndex

    if (!focusedSelectedValue) {
      currentFocusIndex = -1
    } else {
      currentFocusIndex = selectedOptionsValues.indexOf(focusedSelectedValue)
    }

    if (direction === 'previous') {
      // if nothing is focused, focus the last value first
      if (currentFocusIndex === -1) {
        nextFocusIndex = lastIndex
      } else {
        nextFocusIndex = Math.max(currentFocusIndex - 1, 0)
      }
    } else if (direction === 'next') {
      nextFocusIndex = Math.min(currentFocusIndex + 1, selectedOptions.length - 1)
    }

    this.setState({ focusedSelectedValue: selectedOptions[nextFocusIndex].value })
  }

  renderInput = ({ ref }) => {
    const {
      disabled,
      input: { name, value },
      inputRenderer,
      isMultiple,
      placeholder,
      searchable
    } = this.props

    const {
      focusedSelectedValue,
      isDropdownOpen,
      isFocused,
      options,
      selectedOptions,
      typedValue
    } = this.state

    const focusedOption = this.getFocusedOption()

    let displayValue = defaultInitialValue
    let inputValue = defaultInitialValue

    if (typedValue && isDropdownOpen) {
      inputValue = typedValue
    }

    if (isMultiple) {
      if (selectedOptions.length > 0) {
        displayValue = selectedOptions.map((selectedOption) => {
          const option = Object.assign({}, selectedOption)

          option.isFocused = option.value === focusedSelectedValue
          option.onClick = (e) => {
            e.preventDefault()
            e.stopPropagation()

            this.removeValue(option)
          }

          return option
        })
      } else if (!inputValue) {
        displayValue = placeholder
      }
    } else {
      const selectedOption = this.getSelectedOption(options)

      if (!inputValue) {
        if (selectedOption && selectedOption.value) {
          displayValue = selectedOption.label
        } else {
          displayValue = placeholder
        }
      }
    }

    const inputWrapperProps = disabled ? {} : {
      ref,
      onMouseDown: this.toggleDropdown
    }

    // Props for <input> tag
    const inputProps = disabled ? {} : {
      ref: (node) => { this.inputNode = node },
      name,
      readOnly: !searchable,
      type: 'text',
      autoCapitalize: 'none',
      autoComplete: 'off',
      'aria-haspopup': 'listbox',
      'aria-controls': this.getOptionsId(),
      'aria-expanded': isDropdownOpen,
      'aria-activedescendant': focusedOption && this.getOptionId(focusedOption),
      onBlur: this.handleInputBlur,
      onChange: this.handleInputChange,
      onFocus: this.handleInputFocus,
      onKeyDown: this.handleInputKeyDown,
      value: inputValue
    }

    // Props for inputRenderer
    const displayProps = {
      displayValue,
      isDropdownOpen,
      isFocused // To be used instead of `meta.active`
    }

    return inputRenderer({ value, inputProps, inputWrapperProps, displayProps })
  }

  renderOptions = () => {
    const { classes, disabled } = this.props
    const { options, selectedOptions } = this.state

    const filteredOptions = this.getFilteredOptions(options, selectedOptions)
    const optionsProps = disabled ? {} : {
      id: this.getOptionsId(),
      role: 'listbox',
      tabIndex: -1,
      style: { width: this.inputWrapperNode.offsetWidth }
    }

    return (
      <ul className={classes.options} {...optionsProps}>
        {filteredOptions.map(option => this.renderOption(option))}
        {this.renderNoOptionsMessage()}
      </ul>
    )
  }

  renderOption = (option) => {
    const { input: { value }, optionRenderer } = this.props
    const { focusedValue } = this.state

    const isFocused = option.value === focusedValue
    const isSelected = value === option.value

    const optionProps = {
      // Props for <li> tag
      id: this.getOptionId(option),
      key: option.value,
      ref: (el) => { this.optionElMapping[option.value] = el },
      role: 'option',
      'aria-selected': isSelected,
      onMouseDown: () => this.selectOption(option),
      onMouseMove: () => this.handleOptionHover(option),

      // Additional props to be consumed by optionRenderer
      option,
      isFocused,
      isSelected
    }

    return optionRenderer(optionProps)
  }

  renderNoOptionsMessage = () => {
    const { noOptionMessage, classes } = this.props

    if (this.hasFilteredOptions()) {
      return null
    }

    return (
      <li className={classes.option}>
        {noOptionMessage}
      </li>
    )
  }

  render() {
    const { input, wrapperClassName, wrapperOpenClassName, theme } = this.props
    const { isDropdownOpen } = this.state

    return (
      <ClickOutside
        className={classNames(
          wrapperClassName,
          { [wrapperOpenClassName]: isDropdownOpen }
        )}
        onClickOutside={this.closeDropdown}
      >
        <Manager>
          <Reference innerRef={(node) => { this.inputWrapperNode = node }}>
            {referenceProps => this.renderInput(referenceProps)}
          </Reference>

          {isDropdownOpen && (
            <Popper
              placement="bottom-start"
              modifiers={{ offset: { offset: '0, 5' } }}
              positionFixed
            >
              {({ ref, style, scheduleUpdate }) => (
                /**
                 * Solution: `options` is wrapped by `<div>` which consumes `ref` and `style`.
                 *
                 * Explanation:
                 *   Popper.js uses GPU Accelaration for placement and generates the following CSS -
                 *   ```
                 *     will-change: transform;
                 *     transform: translate3D(x, y, z);
                 *   ```
                 *
                 *   However, if `ref` and `style` is passed to `<ul>`, the text becomes
                 *   blurry. This effect can be seen here - http://jsfiddle.net/SfKKv/
                 *
                 * Alternate Solution:
                 *   Disable GPU Acceleration using `computeStyle: { gpuAcceleration: false }`
                 *   and `top` and `left` position. This also adds `will-change: top, left`
                 *
                 * Why alternate solution does not work:
                 *   `will-change` results in the creation of a new compositor layer which is
                 *   to be handled by the GPU . However, GPU does not support subpixel antialiasing
                 *   as done by the CPU in most browsers, resulting again in blurry text.
                 *   https://dev.opera.com/articles/css-will-change-property/
                 *
                 */
                <div ref={ref} style={{ ...style, zIndex: theme.zIndexes.menu }}>
                  <ResizeAware onlyEvent onResize={scheduleUpdate}>
                    {this.renderOptions()}
                  </ResizeAware>
                </div>
              )}
            </Popper>
          )}
        </Manager>

        <input type="hidden" {...input} />
      </ClickOutside>
    )
  }
}

BaseSelectInput.propTypes = {
  autoFocus: PropTypes.bool,
  creatable: PropTypes.bool,
  disabled: PropTypes.bool,
  formatCreateLabel: PropTypes.func,
  inputRenderer: PropTypes.func.isRequired,
  noOptionMessage: PropTypes.string,
  onSelectOption: PropTypes.func,
  openMenuOnFocus: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.any.isRequired,
    value: PropTypes.any
  })),
  optionRenderer: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  wrapperOpenClassName: PropTypes.string
}

BaseSelectInput.defaultProps = {
  autoFocus: false,
  creatable: false,
  disabled: false,
  formatCreateLabel: value => `Create "${value}"`,
  noOptionMessage: 'No options',
  onSelectOption: () => null,
  openMenuOnFocus: false,
  options: null,
  placeholder: null,
  searchable: true,
  wrapperClassName: '',
  wrapperOpenClassName: ''
}

export default injectSheet(({ colors, typography }) => ({
  options: {
    ...mixins.listless,

    backgroundColor: '#fff',
    borderRadius: 4,
    boxShadow: '0px 13px 29px 0px rgba(10, 25, 39, 0.13)',
    maxHeight: 210,
    outline: 'none',
    overflowY: 'auto',
    paddingTop: 10,
    paddingBottom: 10
  },
  option: {
    ...mixins.transitionSimple(),
    ...typography.regularSquished,

    alignItems: 'center',
    color: colors.text_dark,
    cursor: 'default',
    display: 'flex',
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 10,
    paddingLeft: 30
  }
}))(BaseSelectInput)
