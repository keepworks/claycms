import { withClientState } from 'apollo-link-state'

import cache from './cache'
import resolvers from '../resolvers'

const stateLink = withClientState({
  cache,
  ...resolvers
})

export default stateLink
