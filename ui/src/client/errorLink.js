import { onError } from 'apollo-link-error'

import { logout } from 'client/methods'

const errorLink = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    logout()
  }
})

export default errorLink
