import gql from 'graphql-tag'

const GET_ALERT = gql`
  query AlertQuery {
    alert @client {
      isOpen
      icon
      message
      title
      variant
    }
  }
`

export default GET_ALERT
