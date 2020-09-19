const defaults = {
  session: {
    token: null,
    __typename: 'Session'
  }
}

const resolvers = {
  Mutation: {
    setToken: (_obj, { token }, { cache }) => {
      cache.writeData({
        data: {
          session: {
            token,
            __typename: 'Session'
          }
        }
      })

      return null
    }
  }
}

const session = {
  defaults,
  resolvers
}

export default session
