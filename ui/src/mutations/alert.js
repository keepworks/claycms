import gql from 'graphql-tag'

const ALERT_FAILURE = gql`
  mutation OpenFailureAlertMutation($alert: AlertInput!) {
    openFailureAlert(alert: $alert) @client
  }
`

const ALERT_SUCCESS = gql`
  mutation OpenSuccessAlertMutation($alert: AlertInput!) {
    openSuccessAlert(alert: $alert) @client
  }
`

const CLOSE_ALERT = gql`
  mutation CloseAlertMutation {
    closeAlert @client
  }
`

export { ALERT_FAILURE, ALERT_SUCCESS, CLOSE_ALERT }
