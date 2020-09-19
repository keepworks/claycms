import { compose, graphql } from 'react-apollo'
import { filter } from 'graphql-anywhere'

import getRandomNumber from 'lib/getRandomNumber'
import isPromise from 'lib/isPromise'
import parseError from 'lib/errorParser'
import { showAlertFailure, showAlertSuccess } from 'client/methods'

const OptimisticResponseModes = Object.freeze({
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DESTROY: 'DESTROY'
})

const MutationResponseModes = Object.freeze({
  IGNORE: 'IGNORE',
  APPEND: 'APPEND',
  PREPEND: 'PREPEND',
  DELETE: 'DELETE',
  CUSTOM: 'CUSTOM'
})

// Helpers

const findMutationMethodName = mutation => (
  mutation.definitions[0].selectionSet.selections[0].name.value
)

const findMutationMethodNameOrAlias = (mutation) => {
  const selection = mutation.definitions[0].selectionSet.selections[0]
  return (selection.alias && selection.alias.value) || selection.name.value
}

const findQueryFieldNameOrAlias = (query) => {
  const selection = query.definitions[0].selectionSet.selections[0]
  return (selection.alias && selection.alias.value) || selection.name.value
}

const findAllQueryFieldNamesOrAliases = query => (
  query.definitions[0].selectionSet.selections.map(selection => (
    (selection.alias && selection.alias.value) || selection.name.value
  ))
)

const addRecords = (
  currentRecords = [],
  responseRecords = [],
  mode = MutationResponseModes.APPEND
) => {
  switch (mode) {
    case MutationResponseModes.APPEND:
      return currentRecords.push(...responseRecords)
    case MutationResponseModes.PREPEND:
      return currentRecords.unshift(...responseRecords)
    default:
      throw new Error('Incorrect `mode` specified when using addRecords.')
  }
}

const deleteRecords = (currentRecords = [], responseRecords = [], key = 'id') => {
  const deleteIds = responseRecords.map(record => record[key])

  deleteIds.forEach((deleteId) => {
    const index = currentRecords.findIndex(record => record[key] === deleteId)

    if (index !== -1) {
      currentRecords.splice(index, 1)
    }
  })
}

const optimisticCreateResponse = (other = {}) => ({ input }) => ({
  id: getRandomNumber(),
  createdAt: +new Date(),
  updatedAt: +new Date(),
  ...input,
  ...other
})

const optimisticUpdateResponse = (other = {}) => ({ id, input }) => ({
  id,
  updatedAt: +new Date(),
  ...input,
  ...other
})

const optimisticDestroyResponse = (other = {}) => ({ id }) => ({
  id,
  ...other
})

// React apollo HOCs

const withClientMutation = (mutation) => {
  const methodName = findMutationMethodName(mutation)

  return graphql(mutation, {
    props: ({ mutate }) => ({
      [methodName]: variables => mutate({ variables })
    })
  })
}

const withClientQuery = (query, config = {}) => {
  const configOptions = config.options || {}
  delete config.options

  const configWithDefaults = Object.assign({
    props: ({ data }) => ({ ...data }),
    options: (props) => {
      const defaultOptions = {
        fetchPolicy: 'cache-only'
      }

      if (typeof configOptions === 'function') {
        return {
          ...defaultOptions,
          ...configOptions(props)
        }
      }

      return {
        ...defaultOptions,
        ...configOptions
      }
    }
  }, config)

  if (configWithDefaults.name) { // Automatically set by the field.
    throw new Error('You cannot override the `name` when using `withClientQuery`.')
  }

  return graphql(query, configWithDefaults)
}

