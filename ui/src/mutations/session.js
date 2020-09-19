import gql from 'graphql-tag'

const SET_TOKEN = gql`
  mutation SetTokenMutation($token: String!) {
    setToken(token: $token) @client
  }
`

export default SET_TOKEN
