import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Component, Fragment } from 'react'

import Loader from 'components/internal/Loader'

import { withMutation } from 'lib/data'

class TransferRequestPage extends Component {
  componentDidMount() {
    const { match: { params }, acceptTransferRequest, history, rejectTransferRequest } = this.props

    const action = params.action === 'accept' ? acceptTransferRequest : rejectTransferRequest

    action(params).finally(() => {
      history.push('/user/teams')
    })
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>
            Processing Transfer Request...
          </title>
        </Helmet>
        <Loader record={{ loading: true }} />
      </Fragment>
    )
  }
}

TransferRequestPage = withMutation(gql`
  mutation AcceptTransferRequestMutation($input: AcceptTransferRequestInput!) {
    acceptTransferRequest(input: $input) {
      success
    }
  }
`, {
  successAlert: {
    title: 'Accepted.',
    message: 'Successfully accepted the transfer request.'
  }
})(TransferRequestPage)

TransferRequestPage = withMutation(gql`
  mutation RejectTransferRequestMutation($input: RejectTransferRequestInput!) {
    rejectTransferRequest(input: $input) {
      success
    }
  }
`, {
  successAlert: {
    title: 'Rejected.',
    message: 'Successfully rejected the transfer request.'
  }
})(TransferRequestPage)

export default TransferRequestPage
