import { onError } from 'apollo-link-error'

import { resetStore } from 'client/methods'

const errorLink = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    resetStore()
  }
})

export default errorLink
