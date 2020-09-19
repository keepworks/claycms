const defaults = {
  referrer: {
    url: null,
    __typename: 'Referrer'
  }
}

const resolvers = {
  Mutation: {
    setReferrer: (_obj, { url }, { cache }) => {
      cache.writeData({
        data: {
          referrer: {
            url,
            __typename: 'Referrer'
          }
        }
      })

      return null
    }
  }
}

const referrer = {
  defaults,
  resolvers
}

export default referrer
