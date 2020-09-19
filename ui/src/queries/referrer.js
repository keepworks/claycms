import gql from 'graphql-tag'

const GET_REFERRER = gql`
  query ReferrerQuery {
    referrer @client {
      url
    }
  }
`

export default GET_REFERRER
