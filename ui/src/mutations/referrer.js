import gql from 'graphql-tag'

const SET_REFERRER = gql`
  mutation SetReferrerMutation($url: String!) {
    setReferrer(url: $url) @client
  }
`

export default SET_REFERRER
