const defaults = {
  alert: {
    isOpen: false,
    variant: 'failure',
    icon: null,
    title: null,
    message: null,
    __typename: 'Alert'
  }
}

const resolvers = {
  Mutation: {
    closeAlert: (_obj, _args, { cache }) => {
      cache.writeData({
        data: {
          alert: {
            isOpen: false,
            __typename: 'Alert'
          }
        }
      })

      return null
    },
    openFailureAlert: (_obj, args, { cache }) => {
      cache.writeData({
        data: {
          alert: {
            ...defaults.alert,
            ...args.alert,
            isOpen: true,
            variant: 'failure'
          }
        }
      })

      return null
    },
    openSuccessAlert: (_obj, args, { cache }) => {
      cache.writeData({
        data: {
          alert: {
            ...defaults.alert,
            ...args.alert,
            isOpen: true,
            variant: 'success'
          }
        }
      })

      return null
    }
  }
}

const alert = {
  defaults,
  resolvers
}

export default alert
