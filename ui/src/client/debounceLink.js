import DebounceLink from 'apollo-link-debounce'

const DEBOUNCE_TIMEOUT = 250

export default new DebounceLink(DEBOUNCE_TIMEOUT)
