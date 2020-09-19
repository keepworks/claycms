import gql from 'graphql-tag'

const GET_TOKEN = gql`
  query SessionQuery {
    session @client {
      token
    }
  }
`

export default GET_TOKEN
