import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'

import CheckboxInput from 'components/internal/inputs/CheckboxInput'
import FilledButton from 'components/buttons/FilledButton'
import Menu from 'components/internal/menu/Menu'
import MenuBody from 'components/internal/menu/MenuBody'
import MenuDivider from 'components/internal/menu/MenuDivider'
import MenuFooter from 'components/internal/menu/MenuFooter'
import MenuHeading from 'components/internal/menu/MenuHeading'
import RadioInput from 'components/internal/inputs/RadioInput'

class SortAndFilterMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filters: props.appliedFilters || props.defaultFilters,
      sorting: props.appliedSorting !== null ? props.appliedSorting : props.defaultSorting
    }
  }

  onClear = (e) => {
    const { applySortingAndFilters, defaultFilters, defaultSorting, closeMenu } = this.props

    e.persist()
    this.setState(
      { filters: defaultFilters, sorting: defaultSorting }, () => {
        applySortingAndFilters(null, null)
        closeMenu(e)
      }
    )
  }

  onApply = (e) => {
    const { applySortingAndFilters, closeMenu } = this.props
    const { filters, sorting } = this.state

    applySortingAndFilters(sorting, filters)
    closeMenu(e)
  }

  changeSorting(itemValue) {
    this.setState({ sorting: itemValue })
  }

  changeFilters(itemValue, index) {
    const { filters } = this.state

    const changeCheckboxFilter = filter => (filter.includes(itemValue)
      ? filter.filter(value => value !== itemValue)
      : filter.concat(itemValue))

    const changeFilterByType = filter => (Array.isArray(filter)
      ? changeCheckboxFilter(filter) : itemValue)

    const changeFilterOptionsValueAtIndex = () => filters.map(
      (filter, i) => (i === index ? changeFilterByType(filter) : filter)
    )

    this.setState({
      filters: changeFilterOptionsValueAtIndex()
    })
  }

  render() {
    const { filterOptions, sortOptions, closeMenu, isHidden, classes } = this.props
    const { filters, sorting } = this.state

    return (
      <Menu closeMenu={closeMenu} width="150px" isHidden={isHidden}>
        <MenuBody>
          {sortOptions && <MenuHeading>Sort By</MenuHeading>}
          {sortOptions && (
            <RadioInput
              size="small"
              input={{ value: sorting, onChange: i => this.changeSorting(i) }}
              options={sortOptions.map((sortOption, i) => ({
                description: sortOption.label,
                value: i
              }))}
            />
          )}
          {filterOptions && sortOptions && <MenuDivider />}
          {filterOptions
            && filterOptions.map((filterOption, i) => (
              <Fragment key={filterOption.label || i}>
                <MenuHeading>
                  {`Filter By ${filterOption.label || ''}`}
                </MenuHeading>
                {filterOption.type === 'multiple' ? (
                  filterOption.items.map(item => (
                    <CheckboxInput
                      key={item.label}
                      label={item.label}
                      input={{
                        name: item.label.toLowerCase(),
                        checked: filters[i].includes(item.value),
                        onChange: () => this.changeFilters(item.value, i)
                      }}
                    />
                  ))
                ) : (
                  <RadioInput
                    size="small"
                    input={{ value: filters[i], onChange: val => this.changeFilters(val, i) }}
                    option={filterOption.items.map(item => ({
                      description: item.label,
                      value: item.value
                    }))}
                  />
                )}
              </Fragment>
            ))}
        </MenuBody>
        <MenuFooter>
          <div className={classes.clearApplyContainer}>
            <FilledButton
              size="tiny"
              label="Clear"
              onClick={this.onClear}
              variant="clear"
            />
            <FilledButton size="tiny" label="Apply" onClick={this.onApply} />
          </div>
        </MenuFooter>
      </Menu>
    )
  }
}

SortAndFilterMenu.propTypes = {
  appliedFilters: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.array, PropTypes.string ])),
  appliedSorting: PropTypes.number,
  applySortingAndFilters: PropTypes.func,
  defaultFilters: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.array, PropTypes.string ])),
  defaultSorting: PropTypes.number
}

SortAndFilterMenu.defaultProps = {
  appliedFilters: null,
  appliedSorting: null,
  applySortingAndFilters: () => null,
  defaultFilters: null,
  defaultSorting: null
}

export default injectSheet(({ units }) => ({
  clearApplyContainer: {
    alignItems: 'center',
    display: 'flex',
    padding: [ 0, units.sortAndFilterMenuItemHorizontalPadding ]
  }
}))(SortAndFilterMenu)
