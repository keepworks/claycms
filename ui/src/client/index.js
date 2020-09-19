import ApolloClient from 'apollo-client'
import { from } from 'apollo-link'

import authLink from './authLink'
import cache from './cache'
import debounceLink from './debounceLink'
import errorLink from './errorLink'
import httpLink from './httpLink'
import stateLink from './stateLink'

const client = new ApolloClient({
  link: from([
    authLink,
    errorLink,
    stateLink,
    debounceLink,
    httpLink
  ]),
  cache
})

/*
  https://www.apollographql.com/docs/link/links/state.html#defaults
  https://www.apollographql.com/docs/react/advanced/caching.html#reset-store

  The cache is not reset back to defaults set in `stateLink` on client.resetStore().
  Therefore, we need to rehydrate cache with defaults using `onResetStore()`.
*/
client.onResetStore(stateLink.writeDefaults)

export default client
