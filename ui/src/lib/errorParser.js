import { FORM_ERROR, setIn } from 'final-form'

const errorTypes = Object.freeze({
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
})

/*
  https://www.apollographql.com/docs/link/links/http.html#Errors
  https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-error
*/

const parseSubmissionError = graphQLErrors => (
  graphQLErrors.reduce((errors, { type, path, message }) => {
    if (type && type === errorTypes.UNPROCESSABLE_ENTITY && path) {
      const field = path.join('.')

      if (field === 'base') {
        return setIn(errors, FORM_ERROR, message)
      }

      return setIn(errors, field, message)
    }

    return errors
  }, {})
)

const parseError = ({ networkError, graphQLErrors = [] }) => {
  let message = null
  let submissionError = null

  if (networkError) {
    const { response, result: { exception, errors } = {} } = networkError

    if (!response) {
      // Server is down / No internet.
      message = 'Please try again after some time.'
    } else if (exception) {
      /*
        Internal Server Errors with status 500.
        For eg: `#<ActiveRecord::PendingMigrationError: ...>`
        In development, they are not formatted and therefore are not part of the `errors` key.
      */
      message = exception
    } else if (errors) {
      errors.forEach(({ type, path, message: errorMessage }) => {
        if (type === errorTypes.UNAUTHORIZED) {
          message = errorMessage || 'You seem to have logged out.'
        } else if (type === errorTypes.FORBIDDEN) {
          message = errorMessage || 'You are not allowed to do that.'
        } else if (type === errorTypes.NOT_FOUND) {
          message = errorMessage || 'That resource does not exist.'
        } else if (type === errorTypes.INTERNAL_SERVER_ERROR) {
          message = errorMessage || 'Something went wrong. Our engineers are looking into it.'
        } else if (type === errorTypes.UNPROCESSABLE_ENTITY && (!path || path === '')) {
          message = errorMessage
        }
      })

      if (!message) {
        submissionError = parseSubmissionError(errors)
      }
    }
  } else {
    /*
      Errors with status 200
      For eg: Variable input of type `*Input!` was provided invalid value
    */
    graphQLErrors.forEach(({ message: errorMessage }) => {
      if (process.env.NODE_ENV === 'development') {
        message = errorMessage
      } else {
        message = "We've been notified. Please try after some time."
      }
    })
  }

  const alert = { message }

  return { alert, submissionError }
}

export default parseError