const withMutation = (mutation, {
  context,
  query: mutationQuery,
  mode = MutationResponseModes.IGNORE,
  inputFilter,
  refetch = false,
  optimistic,
  updateData,
  successAlert
} = {}) => {
  const methodName = findMutationMethodName(mutation)

  return graphql(mutation, {
    props: ({ mutate, ownProps: { query: componentQuery, variables, ...props } }) => ({
      [methodName]: (values, { onSuccess, onFailure } = {}) => {
        const { id, ...rawInput } = values || {}
        const input = inputFilter ? filter(inputFilter, rawInput) : rawInput

        const mutationConfig = {
          variables: { id, input },
          errorPolicy: 'none' // Ensure all errors are in catch block
        }

        const responseName = findMutationMethodNameOrAlias(mutation)

        const query = mutationQuery || componentQuery

        if (optimistic) {
          const { mode: optimisticMode, response: optimisticResponse } = optimistic

          if (optimisticResponse) {
            const { __typename, ...other } = optimisticResponse

            let response = null

            if (!optimisticMode || !__typename) {
              throw new Error('You must specify both `mode` and `__typename` for `optimistic` shorthand.')
            }

            if (!Object.prototype.hasOwnProperty.call(OptimisticResponseModes, optimisticMode)) {
              throw new Error('Incorrect mode specified when using `optimistic` shorthand.')
            }

            if (optimisticMode === OptimisticResponseModes.CREATE) {
              response = optimisticCreateResponse({ __typename, ...other })
            }

            if (optimisticMode === OptimisticResponseModes.UPDATE) {
              response = optimisticUpdateResponse({ __typename, ...other })
            }

            if (optimisticMode === OptimisticResponseModes.DESTROY) {
              response = optimisticDestroyResponse({ __typename, ...other })
            }

            mutationConfig.optimisticResponse = {
              __typename: 'Mutation',
              [responseName]: response({ id, input: rawInput })
            }
          }
        }

        if (mode !== MutationResponseModes.IGNORE) {
          mutationConfig.update = (cache, { data }) => {
            const cachedData = cache.readQuery({ query, variables })
            const fieldName = findQueryFieldNameOrAlias(query)

            /*
              Convert response to array for mutations like BatchCreate*
            */
            const responseRecords = (data[responseName].constructor === Array)
              ? data[responseName] : [ data[responseName] ]

            if (mode === MutationResponseModes.APPEND || mode === MutationResponseModes.PREPEND) {
              addRecords(cachedData[fieldName], responseRecords, mode)
            } else if (mode === MutationResponseModes.DELETE) {
              deleteRecords(cachedData[fieldName], responseRecords)
            } else if (mode === MutationResponseModes.CUSTOM) {
              if (!updateData) {
                throw new Error('You must specify `updateData` for CUSTOM mutation mode.')
              }

              updateData({ cache, cachedData, responseRecords, variables })
            }

            cache.writeQuery({ data: cachedData, query, variables })
          }
        }

        if (refetch) {
          mutationConfig.refetchQueries = [ { query, variables } ]
        }

        if (context) {
          if (typeof context === 'function') {
            mutationConfig.context = context(props)
          } else {
            mutationConfig.context = context
          }
        }

        return mutate({ ...mutationConfig })
          .then((response) => {
            if (successAlert) {
              showAlertSuccess(typeof successAlert === 'function' ? successAlert({ response, input }) : successAlert)
            }

            if (typeof onSuccess === 'function') {
              const result = onSuccess(response)
              if (isPromise(result)) {
                return result
              }
            }

            return Promise.resolve()
          }).catch((error) => {
            const { alert, submissionError } = parseError(error)

            if (submissionError) {
              if (typeof onFailure === 'function') {
                onFailure(submissionError)
              }

              return Promise.resolve(submissionError)
            }

            if (alert) {
              showAlertFailure(alert)
            }

            if (typeof onFailure === 'function') {
              onFailure(error)
            }

            return Promise.resolve(error)
          })
      }
    })
  })
}

const withQuery = (query, config = {}) => {
  const configOptions = config.options || {}
  delete config.options

  const configWithDefaults = Object.assign({
    props: ({ data }) => {
      const fieldNames = findAllQueryFieldNamesOrAliases(query)
      const loading = data.loading && fieldNames.every(fieldName => !data[fieldName])
      const reloading = data.loading

      return { ...data, loading, reloading, query }
    },
    options: (props) => {
      const defaultOptions = {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'none'
      }

      if (typeof configOptions === 'function') {
        return {
          ...defaultOptions,
          ...configOptions(props)
        }
      }

      return {
        ...defaultOptions,
        ...configOptions
      }
    }
  }, config)

  if (configWithDefaults.name) { // Automatically set by the field.
    throw new Error('You cannot override the `name` when using `withQuery`.')
  }

  return graphql(query, configWithDefaults)
}

/*
  This function was created to handle components like `Header.js` wherein we need
  to break a query into multiple queries.

  Sample use cases -
    1. You can skip one of the queries without affecting others within the component.
    2. Pass an individual query as argument to withMutation HOC to handle update
*/
const withQueries = queries => compose(queries.map(({ query, config }) => withQuery(query, config)))

export {
  MutationResponseModes,
  OptimisticResponseModes,
  withClientMutation,
  withClientQuery,
  withMutation,
  withQueries,
  withQuery
}
