import _ from 'lodash'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import IconButton from 'components/internal/buttons/IconButton'
import MenuContainer from 'components/internal/menu/MenuContainer'
import SortAndFilterMenu from 'components/internal/pageToolbar/SortAndFilterMenu'
import Text from 'components/typography/Text'
import TextInput from 'components/inputs/TextInput'

class PageToolbar extends Component {
  constructor() {
    super()

    this.state = {
      appliedFilters: null,
      appliedSorting: null,
      searchTerm: ''
    }
  }

  getDefaultFilters = () => {
    const { filterOptions } = this.props

    return (
      filterOptions
      && filterOptions.map(filterOption => (filterOption.type === 'multiple'
        ? filterOption.items.filter(item => item.isDefault).map(item => item.value)
        : filterOption.items.find(item => item.isDefault).value))
    )
  }

  getDefaultSorting = () => {
    const { sortOptions } = this.props

    return sortOptions && sortOptions.findIndex(sortOption => sortOption.isDefault)
  }

  getAppliedFilterCount = () => {
    const { appliedFilters, appliedSorting } = this.state

    const defaultFilters = this.getDefaultFilters()
    const defaultSorting = this.getDefaultSorting()

    const appliedMultipleSelectFiltersCount = (filter, i) => {
      if (filter.length !== defaultFilters[i].length) {
        return 1
      }

      return filter.every(item => defaultFilters[i].includes(item)) ? 0 : 1
    }

    const appliedSingleSelectFilterCount = (filter, i) => (filter !== defaultFilters[i] ? 1 : 0)

    const appliedFiltersCount = () => {
      if (appliedFilters === null) {
        return 0
      }

      return appliedFilters
        .map((filter, i) => (Array.isArray(filter)
          ? appliedMultipleSelectFiltersCount(filter, i)
          : appliedSingleSelectFilterCount(filter, i)))
        .reduce((acc, current) => acc + current, 0)
    }

    const appliedSortingCount = () => {
      if (appliedSorting === null) {
        return 0
      }

      return defaultSorting !== appliedSorting ? 1 : 0
    }

    return appliedFiltersCount() + appliedSortingCount()
  }

  handleSearchChange = (searchTerm) => {
    this.setState({ searchTerm: searchTerm || '' }, this.applyModifiers)
  }

  handleSortingAndFilters = (appliedSorting, appliedFilters) => {
    this.setState({ appliedFilters, appliedSorting }, this.applyModifiers)
  }

  applyModifiers = () => {
    const { filterOptions, onApplyModifiers, records, searchKeys, sortOptions } = this.props
    const { appliedFilters, appliedSorting, searchTerm } = this.state

    const searchedRecords = searchTerm
      ? records.filter(item => searchKeys.some(
        searchKey => item[searchKey].toLowerCase().includes(searchTerm.toLowerCase())
      ))
      : records

    const filteredRecords = appliedFilters
      ? searchedRecords.filter(
        record => filterOptions.every(
          (filterOption, i) => filterOption.filter(record, appliedFilters[i])
        )
      )
      : searchedRecords

    const sortedRecords = appliedSorting
      ? _.orderBy(
        filteredRecords,
        sortOptions[appliedSorting].keys.map(
          key => (typeof key === 'string' ? (item => item[key].toLowerCase()) : key)
        ),
        sortOptions[appliedSorting].orders
      )
      : filteredRecords

    onApplyModifiers(sortedRecords)
  }

  renderTitle = () => {
    const { title, classes } = this.props

    return (
      <Text tag="h1" color="dark" variant="lightExtraLarge" className={classes.heading}>
        {title}
      </Text>
    )
  }

  renderActions = () => {
    const { actions } = this.props

    if (!actions) {
      return null
    }

    return actions.filter(action => (action.isVisible !== undefined ? action.isVisible : true)).map(
      action => <IconButton key={action.icon} icon={action.icon} onClick={action.onClick} />
    )
  }

  renderSearch = () => {
    const { searchKeys, classes } = this.props
    const { searchTerm } = this.state

    if (!searchKeys) {
      // for the gap of expandable search
      return <div className={classes.searchField} />
    }

    return (
      <div className={classes.searchField}>
        <TextInput
          icon="search"
          activeIcon={!!searchTerm}
          onChange={e => this.handleSearchChange(e.target.value)}
          input={{ name: 'search' }}
          value={searchTerm}
          placeholder="Search"
          stretched={false}
          variant="expandable"
        />
      </div>
    )
  }

  renderSortAndFilter = () => {
    const { filterOptions, sortOptions, classes } = this.props
    const { appliedFilters, appliedSorting } = this.state

    if (!sortOptions && !filterOptions) {
      return null
    }

    const defaultFilters = this.getDefaultFilters()
    const defaultSorting = this.getDefaultSorting()
    const appliedFilterCount = this.getAppliedFilterCount()

    return (
      <div className={classes.filterField}>
        <MenuContainer>
          <TextInput
            badge={appliedFilterCount > 0 && appliedFilterCount}
            icon="filter"
            activeIcon={appliedFilterCount > 0}
            placeholder={[ sortOptions && 'Sort', filterOptions && 'Filter' ]
              .filter(Boolean)
              .join(' / ')}
            input={{ name: 'filter' }}
            stretched={false}
            variant="simple"
          />
          <SortAndFilterMenu
            appliedFilters={appliedFilters}
            appliedSorting={appliedSorting}
            applySortingAndFilters={this.handleSortingAndFilters}
            defaultFilters={defaultFilters}
            defaultSorting={defaultSorting}
            filterOptions={filterOptions}
            sortOptions={sortOptions}
          />
        </MenuContainer>
      </div>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.section}>
        {this.renderTitle()}
        {this.renderActions()}
        {this.renderSearch()}
        {this.renderSortAndFilter()}
      </div>
    )
  }
}

PageToolbar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired
  })),
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      filter: PropTypes.func.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          isDefault: PropTypes.bool,
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        })
      ),
      type: PropTypes.oneOf([ 'single', 'multiple' ])
    })
  ),
  searchKeys: PropTypes.array,
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      isDefault: PropTypes.bool,
      keys: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.func ])),
      label: PropTypes.string.isRequired,
      orders: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  title: PropTypes.string.isRequired
}

PageToolbar.defaultProps = {
  actions: null,
  filterOptions: null,
  searchKeys: null,
  sortOptions: null
}

export default injectSheet(({ units }) => ({
  section: {
    display: 'flex',
    marginBottom: units.pageTitleMarginBottom
  },
  heading: {
    alignItems: 'center',
    display: 'inline-flex',
    marginRight: units.pageTitleMarginRight
  },
  filterField: {
    width: units.sortAndFilterInputWidth
  },
  searchField: {
    flex: 1
  }
}))(PageToolbar)
