import client from 'client'

import SET_TOKEN from 'mutations/session'
import { ALERT_FAILURE, ALERT_SUCCESS } from 'mutations/alert'

const resetStore = () => client
  .mutate({ mutation: SET_TOKEN, variables: { token: null } })
  .then(() => client.resetStore())

const showAlertFailure = alert => client.mutate({ mutation: ALERT_FAILURE, variables: { alert } })

const showAlertSuccess = alert => client.mutate({ mutation: ALERT_SUCCESS, variables: { alert } })

export { resetStore, showAlertFailure, showAlertSuccess }
