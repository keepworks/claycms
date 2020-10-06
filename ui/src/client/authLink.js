import { ApolloLink } from 'apollo-link'

import cache from 'client/cache'

import GET_TOKEN from 'queries/session'

const authLink = new ApolloLink((operation, forward) => {
  const { session: { token } = {} } = cache.readQuery({ query: GET_TOKEN })
  const headers = {}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  operation.setContext({ headers })

  return forward(operation)
})

export default authLink
