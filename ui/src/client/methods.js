import client from 'client'

import SET_TOKEN from 'mutations/session'
import { ALERT_FAILURE, ALERT_SUCCESS } from 'mutations/alert'

const logout = () => (
  client.mutate({ mutation: SET_TOKEN, variables: { token: null } }).then(() => (
    client.resetStore()
  ))
)

const showAlertFailure = alert => client.mutate({ mutation: ALERT_FAILURE, variables: { alert } })

const showAlertSuccess = alert => client.mutate({ mutation: ALERT_SUCCESS, variables: { alert } })

export { logout, showAlertFailure, showAlertSuccess }
