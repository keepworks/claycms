import gql from 'graphql-tag'
import qs from 'qs'
import React, { Component, Fragment } from 'react'

import Body from 'components/onboarding/Body'
import Card from 'components/onboarding/Card'
import CardWrapper from 'components/onboarding/CardWrapper'
import Content from 'components/onboarding/Content'
import Header from 'components/onboarding/Header'
import Helmet from 'react-helmet-async'
import ResetPasswordForm from 'components/onboarding/forms/ResetPasswordForm'
import { withMutation } from 'lib/data'

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props)

    const { token: resetPasswordToken } = qs.parse(
      document.location.search,
      { ignoreQueryPrefix: true }
    )

    this.state = { resetPasswordToken }
  }

  componentDidMount() {
    const { history } = this.props
    const { resetPasswordToken } = this.state

    if (!resetPasswordToken) {
      history.replace('/forgot-password')
    }
  }

  handleSubmit = (values) => {
    const { history, resetPassword } = this.props

    return resetPassword(values, { onSuccess: () => history.replace('/login') })
  }

  render() {
    const { resetPasswordToken } = this.state

    return (
      <Fragment>
        <Helmet>
          <title>
            Reset password
          </title>
        </Helmet>

        <Header heading="RESET PASSWORD" hint="Remember your password?" link={{ name: 'Log in', url: '/login' }} />

        <Body>
          <Content>
            We can&apos;t wait to welcome you back.
          </Content>

          <CardWrapper>
            <Card>
              <ResetPasswordForm
                initialValues={{ resetPasswordToken }}
                onSubmit={this.handleSubmit}
              />
            </Card>
          </CardWrapper>
        </Body>
      </Fragment>
    )
  }
}

ResetPasswordPage = withMutation(gql`
  mutation ResetPasswordMutation($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
    }
  }
`, {
  successAlert: {
    message: 'You may now use your new password to login.'
  }
})(ResetPasswordPage)

export default ResetPasswordPage
